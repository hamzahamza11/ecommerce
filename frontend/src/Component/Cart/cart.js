import axios from "axios";
import React ,{useState, useEffect} from "react";

function Cart(){

    const [data,setData] = useState([]);


    const fetchData = async ()=>{
    await axios("/api/allCartProduct").then( async products=>{
        console.log(products)
       const reselt=   await products.data.map(async product=>{
            const res=await axios(`/api/product/${product.productId}`)
            const quantity = await product.quantity

           
          return {
                title:res.data.title,
                quantity:quantity}
              
        }
        

        );

        console.log(reselt)
        // setData(res);

    })}

    useEffect(()=>{

        fetchData();

    },[]);


    

    

return(

    <div>
        {/* <ProductCart data={data}/> */}
        {data}
        </div>
)

}


export default Cart;