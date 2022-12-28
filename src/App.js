import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import React from "react";
import Otazka from "./Client/Otazka";
import VyberRole from "./Client/VyberRole";


function App() {

  const [items, setItems] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [testID, setTestID] = useState();



    useEffect(() => {
        fetch(`http://localhost:4000/database`)
            .then(response => response.json()).then(data => gameItems(data));
    }, [1]);

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

    function storeData(data) {
        setAnswers(prevItems => [
            ...prevItems, data
        ]);
    }

    function odpovedi() {
        console.log(answers);
    }

    let viewSettings = {};
    let viewGame = {};

    if (testID == null) {
        viewGame.display = "none";
        viewSettings.display = "block";
    } else {
        viewGame.display = "block";
        viewSettings.display = "none";
    }

    function testCode(code) {
        setTestID(code);
    }

  return (
      <div className="App">
         <div style={viewSettings}>
             <VyberRole handleTest={testCode}/>
         </div>
          <div style={viewGame}>
              <button type={"submit"} onClick={nextQuestion}>Další otázka</button>
              <button type={"submit"} onClick={showItems}>otázka</button>
              <Otazka photo={currentPhoto}  qNumber={cisloOtazky} onNextQuestion={storeData}/>
              <button onClick={odpovedi}>Odpovědi</button>
          </div>
      </div>
  );
}



export default App;
