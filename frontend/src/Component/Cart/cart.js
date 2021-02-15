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


  

    

    

return(

    <div>
        <ProductCart data={data}/>
       
        </div>
)

}


export default Cart;