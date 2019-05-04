const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        product_message: "GET Product"
    });
});

module.exports = router;
