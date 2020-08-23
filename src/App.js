import React from 'react';
import './styles/App.css';
import AppRoute from "./router";
import Header from "./Header";

function App() {
  return (
    <div className="App">
      <Header/>
    <AppRoute/>
    </div>
  );
}

export default App;
