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
        console.log(req.user);
        return req.user.addToCart(product);
      }).catch(err=>{
        console.log(err)
      })
      .then(result => {
        console.log(result);
       
      });
  })

  
router.put("/removeOneFromCart/:id",(req, res, next) => {
  const prodId = req.params.id;
  return req.user.removeOneFromCart(prodId).then(reselt=>{
    res.send(reselt);
  });
  
})

router.put("/removeProductFromCart/:id",(req,res)=>{
  const prodId = req.params.id;
  return req.user.removeFromCart(prodId).then(reselt=>{
    res.send(reselt);
  });
})

  router.get("/allCartProduct",(req,res)=>{


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


router.put("/removeAllFromCart",(req, res, next) => {
  
  return req.user.clearCart();
  
})

router

module.exports = router;