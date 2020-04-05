const fs = require('fs');

const requestHandler = (req, res) => {
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
      body.push(chunck);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        console.log(err);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  return res.end();
};

module.exports = {
  handler: requestHandler,
  text: 'Some hard coded text'
};
