import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123321555",
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