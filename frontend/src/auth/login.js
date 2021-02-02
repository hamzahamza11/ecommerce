
import {useState,useEffect} from "react";

import axios from "axios"
import { useParams } from "react-router-dom";


function Login(){

    const [value,setValue] = useState("");

    const handleChange = (e)=>{
        e.preventDefault();
        setValue({
            ...value,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = async () => {
        let user = await axios.post('/api/login',value);
        //console.log(user);
        if(user.headers['auth-token']){
          localStorage.setItem('isLoggedIn',true);
          localStorage.setItem('user',user.headers['auth-token']);
          window.location.replace(`/`);
        }
      }


   


    

 
    return(
        <div>

        <form onSubmit={handleSubmit}>

      
            <input type="text" name="username" onChange={handleChange}  />
            <input type="text" name="password" onChange={handleChange}   />

            <button>submit</button>
            
       </form>     

        </div>
    )
}

export default Login;
