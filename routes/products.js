const express = require("express"),
  router = express.Router(),
  { db } = require("../db"),
  upload = require("../helpers/multer"),
  { v4: uuidv4 } = require("uuid");

// get products
router.get("/getProducts", function (req, res) {
  let sql = `SELECT * FROM products`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "products fetched successfully",
    });
  });
});

// create new product
router.post("/postProducts", function (req, res) {
  const uuid = uuidv4();
  const sql = `INSERT INTO products(id, related_category, style_name, style_number, sort_number, fabric_description, wash_details, photo_uri, status) VALUES (?)`;
  const values = [
    uuid,
    req.body.related_category,
    req.body.style_name,
    req.body.style_number,
    req.body.sort_number,
    req.body.fabric_description,
    req.body.wash_details,
    req.body.photo_uri,
    req.body.status,
  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New product added successfully",
    });
  });
});

//update product
router.put("/putProduct", function (req, res) {
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
