const { Client } = require("pg");
const bcrypt = require("bcrypt");
const db = new Client ({
  database: "goodfoodhunting",
});

db.connect();

const email = "ertgertg@gmail.com";
const PlainTextPassword = "123456";

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(PlainTextPassword, salt, (err, digestedPassword) => {
    //digestedPassword is the hashed password
    console.log(digestedPassword);

    const sql =
      `INSERT INTO users (email, password_digest) VALUES ('${email}', '${digestedPassword}');`

    db.query(sql, (err, dbRes) => {
      console.log(err);
      db.end();
    });
  }); 
});
