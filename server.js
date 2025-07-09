process.env.DEBUG = '';

const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

const app = express();
const apiRouter = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:4200', 'https://angularecomme.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Serve Angular dist
app.use(express.static(path.join(__dirname, 'dist/ecom-proj2/browser')));

// JSON Server API at /api
app.use('/api', middlewares, apiRouter);

app.post('/seller', express.json(), (req, res) => {
    const sellerData = req.body;
    // Save sellerData to db.json or perform logic
    res.status(201).json({ message: 'Seller registered', seller: sellerData });
});

// ✅ This must exist
app.post('/users', (req, res) => {
    const user = req.body;
    console.log('Received user:', user);
    res.status(201).json({ message: 'User created', user });
});

// Fallback route to avoid 404s on other paths
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Fallback for Angular routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/ecom-proj2/browser/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});