const express = require("express"),
  router = express.Router(),
  { db } = require("../db"),
  multer  = require('multer'),
  upload = multer({ dest: './uploads/products/' }),
  { v4: uuidv4 } = require("uuid");

// get products
router.get("/getHomePage", function (req, res) {
  let sql = `SELECT * FROM home_page`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "home page fetched successfully",
    });
  });
});

// create new product
router.post("/postHomeData", function (req, res) {
  const uuid = uuidv4();
  const sql = `INSERT INTO home_page(id, title, subtitle, description, photo_uri, section, status) VALUES (?)`;
  const values = [
    uuid,
    req.body.title,
    req.body.subtitle,
    req.body.description,
    req.body.photo_uri,
    req.body.section,
    req.body.status,
  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New entry to home page added successfully",
    });
  });
});

//update product
router.put("/putHomeData", function (req, res) {
  const { uuid, ...updatedData } = req.body;
  const sql = `UPDATE products SET ? WHERE ID = ?`;
  db.query(sql, [updatedData, uuid], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "product updated successfully",
    });
  });
});

module.exports = router;
