import HomePage from "./Component/HomePage"
import AddProduct from "./Component/addProduct"
import EditProduct from "./Component/EditProduct"
import Footer from "./Component/headFoot/footer"
import Header from "./Component/headFoot/header"
import Login from "./auth/login"
import Cart from "./Component/Cart/cart"
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


function App() {
  return (
    <div >
      <BrowserRouter>
      <Header/>
.      <Switch>
        <Route exact path="/" render={() => <HomePage/>} />
        <Route exact path="/cart" render={() => <Cart/>} />
        <Route exact path="/editProduct/:id" render={(props) => <EditProduct {...props}/>} />
        <Route exact path="/addProduct" render={() => <AddProduct/>} />
        <Route exact path="/login" render={() => <Login/>} />
        <Route exact path="/hey" render={() =>
           localStorage.getItem("isLoggedIn") ?(<h1>logged in </h1>):(<Redirect to="/login" />)
          } />
        

      </Switch>
      <Footer/>

       
       </BrowserRouter>
        







      
    </div>
  );
}

export default App;
