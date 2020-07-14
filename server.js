const express = require('express');

const app = express();

app.use(express.static('./dist/arq1-front'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/arq1-front/'}),
);

app.listen(process.env.PORT || 8080);