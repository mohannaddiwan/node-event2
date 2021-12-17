const db = require("../config/database");
const Event = require("../models/Event");


const newEvent = [
    new Event({

    title:"this is event1",
    description :"description",
    location:"bursa",
    date:Date.now(),
    created_at:Date.now()
}),
new Event({

    title:"this is event2",
    description :"description",
    location:"edrne",
    date:Date.now(),
    created_at:Date.now()
}),
new Event({

    title:"this is event3",
    description :"description",
    location:"bolu",
    date:Date.now(),
    created_at:Date.now()
}),
new Event({

    title:"this is event4",
    description :"description",
    location:"halep",
    date:Date.now(),
    created_at:Date.now()
}),
new Event({

    title:"this is event5",
    description :"description",
    location:"izmer",
    date:Date.now(),
    created_at:Date.now()
}),
new Event({

    title:"this is event6",
    description :"description",
    location:"karabuk",
    date:Date.now(),
    created_at:Date.now()
})

 
]

newEvent.forEach(event=>{
    event.save(err => {
        if(err){
            console.log(`error${err}`);
        }else{
            console.log("looping")
        }
    })
})

