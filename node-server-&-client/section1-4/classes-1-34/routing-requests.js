const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const { url } = req;
  const { method } = req;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Second Node Page</title></head>');
    res.write(
      `<body>
        <form action="/message" method="POST">
          <input type="text" name="message"></input>
          <button type="submit">Send</button>
        </form>
      </body>`
    );
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    fs.writeFileSync('message.txt', 'GRAEFF');
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  return res.end();
});

server.listen(3000);
