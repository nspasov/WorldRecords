if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const connectDb = require('./db-connect');
const path = require('path');
const methodOverrride = require('method-override');
const ejsMate = require('ejs-mate');
const log = require('npmlog');
const flash = require('connect-flash');
const session = require('express-session');
const catchAsync = require('./utils/CatchAsync');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/UserModel');
const Role = require('./models/RoleModel');
const userRoutes = require('./routes/UserRoutes');

connectDb(process.env.MONGO_PORT);

app.engine('ejs', ejsMate );
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverrride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.currentUser = req.user; 
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


app.use('/', userRoutes);


app.get('/', async (req,res) => {
    res.render('home', {req});
});


app.all('*', (req,res,next) => {
    next(new ExpressError('Not foundssss', 404))
});

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Something went wrong, bro!';
    res.status(statusCode).render('error', {err});
});


app.listen(process.env.SERVER_PORT, () => {
    log.info('running', `Listening to records on port ${process.env.SERVER_PORT}`);
});