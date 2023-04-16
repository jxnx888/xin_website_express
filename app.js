const express = require('express')
const createError = require('http-errors');
const path = require('path')
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const {generateText, translateText }=require('./routes/openai')
const {normalizePort} = require('./utils')
const indexRouter = require('./routes/index');
const app = express()

var port = normalizePort(process.env.PORT || '3000');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.disable('x-powered-by');
var allowedOrigins = [
  'http://www.ning-xin.com','https://www.ning-xin.com',
  'http://ning-xin.com','https://ning-xin.com'
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
// As long as these two configurations are added, there will be one more attribute on the post request object: body
// which means you can use req.body to get the sent data
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/openai/chat/conversition', async (req, res) => {
  const input = req.body.input
  console.log('input',input)
  const model = [
    "davinci",
    "text-davinci-002",
    "text-moderation-playground",
  ]
  const data = await generateText(input,model[0]);
  if(data){
    res.status(200).json(data)
  } else{
    res.status(403).json(data)
  }
})
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app;
