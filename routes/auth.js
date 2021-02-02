
  
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
const admin = require("../modules/admin");
const joi = require("joi");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


const schema = joi.object({
    username:joi.string().min(6).required(),
    password: joi.string().min(6).required()
})





// //LOGIN
// router.post("/login", (req, res) => {
//   let data = req.body;
// //   let sql = `select * from user where username = '${data.username}' and password = '${data.password}' ;`;
//   //var user = [];
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     else if (result.length == 0)
//       return res.send("user name or password is wrong!");
//     else {
//       let token = jwt.sign(JSON.parse(JSON.stringify(result[0])), "shhhhh");
//       //console.log(JSON.parse(result[0]));
//       return res.header("auth-token", token).send(token);
//     }
//   });

//   //if (user.length == 0)

//   //res.send(user);
// });

router.post("/login",(req,res)=>{
    let data = req.body;
    admin.find({username:data.username,password:data.password},(err,reselt)=>{
        if(err){
            res.send("username and password not correct")
        }else if(reselt.length == 0){
            res.send("enter the password and the user name")
 }else{
    let token = jwt.sign(JSON.parse(JSON.stringify(res[0])), "shhhhh");
    //       //console.log(JSON.parse(result[0]));
          return res.header("auth-token", token).send(token);
console.log(reselt);

 }
    })

});

router.post("/singUp",async (req,res)=>{

    // try {
    //     const validation= await joi.validateAsync(req.body,schema);
    //    res.send(validation);
        
    // } catch (err) {
    //     res.status(404).send(err);
    // }
  
    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;
  

    admin.create({username,password},async (err,admin)=>{
        if(err){
            res.status(404).send(err);
        }
        else{
           

            try {
                const reselt = await admin.save();
                res.redirect("/");
                
            } catch (error) {
                res.status(404).send(err);
                
            }
 }

    })


})

router.get("/admin",(req,res)=>{
    admin.find({},(err,admins)=>{

        if(err){
            console.log(err);
        }else{
            res.send(admins);
        }
})
})


module.exports = router;


