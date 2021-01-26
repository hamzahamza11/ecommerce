
import {useState} from "react";
import UseForm from "./hooks/useForm"


function addProduct(){

    const [value,setValue,reset] = UseForm("");

    const handleChange= (e)=>{
        setValue({
            [e.targe.name]:e.target.value
        })

        console.log(value);
    }

    

 
    return(
        <div>

        <form>

            <input type="text" name="title"  onChange={handleChange}/>
            <input type="number" name="price" onChange={handleChange}/>
            <input type="text" name="description" onChange={handleChange}/>
            <input type="text" name="imageUrl" onChange={handleChange} />
            
       </form>     

        </div>
    )
}

export default addProduct;
