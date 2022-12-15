const express = require("express"),
  router = express.Router(),
  { db } = require("../db"),
  multer  = require('multer'),
  upload = multer({ dest: '../uploads/categories/' }),
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
  const sql = `INSERT INTO products(ID, RELATED_CATEGORY, STYLE_NAME, STYLE_NUMBER, SORT_NUMBER, FABRIC_DESC, WASH_DETAILS, PHOTO_URI, STATUS) VALUES (?)`;
  const values = [
    uuid,
    req.body.related_category,
    req.body.style_name,
    req.body.style_number,
    req.body.sort_number,
    req.body.fabric_desc,
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
