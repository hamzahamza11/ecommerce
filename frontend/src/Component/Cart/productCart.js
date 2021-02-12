import axios from "axios";
import React ,{useState, useEffect} from "react";

function ProductCart({data}){

    // console.log(data);
    const products = data.map( async (product)=>{
        
        const productName = await axios.get(`/api/product/${product.productId}`)
        // const res = productName.data.map(d=>{
        //     return <div>{d.title}</div>
        // })
        console.log(productName)
        return <div>
          <ul>
            
              <li>{product._id}</li>
              {/* <li>{res}</li> */}
              {/* <li>{productName.data.title}</li> */}
              <li>{product.quantity}</li>
              
              
             
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