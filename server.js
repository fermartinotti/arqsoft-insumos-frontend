const express = require('express');

const app = express();

app.use(express.static('./dist/arqsoft-insumos-frontend'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/arqsoft-insumos-frontend/'}),
);

app.listen(process.env.PORT || 8080);