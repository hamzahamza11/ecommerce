
import {useState,useEffect} from "react";

import axios from "axios"
import { useParams } from "react-router-dom";


function Login(){

    const [value,setValue] = useState("");
    const [user,setUser] = useState("");

    const handleChange = (e)=>{
        e.preventDefault();
        setValue({
            ...value,
            [e.target.name]:e.target.value
        })

        console.log(value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hey");
     
await axios.post('/api/login',value).then(res=>{

    console.log(res);
    console.log("hey2");
}).catch(err=>{
    console.log(err);
})
      
        
            
       
        

       

        console.log(user);

      
        // if(user.headers['auth-token']){
        //   localStorage.setItem('isLoggedIn',true);
        //   localStorage.setItem('user',user.headers['auth-token']);
        //   window.location.replace(`/`);
        // }
      }


   


    

 
    return(
        <div>

        <form onSubmit={handleSubmit}>

      
            <input type="text" name="username" onChange={handleChange}  />
            <input type="text" name="password" onChange={handleChange}   />

            <button>submit</button>
            {user}
            
       </form>     

        </div>
    )
}

export default Login;
