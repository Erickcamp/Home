import React from 'react';
import './App.css';
import routes from './routes'
import Nav from './components/Nav/Nav'

function App() {
  return (
    <div className="App">
      <Nav />
      {routes}
    </div>
  );
}

export default App;
