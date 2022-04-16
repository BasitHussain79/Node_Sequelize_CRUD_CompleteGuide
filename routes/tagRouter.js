const tagController = require("../controllers/tagController");
const router = require("express").Router();

router.post("/addTag", tagController.createTag);
router.post("/addProductTags", tagController.addProduct);
router.get("/allTags", tagController.findAll);
router.get("/:id", tagController.findById);

module.exports = router;
