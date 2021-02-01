import axios from "axios";
import React ,{useState, useEffect} from "react";
import Product from "../Product/Product";
function HomePage(){

    const [data,setData] = useState([])

    const fetchData = async ()=>{
        const  res = await axios.get("/api/allProduct");
        console.log(res.data);
        setData(res.data);
    }

    useEffect(() => {

        fetchData();
       },[]);

       

return(

    <div><Product data={data}/></div>
)

}


export default HomePage;