import axios from "axios";
import Popup from "./PopupProductEdit";


//

const contentStyle = {
  maxWidth: "600px",
  height:"100px",
  width: "90%"
};
export default function Product({ product, deleteProduct ,goToProductProfile}) {
  
  return (
    <div class="min-h-screen bg-gray-100 flex justify-center items-center">
<div class="container flex justify-center">
  <div class="max-w-sm py-16">
    <div class="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
      <img class="rounded-t-lg" onClick={(e)=>{
      e.stopPropagation();
      e.preventDefault();   goToProductProfile(product._id)}}  src={product.image.filePath} alt="" />
      <div class="py-6 px-8 rounded-lg bg-white">
        <h1 class="text-gray-700 font-bold text-2xl mb-3 hover:text-gray-900 hover:cursor-pointer">I'm supper dog for you.</h1>
        <p class="text-gray-500 text-base">{product.description}</p>
        <div className="flex justify-between h-16">
        <button class="mt-6 py-2 px-2 bg-blue-800 text-gray-800 font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300">add To Cart</button>
        <button
        type="button" class="mt-6 py-2 px-2 bg-red-600 text-gray-800 font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300"
          onClick={(e) => {

            e.stopPropagation()
            e.preventDefault();
            deleteProduct(product._id);
          }}
        >
          Delete
        </button>
        <Popup  product={product}/>
        </div>
     
        
      </div>
      <div class="absolute py-2 px-4 bg-green-700 text-white rounded-lg" >
        <span class="text-md">{product.price} MAD</span>
      </div>
    </div>
  </div>
</div>
</div>
   
  );
}

      
        {/* <button onClick={(e)=>{
                 e.preventDefault()
                 editProduct(product._id)}}>Edit</button>
             <button onClick={(e)=>{
                 e.preventDefault()
                 addToCart(product._id)}}>addToCart</button> */}



