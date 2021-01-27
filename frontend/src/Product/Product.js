
import {useState} from "react";
import {DeleteProduct} from "./ProductManaging"



function Product({data}){

    const products = data.map((product)=>{
       return <div>
         <ul>
             console.log(product.id)
             <li>{product.title}</li>
             <li><img src={product.imageUrl}/></li>
             <li>{product.price}</li>
             <li>{product.description}</li>
             <button onClick={DeleteProduct(product._id)}>Delete</button>
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
