import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import React from "react";


function App() {

  const [items, setItems] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      fetch("/database")
          .then(response => response.json())
          .then(data => console.log(data));
  },[]);


  return (
      <div className="App">

      </div>
  );
}



export default App;
