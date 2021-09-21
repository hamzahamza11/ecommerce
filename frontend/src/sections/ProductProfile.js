import { useParams } from "react-router"
import {useEffect , useState} from "react"
import axios from "axios";


export default function ProductProfile({props}){

    const [product,setProduct] = useState([]);

    let {id} = useParams();
    console.log(id)

    const fetchProductData = async () =>{
        const ProductData = await axios(`/api/product/${id}`)
        setProduct(ProductData.data)

    }
    const addToOrders = async (id)=>{
      const res = await axios.post(`/api/addToCart/${id}`)
      console.log(res);

  }

    useEffect(() => {

        fetchProductData();
        console.log(product);
       },[]);


return (
    <div>{product.title}
    
    <button onClick={(e)=>{
                 e.preventDefault()
                 addToOrders(product._id)}}>addToCart</button>
    </div>
)

}