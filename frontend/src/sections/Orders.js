import Order from "../components/Order"
import axios from "axios";
import {useState,useContext,useEffect} from "react"
import { UserContext } from "../contexts/userContext";
export default function Orders(){
    const [allOrders,setAllOrders] = useState([]);
    let { userData, setUserData } = useContext(UserContext);
   let  fetchData = async ()=>{
    console.log(userData._id);
    if(userData){
        let  allCartProduct = await axios.get(`/api/allCartProduct/${userData._id}`);
    console.log("all orders"+allCartProduct.data);
    setAllOrders(allCartProduct.data);

    }
    
        
     
      }
  

    useEffect(()=>{

        fetchData();
        console.log(allOrders);
       

    },[userData]);

    const removeOneFromCart = async (id)=>{
        console.log("hey")

        const res = await axios.put(`/api/removeOneFromCart/${id}/${userData._id}`);
      
    }

    const removeProductFromCart = async (id)=>{
        console.log("hey")

        const res = await axios.put(`/api/removeProductFromCart/${id}/${userData._id}`);
       
    }


  const AllOrders = allOrders.map(order=>{
      return(<Order order={order} removeProductFromCart={removeProductFromCart} removeOneFromCart={removeOneFromCart} />)
      
      

  })


    return (
        <div>
            <h1>All ORDERS</h1>
            {AllOrders}</div>
    )
}