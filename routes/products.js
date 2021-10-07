var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

const product = require("../modules/product")


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


router.post("/addProduct",(req,res)=>{
    

    
   

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;

    product.create({title,description,price,imageUrl},(err,product)=>{
        if(err){
            console.log(err);
        }
        else{
            product.save();
            res.redirect("/");
 }

    })


})

router.get("/allProduct",(req,res)=>{
   
  

    product.find({},(err,products)=>{

        if(err){
            console.log(err);
        }else{
            res.send(products);
        }
})
})

router.get("/product/:id",(req,res)=>{

    product.findById(req.params.id,(err,reselt)=>{
        if(err){
            console.log(err);
        }else{
            res.send(reselt);
        }
    })

});

router.put("/editProduct/:id",(req,res)=>{

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;

    product.findByIdAndUpdate(req.params.id,{title,description,price,imageUrl},(err,product)=>{
        if(err){
            console.log(err);
        }
        else{
            product.save();
            res.redirect("/");

 }}

)


})


router.delete("/deleteProduct/:id",(req,res)=>{
    product.findByIdAndDelete(req.params.id,(err)=>{
        if(err){
            console.log(err);
        }else{
           console.log("succes delete");       }

    })

})





module.exports = router;