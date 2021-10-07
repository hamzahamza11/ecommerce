import {useState,useReducer,useContext} from "react";
import {GoogleLogin} from "react-google-login"
import { UserContext } from "../../contexts/userContext";





function Header(){

    const [user,setUser] = useState("");
    const { userData, setUserData } = useContext(UserContext);
    console.log(userData.role)
    

    const logout = (e)=>{
        e.preventDefault()
        localStorage.clear();

    }

    
    

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
 
    return(
        <div>

<div><a href="/">home</a></div>
<div><a href="/AddProduct">AddProduct</a></div>
{userData.role==="user"?<div><a href="/cart">Cart</a></div>:null}
<div><a href="/login">login</a></div>
<div><a href="/singUp">singUp</a></div>
<div><a href="/logout" onClick={logout}>logout</a></div>
{/* <GoogleLogin 
onSuccess={googleSucces}
onFailure={googleFailure}
cookiePolicy="single_host_origin"
clientId="279669497597-i6nogl54k60dl987i9qjhgp8siu26ugp.apps.googleusercontent.com"
render={(renderProps)=>{
    return(<button onClick={renderProps.onClick} disabled={renderProps.disabled} >google</button>)
    

}}
/>  */}
     </div>
    )
}

export default Header;
