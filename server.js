const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');


const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.set('view engine', 'hbs');
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFileSync('server.log', path.join(log, '\n'), (err) => {
    if (err) {
      console.log('Unable to appen to server.log');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintaince.hbs');
});

app.use(express.static(path.join(__dirname, '/public')));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'MessageError',
  });
});
app.listen(port, () => {
  console.log(`Server is up on Port ${port}`);
});
