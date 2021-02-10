var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

const user  = require("../modules/user")
const product  = require("../modules/product")
const order  = require("../modules/order")

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


router.post("/addOrder/:idPoduct/:quantity", (req, res, next) => {

    order.findOne({products:{$elemMatch:{productId:req.params.idProduct}}}).then(res=>{
        if(res.length==0){
            const oreder = new order({
                products:[{
                    productId:req.params.idProduct,
                    quantity:req.params.quantity
                   }
               ]
        
        
            })
            
        }

    }

    )
    

}
   );




module.exports = router;