require("dotenv").config();

const jwt = require("jsonwebtoken");

const connection = require("../_db.config");


const createProduct = async (req, res) => {
  // const name = req.body.name;
  // const description = req.body.description;
  // const price = req.body.price;

  const formData=req.body;
  console.log(req.file)
  console.log(formData);
  res.status(200).json(formData);



  

  //   TODO: clean the data

  // await connection()
  //   .promise()
  //   .query(
  //     `INSERT INTO products (id, name, image, description, price) VALUES (NULL, '${name}', '', '${description}', '${price}');`
  //   )
  //   .then(() => {
  //     res.status(200).json({ success: "product created successfully" });
  //   })
  //   .catch((err) => {
  //     res.status(400).json({ error: err.message });
  //   });
};

const updateProduct = async (req, res) => {
  const productId = req.params.product;
  await connection().promise().query(``);
};

module.exports = { createProduct };
