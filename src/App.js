import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./components/routes/Landing/Landing";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Listing from "./components/routes/Listing/Listing";
import Cart from "./components/routes/Cart/Cart";
import Register from "./components/routes/Resigter/Register";
import LogIn from "./components/routes/LogIn/LogIn";
import thunk from "redux-thunk";
import rootReducer from "./redux/rootReducer";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

export default function App() {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <div className="container content">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route exact path="/listing" component={Listing} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={LogIn} />
          </Switch>
        </BrowserRouter>
      </div>
      <Footer />
    </Provider>
  );
}
