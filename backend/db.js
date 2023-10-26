const mongoose=require("mongoose");
const mongoURI="mongodb://0.0.0.0:27017/notebook"

const connectToMongo=()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("connected to mongo successfully");
    })
}

module.exports=connectToMongo;