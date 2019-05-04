const http = require('http');
const express = require('express');
//const bodyparser = require('body-parser');
//const morgan = require('morgan');

const app = express();

//에러핸들링
const morgan = require('morgan');


//라우터 구현
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//에러 핸들러 구현
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);    
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            msg: error.message
        }
    });
});




const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, console.log('Server Start...!!!'));



