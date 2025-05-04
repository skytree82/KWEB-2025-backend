const express = require('express');
const app = express();
const port = 3000;

app.get('/board/page/:page', (req, res) => {
const pageNumber = req.params.page;
res.send(`This is page #${pageNumber}`);
})

app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
})