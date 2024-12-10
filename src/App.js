import React from 'react';
import { BrowserRouter as Browser } from 'react-router-dom';
import MainNavBar from "./main/MainNavBar";
import "../src/main/style.css"
function App() {
  return (
    <Browser>
      <div align="center">
        <MainNavBar />
      </div>
    </Browser>
  );
}

export default App;
