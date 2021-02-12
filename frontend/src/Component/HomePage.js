import axios from "axios";
import React ,{useState, useEffect} from "react";
import Product from "../Product/Product";
function HomePage(){

    const [data,setData] = useState([])

    const fetchData = async ()=>{
        const  res = await axios.get("/api/allProduct");
       
        setData(res.data);
        console.log(res.data)
    }

    useEffect(() => {

        fetchData();
        console.log(data);
       },[]);

       

return(

    <div><Product data={data}/></div>
)

}


export default HomePage;