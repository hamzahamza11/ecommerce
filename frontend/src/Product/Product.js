
import {useState} from "react";
import {deleteProduct} from "./ProductManaging"
import {editProduct} from "./editProduct"



function Product({data}){

    const products = data.map((product)=>{
       return <div>
         <ul>
           
             <li>{product.title}</li>
             <li><img src={product.imageUrl}/></li>
             <li>{product.price}</li>
             <li>{product.description}</li>
             <button onClick={()=>{deleteProduct(product._id)}}>Delete</button>
             <button onClick={()=>{editProduct(product._id)}}>Edit</button>
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
