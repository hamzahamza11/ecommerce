

import React, { useState } from 'react';
import axios from "axios" ;
import useForm  from '../hooks/useForm';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

function Popup({product})  {
  const [open, setOpen] = useState(false);
  const [singleProgress, setSingleProgress] = useState(0);
  const [multipleProgress, setMultipleProgress] = useState(0);
  const [newProductValue,setNewProductValue,reset] = useForm(product);
  const [singleFileToUpdate, setSingleFileToUpdate] = useState("");
  const [multipleFilesToUpdate, setMultipleFilesToUpdate] = useState("");
  const [multipleFilesPreview, setMultipleFilesPreview] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imagesPreviewUrl, setImagesPreviewUrl] = useState("");

  const onOpenModal = () => {setOpen(true);}
  const onCloseModal = () => {setOpen(false);}


  const handleChange= (e)=>{
    e.stopPropagation();
    
    setNewProductValue({...newProductValue,
        [e.target.name]:e.target.value
    })

    console.log(newProductValue);
}

const SingleFileChange = (e) => {
  e.preventDefault();
  let reader = new FileReader();
  setSingleFileToUpdate(e.target.files[0]);
  reader.onloadend = () => {
    setImagePreviewUrl(reader.result);
  };

  reader.readAsDataURL(e.target.files[0]);

  setSingleProgress(0);
};
const MultipleFileChange = (e) => {
  e.preventDefault();
  // let files = e.target.files;
  // files.map(element => {
  //     let reader = new FileReader();
  //     reader.onloadend = () => {
  //         setImagesPreviewUrl(reader.result);
  //       };
  //     reader.readAsDataURL(e.target.files[0]);
      
  // });
  let ImagesArray = Object.entries(e.target.files).map((e) =>
    URL.createObjectURL(e[1])
  );
  console.log(ImagesArray);
  setMultipleFilesPreview(ImagesArray);
  
  setMultipleFilesToUpdate(e.target.files);
  
  
  setMultipleProgress(0);
};

const handleNumberChange =(e)=>{
 
  console.log(e.target.value)
     const price = Number(e.target.value);

     setNewProductValue({
         ...newProductValue,
         [e.target.name]:price
     })
}

const handleSubmit = async (e)=>{
//   router.put("/putSingleFile/:singleFileId", upload.single("file"), singleFileUpdate);
// router.put("/multipleFiles/:multipleFilesId", upload.array("files"), multipleFilesUpdate);




  e.stopPropagation();
  let multipleFilesRes;
    let singleFileRes;
     
     if( singleFileToUpdate){
       
      const formDataFile = new FormData();

      formDataFile.append("file", singleFileToUpdate);
    
       singleFileRes = await axios.put(`/api/putSingleFile/${newProductValue.image._id}`,formDataFile)
     }
     if( multipleFilesToUpdate){
      const formDataFiles = new FormData();

      for (let i = 0; i < multipleFilesToUpdate.length; i++) {
        formDataFiles.append("files", multipleFilesToUpdate[i]);
      }
      
       multipleFilesRes = await axios.put(`/api/putMultipleFiles/${newProductValue.multipleImages._id}`,formDataFiles)

     }

     const res = await axios.put(`/api/editProduct/${product._id}`,newProductValue);
  


}
const images =  newProductValue.multipleImages?.files.map(image=>{
  console.log(image.filePath)
return  <li><img src={"http://localhost:3001/"+image.filePath} /></li>})

const newImages = multipleFilesPreview?.map(image=>{
  
 
return  <li><img src={image} /></li>})

  return (
    <div>
      <button class="mt-6 py-2 px-2 bg-yellow-600 text-gray-800 font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300" onClick={onOpenModal}>EditModel</button>
      <Modal open={open} onClose={onCloseModal} center>
      <form onSubmit={handleSubmit}>

            <input type="text" name="title"  onChange={handleChange} value={newProductValue.title} />
            <input type="text" name="price" onChange={handleNumberChange}  value={newProductValue.price}/>
            <input type="text" name="description" onChange={handleChange}   value={newProductValue.description}/>
          {imagePreviewUrl? <img src={imagePreviewUrl}/> : <img src={newProductValue.image.filePath} /> } 
            <input type="file" name="image" onChange={SingleFileChange}    />
            {multipleFilesPreview.length>0? newImages:images}
            <input type="file" name="image" onChange={MultipleFileChange}  multiple  />

            <button >submit</button>
            
       </form>
      </Modal>
    </div>
  );
};

export default Popup;

