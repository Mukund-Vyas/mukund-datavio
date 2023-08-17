const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    url :{
        type :String,
        required : [true,"URL Required"],        
    },
    title:{
        type:String,
        required:[true,"Title Required"],
    },
    price:{
        type:String,
        // required:[true,"price Required"],
    },
    description:{
        type : String
    },
    review_rating :{
        type : String,
        // required: true
    },
    rating :{
        type : String,
        required: true
    },
    media : {
        type : Number,
        required : false
    }
});

module.exports = mongoose.model('Data',dataSchema);