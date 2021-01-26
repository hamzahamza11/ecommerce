
import {useState} from "react";
import UseForm from "./hooks/useForm"
import axios from "axios"


function addProduct(){

    const [value,setValue,reset] = UseForm("");

    const handleChange= (e)=>{
        setValue({...value,
            [e.target.name]:e.target.value
        })

        console.log(value);
    }

    const handleNumberChange =(e)=>{
         const price = Number(e.target.value);

         setValue({
             ...value,
             [e.target.name]:price
         })
    }

    const handleSubmit = async (e)=>{
 
         const res = await axios.post("/api/addProduct",value);
         console.log(res);
 

    }
    

 
    return(
        <div>

        <form onSubmit={handleSubmit}>

            <input type="text" name="title"  onChange={handleChange}/>
            <input type="text" name="price" onChange={handleNumberChange}/>
            <input type="text" name="description" onChange={handleChange}/>
            <input type="text" name="imageUrl" onChange={handleChange} />

            <button>submit</button>
            
       </form>     

        </div>
    )
}

export default addProduct;
