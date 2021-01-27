import {useState,useEffect}from "react"
import axios from "axios"


export const DeleteProduct=(id)=>{

    useEffect(async () => {
        const res = await axios.delete(`/api/deleteProduct/${id}`);
       console.log(res);
    });



}