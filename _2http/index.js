const http = require("http")
const server = http.createServer();
const fs = require("fs")

server.on("request",(req,res) => {

    let url = req.url
    switch (url) {
        case "/":
            res.writeHead(200, {"context-text" : "text/html;charset=utf-8"});
            var  content = fs.readFileSync("./demo.html")
            res.write(content)
            res.end()
            break;
        case "/style.css":
            res.writeHead(200, {"context-text" : "text/html;charset=utf-8"});

            var content = fs.readFileSync("./style.css")
            // res.write("<h1>server对象 ok</h1>");
            res.write(content)
            res.end()
        default:
            res.end()
            return;
    }

    
})

server.listen(3000)