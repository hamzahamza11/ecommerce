
import {useState} from "react";
import {deleteProduct,addToCart} from "./ProductManaging"
import {editProduct} from "./editProduct"



function Product({data}){

    const products = data.map((product)=>{
       return <div>
         <ul>
           
             <li>{product.title}</li>
             <li><img src={product.imageUrl}/></li>
             <li>{product.price}</li>
             <li>{product.description}</li>
             <button onClick={(e)=>{
                 e.preventDefault()
                 deleteProduct(product._id)}}>Delete</button>
             <button onClick={(e)=>{
                 e.preventDefault()
                 editProduct(product._id)}}>Edit</button>
             <button onClick={(e)=>{
                 e.preventDefault()
                 addToCart(product._id)}}>addToCart</button>
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



