import pkg from 'pg';
const { Pool } = pkg;
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';

const app = express();

// Enable CORS for the frontend URL
app.use(cors({ origin: 'http://localhost:5173', methods: 'GET,POST', allowedHeaders: 'Content-Type' }));
app.use(express.json());

// Setup the PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'customerData',
  password: 'kash@123',
  port: 5433,
});

// Test database connection
pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Database connection error:', err.message));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Node JS');
});

// Login Route (Without JWT)
app.post('/api/customerlogin', async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const query = 'SELECT * FROM customerAccount WHERE userName = $1';
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
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Signup route for customers
app.post('/api/customersignup', async (req, res) => {
  const { firstName, lastName, userName, email, password, phoneNumber, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO customerAccount (firstName, lastName, userName, email, password, phoneNumber, address)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `;
    const values = [firstName, lastName, userName, email, hashedPassword, phoneNumber, address];
    const result = await pool.query(query, values);

    res.status(201).json({ message: 'Signup successful', user: result.rows[0] });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error during signup' });
  }
});

// Fetch User Profile (Without JWT)
app.get('/api/customerprofile/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const query = 'SELECT * FROM customerAccount WHERE id = $1';
    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Set up multer storage for storing uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // store images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with a timestamp to prevent name collisions
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Route for updating the user profile and uploading the profile image
app.put('/api/customerprofile/:id', upload.single('profileImage'), async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, phoneNumber, address } = req.body;
  let profileImagePath = null;

  // If an image was uploaded, get the file path
  if (req.file) {
    profileImagePath = `/uploads/${req.file.filename}`; // relative path to the image
  }

  try {
    let query = `
      UPDATE customerAccount 
      SET firstName = $1, lastName = $2, email = $3, phoneNumber = $4, address = $5
    `;
    const values = [firstName, lastName, email, phoneNumber, address];

    // If a profile image is provided, update it
    if (profileImagePath) {
      query += `, profileImage = $6`;
      values.push(profileImagePath);
    }

    query += ` WHERE id = $${values.length + 1} RETURNING *`;
    values.push(userId);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

