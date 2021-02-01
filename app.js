const express= require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ecom");


app.get("/",(req,res)=>{
    res.send("hello")
});


const products = require("./routes/products");
const auth = require("./routes/auth");

app.use("/api",products);
app.use("/api",auth);



app.listen(3001,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("app is running");
})