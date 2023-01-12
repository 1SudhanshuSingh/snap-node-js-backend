const express = require("express"),
  router = express.Router(),
  { db } = require("../db"),
  upload = require("../helpers/multer"),
  { v4: uuidv4 } = require("uuid");

// get all categories
router.get("/getCategories", function (req, res) {
  let sql = `SELECT * FROM categories`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "categories fetched successfully",
    });
  });
});

// get one category
router.get("/getCategory/:id", function (req, res) {
  let sql = `SELECT * FROM categories WHERE ID = '${req.params.id}'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "selected category fetched successfully",
    });
  });
});

// create new category
router.post("/postCategories", upload.array("photo_uri"), function (req, res) {
  const fileName = req.files.map((file) => file.path);
  const uuid = uuidv4();
  const sql = `INSERT INTO categories(ID, TYPE, NAME, PHOTO_URI, STATUS) VALUES (?)`;
  const values = [
    uuid,
    req.body.type,
    req.body.name,
    JSON.stringify(fileName),
    req.body.status,
  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New category added successfully",
    });
  });
});

// delete category
router.delete("/deleteCategory/:id", function (req, res) {
  const sql = `DELETE FROM categories WHERE ID = '${req.params.id}'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "Category deleted successfully",
    });
  });
});

// update category
router.put("/putCategories", upload.array("photo_uri"), function (req, res) {
  const photo_uri = JSON.stringify(req.files.map((file) => file.path));
  const { id, type, name, status } = req.body;
  const sql = `UPDATE categories SET ? WHERE ID = ?`;
  db.query(
    sql,
    [{ type, name, photo_uri, status }, id],
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


