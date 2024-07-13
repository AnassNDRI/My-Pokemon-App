const express = require('express');
const path = require('path');
const app = express();

// Serve the static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/ng-pokemon-app')));

// Redirect all routes to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/ng-pokemon-app/index.html'));
});

// Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
