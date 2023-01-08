const express = require("express"),
  router = express.Router(),
  { db } = require("../db"),
  upload = require("../helpers/multer"),
  { v4: uuidv4 } = require("uuid");

// get all products
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

// get one product
router.get("/getProduct/:id", function (req, res) {
  let sql = `SELECT * FROM products WHERE id = '${req.params.id}'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "selected product fetched successfully",
    });
  });
});

// get product by category id
router.get("/getProductByCategory/:id", function (req, res) {
  let sql = `SELECT * FROM products WHERE related_category = '${req.params.id}'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "selected product fetched successfully",
    });
  });
});

// create new product
router.post("/postProducts", upload.array("photo_uri"), function (req, res) {
  const fileName = req.files.map((file) => file.path);
  const uuid = uuidv4();
  const sql = `INSERT INTO products(id, related_category, related_category_name, style_name, style_number, sort_number, fabric_description, wash_details, photo_uri, status) VALUES (?)`;
  const values = [
    uuid,
    req.body.related_category,
    req.body.related_category_name,
    req.body.style_name,
    req.body.style_number,
    req.body.sort_number,
    req.body.fabric_description,
    req.body.wash_details,
    JSON.stringify(fileName),
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

// delete product
router.delete("/deleteProduct/:id", function (req, res) {
  const sql = `DELETE FROM products WHERE ID = '${req.params.id}'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "Products deleted successfully",
    });
  });
});

//update product
router.put("/putProduct", upload.array("photo_uri"), function (req, res) {
  const photo_uri = JSON.stringify(req.files.map((file) => file.path));
  const {
    id,
    related_category,
    related_category_name,
    style_name,
    style_number,
    sort_number,
    fabric_description,
    wash_details,
    status,
  } = req.body;
  const sql = `UPDATE products SET ? WHERE ID = ?`;
  db.query(
    sql,
    [
      {
        related_category,
        related_category_name,
        style_name,
        style_number,
        sort_number,
        fabric_description,
        wash_details,
        photo_uri,
        status,
      },
      id,
    ],
    function (err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        message: "Category updated successfully",
      });
    }
  );
});

module.exports = router;
