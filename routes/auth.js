var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
// const admin = require("../modules/admin");
const user = require("../modules/user");
// const joi = require("joi");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const {check,body} = require("express-validator/check")
const {validationResult} = require("express-validator")
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const transproter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

// const schema = joi.object({
//   username: joi.string().min(6).required(),
//   password: joi.string().min(6).required(),
// });

router.post("/user", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  transproter
    .sendMail({
      to: email,
      from: "sabirha00@gmail.com",
      subject: "SignUp succeded",
      html: "<h1>Sucess</h1>",
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  user.create({ name, email }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      // user.save();
      //    return transproter.sendMail({
      //         to:email,
      //         from:"sabirha00@gmail.com",
      //         subject:"SignUp succeded",
      //         html : "<h1>Sucess</h1>"

      //     });
      res.redirect("/");
    }
  });
});

router.post("/login", async (req, res) => {
  // console.log(req.session.isLoggedIn);
  // req.session.isLoggedIn= true;
  // console.log(req.session.isLoggedIn);

  console.log(req.body);
  const { username, password } = req.body;

  // res.setHeader("Set-Cookie","loggedIn=true");
  const User = await user.findOne({ username });
  if (!User) return res.status(400).send("username or password dosen't exist");

  const validPass = await bcrypt.compare(password, User.password);

  if (!validPass) return res.status(400).send("invalid password");

  //   req.session.user = User;

  //   req.session.save((err) => {
  //     console.log(err);
  //     //  res.redirect("/");
  //   });

  try {
    let token = await jwt.sign({ _id: User._id }, process.env.TOKEN_SECRET);

    res.send({ User, token });
  } catch (error) {
    console.log(error);
  }
});

router.post("/singUp",
[body("email").isEmail().withMessage("please add a valid email").custom((value,{req})=>{
  return user.findOne({ email: value }).then(userDoc=>{
    if(userDoc){
      return Promise.reject("email already exist")
    }
  });
}),
body("password").isLength({min:5}).withMessage("please enter at least 5 characters."),body("name").isLength({min:1}).withMessage("choose a name"),
body("username").custom((value,{req})=>{
  return user.findOne({ username: value }).then(userDoc=>{
    if(userDoc){
      return Promise.reject("username already exist")
    }
  });
}),
body("confirmPassword").custom((value,{req})=>{
  if(value !== req.body.password){
    throw new Error("passwords have to match")
  }
  return true;

})],
async (req, res) => {
  console.log(req.body);
  const { username, password, email, name } = req.body;

  const errors = validationResult(req)
if(!errors.isEmpty()){
  return res.status(422).send({errorMessage:errors.array(),oldInput:
    { username, password, email, name }
  })
}
  

 
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.create(
    { username, password: hashedPassword, email, name },
    async (err, user) => {
      if (err) {
        res.status(404).send(err);
      } else {
        try {
          const reselt = await user.save();
          res.send({ user: reselt._id });
          res.redirect("/");
        } catch (error) {
          res.status(404).send(err);
        }
      }
    }
  );
});

router.post("/tokenIsValid", async (req, res, next) => {
  console.log("i'm the token validation");
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!verified) return res.json(false);
    const User = await user.findById(verified._id);

    if (!User) return res.json(false);
    req.session.user = User;

    return res.json({ User });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/setSession", (req, res) => {
  console.log("i'm the setSEssion");
});

router.get("/admin", (req, res) => {
  admin.find({}, (err, admins) => {
    if (err) {
      console.log(err);
    } else {
      res.send(admins);
    }
  });
});

router.get("/user", (req, res) => {
  user.find({}, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.send(users);
    }
  });
});

module.exports = router;
