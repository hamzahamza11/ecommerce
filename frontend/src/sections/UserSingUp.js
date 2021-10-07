


import {useState} from "react";

import axios from "axios"


function UserSingUp(){

    const [value,setValue] = useState("");

    const handleChange= (e)=>{
        setValue({...value,
            [e.target.name]:e.target.value
        })

        console.log(value);
    }

  

    const handleSubmit = async (e)=>{
 
         const res = await axios.post("/api/singUp",value);
         console.log(res);
 

    }
    

 
    return(
        <div>

        <form onSubmit={handleSubmit}>

            <input type="text" name="username" placeholder="username" onChange={handleChange} />
           
            <input type="text" name="password" placeholder="password" onChange={handleChange} />
            <input type="text" name="email" placeholder="email" onChange={handleChange}   />
            <input type="text" name="name" placeholder="name" onChange={handleChange}   />


            <button>submit</button>
            
       </form>     

        </div>
    )
}

export default UserSingUp;