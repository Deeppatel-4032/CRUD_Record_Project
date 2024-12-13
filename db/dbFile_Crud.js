const mongoose = require("mongoose");

const db = mongoose.connect(process.env.MONGODB_URL)
.then((res) => {
    console.log("db is connectd........!!");
    
}).catch((err) => {
    console.log("db is not connectd........!!");
})

module.exports = db;