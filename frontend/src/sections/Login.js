import { useState} from "react";

import axios from "axios";


function Login() {
  const [value, setValue] = useState("");
  

  const handleChange = (e) => {
    e.preventDefault();
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });

    
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   

    await axios
      .post("/api/login", value)
      .then((res) => {
        
        localStorage.setItem('auth-token',res.data.token);
       


      })
      .catch((err) => {
        console.log(err);
      });

    

    // if(user.headers['auth-token']){
    //   localStorage.setItem('isLoggedIn',true);
    //   localStorage.setItem('user',user.headers['auth-token']);
    //   window.location.replace(`/`);
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder ="useruname" onChange={handleChange} />
        <input type="text" name="password" placeholder ="password" onChange={handleChange} />

        <button>submit</button>
        
      </form>
    </div>
  );
}

export default Login;