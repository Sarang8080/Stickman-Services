var express               = require("express"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/users"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")
    var app = express();
    const config = require("./config/key");
    const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
    
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(require("express-session")({
        secret: "This  is secret",
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
app.use(express.static(__dirname + "/public"));
    var User = require("./models/users");
    var indexRoutes = require("./routes/index");
    app.use(indexRoutes);

    app.set('port',(process.env.PORT || 5000));

    app.listen(app.get('port'),function(){
        console.log("Server has started");
    })