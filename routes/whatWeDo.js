const express = require("express"),
  router = express.Router(),
  { db } = require("../db"),
  upload = require("../helpers/multer"),
  { v4: uuidv4 } = require("uuid");

// get all WhatWeDo
router.get("/getWhatWeDos", function (req, res) {
  let sql = `SELECT * FROM what_we_do`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "The what we do fetched successfully",
    });
  });
});

// get one WhatWeDo
router.get("/getWhatWeDo/:id", function (req, res) {
  let sql = `SELECT * FROM what_we_do WHERE ID = '${req.params.id}'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "selected what we do fetched successfully",
    });
  });
});

// create new WhatWeDo
router.post("/postWhatWeDos", upload.array("photo_uri"), function (req, res) {
  const fileName = req.files.map((file) => file.path);
  const uuid = uuidv4();
  const sql = `INSERT INTO what_we_do(ID, TITLE, SUBTITLE, DESCRIPTION, PHOTO_URI, STATUS) VALUES (?)`;
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
      message: "New what we do added successfully",
    });
  });
});

// delete WhatWeDo
router.delete("/deleteWhatWeDo/:id", function (req, res) {
  const sql = `DELETE FROM what_we_do WHERE ID = '${req.params.id}'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "What we do deleted successfully",
    });
  });
});

// update WhatWeDo
router.put("/putWhatWeDos", upload.array("photo_uri"), function (req, res) {
  const photo_uri = JSON.stringify(req.files.map((file) => file.path));
  const { id, title, subtitle, description, status } = req.body;
  const sql = `UPDATE what_we_do SET ? WHERE ID = ?`;
  db.query(
    sql,
    [{ title, subtitle, description, photo_uri, status }, id],
    function (err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        message: "What we do updated successfully",
      });
    }
  );
});

module.exports = router;


