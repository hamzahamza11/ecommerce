import { useParams } from "react-router"
import {useEffect ,useContext, useState} from "react"
import axios from "axios";
import { UserContext } from "../contexts/userContext";
import {ProductProfileContext} from "../contexts/productProfileContext"


export default function ProductProfile({props}){

    // const {product,setProduct} = useContext(ProductProfileContext);
    const [product,setProduct] = useState()
    const {userData,setUserData} = useContext(UserContext)

    let {id} = useParams();
   

    const fetchProductData = async () =>{
        
        const ProductData = await axios(`/api/product/${id}`)
        console.log(ProductData.data)
        setProduct(ProductData.data)
        

    }
    const addToOrders = async (id)=>{
      const res = await axios.post(`/api/addToCart/${id}/${userData._id}`)
      

  }

    useEffect(() => {

        fetchProductData();
     
        
       },[]);

const images =  product?.multipleImages?.files.map(image=>{
    console.log(image.filePath)
  return  <li><img src={"http://localhost:3001/"+image.filePath} /></li>
    

});
return (
    <div>{product?.title}
    
    <div>{images}</div>
    
    <img src={product?.image?.filePath} />
    
    
    <button className= "py-2 px-4 bg-yellow-400 text-gray-800 font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300" onClick={(e)=>{
                 e.preventDefault()
                 console.log(product._id)
                 addToOrders(product._id)}}>addToCart</button>
    </div>
)

}