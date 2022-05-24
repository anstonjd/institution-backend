const mysql = require("mysql2");

module.exports =()=>{
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "institute",
      });
} 
  