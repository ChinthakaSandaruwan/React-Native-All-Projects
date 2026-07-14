import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12691221029KNK2oo23o3o1715",
  database: "chat-app",
});

db.connect((err) => {

  if (!err) {
    console.log("Connected to Database");
  } else {
    console.error(err.message);
  }

});


export default db;