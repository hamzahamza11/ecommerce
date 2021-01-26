import axios from "axios";
import React ,{useState, useEffect} from "react";
import Product from "../Product/Product";
function HomePage(){

    const [data,setData] = useState([])

    useEffect(async () => {

        const  res = await axios.get("/api/allProduct");

        setData(res.data);
        console.log(data)

       });

return(

    <div><Product data={data}/></div>
)

}


export default HomePage;