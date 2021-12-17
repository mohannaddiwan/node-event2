const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const passport = require('passport');
const User = require("../models/User");
const multer = require("multer");// يستخدم لرفع الصور

//configure multer

let storage = multer.diskStorage({
    destination: (req,file, cb)=>{
        cb(null,"uploads/imgs")
    },
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + ".png") 
        // cb(null, file.filename + '-' + Date.now() + ".png") 
    }
})

var upload = multer({ storage: storage })


//middlewere to check if user is loggged in

isAuthenticated = (req,res,next)=> {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}


// login user view 

router.get("/login", (req,res) =>{
    res.render("user/login")
})

// loging post request

router.post("/login", passport.authenticate('local.login', {
    successRedirect: '/users/profile',
      failureRedirect: '/users/login',
      failureFlash: true }))

//sign up yo form
router.get("/signup", (req,res) =>{
    res.render("user/signup", {
        error: req.flash("error")
    })
})


// sign up post request

router.post("/signup", 
passport.authenticate('local.signup', {
    successRedirect: '/users/profile',
      failureRedirect: '/users/signup',
      failureFlash: true })
)


// profile 

router.get("/profile" , isAuthenticated, (req,res) =>{
    res.render("user/profile" , {
        success: req.flash("success")
    })

})

//upload user avatar 

router.post('/uploadAvatar', upload.single("avatar"), (req,res)=> {
// console.log(req.file);

let newFields = {
    avatar: req.file.filename
}
    User.updateOne({_id:req.user._id}, newFields, (err)=>{
        if(!err){
            res.redirect("/users/profile")
        }
    })
    // let nameOFfile = req.file.filename = req.user.email
    // req.file.fieldname = nameOFfile
    // console.log(req.file)
    
})

// log out

router.get("/logout" , (req,res) =>{
    req.logout();
    res.redirect("/users/login");

})


module.exports = router