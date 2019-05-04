const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const productModel = require("../models/products");


//  GET products Info through DB
router.get("/", (req, res) => {
  productModel
    .find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json({
        products: docs
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        err: err
      });
    });
});


// Request Products Info through Detailed Query
router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    productModel.findById(id)
        .exec()
        .then( doc => {
            console.log("Quering DB", doc);
            if (doc) {
                res.status(200).json({
                    productInfo: doc
                });
            } else {
                res.status(400).json({
                    msg: "해당 정보 없음"
                });
            }
        })
        .catch( err => {
            console.log(err);
            res.status(200).json({
                error: err
            });
        });
        
});

// router.get("/:productId", (req, res) => {
//   const id = req.params.productId;
//   if (id === "special") {
//     res.status(200).json({
//       id_check_msg: "마즘",
//       id: id
//     });
//   } else {
//     res.status(200).json({
//       id_check_msg: "틀림"
//     });
//   }
// });

//post router
// router.post('/', (req, res) => {
//     res.status(200).json({
//         msg: "post / products.js"
//     });
// });

// router.post('/', (req, res) => {
//     const product = {
//         name : req.body.name,
//         price : req.body.price
//     };
//     res.status(200).json({
//         msg: "POST / products.js",
//         createdProduct: product
//     });
// });

//DB Update through POST Router
router.post("/", (req, res) => {
  const product = new productModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        msg: "POST DB OK",
        createdProudct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// put router
router.put("/", (req, res) => {
  res.status(200).json({
    msg: "put / orders.js"
  });
});

// delete router
router.delete("/", (req, res) => {
  res.status(200).json({
    msg: "delete / order.js"
  });
});

module.exports = router;
