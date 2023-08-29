import 'dotenv/config';
import mysql from "mysql";

let pool = mysql.createPool({
  connectionLimit: 10000,
  //port:process.env.DB_PORT,
  host:process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connexion à la DB
pool.getConnection((err, connection) => {
	console.log("Connected to the database");
	if (err) throw err;
});

export default pool;
