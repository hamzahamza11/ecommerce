
import {useState} from "react";



function Product({data}){

    const products = data.map((product)=>{
       return <div>
         <ul>
             <li>{product.title}</li>
             <li><img src={product.imageUrl}/></li>
             <li>{product.price}</li>
             <li>{product.description}</li>
         </ul>
        </div>
    })


    

 
    return(
        <div>
            helloo

         {products}

        </div>
    )
}

export default Product;
