const http = require('http');
const express = require('express');
const app = express();
const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, console.log('Server Start...!!!'));



