var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

const user  = require("../modules/user")
const product  = require("../modules/product")
const order  = require("../modules/order")

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


// router.post("/addOrder/:idPoduct/:quantity", (req, res, next) => {

//     order.findOne({products:{$elemMatch:{productId:req.params.idProduct}}}).then(res=>{
//         if(res.length==0){
//             const oreder = new order({
//                 products:[{
//                     productId:req.params.idProduct,
//                     quantity:req.params.quantity
//                    }
//                ]
        
        
//             })
            
//         }

//     }

//     )
    

// }
//    );

router.get('/checkout', isAuth, shopController.getCheckout);

router.get('/orders', (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
      .then(orders => {
        res.render('shop/orders', {
          path: '/orders',
          pageTitle: 'Your Orders',
          orders: orders
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };
  );

router.get('/orders/:orderId', isAuth, shopController.getInvoice);

app.post('/create-order', (req, res, next) => {
    // Token is created using Checkout or Elements!
    // Get the payment token ID submitted by the form:
    const token = req.body.stripeToken; // Using Express
    let totalSum = 0;
  
    req.user
      .populate('cart.items.productId')
      .execPopulate()
      .then(user => {  
        user.cart.items.forEach(p => {
          totalSum += p.quantity * p.productId.price;
        });
  
        const products = user.cart.items.map(i => {
          return { quantity: i.quantity, product: { ...i.productId._doc } };
        });
        const order = new Order({
          user: {
            email: req.user.email,
            userId: req.user
          },
          products: products
        });
        return order.save();
      })
      .then(result => {
        const charge = stripe.charges.create({
          amount: totalSum * 100,
          currency: 'usd',
          description: 'Demo Order',
          source: token,
          metadata: { order_id: result._id.toString() }
        });
        return req.user.clearCart();
      })
      .then(() => {
        res.redirect('/orders');
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };
  );


module.exports = router;