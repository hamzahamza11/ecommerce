import { useContext, useState, useEffect } from "react";
import axios from "axios";
// import HomePage from "./Component/HomePage";
// import AddProduct from "./Component/addProduct";
// import EditProduct from "./Component/EditProduct";

// import Login from "./auth/login"
// import Cart from "./Component/Cart/cart";

////new components
import Footer from "./components/Footer";
import Header from "./components/Header";
import AdminPage from "./sections/AdminPage";
import Products from "./sections/Products";
import Login from "./sections/Login";
import UserSingUp from "./sections/UserSingUp";
import ProductProfile from "./sections/ProductProfile";
import Orders from "./sections/Orders";
import { UserContext } from "./contexts/userContext";
import {ProductProfileProvider} from "./contexts/productProfileContext"

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post("/api/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      console.log(tokenResponse.data);
      if (tokenResponse.data) {
        setUserData(tokenResponse.data.User);
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <ProductProfileProvider>
          <Header />.{" "}
          <Switch>
            {/* <Route exact path="/" render={() => <HomePage />} /> */}
            <Route exact path="/admin" render={() => <AdminPage />} />
            <Route exact path="/singUp" render={() => <UserSingUp />} />
            <Route exact path="/products" render={() => <Products />} />
            <Route
              exact
              path="/productProfile/:id"
              render={(props) => <ProductProfile {...props} />}
            />
            
            <Route exact path="/orders" render={() => <Orders />} />
            {/* <Route
              exact
              path="/editProduct/:id"
              render={(props) => <EditProduct {...props} />}
            />
            <Route exact path="/addProduct" render={() => <AddProduct />} /> */}
            <Route exact path="/login" render={() => <Login />} />
            <Route
              exact
              path="/hey"
              render={() =>
                localStorage.getItem("isLoggedIn") ? (
                  <h1>logged in </h1>
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
          <Footer />
          </ProductProfileProvider>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
