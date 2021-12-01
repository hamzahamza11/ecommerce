import { useState } from "react";
import useForm from "../hooks/useForm";
import axios from "axios";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

function PopupAddProduct() {
  const [open, setOpen] = useState(false);

  const [value, setValue, reset] = useForm("");
  const [singleFile, setSingleFile] = useState("");
  const [multipleFiles, setMultipleFiles] = useState("");
  const [multipleFiles1, setMultipleFiles1] = useState([]);
  const [title, setTitle] = useState("");
  const [singleProgress, setSingleProgress] = useState(0);
  const [multipleProgress, setMultipleProgress] = useState(0);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imagesPreviewUrl, setImagesPreviewUrl] = useState("");

  const [singleFileError,setSingleFileError] = useState("")
  const [multipleFileError,setMultipleFileError] = useState("")
  const [productError,setProductError] = useState([])

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });

    console.log(value);
  };
  const SingleFileChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    setSingleFile(e.target.files[0]);
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
    setMultipleFiles1(ImagesArray);
    console.log("file", multipleFiles1);
    setMultipleFiles(e.target.files);
    
    
    setMultipleProgress(0);
  };
  const singleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setSingleProgress(percentage);
    },
  };
  const mulitpleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
    },
  };

  const handleNumberChange = (e) => {
    const price = Number(e.target.value);

    setValue({
      ...value,
      [e.target.name]: price,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let multipleFilesRes;
    let singleFileRes;

    if (singleFile) {
      const formDataFile = new FormData();

      formDataFile.append("file", singleFile);

      try {
        
      singleFileRes = await axios.post("/api/singleFile", formDataFile);

      console.log(singleFileRes.data._id);
        
      } catch (error) {
        setSingleFileError(error)
        console.log(singleFileError)
        
      }

    }
    if (multipleFiles) {
      const formDataFiles = new FormData();

      

      for (let i = 0; i < multipleFiles.length; i++) {
        formDataFiles.append("files", multipleFiles[i]);
      }
      console.log("multiple: " + formDataFiles);
      try {
        multipleFilesRes = await axios.post("/api/multipleFiles", formDataFiles);
      console.log("multiple: " + multipleFilesRes);
        
      } catch (error) {
        setMultipleFileError(error)
        console.log(multipleFileError)
        
        
      }
      
    }

    if(!multipleFiles){
      const formDataFiles = new FormData();

      
      formDataFiles.append("files", multipleFiles);
      
     
      multipleFilesRes = await axios.post("/api/multipleFiles", formDataFiles);
     
    }
        
    
try {
  const res = await axios.post("/api/addProduct", {
    ...value,
    singleFileId: singleFileRes?.data._id,
    multipleFileId: multipleFilesRes?.data._id,
  });
  
} catch (error) {
  setProductError(error.response.data)
  console.log(productError)

  
}
    
  };

const images = 
    multipleFiles1.map(img=>{
        return <img src={img}/>
    })


  return (
    <div>
      <button onClick={onOpenModal}>Open modal</button>
      <Modal open={open} onClose={onCloseModal} center>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" name="title" placeholder="title" onChange={handleChange} />
          <input type="text" name="price" placeholder="price" placeonChange={handleNumberChange} />
          <textarea name="description" placeholder="description" onChange={handleChange} />
          {imagePreviewUrl ? (
            <img src={imagePreviewUrl} />
          ) : (
            <div>Please select an Image for Preview</div>
          )}
          <input type="file" name="file" onChange={SingleFileChange} />
          {
              multipleFiles1? images :null
          }
<div className="custom-file">
<input
            type="file"
            className="custom-file-input"
            name="files"
            onChange={MultipleFileChange}
            multiple
          />
</div>
          
          <button>submit</button>
        </form>
      </Modal>
    </div>
  );
}

export default PopupAddProduct;
