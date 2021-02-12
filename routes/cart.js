var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

const user  = require("../modules/user")
const product  = require("../modules/product")

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


router.post("/addToCart/:id",(req, res, next) => {
    const prodId = req.params.id;
    product.findById(prodId)
      .then(product => {
        return req.user.addToCart(product);
      })
      .then(result => {
        console.log(result);
       
      });
  })

  router.get("/allCartProduct",(req,res)=>{

  //   user.findById(req.user._id)
  //   .populate("productId").exec((err,reselt)=>{
  //   if(err){
  //     console.log(err)
  //   }else{
  //     return res.send(reselt.cart.items)
  //   }
  // })

  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(User => {
      console.log(User)
      const products = User.cart.items.map(i => {
        console.log(i.productId._doc)
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      }
     
      );
      res.send(products);
  }).catch(err => console.log(err));

  
})

module.exports = router;