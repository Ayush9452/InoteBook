const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/InoteBook"

const connectToMongo =()=>{
    mongoose.connect(mongoURI).then(() => console.log("Database Connected Successfully")).catch((err) => console.log(err));
}

module.exports = connectToMongo; // important