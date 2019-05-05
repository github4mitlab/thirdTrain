const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/products");


//  GET products Info through DB
router.get("/", (req, res) => {
  Product
    .find()
    .exec()
    .then(docs => {
      // console.log(docs);
      // res.status(200).json({
      //   products: docs
      // });
      const response = {
        count: docs.length,
        products: docs.map( doc => {
          return{
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request:{
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
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
    Product.findById(id)
        .exec()
        .then( doc => {
            console.log("Quering DB", doc);
            if (doc) {
                res.status(200).json({
                  product: doc,
                  request:{
                    type: 'GET',
                    url: "http://localhost:3000/products"
                  }
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
  const product = new Product({
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
        createdProudct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: 'GET',
            url: "http://localhost:3000/products/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// DB Delete
router.delete('/:productId', (req, res) => {
    const id = req.params.productId;
    Product
        .remove({ _id: id})
        .exec()
        .then( result => {
            res.status(200).json({
              message: 'Product deleted',
              request: {
                type: 'POST',
                url: "http://localhost:3000/products",
                body: { name: 'String', price: 'String'}
              }
            });
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                delete_err: err
            });
        });
});


// DB Patch
router.patch('/:productId', (req, res) => {
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body) {
        console.log(ops,id);
        updateOps[ops.propName] = ops.value;
    }

    Product
        .update(
            {_id: id},
            {$set: updateOps}
        )
        .exec()
        .then( result => {
            res.status(200).json({
                message: 'Product updated',
                request:{
                  type: 'GET',
                  url: "http://localhost:3000/products/" + id
                }
            });
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
        console.log(updateOps);
});

// // put router
// router.put("/", (req, res) => {
//   res.status(200).json({
//     msg: "put / orders.js"
//   });
// });

// // delete router
// router.delete("/", (req, res) => {
//   res.status(200).json({
//     msg: "delete / order.js"
//   });
// });

module.exports = router;
