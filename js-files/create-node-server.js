const http = require('http');

function rqListener(req, res) {
  console.log('Hello Word');
  console.log('request made');
  // process.exit();
}

const server = http.createServer(rqListener);

server.listen(3000);