import {useState} from "react";
import PopupAddProduct from "../components/AddProduct"
export default function AdminPage(){

    const [openManagingProduct,SetOpenManaginProduct] = useState(true);
    const [openManagingPermisions,SetOpenManaginPermissions] = useState(false);
    const [openStatistiques,setOpenStatistiques] = useState(false);


  const handleOpenManagingProducts = (e)=>{
      e.preventDefault()
      SetOpenManaginProduct(true);
      SetOpenManaginPermissions(false);
      setOpenStatistiques(false);
  }

  const handleOpenManagingPermisions =  (e)=>{
    e.preventDefault()
    SetOpenManaginProduct(false);
    SetOpenManaginPermissions(true);
    setOpenStatistiques(false);
}

const handleOpenStatistiques = (e)=>{
    e.preventDefault()
    SetOpenManaginProduct(false);
    SetOpenManaginPermissions(false);
    setOpenStatistiques(true);
}

    return(
        <div className="bg-gray-900 p-20 h-screen ">
        <div>
            <button
            onClick={handleOpenManagingProducts}
            >products</button>
            <button
            onClick={handleOpenManagingPermisions}
            >permissions</button>
            <button
            onClick={handleOpenStatistiques}>statistiques</button>
        </div>

        {
            openManagingProduct? <PopupAddProduct /> : null
        }
        {
            openManagingPermisions? <h1>Permissions</h1> : null
        }
         {
           openStatistiques? <h1>statistiques</h1> : null
        }


        </div>
       
    )

}