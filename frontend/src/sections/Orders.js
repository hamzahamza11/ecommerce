import Order from "../components/Order"
import axios from "axios";
import {useState,useEffect} from "react"
export default function Orders(){
    const [allOrders,setAllOrders] = useState([]);

   const  fetchData = async ()=>{

        const  allCartProduct = await axios.get("/api/allCartProduct");
        console.log(allCartProduct.data);
        setAllOrders(allCartProduct.data);
     
      }
  

    useEffect(()=>{

        fetchData();
        console.log(allOrders);
       

    },[]);

    const removeOneFromCart = async (id)=>{
        console.log("hey")

        const res = await axios.put(`/api/removeOneFromCart/${id}`);
        fetchData();
    }

    const removeProductFromCart = async (id)=>{
        console.log("hey")

        const res = await axios.put(`/api/removeProductFromCart/${id}`);
        fetchData();
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