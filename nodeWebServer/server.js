const express = require('express');
const hbs = require('hbs');
const fs  = require('fs')

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartial('myFooter', fs.readFileSync(__dirname + '/views/partials/footer.hbs', 'utf8'));
hbs.registerPartial('myHeader', fs.readFileSync(__dirname + '/views/partials/header.hbs', 'utf8'));
app.set('view engine', 'hbs');
app.use(express.static(__dirname+ '/views/'));
app.use((req, res, next) => {
  var now = new Date().toString();
  var log1 = now + req.method+ req.url;
  fs.appendFile('server.log', log1 + '\n', (err) =>{
    if(err){
      console.log('error');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintainence.hbs');
// });

hbs.registerHelper('currentYear', () => {
   return  new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
   return  text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    name : 'Hemanth',
    helloWorld : 'helloWorld'
  });
  });

app.get('/about', (req, res) => {
  //res.send('<h1>Hello Express</h1>');
  res.render('about.hbs', {
    pageTitle : 'About',
  })
});

app.listen(3000, ()=>{
  console.log('server at 3000');
});
