const express= require("express");
const app = express();

const mongoose = require("mongoose");
const user = require("./modules/user");

mongoose.connect("mongodb://localhost:27017/ecom");


app.get("/",(req,res)=>{
    res.send("hello")
});
app.use((req, res, next) => {
    user.findById('601ee4b779838232d0b6ebe9')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });


const products = require("./routes/products");
const auth = require("./routes/auth");
const cart = require("./routes/cart");

app.use("/api",products);
app.use("/api",auth);
app.use("/api",cart);



app.listen(3001,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("app is running");
})