import React, { Component } from "react";
import "./App.css";

import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import MainComponent from "./components/MainComponent";



const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      //<AppOffer />
       <Provider store={store}>
       <BrowserRouter>
         <MainComponent />
       </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
