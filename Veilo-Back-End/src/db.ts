import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SUMBN2003cs#10020",
  database: "veilo",
});

db.connect((err) => {

  if (!err) {
    console.log("Connected to Database");
  } else {
    console.error(err.message);
  }

});


export default db;