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




const news=require("../Controllers/news.controller");
const credAuth = require("../middlewares/credentialsAuthenticate.middleware");
const adminOnly = require("../middlewares/adminOnly.middleware");

router.get("/", credAuth, news.getAllNews);

router.get("/news/:newsId", credAuth, news.viewNews);



router.post(
  "/news",
  credAuth,
  adminOnly,
  upload.single("news_image"),
  news.createNews
);


module.exports = router;
