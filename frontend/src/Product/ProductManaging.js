
import axios from "axios"



export const deleteProduct= async (id)=>{

        window.location.reload();
        const res = await axios.delete(`/api/deleteProduct/${id}`);
        console.log(res);
}

export const addToCart = async (id)=>{
        const res = await axios.post(`/api/addToCart/${id}`)

}



