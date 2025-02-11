const http = require('http');

const server = http.createServer((req, res) => {
    // console.log(req)
    // res.write('Welcome to our home page')
    // res.end()
    if (req.url === '/') { // http://localhost:5000
        res.end('Welcome to our home page');
    }
    if (req.url === '/about'){  // http://localhost:5000/about
        res.end('Here is our short history')
    }
    res.end(`
        <h1>Oops!</h1>
        <p>We can't seem to find the page your are looking for</p>
        <a href="/">back home</a>        
    `)
})

server.listen(5000)

