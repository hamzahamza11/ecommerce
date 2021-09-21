
  
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
const admin = require("../modules/admin");
const user = require("../modules/user");
const joi = require("joi");
const bcrypt = require("bcryptjs");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


const schema = joi.object({
    username:joi.string().min(6).required(),
    password: joi.string().min(6).required()
})

 
router.post("/user",async (req,res)=>{


    const name = req.body.name;
    const email = req.body.email; 
user.create({name,email},(err,user)=>{

    if(err){
        console.log(err)
    }else{
        user.save();
        res.redirect("/");
        
    }

})

    
   
});

 
router.post("/login",async (req,res)=>{
    console.log(req.body);
    let data = req.body;
    const user = await admin.findOne({username:data.username})
    if(!user) return res.status(400).send("email or password dosen't exist")

    const validPass = await bcrypt.compare(data.password,user.password)

    if(!validPass) return res.status(400).send("invalid password")

  
    try {
        let token = await  jwt.sign({_id:user._id}, "fffffff");
        console.log("after the token"+token);
       
     
      res.send({user,token});
        
    } catch (error) {
        console.log(error);
    }
   

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

    const emailExist = await admin.findOne({username:username})
    if(emailExist) return res.status(400).send("emailExist")
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);


    admin.create({username,password:hashedPassword},async (err,admin)=>{
        if(err){
            res.status(404).send(err);
        }
        else{
           

            try {
                const reselt = await admin.save();
                res.send({user:reselt._id});
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

router.get("/user",(req,res)=>{
    user.find({},(err,users)=>{

        if(err){
            console.log(err);
        }else{
            res.send(users);
        }
})
})


module.exports = router;


