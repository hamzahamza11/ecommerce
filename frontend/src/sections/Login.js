import { useState } from "react";

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
        localStorage.setItem("auth-token", res.data.token);
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
    <div className="containera">
      <form onSubmit={handleSubmit}>


      {/* <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">@</span>
  </div>
  <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
</div> */}


        <div class="form-group">
          <label> user name</label>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="useruname"
            onChange={handleChange}
          />
        </div>
        

        <div class="form-group">
          <label> password</label>
          <input
            type="text"
            className="form-control"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
           <small className="text-muted">passsword must be 8 characters</small>
        </div>
       

        <button className="btn  btn-lg  btn-success">submit</button>
      </form>
    </div>
  );
}

export default Login;
