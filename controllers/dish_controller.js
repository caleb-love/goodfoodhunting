const express = require("express");

const router = express.Router();

const ensureLoggedIn = require('./../middlewares/ensure_logged_in');
const db = require("../db");

router.get("/", (req, res) => {
  console.log(req.session);
  const sql = "SELECT * FROM dishes;";

  db.query(sql, (err, dbRes) => {
    const dishes = dbRes.rows;
    res.render("home", {
      dishes: dishes,
      email: req.session.email,
    });
  });
});

router.get("/dishes/new", (req, res) => {
 res.render('new_dish')
});

router.get("/dishes/:id", ensureLoggedIn, (req, res) => {
  const sql = `select * from dishes where id = $1;`;
  console.log(sql);

  db.query(sql, [req.params.id], (err, dbRes) => {
    if (err) {
      console.log(err);
    } else {
      const dish = dbRes.rows[0];
      res.render("dish_details", { dish });
    }
  });
});

router.post("/dishes", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/login");
    return;
  }
  // console.log(req)

  // put it in our database
  // prepare the message we're sending to the db
  const sql = `insert into dishes (title, image_url) values ($1, $2);`;

  db.query(sql, [req.body.title, req.body.image_url], (err, dbRes) => {
    res.redirect("/");
  });
});

router.get("/dishes/:dish_id/edit", (req, res) => {
  const sql = `select * from dishes where id = ${req.params.dish_id};`;

  db.query(sql, (err, dbRes) => {
    if (err) {
      console.log(err);
    } else {
      const dish = dbRes.rows[0];

      res.render("edit_dish", { dish: dish });
    }
  });
});

router.put("/dishes/:dish_id", (req, res) => {
  let sql = `update dishes set title = '${req.body.title}', image_url = '${req.body.image_url} where id = ${req.params.dish_id};`;

  db.query(sql, (err, dbRes) => {
    res.redirect(`/dishes/${req.params.dish_id}`);
  });
});

router.delete("/dishes/:dish_id", (req, res) => {
  // console.log(req.query.dish_id);
  // delete sql query
  // delete from dishes where id = req.params.id
  // res.send('hi')
  const sql = `delete from dishes where id = ${req.body.dish_id};`;

  db.query(sql, (err, dbRes) => {
    res.redirect("/");
  });
});

module.exports = router;
