const fs = require('fs');

const requestHandler = (req, res) => {
  const { url } = req;
  const { method } = req;

  if (url === '/') {
    res.write(`
      <html>
        <head>
          <title>Greeting</title>
        </head>
        <body>
          <h1>Welcome to exercise 1!</h1>
          <form action="/create-user" method="POST">
            <input type="text" name="user"></input>
            <button type="submit">Send</button>
          </form>
        </body>
      </html>`);
    return res.end();
  }

  if (url === '/users') {
    res.write(`
      <html>
        <head>
          <title>Greeting</title>
        </head>
        <body>
          <ul>
            <li>User 1</li>
            <li>User 2</li>
            <li>User 3</li>
            <li>User 4</li>
          </ul>
        </body>
      </html>`);
    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split('=')[1];
      console.log('incoming data =>', user);
    });

    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  return res.end();
};
module.exports = requestHandler;
