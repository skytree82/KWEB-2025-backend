const express = require('express');
const app = express();
const port = 3000;

app.get('/factorial', (req, res) => {
    const number = req.query.number;
    return res.redirect(`/factorial/${number}`);
});

app.get('/factorial/:number', (req, res) => {
    const number = req.params.number;
    let factorial = 1;
    for (let i = 1; i <= number; i++) factorial *= i;
    return res.send(`${factorial}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})