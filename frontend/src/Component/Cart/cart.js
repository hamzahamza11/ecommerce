import axios from "axios";
import React ,{useState, useEffect} from "react";
import ProductCart from "./productCart"

function Cart(){

    const [data,setData] = useState([]);

   const  fetchData = async ()=>{

        const  res = await axios.get("/api/allCartProduct");
        console.log(res.data);
        setData(res.data);
     
      }
  

    useEffect(()=>{

        fetchData();
        console.log(data);
       

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


  

    

    

return(

    <div>
        <ProductCart data={data} 
        removeOneFromCart={removeOneFromCart}
         removeProductFromCart={removeProductFromCart}/>
       
        </div>
)

}


export default Cart;