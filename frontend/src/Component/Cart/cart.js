import axios from "axios";
import React ,{useState, useContext,useEffect} from "react";
import ProductCart from "./productCart"
import { UserContext } from "../../contexts/userContext";

function Cart(){

    const [data,setData] = useState([]);
    const { userData, setUserData } = useContext(UserContext);

   const  fetchData = async ()=>{

        const  res = await axios.get(`/api/allCartProduct/${userData._id}`);
        console.log("cart user "+userData._id);
        setData(res.data);
     
      }
  

    useEffect(()=>{

        fetchData();
        console.log(data);
       

    },[userData]);

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