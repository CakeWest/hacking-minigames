import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import AlienIsolation from "components/AlienIsolation.js";

import "./app.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AlienIsolation />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
