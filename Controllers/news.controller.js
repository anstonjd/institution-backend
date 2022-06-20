require("dotenv").config();
const jwt = require("jsonwebtoken");

const connection = require("../_db.config");

const settings = require("../settings");

const createNews = async (req, res) => {
  const formData = req.body;
  
  // console.log(req.file)
  // console.log(formData);

  let { name, description, allowed_courses } = formData;
  let image = req.product_name;
  

  //   TODO: clean the data
  console.log(formData);

  await connection()
    .promise()
    .query(
      `INSERT INTO news (id, name, description, allowed_courses, image) VALUES (NULL, '${name}', '${description}', '${allowed_courses}', '${image}');`
    )
    .then(() => {
        connection().end();
      res.status(200).json({ success: "news created successfully",data:formData });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

const viewNews = async (req, res) => {
  const newsId = req.params.newsId;
  await connection()
    .promise()
    .query(`select * from products where id=${newsId}`)
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

const getAllNews = async (req, res) => {
  await connection()
    .promise()
    .query(`select * from news`)
    .then(([rows, fields]) => {
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

module.exports = { createNews, viewNews, getAllNews };
