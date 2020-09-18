import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppContainer from "./components/app-container";

function App() {
  return (
    <div className="App container">
      <nav className="nav">
        <h1>
          Doc Builder
        </h1>
      </nav>
      <AppContainer />
    </div>
  );
}

export default App;
