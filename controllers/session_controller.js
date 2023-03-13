const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../db");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/sessions", (req, res) => {
  console.log(req.session);
  // create session

  const {email, password} = req.body

  const sql = `SELECT * FROM users WHERE email = '${email}';`;

  db.query(sql, (err, dbRes) => {
    if (dbRes.rows.length === 0) {
      res.render("login");
      return;
    }

    const user = dbRes.rows[0];

    bcrypt.compare(password, user.password_digest, (err, result) => {
      if (result) {
        req.session.userId = user.id
        req.session.email = user.email
        res.redirect("/");
      } else {
        res.render("login");
      }
    });
  });
});

router.delete("/sessions", (req, res) => {
  req.session.destroy(() => {
  res.redirect("/");
  });
});

module.exports = router;