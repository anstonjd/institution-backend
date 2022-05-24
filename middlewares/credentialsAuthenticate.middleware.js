require("dotenv").config();
const jwt = require("jsonwebtoken");

const connection = require("../_db.config");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      connection()
        .promise()
        .query(`select token from ${data.userType} where email='${data.email}'`)
        .then(([rows, fields]) => {
          if (token == rows[0].token) {
            req.email = data.email;
            req.user = data.userType;
            next();
          } else {
            res.status(400).json({ error: "Invalid .. Login again" });
          }
        });
    }
  });
};
