require("dotenv").config();

const jwt = require("jsonwebtoken");
const connection = require("../_db.config");
const userRegister = async (req, res, next) => {
  const { name, password, email } = req.body;
  let userExists = false;

  await connection()
    .promise()
    .query(`select * from users where email='${email}'`)
    .then(([rows, fields]) => {
      if (rows.length > 0) {
        userExists = true;
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });

  if (!userExists) {
    await connection()
      .promise()
      .query(
        `insert into users values(null,'${name}','${email}','${password}')`
      )
      .then(() => {
        connection().end();
        res.status(201).send({ msg: "success" });
      });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    await connection()
      .promise()
      .query(
        `select * from users where email = '${email}' and password = '${password}'`
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          let data = { email: rows[0].email, userType: "users" };
          const accesstoken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 60 * 60,
          });

          // adding token to the db

          connection()
            .promise()
            .query(
              `UPDATE users SET token='${accesstoken}' where email='${rows[0].email}'`
            )
            .then(() => {
              res.status(200).json({ values: rows, token: accesstoken });
            })
            .catch((err) => {
              res.status(400).json({ error: err.message });
            });
        } else {
          res.status(400).json({ error: "Invalid email or password" });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "invalid error occurred try again later " + err });
      });
  }
};

const updatepassword = (req, res) => {
  const { oldpassword, newpassword } = req.body;
  if (oldpassword && newpassword) {
    // TODO: acces the token and validate and change password
  } else {
    res.status(400).json({ err: "fill all the details" });
  }
};

const logout = async (req, res) => {
  await connection()
    .promise()
    .query(`update users set token=null where email='${req.email}'`)
    .then(() => {
      res.status(200).json({ success: "succesfully logged out" });
    })
    .catch((err) => {
      res.status(500).json({ error: err  });
    });
};

module.exports = { userRegister, userLogin, logout };
