// server.js
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "leave_management",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL database");
});

// Define API endpoint to fetch and log data from the database
app.get("/employees", (req, res) => {
  const sql = "SELECT * FROM employees"; // Example SQL query to select all employees
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching employees:", err);
      res.status(500).send("Error fetching employees");
      return;
    }
    console.log("Employees:");
    console.log(result); // Log the result to the console
    res.json(result); // Send the result as JSON response
  });
});

app.get("/leave-requests", (req, res) => {
  const sql = "SELECT * FROM leave_requests"; // Example SQL query to select all leave requests
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching leave requests:", err);
      res.status(500).send("Error fetching leave requests");
      return;
    }
    console.log("Leave Requests:");
    console.log(result); // Log the result to the console
    res.json(result); // Send the result as JSON response
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
