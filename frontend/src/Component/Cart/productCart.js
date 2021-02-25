import axios from "axios";
import React ,{useState, useEffect} from "react";

function ProductCart({data,removeOneFromCart,removeProductFromCart}){

   
    // console.log(data);
    const products = data.map( (product)=>{
        
        
        // const res = productName.data.map(d=>{
        //     return <div>{d.title}</div>
        // })
        console.log(product)
        
        return <div>
          <ul>
            
              <li>{product.product.title}</li>
              {/* <li>{res}</li> */}
              {/* <li>{productName.data.title}</li> */}
              <li>{product.quantity}</li>
              <li onClick={()=>{
                 removeOneFromCart(product.product._id)
              }}> -</li>

<li onClick={()=>{
                 removeProductFromCart(product.product._id)
              }}> x</li>
              
              
             
          </ul>
         </div>
     })


     

    return (
        <div>
            helo
             {products}
        </div>
       
    )
   

  

    

}


export default ProductCart;