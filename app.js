const express= require("express");
const app = express();
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const user = require("./modules/user");
const multer = require("multer");
var cors = require('cors')
const MONGODB_URI = "mongodb+srv://hamza:hamza@cluster0.k57by.mongodb.net/ecommerce?retryWrites=true&w=majority"
mongoose.connect(MONGODB_URI);
const store = new MongoDbStore({
  uri:MONGODB_URI,
  collection:'sessions'
});

app.use(session({secret:"my secret",resave:false,saveUninitialized:false,store:store})) 
//

require('dotenv').config()
app.use(cors());

app.get("/",(req,res)=>{
    res.send("helloffff")
    
});



const products = require("./routes/products");
const auth = require("./routes/auth");
const cart = require("./routes/cart");

app.use("/api",products);
app.use("/api",auth);
app.use("/api",cart);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(3001,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("app is running");
})