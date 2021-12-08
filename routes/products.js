var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const user = require("../modules/user")
const {check,body} = require("express-validator/check")
const {validationResult} = require("express-validator")

const { upload } = require("../helpers/filehelper");
const {
  singleFileUpload,
  multipleFileUpload,
  getallSingleFiles,
  getallMultipleFiles,
  singleFileUpdate,
  multipleFilesUpdate
} = require("../controllers/fileuploaderController");
const product = require("../modules/product");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const findUser = async (id)=>{
  try {
 
   return user.findById(id)
  }catch(err){
    console.log(err);
 
  }
     
 }
router.post("/addProduct",
 [
  body('title')
    .isString()
    .isLength({ min: 3 })
    .trim(),
  body('price').isFloat(),
  body('description')
    .isLength({ min: 5, max: 400 })
    .trim()
]

,(req, res) => {
  const { title, description, price ,singleFileId,multipleFileId} = req.body;

  product.create({ title, description, price,image:singleFileId, multipleImages:multipleFileId}, (err, product) => {
    if (err) {
      return res.status(422).send({err,oldInput:
        {title, description, price  }
      })
    } else {
      product.save();
      res.redirect("/");
    }
  });
});

router.get("/allProduct", async (req, res) => {
 console.log(req.session.user);
  try {
     let products = await  product.find({}).populate("image").populate("multipleImages")
     res.send(products);
  
  } catch (err) {
    console.log(err)
    
  }
 
  // product.find({}, (err, productsData) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     productsData.forEach(product=>{

  //       console.log(product)

  //       product.populate('image').then(res => console.log(res));
  //     })         
        // res.send(products);
  //   }
  // });
});

router.get("/product/:id", async (req, res) => {
  try {
   const Product =  await 
  product.findById(req.params.id).populate("image").populate("multipleImages")
  res.send(Product);
  } catch (error) {
    console.log(error)
    
  }
  
   
});

router.put("/editProduct/:id",[
  body('title')
    .isString()
    .isLength({ min: 3 })
    .trim(),
  body('price').isFloat(),
  body('description')
    .isLength({ min: 5, max: 400 })
    .trim()
], (req, res) => {
  
  const { title, description, price } = req.body;

  product.findByIdAndUpdate(
    req.params.id,
    { title, description, price },
    (err, product) => {
      if (err) {
        console.log(err);
      } else {
        product.save();
        res.redirect("/");
      }
    }
  );
});

router.delete("/deleteProduct/:prodId/:idUser", async (req, res) => {
  const prodId = req.params?.prodId;
  const idUser = req.params?.idUser;
  const UserData = await findUser(idUser);
  console.log("deelte"+ UserData)
  try {
    const u = UserData.removeFromCart(prodId)
    product.findByIdAndDelete(prodId,(err) => {
      if (err) {
        console.log(err);
      } 
    })
  } catch (error) {
    console.log(error)
    
  }

});

router.post("/singleFile", upload.single("file"), singleFileUpload);
router.put("/putSingleFile/:singleFileId", upload.single("file"), singleFileUpdate);
router.put("/putMultipleFiles/:multipleFilesId", upload.array("files"), multipleFilesUpdate);
router.post("/multipleFiles", upload.array("files"), multipleFileUpload);
router.get("/getSingleFiles", getallSingleFiles);

router.get("/getMultipleFiles", getallMultipleFiles);

module.exports = router;
