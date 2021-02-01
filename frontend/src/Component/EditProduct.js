
import {useState,useEffect} from "react";
import UseForm from "./hooks/useForm"
import axios from "axios"
import { useParams } from "react-router-dom";


function EditProduct({props}){
    let {id} = useParams()

    const [value,setValue,reset] = UseForm("");
    const fetchProduct =async ()=>{
        
        const res = await axios.get(`/api/product/${id}`);
        setValue(res.data);

    }

    useEffect(()=>{
        fetchProduct();

   },[]);

   




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
 
         const res = await axios.put(`/api/editProduct/${this.props.match.params.id}`,value);
         console.log(res);
 

    }
    

 
    return(
        <div>

        <form onSubmit={handleSubmit}>

            <input type="text" name="title"  onChange={handleChange} value={value.title} />
            <input type="text" name="price" onChange={handleNumberChange}  value={value.price}/>
            <input type="text" name="description" onChange={handleChange}   value={value.description}/>
            <input type="text" name="imageUrl" onChange={handleChange}   value={value.imageUrl} />

            <button>submit</button>
            
       </form>     

        </div>
    )
}

export default EditProduct;
