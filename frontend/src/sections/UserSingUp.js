import { useEffect, useState } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";

function UserSingUp() {
  const history = useHistory();

  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  // const [oldInput] =

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });

   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/singUp", value);
      history.push("/login")
    } catch (err) {
      setError(err.response.data);
      console.log(error);
    }
  };

  const errorFiled = (key)=>
      error.errorMessage?.find(e=> e.param === key)
  
    
const errorMsg = (key) => error.errorMessage?.map(e => {if(e.param === key){
    return e.msg;
}})

  return (
    <div>
      {console.log("heySingUp")}

      <form onSubmit={handleSubmit}>
      {errorFiled("username")? errorMsg("username") : null}
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
{errorFiled("password")? errorMsg("password") : null}
        <input
          type="text"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <input
          type="text"
          name="confirmPassword"
          placeholder="confirmPassword"
          onChange={handleChange}
        />
        {errorFiled("email")? errorMsg("email") : null}
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        {errorFiled("name")? errorMsg("name") : null}
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
        />

        <button>submit</button>
      </form>
    </div>
  );
}

export default UserSingUp;
