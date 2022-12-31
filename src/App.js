import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import React from "react";
import Otazka from "./Client/Otazka";
import VyberRole from "./Client/VyberRole";
import {checkNode} from "@testing-library/jest-dom/dist/utils";


function App() {

  const [items, setItems] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const [mode, setMode] = useState();



function loadAnimals() {

        fetch(`http://localhost:4000/animals`)
            .then(response => response.json()).then(data => gameItems(data));
setIsPressed(true);
setMode("Animals");
}

function loadFlowers() {

            fetch(`http://localhost:4000/flowers`)
                .then(response => response.json()).then(data => gameItems(data));
    setIsPressed(true);
    setMode("Flowers");
}

    function gameItems(data) {
        if (items == null) {
            setItems(data);
        } else {
            setItems(prevItems => [
                ...prevItems, data
            ]);
        }
    }

    function showItems(){
        console.log(items.length);
    }

    function showPhoto(i){
            if (items == null) {
                return "";
            } else {
                if (i >= items.length){
                    return "https://i.pinimg.com/originals/1a/23/bf/1a23bf41667ecc3ad1c9e588dba61b72.jpg";
                } else {
                    return (items[i].photo);
                }
            }
    }

    const [cisloOtazky, setCisloOtazky] = useState(0);

    function nextQuestion(){
        let nove = cisloOtazky + 1;
        return setCisloOtazky(nove);
    }

    let currentPhoto = showPhoto(cisloOtazky);
    const [body, setBody] = useState(0);

    function storeData(data) {
        setAnswers(prevItems => [
            ...prevItems, data
        ]);
        if (data.odpoved === true){
            let newBody = body + 1;
            setBody(newBody);
        }
        nextQuestion();
    }

    function odpovedi() {
        console.log(answers);
        console.log(body);
    }

    let viewSettings = {};
    let viewGame = {};
    let viewScore = {};



    if (isPressed === false) {
        viewGame.display = "none";
        viewSettings.display = "block";
    } else {
        viewGame.display = "block";
        viewSettings.display = "none";
    }


  return (
      <div className="App">
         <div style={viewSettings}>
             <button className={"button-36"} onClick={loadAnimals}>Zvířata</button>
             <button className={"button-36"} onClick={loadFlowers}>Kytky</button>
         </div>

              <div style={viewGame}>
                  {items != null &&
                      <Otazka mode={mode} photo={currentPhoto} name={items[cisloOtazky].name} qNumber={cisloOtazky}
                              onNextQuestion={storeData}/>
                  }
                  <br/>
              </div>
          <div style={viewScore}>
              <h1>Počet správných odpovědí: </h1>
              <h2>{body}</h2>
          </div>
      </div>
  );
}



export default App;

