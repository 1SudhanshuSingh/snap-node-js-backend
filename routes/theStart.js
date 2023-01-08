const express = require("express"),
  router = express.Router(),
  { db } = require("../db"),
  upload = require("../helpers/multer"),
  { v4: uuidv4 } = require("uuid");

// get all the Start
router.get("/getTheStart", function (req, res) {
  let sql = `SELECT * FROM the_start`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "the start fetched successfully",
    });
  });
});

// get one the Start
router.get("/getTheStart/:id", function (req, res) {
  let sql = `SELECT * FROM the_start WHERE ID = '${req.params.id}'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "the start fetched successfully",
    });
  });
});

// create new the Start
router.post("/postTheStart", upload.array("photo_uri"), function (req, res) {
  const fileName = req.files.map((file) => file.path);
  const uuid = uuidv4();
  const sql = `INSERT INTO the_start(id, title, description, photo_uri, status) VALUES (?)`;
  const values = [
    uuid,
    req.body.title,
    req.body.description,
    JSON.stringify(fileName),
    req.body.status,
  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New the start added successfully",
    });
  });
});

// delete the Start
router.delete("/deleteTheStart/:id", function (req, res) {
  const sql = `DELETE FROM the_start WHERE ID = '${req.params.id}'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New the start deleted successfully",
    });
  });
});

// update the Start
router.put("/putTheStart", upload.array("photo_uri"), function (req, res) {
  console.log(req.body);
  const photo_uri = JSON.stringify(req.files.map((file) => file.path));
  const { id, title, description, status } = req.body;
  const sql = `UPDATE the_start SET ? WHERE ID = ?`;
  db.query(
    sql,
    [{ title, description, photo_uri, status }, id],
    function (err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        message: "the start updated successfully",
      });
    }
  );
});

module.exports = router;
