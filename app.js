const express = require("express");
const database = require("./config/database");
const bodyParser = require('body-parser') // form يستخدم لاخذ البيانات من ال
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");





const app = express();

app.set("view engine", "ejs");

// bring bodyParser 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//bring ejs template (static)

app.use(express.static("node_modules"));
app.use(express.static("uploads"));
app.use(express.static("public"));

//session and flash config

app.use(session({
    secret:"diwan",
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:60000 * 15}
}));

app.use(flash());

app.get("/", (req,res) => {
    res.redirect("/events");
});

//bring passport

app.use(passport.initialize())
app.use(passport.session())

app.get("*",(req,res,next)=>{
    res.locals.user = req.user || null // user للتاكد من وجود 
    next()
})

// bring events routes
const event = require("./routes/event-routes");
app.use("/events", event)
// bring users routes
const users = require("./routes/user-routes");
app.use("/users", users)


/
//listen to port 3000
app.listen(3000, ()=> {
    console.log("app is working");
})

