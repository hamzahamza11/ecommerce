import axios from "axios";
import Popup from "./PopupProductEdit";


//

const contentStyle = {
  maxWidth: "600px",
  width: "90%"
};
export default function Product({ product, deleteProduct ,goToProductProfile}) {
  
  return (
    <div >
        <button onClick={(e)=>{
      e.stopPropagation();
      e.preventDefault();   goToProductProfile(product._id)}}>Product profile</button>
      <ul>
        <li>{product.title}</li>
        <li>
          <img src={product.image.filePath} />
        </li>
        <li>{product.price}</li>
        <li>{product.description}</li>
        <button
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault();
            deleteProduct(product._id);
          }}
        >
          Delete
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault();
           console.log("ok");
          }}
        >
          Edit
        </button>
        <Popup  product={product}/>
      
        {/* <button onClick={(e)=>{
                 e.preventDefault()
                 editProduct(product._id)}}>Edit</button>
             <button onClick={(e)=>{
                 e.preventDefault()
                 addToCart(product._id)}}>addToCart</button> */}
      </ul>
    </div>
  );
}
