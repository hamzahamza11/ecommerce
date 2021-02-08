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


module.exports = router;