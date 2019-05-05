const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const mongoose = require('mongoose');


//에러핸들링
const morgan = require('morgan');


//라우터 구현
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:false}));

// DB 연결부
const db = require('./config/key').mongoURI;
mongoose.Promise = global.Promise;  //비동기 방식 에 대한 내부 명령어

mongoose.connect(db, { useNewUrlParser: true })
    .then( () => console.log("MongoDB Connected..."))
    .catch( err => console.log(err));

// // body-parser 정의
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});

    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.get('/', function(req, res) {
    res.send("Root");
});

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
            main_msg: error.message
        }
    });
});




const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, console.log('Server Start...!!!'));



