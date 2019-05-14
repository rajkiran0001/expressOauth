const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
var bodyParser = require("body-parser");
var localStrategy = require("passport-local");
var User = require("./models/user");
var passportLocalMongoose   = require("passport-local-mongoose");

const app = express();
 app.use('/files', express.static(__dirname + '/public'));
 

// set view engine
app.set('view engine', 'ejs');

//set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(require("express-session")({
    secret: "nafiul is a Developer",
    resave: false,
    saveUninitialized: false
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home', {user: req.user});
});

//handing User Singup
app.post('/register', function(req, res){
    User.register(new User({username:req.body.username}), req.body.password, function(err, user){
        if(err){
            console.lop("err");
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/profile");
        })
    })
})

//Show Signup form
app.get("/register", function(req, res){
    res.render("register");
})

app.get("/login", function(req, res){
     res.render("login");
})

app.get("/profile", isLoggedIn, function(req, res){
   res.render("profile"); 
});

app.post("/login", passport.authenticate("local", {
    successRedirect:"/profile",
    failureRedirect :"/login"
}) ,function(req, res){
    
})

// Login check
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
