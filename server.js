const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const apiRouter = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 8080;

// Serve Angular dist
app.use(express.static(path.join(__dirname, 'dist/ecom-proj2')));

// JSON Server API at /api
app.use('/api', middlewares, apiRouter);

// Fallback for Angular routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/ecom-proj2/browser/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});