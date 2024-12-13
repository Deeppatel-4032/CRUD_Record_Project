const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true
    },
    img_Path : {
        type : String
    },
    status : {
        type : Boolean,
        default : true
    },
    createDate : {
        type : String,
        default : Date.now
    }
}, {timestamps : true});

const  records_model = mongoose.model("records", recordSchema);

module.exports = records_model;