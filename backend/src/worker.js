// Importing required libraries
import express from 'express'; 
import cors from 'cors'; 
import pkg from 'pg'; 
import bcrypt from 'bcrypt';  // Import bcrypt for password hashing
const { Pool } = pkg; // Using Pool to handle multiple connections to the database

// Initialize Express app
const app = express(); 

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses incoming JSON requests

// Database connection setup
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'workerData', // Updated database name to workerData
    password: 'kash@123',
    port: 5433, // Make sure this is the correct port
});

// Connect to the PostgreSQL database
pool.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch(err => console.error("Failed to connect to PostgreSQL database:", err));

// Login Route (Without JWT)
app.post('/api/workerlogin', async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const query = 'SELECT * FROM workerAccount WHERE userName = $1';
    const result = await pool.query(query, [userName]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', userId: user.id, userName: user.userName });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Signup Route
app.post('/api/workersignup', async (req, res) => {
  const { firstName, lastName, userName, email, password, phoneNumber, address } = req.body;

  // Validation checks
  if (!firstName || !lastName || !userName || !email || !password || !phoneNumber || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const userCheckQuery = 'SELECT * FROM workerAccount WHERE userName = $1';
    const existingUser = await pool.query(userCheckQuery, [userName]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const insertQuery = `
      INSERT INTO workerAccount (firstName, lastName, userName, email, password, phoneNumber, address)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `;
    const values = [firstName, lastName, userName, email, hashedPassword, phoneNumber, address];
    const result = await pool.query(insertQuery, values);

    res.status(201).json({ message: 'Signup successful', user: result.rows[0] });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error during signup', error: error.message });
  }
});

// Starting the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});

// Export pool to be used in other files if needed
export default pool;
