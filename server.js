const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: false }));

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/style.css'));
});


app.use('/user/', (req, res,) => {
    res.render('forbidden');
});

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');  
});


app.post('/contact/send-message', upload.single('picture'), (req, res) => {

  const { author, sender, title, message } = req.body;
  const picture = req.file.originalname;



  if(author && sender && title && message && picture) {
    res.render('contact', { isSent: true, picture });
  }
  else {
    res.render('contact', { isError: true });
  }

});

app.get('/hello/:name', (req, res) => {
  res.render('hello', {name: req.params.name });
});

app.use((req, res) => {
  res.status(404).render('404');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});