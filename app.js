if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router/router');
const path = require('path');
const engine = require('ejs-mate');
const expressError = require('./utils/expressErr');
const helmet = require('helmet');

async function main() {
  try {
   // mongoose.connect('mongodb://127.0.0.1:27017/construction');

<<<<<<< HEAD
    // mongoose.connect('mongodb://localhost:1.2.7/construction');
    // mongoose.connect(process.env.DATABASE_URL);
    
=======
     mongoose.connect('mongodb+srv://dipakgiree41:YfaP5jkqPacc4jgc@cluster0.9btvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
>>>>>>> 0591e9c1667a361d09d5d2a98c28acd91b279b4b
  } catch (err) {
    console.log(err);
  }
}


main().then(() => {
  console.log('database connected');
}).catch(err => console.log(err));

// use and set middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/public')));
app.engine('ejs', engine);
app.use(helmet());

const options = {
  // origin: 'https://shreebuilder.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  Credential: true
}

app.use(cors(options));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/', router);


app.all('/*', (req, res, next) => {
  next(new expressError(404, 'Page not found'));
});

app.use((err, req, res, next) => {
  let { status = 500, message = 'Something wrong with the server' } = err;
  res.status(status).json({
    status,
    message
  });

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
