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
    <section class="flex justify-center items-center h-screen bg-gray-800">
    <form onSubmit={handleSubmit} class="max-w-md w-full bg-gray-900 rounded p-6 space-y-4">
        <div class="mb-4">
            <p class="text-gray-400">Sign In</p>
            <h2 class="text-xl font-bold text-white">Join our community</h2>
        </div>
        <div>
            <input class="w-full p-2 mb-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text"
          
            name="username"
            placeholder="useruname"
            onChange={handleChange}/>
        </div>
        <div>
            <input class="w-full p-2  mb-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text"
            
            name="password"
            placeholder="password"
            onChange={handleChange}/>
        </div>
        <div>
            <button type="submit" class="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200">Sign In</button>
        </div>
        <div class="flex items-center justify-between">
            <div class="flex flex-row items-center">
                <input type="checkbox" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"/>
                <label for="comments" class="ml-2 text-sm font-normal text-gray-400">Remember me</label>
            </div>
            <div>
                <a class="text-sm text-blue-600 hover:underline" href="#">Forgot password?</a>
            </div>
        </div>
    </form>
   
</section>
    
  );
}

export default Login;
