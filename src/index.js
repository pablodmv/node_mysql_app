const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mySQLStore = require('express-mysql-session')
const { database } = require('./keys');
const passport = require('passport');

//initializaciones
const app = express();
require('./lib/passport');



//settings
app.set('port', process.env.PORT || '4000');
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'),'partials' ),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}));
app.set('view engine', '.hbs');


//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: 'mysqlsessionapp',
    resave: false,
    saveUninitialized: false,
    store:  new mySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



//Global variables
app.use((req,res,next)=>{
    app.locals.success =  req.flash('success');
    app.locals.message = req.flash('message');

    next();
});


//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));




//Public

app.use(express.static(path.join(__dirname, 'public')));

//Error handlers
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});
  
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

//Starting server
app.listen(app.get('port'), ()=>{
    console.log('server on port ', app.get('port'));
    
});


