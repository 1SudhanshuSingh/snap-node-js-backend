const express = require("express"),
  router = express.Router(),
  { db } = require("../db"),
  upload = require("../helpers/multer"),
  { v4: uuidv4 } = require("uuid");

// get categories
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

// create new category
router.post("/postCategories", function (req, res) {
  const uuid = uuidv4();
  const sql = `INSERT INTO categories(ID, TYPE, NAME, PHOTO_URI, STATUS) VALUES (?)`;
  const values = [
    uuid,
    req.body.type,
    req.body.name,
    req.body.photo_uri,
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
router.delete("/deleteCategory", function(req, res) {
  const sql = `DELETE FROM categories WHERE id = (?)`;
  const values = [req.body.id];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "Category deleted successfully",
    });
  });
})

// update category
router.put("/putCategories", function (req, res) {
  const { uuid, ...updatedData } = req.body;
  const sql = `UPDATE categories SET ? WHERE ID = ?`;
  db.query(sql, [updatedData, uuid], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "Category updated successfully",
    });
  });
});

module.exports = router;
