const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Allow your frontend origin
}));
app.use(bodyParser.json());

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Replace with your MySQL username
  password: 'manoj@2002', // Replace with your MySQL password
  database: 'motor' // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Signup route
app.post('/signup', (req, res) => {
  const { name, phone, email, vehicleID } = req.body;
  const sql = 'INSERT INTO customer (Name, Phone_no, Email, VehicleID) VALUES (?, ?, ?, ?)';
  
  db.query(sql, [name, phone, email, vehicleID], (err) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Error inserting data' });
    }
    res.status(201).json({ message: 'User signed up successfully!' });
  });
});

// Add Supplier route
app.post('/add-supplier', (req, res) => {
  const { name, phone, email } = req.body;
  const sql = 'INSERT INTO supplier (Name, Phone_no, Email) VALUES (?, ?, ?)';
  
  db.query(sql, [name, phone, email], (err) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Error inserting data' });
    }
    res.status(201).json({ message: 'Supplier added successfully!' });
  });
});

// Get Customer Orders
app.post('/get-customer-orders', (req, res) => {
  const { salespersonId } = req.body;

  const sql = `SELECT o.order_id, o.customer_id, c.Name, c.Phone_no, c.Email, o.order_date, o.quantity 
               FROM orders AS o 
               JOIN customer AS c ON o.customer_id = c.customer_id 
               WHERE o.salesperson_id = ?`;

  db.query(sql, [salespersonId], (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ message: 'Error fetching orders' });
    }
    res.json(results);
  });
});

// Add Salesperson route
app.post('/add-salesperson', (req, res) => {
  const { name, phone, email } = req.body;
  const sql = 'INSERT INTO salesperson (Name, Phone_no, Email) VALUES (?, ?, ?)';
  
  db.query(sql, [name, phone, email], (err) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Error inserting data' });
    }
    res.status(201).json({ message: 'Salesperson added successfully!' });
  });
});

// Purchase Vehicle (update quantity in Vehicle table)
app.post('/purchase-vehicle', (req, res) => {
  const { VehicleID, purchaseQuantity } = req.body;

  const checkQuery = `SELECT Quantity FROM Vehicle WHERE VehicleID = ?`;
  db.query(checkQuery, [VehicleID], (err, results) => {
    if (err) {
      console.error('Error checking quantity:', err);
      return res.status(500).json({ message: 'Error checking vehicle quantity' });
    }

    const availableQuantity = results[0]?.Quantity;
    if (purchaseQuantity > availableQuantity) {
      return res.status(400).json({ message: 'Insufficient quantity in stock' });
    }

    const updateQuery = `UPDATE Vehicle SET Quantity = Quantity - ? WHERE VehicleID = ?`;
    db.query(updateQuery, [purchaseQuantity, VehicleID], (err) => {
      if (err) {
        console.error('Error updating quantity:', err);
        return res.status(500).json({ message: 'Error updating quantity' });
      }
      res.status(200).json({ message: 'Purchase successful, inventory updated' });
    });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, email, userType } = req.body;

  const validUserTypes = ['admin', 'salesperson', 'customer', 'supplier'];
  if (!validUserTypes.includes(userType)) {
    return res.status(400).json({ message: 'Invalid user type' });
  }

  let tableName;
  switch (userType) {
    case 'admin':
      tableName = 'admin';
      break;
    case 'salesperson':
      tableName = 'salesperson';
      break;
    case 'customer':
      tableName = 'customer';
      break;
    case 'supplier':
      tableName = 'supplier';
      break;
    default:
      return res.status(400).json({ message: 'Invalid user type' });
  }

  const sql = `SELECT * FROM ${tableName} WHERE Name = ? AND Email = ?`;
  db.query(sql, [username, email], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful', user: results[0] });
    } else {
      res.status(401).json({ message: 'Invalid username or email' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});