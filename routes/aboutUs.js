const express = require("express"),
  router = express.Router(),
  { db } = require("../db"),
  upload = require("../helpers/multer"),
  { v4: uuidv4 } = require("uuid");

// get all AboutUs
router.get("/getAllAboutUs", function (req, res) {
  let sql = `SELECT * FROM about_us`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "The about us fetched successfully",
    });
  });
});

// get one AboutUs
router.get("/getAboutUs/:id", function (req, res) {
  let sql = `SELECT * FROM about_us WHERE ID = '${req.params.id}'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "selected about us fetched successfully",
    });
  });
});

// create new AboutUs
router.post("/postAboutUs", upload.array("photo_uri"), function (req, res) {
  const fileName = req.files.map((file) => file.path);
  const uuid = uuidv4();
  const sql = `INSERT INTO about_us(ID, TITLE, SUBTITLE, DESCRIPTION, PHOTO_URI, STATUS) VALUES (?)`;
  const values = [
    uuid,
    req.body.title,
    req.body.subtitle,
    req.body.description,
    JSON.stringify(fileName),
    req.body.status,
  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New about us added successfully",
    });
  });
});

// delete AboutUs
router.delete("/deleteAboutUs/:id", function (req, res) {
  const sql = `DELETE FROM about_us WHERE ID = '${req.params.id}'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "About us deleted successfully",
    });
  });
});

// update AboutUs
router.put("/putAboutUs", upload.array("photo_uri"), function (req, res) {
  const photo_uri = JSON.stringify(req.files.map((file) => file.path));
  const { id, title, subtitle, description, status } = req.body;
  const sql = `UPDATE about_us SET ? WHERE ID = ?`;
  db.query(
    sql,
    [{ title, subtitle, description, photo_uri, status }, id],
    function (err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        message: "About us updated successfully",
      });
    }
  );
});

module.exports = router;


