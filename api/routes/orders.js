const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        orders_message: "GET / Orders"
    });
});

router.get('/:orderId', (req, res) => {
    const id = req.params.orderId;
    if (id !== '1234') {
        res.status(200).json({
            orders_message: "잘못된 아이디"
        });
    } else {
        res.status(200).json({
            orders_message: "정확한 아이디",
            id : id
        });

    }

});


router.post('/', (req, res) => {
    res.status(200).json({
        message: "POST / orders.js"
    });
});

router.put('/', (req, res) => {
    res.status(200).json({
        message: "PUT / orders.js"
    });
});

router.delete('/', (req, res) => {
    res.status(200).json({
        message: "DELETE / orders.js"
    });
});

module.exports = router;

