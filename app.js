var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const user = require('./modules/User');
const mongoose = require('mongoose')
//var htmlfile = require('./views/index.pug')
//const indexH = require('./css/indexH')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

/*
const uri = "mongodb+srv://markdb:<rasengan>@cluster0.ad3usrv.mongodb.net/?retryWrites=true&w=majority"

async function connect(){
  try{
    await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log("Connected")
  } catch (error) {
    console.error(error);
  }
}
connect();
*/

///*
const doURI = "mongodb+srv://markdb:rasengan@cluster0.ad3usrv.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(doURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => {
  //app.listen(3000);
}).catch((err) => {
  console.log('there is an error');
})
console.log('something is happening here');
//*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/indexH', indexH);



app.get('/add-User', (req, res) => {
  //var TextB1 = req.query.mytext;
 // var TextB2 = req.query.mytext2;

  //res.render('indexH.pug')

  const User = new user({
    name: 'TextB1',
    id: 'TextB2'
  });

  User.save().then((result) => {
    res.send(result)
  }).catch((err) => {
    console.log(err);
  })
})
/*
app.get('/', function(req, res, next){
  res.send(
          <form action="/add-User" method="GET">
              <input type="text" name="mytext" required />
              <input type="id" name="mytext2" required />
              <input type="submit" value="Submit" />
          </form>
  );
})
*/

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

module.exports = app;

