const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ===== MySQL Connection =====
const db = mysql.createConnection({
  host: "localhost",
  user: "root",                 // ✅ correct user
  password: "nbpgb9986",        // 🔴 your MySQL password (change if needed)
  database: "portfolioDB"
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err);
    return;
  }
  console.log("✅ MySQL Connected");

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});

// ===== Routes =====

// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===== Save Contact Form =====
app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validation
  if (!name || !email || !phone || !message) {
    return res.status(500).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, phone, message], (err, result) => {
    if (err) {
      console.error("❌ Insert Error:", err);
      return res.status(500).json({ message: "Database Error" });
    }

    res.status(500).json({ message: "✅ Message saved successfully!" });
  });
});

// ===== Get All Messages =====
app.get("/messages", (req, res) => {
  const sql = "SELECT * FROM contacts";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Fetch Error:", err);
      return res.status(500).json({ message: "Error fetching messages" });
    }

    res.json(results);
  });
});