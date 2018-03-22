const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
app.set('view engine', 'hbs');
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n');

    next();
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        h1: 'Home page',
        welcomeMessage: 'Hi there!'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        h1: 'About page!!!'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'an error occurred'
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})