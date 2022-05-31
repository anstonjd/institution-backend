const { urlencoded } = require("express");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const checkAuth = require("./middlewares/credentialsAuthenticate.middleware");

const userRouter = require("./Routes/users.route");
const adminRouter = require("./Routes/admin.route");
const productRouter = require("./Routes/product.route");

const connection = require("./_db.config");
const { JsonWebTokenError } = require("jsonwebtoken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", checkAuth, async (req, res) => {
  res.send(req.email);

  await connection()
    .promise()
    .query("select * from users")
    .then(([rows, fields]) => {
      console.log(rows);
    })
    .then(() => {
      connection().end();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      connection().end();
    })
});

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/products", productRouter);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
