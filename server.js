process.env.DEBUG = '';

const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

const app = express();
const apiRouter = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 8080;

// Serve Angular dist
app.use(express.static(path.join(__dirname, 'dist/ecom-proj2/browser')));

// JSON Server API at /api
app.use('/api', middlewares, apiRouter);

// Fallback for Angular routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/ecom-proj2/browser/index.html'));
});

app.post('/seller', express.json(), (req, res) => {
    const sellerData = req.body;
    // Save sellerData to db.json or perform logic
    res.status(201).json({ message: 'Seller registered', seller: sellerData });
});

app.use(cors({
    origin: 'https://angularecomme.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});