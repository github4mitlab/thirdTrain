const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const productController = require('../controller/product');


//  GET products Info through DB
router.get("/", productController.products_get_all);


// Request Products Info through Detailed Query
router.get('/:productId', productController.products_get_product);

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
router.post("/", checkAuth, productController.products_create_product);

// DB Delete
router.delete('/:productId', checkAuth, productController.products_delete_product);

// DB Patch
router.patch('/:productId', checkAuth, productController.products_update_product);

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
