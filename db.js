const mysql = require("mysql");
// setup database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "snap_admin",
});

module.exports = {
  db,
};
