import axios from "axios";
import React ,{useState, useEffect} from "react";
import ProductCart from "./productCart"

function Cart(){

    const [data,setData] = useState([]);


    // const fetchData = async ()=>{
    //     let array = [];
    // await axios("/api/allCartProduct").then( async products=>{
      
    //    const reselt=   await products.data.map(async product=>{
    //         const res=await axios(`/api/product/${product.productId}`)
    //         const quantity = await product.quantity

           


           
    //       return {
    //             title:res.data.title,
    //             quantity:quantity}
              
    //     }
        

    //     );

    //    const res = await  reselt.map(res=>{
    //        res.then(d=>{
           
    //          setData(d)
             
    //        })
    //     })

        
    //     // setData(res);

    // })}

    const  fetchDataa = async ()=>{

        const  res = await axios.get("/api/allCartProduct");
        console.log(res.data);
        setData(res.data);
       
  
      //   console.log(product.data);
  
  
      //  const pq = await  product.data.map(async res=>{
      //     const reselt=await axios(`/api/product/${res.productId}`)
      //     const quantity = await res.quantity
      //    return {
      //         title:reselt.title,
      //         quantity:quantity}
   
  
      //  })
  
      // const DATA = await pq.map(res =>{
      //     return res.then(d=>{
      //         return d;
      //     });
      // })
  
      // console.log(DATA)
  
      }
  

    useEffect(()=>{

        fetchDataa();
        console.log(data);
       

    },[]);


  

    

    

return(

    <div>
        <ProductCart data={data}/>
       
        </div>
)

}


export default Cart;