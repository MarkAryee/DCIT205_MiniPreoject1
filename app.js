var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const user = require('./modules/User');
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



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

//const button = document.getElementById('subBut');
var S_name;
var S_id;
app.get('/add-User', (req, res) => {
    
    
  
    res.sendFile(path.join(__dirname,'/html/index.html'))
  
     
  

  
});

app.post('/add-Post', (req, res) => {
  
    S_name = req.body.Name;
    S_id = req.body.ST_ID;

  const User = new user({
    name: S_name,
    id: S_id
  });

  User.save().then((result) => {
    res.send(result)
  }).catch((err) => {
    console.log(err);
  })
  
  //res.send(req.body);

});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
