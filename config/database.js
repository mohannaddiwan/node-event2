const mongoose = require("mongoose");
// const Note = require("../models/Event");

mongoose.connect("mongodb://localhost:27017/events",(err) =>{
    if(err){
        console.log(err);
    }else{
        console.log("db connected");
    }
})

// class Database {
//     constructor() {
//       this.Url = "mongodb://localhost:27017/events";
//     }

//     deleteNote(noteId) {
//         return new Promise((resolve, reject) => {
//           Note.findByIdAndDelete(noteId)
//             .then((data) => {
//               console.log("deleted document:", data);
//               resolve(data);
//             })
//             .catch((error) => {
//               reject(error);
//             });
//         });
//       }

// }
// module.exports = Database;