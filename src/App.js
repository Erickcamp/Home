import React from 'react';
import './App.css';
import routes from './routes'
import Nav from './components/Nav/Nav'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <div className="App">
      <Nav />
      {routes}
      <ToastContainer />
    </div>
  );
}

export default App;
