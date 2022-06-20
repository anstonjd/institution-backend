require("dotenv").config();
const connection = require("../_db.config");

const jwt = require("jsonwebtoken");

const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;

  let userExists = false;

  connection().connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected!:)');
    }
  });

  await connection()
    .promise()
    .query(`select * from admin where email = '${email}'`)
    .then(([rows, fields]) => {
      if (rows.length > 0) {
        userExists = true;
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    })
    .finally(() => {
      connection().end();
    })

  if (!userExists) {
    await connection()
      .promise()
      .query(
        `INSERT INTO admin VALUES (NULL, '${name}', '${email}', '${password}');`
      )
      .then(() => {
        connection().end();
        res.status(201).json({ success: "admin created" });
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      })
      .finally(() => {
        connection().end();
      })
  } else {
    res.status(400).json({ error: "admin already exists" });
  }
};

const adminLogin =  (req, res) => {
  const { email, password } = req.body;

  if (email && password) {

    
    
    connection()
      .promise()
      .query(
        `select * from admin where email = '${email}' and password = '${password}'`
      )
      .then(([rows, fields]) => {
        connection().end();
        if (rows.length > 0) {
          let data = { email: rows[0].email, userType: "admin" };
          const accesstoken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 60 * 60,
          });

          // adding token to the db

          connection()
            .promise()
            .query(
              `UPDATE admin SET token='${accesstoken}' where email='${rows[0].email}'`
            )
            .then(() => {
              connection().end();
              res.status(200).json({ values: rows, userType:"admin", token: accesstoken });
            })
            .catch((err) => {
              res.status(400).json({ error: err.message });
            })
            .finally(() => {
              connection().end();
            });
        } else {
          res.status(400).json({ error: "Invalid email or password" });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "invalid error occurred try again later " + err });
      })
      .finally(() => {
        connection().end();
      });
  }
};

const logout = async (req, res) => {
  await connection()
    .promise()
    .query(`update admin set token=null where email='${req.email}'`)
    .then(() => {
      connection().end();
      res.status(200).json({ success: "succesfully logged out" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    })
    .finally(() => {
      connection().end();
    });
};
module.exports = { adminRegister, adminLogin, logout };
