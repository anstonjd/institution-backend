const express = require("express");

const router = express.Router();

const multer = require("multer");

const settings = require("../settings");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${settings.PROJECT_DIR}/uploads`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    req.product_name = file.fieldname + "-" + uniqueSuffix + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const product = require("../Controllers/product.controller");
const credAuth = require("../middlewares/credentialsAuthenticate.middleware");
const adminOnly = require("../middlewares/adminOnly.middleware");

router.get("/", credAuth, product.getAllProducts);

router.get("/product/:product", credAuth, product.viewProduct);

// product image name must be 'product_image'

router.post(
  "/product",
  credAuth,
  adminOnly,
  upload.single("product_image"),
  product.createProduct
);

// router.update("/product", (req, res) => {
//   // router code here
// });

module.exports = router;
