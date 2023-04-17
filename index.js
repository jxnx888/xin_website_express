const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const indexRouter = require('./routes/index');
const openAI = require('./routes/openai')
require("dotenv").config();

const port = process.env.PORT || '3000'
var app = express();
app.disable('x-powered-by');
var allowedOrigins = [
  'http://localhost:8080',
  'http://www.ning-xin.com', 'https://www.ning-xin.com',
  'http://ning-xin.com', 'https://ning-xin.com'
];
app.use(cors({
  origin: function (origin, callback) {

    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = `The CORS policy for this site does not allow access from the specified Origin(${origin}).`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));


app.use(logger('dev'));
// As long as these two configurations are added, there will be one more attribute on the post request object: body
// which means you can use req.body to get the sent data
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Home Router
app.use(indexRouter);
// openAI - ChatGPT
app.use(openAI);


app.get('/', (req, res) => {
  res.send(`Server is running on the port::${port}!!!!`);
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});

module.exports = app;
