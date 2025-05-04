const express = require('express');
const app = express();
const port = 3000;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.get('/', (req, res) => res.render('index.pug'));

app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    username = req.body.username;
    password = req.body.password;
    return res.send(`Username: ${username}, Password: ${password}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})