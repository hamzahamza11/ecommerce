
import {useState} from "react";
import useForm from "../hooks/useForm"
import axios from "axios"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


function PopupAddProduct(){
    const [open, setOpen] = useState(false);

    const [value,setValue,reset] = useForm("");
    const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

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
        <button onClick={onOpenModal}>Open modal</button>
      <Modal open={open} onClose={onCloseModal} center>
        <form onSubmit={handleSubmit}>

            <input type="text" name="title"  onChange={handleChange} />
            <input type="text" name="price" onChange={handleNumberChange} />
            <input type="text" name="description" onChange={handleChange} />
            <input type="text" name="imageUrl" onChange={handleChange}   />

            <button>submit</button>
            
       </form>  
       </Modal>   

        </div>
    )
}

export default PopupAddProduct;




