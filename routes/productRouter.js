const productController = require("../controllers/productController.js");

const router = require("express").Router();

router.post("/addProduct", productController.addProduct);
router.get("/allProducts", productController.getAllProducts);
router.get("/published", productController.getPublishedProduct);
router.get("/productReviews", productController.getAllProductWithReviews);
router.get('/productWithTags', productController.getAllProductsWithTags);
router.get('/productWithTags/:id', productController.getProductWithTagsById);
router.get("/:id", productController.getSingleProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
