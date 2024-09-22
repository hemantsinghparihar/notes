const mongoose=require("mongoose");

const notesSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    files: [
        { type: String }
    ] ,
    isPinned: {
         type: Boolean,
         default: false
    }
})

const Notes=mongoose.model("Notes",notesSchema);
module.exports=Notes;