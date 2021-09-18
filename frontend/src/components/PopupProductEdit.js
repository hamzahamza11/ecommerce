

import React, { useState } from 'react';
import axios from "axios" ;
import useForm  from '../Component/hooks/useForm';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

function Popup({product})  {
  const [open, setOpen] = useState(false);
  const [newProductValue,setNewProductValue,reset] = useForm(product);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);


  const handleChange= (e)=>{
    setNewProductValue({...newProductValue,
        [e.target.name]:e.target.value
    })

    console.log(newProductValue);
}

const handleNumberChange =(e)=>{
     const price = Number(e.target.value);

     setNewProductValue({
         ...newProductValue,
         [e.target.name]:price
     })
}

const handleSubmit = async (e)=>{

     const res = await axios.put(`/api/editProduct/${product._id}`,newProductValue);
     console.log(res);


}



  return (
    <div>
      <button onClick={onOpenModal}>Open modal</button>
      <Modal open={open} onClose={onCloseModal} center>
      <form onSubmit={handleSubmit}>

            <input type="text" name="title"  onChange={handleChange} value={newProductValue.title} />
            <input type="text" name="price" onChange={handleNumberChange}  value={newProductValue.price}/>
            <input type="text" name="description" onChange={handleChange}   value={newProductValue.description}/>
            <input type="text" name="imageUrl" onChange={handleChange}   value={newProductValue.imageUrl} />

            <button>submit</button>
            
       </form>
      </Modal>
    </div>
  );
};

export default Popup;