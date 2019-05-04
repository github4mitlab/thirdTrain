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



//post router
// router.post('/', (req, res) => {
//     res.status(200).json({
//         msg: "post / products.js"
//     });
// });

router.post('/', (req, res) => {
    const product = {
        name : req.body.name,
        price : req.body.price
    };
    res.status(200).json({
        msg: "POST / products.js",
        createdProduct: product
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
