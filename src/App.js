import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import React from "react";


function App() {

  const [items, setItems] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/', {
      method: 'GET',
      withCredentials: true,
      crossorigin: true,
      mode: 'no-cors',
    })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
  },[]);


  return (
      <div className="App">

      </div>
  );
}



export default App;
