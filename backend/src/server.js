import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg'; // Import the pg module as a default export
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for JWT handling

const { Pool } = pg; // Access the Pool class from the pg module

const app = express(); // Initialize the app variable here

app.use(express.json()); // Use express.json() instead of bodyParser.json()
app.use(cors()); // Allow all origins
app.use(bodyParser.json()); 

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'customerData',
    password: 'kash@123',
    port: 5433,
});

// Secret key for JWT
const SECRET_KEY = '$Kashmira@444$'; // Replace with a secure key (use environment variables in production)

// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!'); // Simple response for the root URL
});

// Signup route
app.post('/api/signup', async (req, res) => {
    const { firstName, lastName, userName, password, phoneNumber, address, email } = req.body;

    // Check for required fields
    if (!firstName || !lastName || !userName || !password || !phoneNumber) {
        return res.status(400).json({ message: 'First name, last name, username, password, and phone number are required.' });
    }

    try {
        const query = `
            INSERT INTO customerAccount (firstName, lastName, userName, phoneNumber, password, address, email)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [firstName, lastName, userName, phoneNumber, password, address, email || null]; // Use null if email is not provided
        await pool.query(query, values);
        res.status(201).json({ message: 'Signup successful!' });
    } catch (error) {
        console.error('Error inserting data:', error.message);
        res.status(500).json({ message: 'Database error.' });
    }
});

// Login route
// In your backend login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const query = `
            SELECT * FROM customerAccount WHERE username = $1 AND password = $2
        `;
        const values = [username, password];
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            // Generate JWT
            const token = jwt.sign(
                { id: user.id, username: user.username },
                SECRET_KEY,
                { expiresIn: '1h' }
            );

            // Return the token and a success message
            res.status(200).json({ message: 'Login successful!', token });
        } else {
            res.status(401).json({ message: 'Invalid username or password.' });
        }
    } catch (error) {
        console.error('Error checking login:', error.message);
        res.status(500).json({ message: 'Database error.' });
    }
});


// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token required.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach decoded data to request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

// Protected route example
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: `Hello, ${req.user.username}! You accessed a protected route.` });
});

app.get('/api/profile/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const query = `
            SELECT username FROM customerAccount WHERE username = $1
        `;
        const values = [username];
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            return res.json({ username: user.username }); // Return only the username
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

  const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


  