import mysql from "mysql2";



const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123321555",
    database:"react_native_fetch"

});


db.connect((error)=>{

    console.log(error?.message);


})