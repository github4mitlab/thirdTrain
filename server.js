const http = require('http');
const express = require('express');
//const bodyparser = require('body-parser');
//const morgan = require('morgan');

const app = express();

//라우터 구현
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);





const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, console.log('Server Start...!!!'));



