import { useState, useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { UserContext } from "../contexts/userContext";

function Header() {
  const [user, setUser] = useState("");
  const { userData, setUserData } = useContext(UserContext);
  console.log(userData._id);

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
  };

  // const googleFailure = ()=>{
  //     console.log("err")
  // }
  // const googleSucces = async (res)=>{
  //     console.log(res)
  //     const result = res?.profileObj;
  //     const token = res?.tokenId;

  //     try {

  //         setUser(result);
  //         localStorage.setItem('profile',JSON.stringify({result}))
  //        console.log(result)

  //     }catch (err){
  //         console.log(err)

  //     }

  // }

  return (
//     <div>
//       <div>
//         <a href="/products">home</a>
//       </div>
//       <div>
//         <a href="/admin">AdminPage</a>
//       </div>
//       {userData.role === "user" ? (
//         <div>
//           <a href="/orders">Orders</a>
//         </div>
//       ) : null}
//       <div>
//         <a href="/login">login</a>
//       </div>
//       <div>
//         <a href="/singUp">singUp</a>
//       </div>
//       <div>
//         <a href="/logout" onClick={logout}>
//           logout
//         </a>
//       </div>
//       {/* <GoogleLogin 
// onSuccess={googleSucces}
// onFailure={googleFailure}
// cookiePolicy="single_host_origin"
// clientId="279669497597-i6nogl54k60dl987i9qjhgp8siu26ugp.apps.googleusercontent.com"
// render={(renderProps)=>{
//     return(<button onClick={renderProps.onClick} disabled={renderProps.disabled} >google</button>)
    

// }}
// />  */}

<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Shop</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/products">Home <span class="sr-only">(current)</span></a>
      </li>
      {userData.role === "user" ? <li class="nav-item">
        <a class="nav-link" href="/admin">Admin</a>
      </li> : null}

      {userData.role === "user" ? <li class="nav-item">
      <a class="nav-link" href="/orders">Orders</a>
      </li> : null}
      
      <li class="nav-item">
        <a class="nav-link" href="/singUp">Sign</a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/login">Login</a>
      </li>
   
      
    </ul>

    <button href="/login" class="btn btn-outline-light ml-auto" onChange={logout}>Logout</button>
    
   
      
    
    
    
     

    
     
    
    
  </div>
</nav>
    // </div>
  );
}

export default Header;
