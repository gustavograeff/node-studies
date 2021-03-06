const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const { url } = req;
  const { method } = req;

  if (url === '/') {
    res.write('<html>');
    res.write(`
      <head>
        <title>Second Node Page</title>
      </head>
    `);
    res.write(`
      <body>
        <form action="/message" method="POST">
          <input type="text" name="message"></input>
          <button type="submit">Send</button>
        </form>
      </body>
    `);
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];

    req.on('data', chunck => {
      console.log('chunck', chunck);
      body.push(chunck);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      console.log('parsedBody', parsedBody);
      console.log('message', message);
      fs.writeFileSync('message.txt', message);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  return res.end();
});

server.listen(3000);
