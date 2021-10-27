var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

const user  = require("../modules/user")
const product  = require("../modules/product")


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));



const findUser = async (id)=>{
 try {

  return user.findById(id)
 }catch(err){
   console.log(err);

 }
    
}



router.post("/addToCart/:prodId/:idUser",async (req, res, next) => {
  const prodId = req.params.prodId;
    const idUser = req.params.idUser;
    const UserData = await findUser(idUser);

    
    product.findById(prodId)
      .then(product => {
        return UserData.addToCart(product);
      }).catch(err=>{
        console.log(err)
      })
      .then(result => {
        console.log(result);
       
      });
  })

  
router.put("/removeOneFromCart/:prodId/:idUser",async (req, res, next) => {
  const prodId = req.params?.prodId;
  const idUser = req.params?.idUser;
  const UserData = await findUser(idUser);
  return UserData.removeOneFromCart(prodId).then(reselt=>{
    res.send(reselt);
  });
  
})

router.put("/removeProductFromCart/:prodId/:idUser",async (req,res)=>{
  const prodId = req.params?.prodId;
  const idUser = req.params?.idUser;
  const UserData = await findUser(idUser);
  return UserData.removeFromCart(prodId).then(reselt=>{
    res.send(reselt);
  });
})

  router.get("/allCartProduct/:idUser",async (req,res)=>{
    const idUser = req.params?.idUser;
    console.log("hey"+idUser)
    const UserData = await findUser(idUser);
    console.log("hey"+UserData)
if(UserData){
  UserData
  .populate('cart.items.productId')
  .execPopulate()
  .then(UserDetails => {
    console.log("hey user"+UserDetails)
    const products = UserDetails.cart.items.map(i => {
      console.log("hey Items"+i)
      if(i.productId){
return { quantity: i.quantity, product: { ...i.productId._doc } };
      }
      
    })
   
    // // );
    console.log(products)
    res.send(products);
}).catch(err => console.log(err));

}
  

  
})


router.put("/removeAllFromCart/:idUser",async (req, res, next) => {
  const idUser = req.params?.idUser;
  const UserData = await findUser(idUser);
  return UserData.clearCart();
  
})



module.exports = router;