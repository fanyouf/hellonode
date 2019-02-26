const http = require("http")
const url = require("url")
const fs = require("fs")
const queryString = require("querystring");


const markdown = require("markdown").markdown;
const server = http.createServer((req,res) => {
    console.info(req.url);
    res.statusCode = 200;
    // res.write(req.url);
    let {pathname,query} =  url.parse(req.url)

    // console.info(url.parse(req.url))
    switch (pathname) {
        case "/":
            var content = fs.readFileSync(__dirname+"/index.html")
            res.write(content);
            res.end()
            break;
        case "/view":
            res.writeHead(200, {"Context-Type":"text/html;charset=utf-8"});

            var {id} = queryString.parse(query)
            var path = __dirname+"/blog/"+id+".md"
            if(fs.existsSync(path)){
                var content = fs.readFileSync(path,'utf8')
                content = markdown.toHTML(content)

                var viewHtml = fs.readFileSync(__dirname + "/view.html",'utf8')
                viewHtml = viewHtml.replace("###content###", content)
                res.write(viewHtml);
                console.info(markdown.toHTML(content))

                res.end();
            }
            else{
                var viewHtml = fs.readFileSync(__dirname + "/view.html",'utf8')
                viewHtml = viewHtml.replace("###content###", "<h1>没有找到</h1>")
                res.write(viewHtml);
                res.end();
            }
            break;
        case "/loginApi":
            var str = ""
            req.on("data",(chunk)=>{
                str += chunk;
            })
            req.on("end",()=>{
                res.end();
            })
            break;
        default:
            if(fs.existsSync(__dirname + pathname)){
                var content = fs.readFileSync(__dirname + path)
                res.write(content);
                res.end()
            }
            else{
                res.statusCode = 404;
                res.end();
            }
            break;
    }
    
})

server.listen(3000)