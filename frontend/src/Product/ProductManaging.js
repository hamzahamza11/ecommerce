
import axios from "axios"



export const deleteProduct= async (id)=>{

        window.location.reload();
        const res = await axios.delete(`/api/deleteProduct/${id}`);
        console.log(res);
}



