const express= require("express");
const app = express();
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const user = require("./modules/user");
const MONGODB_URI = "mongodb+srv://hamza:hamza@cluster0.k57by.mongodb.net/ecommerce?retryWrites=true&w=majority"
mongoose.connect(MONGODB_URI);

const store = new MongoDbStore({
  uri:MONGODB_URI,
  collection:'sessions'
});
app.get("/",(req,res)=>{
    res.send("hello")
});
app.use((req, res, next) => {
    // user.findById('61477989d8a34f35d426dc26')
    //   .then(user => {
    //     req.user = user;
    //     next();
    //   })
    //   .catch(err => console.log(err));
    // console.log(req.session.isLoggedIn)
    next();
  });
app.use(session({secret:"my secret",resave:false,saveUninitialized:false,store:store})) 

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