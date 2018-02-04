const express = require('express');
const path = require('path');
const http = require('http');
const app = express();

app.use(express.static(__dirname + '/dist'));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

let port = process.env.PORT || 8080;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, '0.0.0.0', function() {
  console.log("Running on port " + port);
});