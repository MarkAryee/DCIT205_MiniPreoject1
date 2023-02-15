var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const user = require('./modules/User');
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

var app = express();


const doURI = "mongodb+srv://markdb:rasengan@cluster0.ad3usrv.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(doURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => {
  //app.listen(3000);
}).catch((err) => {
  console.log('there is an error');
})
console.log('something is happening here');


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
    var S_name;
    var S_id;
    
  readline.question("Name:", Inpname => {
      S_name = Inpname;
      readline.close();
  })
  
  readline.question("ID:", InpID => {
      S_id = InpID;
      readline.close();
  })

  const User = new user({
    name: S_name,
    id: S_id
  });

  User.save().then((result) => {
    res.send(result)
  }).catch((err) => {
    console.log(err);
  })
})


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

