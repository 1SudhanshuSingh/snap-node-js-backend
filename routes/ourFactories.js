const express = require("express"),
  router = express.Router(),
  { db } = require("../db"),
  upload = require("../helpers/multer"),
  { v4: uuidv4 } = require("uuid");

// get all OurFactorie
router.get("/getOurFactories", function (req, res) {
  let sql = `SELECT * FROM our_factories`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "The our factories fetched successfully",
    });
  });
});

// get one OurFactorie
router.get("/getOurFactorie/:id", function (req, res) {
  let sql = `SELECT * FROM our_factories WHERE ID = '${req.params.id}'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "selected our factorie fetched successfully",
    });
  });
});

// create new OurFactorie
router.post("/postOurFactories", upload.array("photo_uri"), function (req, res) {
  const fileName = req.files.map((file) => file.path);
  const uuid = uuidv4();
  const sql = `INSERT INTO our_factories(ID, TITLE, SUBTITLE, DESCRIPTION, PHOTO_URI, STATUS) VALUES (?)`;
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
      message: "New our factorie added successfully",
    });
  });
});

// delete OurFactorie
router.delete("/deleteOurFactorie/:id", function (req, res) {
  const sql = `DELETE FROM our_factories WHERE ID = '${req.params.id}'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "our_factorie deleted successfully",
    });
  });
});

// update OurFactorie
router.put("/putOurFactories", upload.array("photo_uri"), function (req, res) {
  const photo_uri = JSON.stringify(req.files.map((file) => file.path));
  const { id, title, subtitle, description, status } = req.body;
  const sql = `UPDATE our_factories SET ? WHERE ID = ?`;
  db.query(
    sql,
    [{ title, subtitle, description, photo_uri, status }, id],
    function (err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        message: "our_factorie updated successfully",
      });
    }
  );
});

module.exports = router;


