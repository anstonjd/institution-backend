require("dotenv").config();
const jwt = require("jsonwebtoken");

const connection = require("../_db.config");

const settings = require("../settings");

const createProduct = async (req, res) => {
  const formData = req.body;
  // console.log(req.file)
  // console.log(formData);

  let { name, description, allowed_courses } = formData;
  let image = req.product_name;
  console.log(formData);

  //   TODO: clean the data

  await connection()
    .promise()
    .query(
      `INSERT INTO products (id, name, image, description, allowed_courses) VALUES (NULL, '${name}', '${image}', '${description}', '${allowed_courses}');`
    )
    .then(() => {
      connection().end();
      res.status(200).json({ success: "product created successfully" });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

const viewProduct = async (req, res) => {
  const productId = req.params.product;
  await connection()
    .promise()
    .query(`select * from products where id=${productId}`)
    .then(([rows, fields]) => {
      connection().end();
      res.status(200).json(rows);
      res.send();
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    })
    .finally(() => {
      connection().end();
    })
};

const getAllProducts = async (req, res) => {
  await connection()
    .promise()
    .query(`select * from products`)
    .then(([rows, fields]) => {
      connection().end();
      connection().end();
      res.status(200).json(rows);
      
      // res.send();
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      connection().end();
    })
    .finally(() => {
      connection().end();
    })
};

const updateProduct = async (req, res) => {
  const productId = req.params.product;
  await connection().promise().query(``);
};

module.exports = { createProduct, viewProduct, getAllProducts };
