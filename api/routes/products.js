const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: "GET Product"
    });
});

router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            id_check_msg: "마즘", 
            id : id
        });        
    } else {
        res.status(200).json({
            id_check_msg: "틀림"
        });
    }
});


// post router
router.post('/', (req, res) => {
    res.status(200).json({
        msg: "post / orders.js"
    });
});

// put router
router.put('/', (req, res) => {
    res.status(200).json({
        msg: "put / orders.js"
    });
});


// delete router
router.delete('/',(req, res) => {
    res.status(200).json({
        msg: "delete / order.js"
    });
});

module.exports = router;
