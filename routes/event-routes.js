const express = require("express");

const router = express.Router();
const Event = require("../models/Event");
const { check, validationResult } = require("express-validator/check"); // بتعمل تحقق عالفورم من الاخطاء
const moment = require("moment");
moment().format();// databaseللتعامل مع التواريخ عند استقبال التاريخ من الاستماره تقوم بالتعديل عليه بشكل يتناسب مع ال


//middlewere to check if user is loggged in

isAuthenticated = (req,res,next)=> {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}



router.get('/', (req,res)=> {   
    
        Event.find({}, (err,events)=> {
            //     res.json(events)
                 let chunk = []
                 let chunkSize = 3
                 for (let i =0 ; i < events.length ; i+=chunkSize) {
                     chunk.push(events.slice( i, chunkSize + i))
                 }
                 //res.json(chunk)
                  res.render('event/index', {
                      chunk : chunk,
                      message: req.flash('info')
                      
                  })
             })
    })





    


   



router.get("/create", isAuthenticated ,(req,res) =>{
    res.render("event/create",{
    
        errors: req.flash("errors")
    })
    })




router.post("/create",[
    check("title").isLength({min:1}).withMessage("title shoud not be empty"),
     check("decription"),
    // check("location").isLength({min:1}).withMessage("location shoud title shoud not be empty"),
    check("date").isLength({min:1}).withMessage("date shoud title shoud not be empty")
],(req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){

        // res.render("event/create",{
        //     errors: errors.array()
        // })
        req.flash("errors",errors.array())
        res.redirect("/events/create")

    }
    
    else{
        const newEvent = new Event({
            title: req.body.title,
             description: req.body.description,
        //    location: req.body.location,
           user_id: req.user.id,
             date: req.body.date,
            
            created_at: Date.now()
        })
        newEvent.save( (err)=> {
            if(!err) {
                console.log('event was added')
                req.flash("info","the event was added")
                res.redirect('/events')
            } else {
                console.log(err)
            } 
        })
      
        
    }

      

   
    });

   



router.get("/show/:id", (req,res) =>{

    Event.findOne({_id:req.params.id}, (err,event) => {

       if(!err){
           console.log(req.params.id);
        res.render("event/show",{
            event : event
        });
       }else{
           console.log(err);
       }
        
    })


   
});

router.get("/edit/:id",isAuthenticated, (req,res)=>{
    Event.findOne({_id:req.params.id},(err,event)=>{
        if(!err){
            res.render("event/edit",{
                event:event,
                eventDate:moment(event.date).format("YYYY-MM-DD"),
                errors:req.flash("errors"),
                message:req.flash("info")
            })
        }else{
            console.log(err);
        }
    })
})

router.post("/update",[
    check("title").isLength({min:1}).withMessage("title shoud not be empty"),
    check("description"),
    // check("location").isLength({min:1}).withMessage("location shoud not be empty"),
    check("date").isLength({min:1}).withMessage("date shoud not be empty"),

]
,isAuthenticated, (req,res)=>{
    const errors = validationResult(req)
    if( !errors.isEmpty()) {
       
        req.flash('errors',errors.array())
        res.redirect('/events/edit/' + req.body.id)
    } else {
       // crete obj
       let newfeilds = {
           title: req.body.title,
           description: req.body.description,
        //    location: req.body.location,
           date: req.body.date
       }
       let query = {_id: req.body.id}

       Event.updateOne(query, newfeilds, (err)=> {
           if(!err) {
               req.flash('info', " The event was updated successfuly"),
               res.redirect('/events/edit/' + req.body.id)
           } else {
               console.log(err)
           }
       })
    }
   
})

router.delete('/delete/:id', isAuthenticated,(req,res)=> {

    let query = {_id: req.params.id}

    Event.deleteOne(query, (err)=> {

        if(!err) {
            res.status(200).json('deleted')
        } else {
            res.status(404).json('There was an error .event was not deleted')
        }
    })
})




module.exports = router