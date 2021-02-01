import HomePage from "./Component/HomePage"
import AddProduct from "./Component/addProduct"
import EditProduct from "./Component/EditProduct"
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


function App() {
  return (
    <div >
      <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <HomePage/>} />
        <Route exact path="/editProduct/:id" render={(props) => <EditProduct {...props}/>} />
        <Route exact path="/addProduct" render={() => <AddProduct/>} />

       </Switch>
       
       </BrowserRouter>
        







      
    </div>
  );
}

export default App;
