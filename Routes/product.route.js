const express = require("express");

const router = express.Router();

const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
      console.log("yes");
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })




const upload = multer({ storage: storage })


const product = require("../Controllers/product.controller");
const credAuth = require("../middlewares/credentialsAuthenticate.middleware");
const adminOnly = require("../middlewares/adminOnly.middleware");


// product image name must be 'product_image'


router.post("/product", credAuth, adminOnly,upload.single('product_image'), product.createProduct);
router.get("/product", credAuth, adminOnly, product.createProduct);

// router.update("/product", (req, res) => {
//   // router code here
// });

module.exports = router;
