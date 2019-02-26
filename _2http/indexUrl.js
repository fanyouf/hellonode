const http = require("http")
const url = require("url")
const fs = require("fs")

const queryString = require("querystring");
const server = http.createServer((req,res) => {
    console.info(req.url);
    res.statusCode = 200;
    // res.write(req.url);
    let path =  url.parse(req.url).pathname;
    // console.info(__path;)
    switch (path) {
        case "/":
            let content = fs.readFileSync(__dirname+"/demo.html")
            res.write(content);
            res.end()
            break;
        case "/loginApi":
            let str = ""
            req.on("data",(chunk)=>{
                str += chunk;
            })
            req.on("end",()=>{
                console.dir(str);
                console.dir( queryString.parse(str) )
                
                res.end();
            })
            break;
        default:
            if(fs.existsSync(__dirname + path)){
                let content = fs.readFileSync(__dirname + path)
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