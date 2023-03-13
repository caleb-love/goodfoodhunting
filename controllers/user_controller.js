const express = require("express");
const router = express.Router();

const db = require("./../db");

router.get("/accounts/signup", (req, res) => {
  res.render("sign_up");
});

router.get("/:userID", (req, res) => {
    res.render("/");
  });

router.post("/accounts/signup", (req, res) => {
  const sql = `insert into users (full_name, username, email, password) values ($1, $2, $3, $4);`;

  db.query(
    sql,
    [req.body.full_name, req.body.username, req.body.email, req.body.password],
    (err, dbRes) => {
      res.redirect("/");
    }
  );
});

module.exports = router;

/*
router.get('/users') // list of users
router.post('/users') // create a user
router.delete('/users/:id') // delete a user
router.put('/users/:id') // update a single user
router.get('/users/new') // create a new user form
router.get('/users/:id/edit') // get existing user form
router.get('/users/:id') // get a single user
*/

