import React, {useEffect, useState} from "react";

function Otazka(props) {

    const [pickedName, setPickedName] = useState();
    const [qNumber, setQNumber] = useState(props.qNumber);
    const [animals, setAnimals] = useState(null);
    const [flowers, setFlowers] = useState(null);

    useEffect(() =>{
        setQNumber(props.qNumber);
        fetch(`http://localhost:4000/animals`)
            .then(response => response.json()).then(dataAni => gameItemsAni(dataAni));
        fetch(`http://localhost:4000/flowers`)
            .then(response => response.json()).then(dataFlo => gameItemsFlo(dataFlo));
    },[1]);

    function gameItemsAni(data) {
        if (animals == null) {
            setAnimals(data);
        } else {
            setAnimals(prevItems => [
                ...prevItems, data
            ]);
        }
    }

    function gameItemsFlo(data) {
        if (flowers == null) {
            setFlowers(data);
        } else {
            setFlowers(prevItems => [
                ...prevItems, data
            ]);
        }
    }

    function saveAnswer() {
        const data = {
            name: pickedName,
            qNumber: qNumber
        }
        props.onNextQuestion(data);
    }

    function handleName(e) {
        setPickedName(e.target.value);
    }

    const [optOne, setOptOne] = useState();
    const [optTwo, setOptTwo] = useState();


    function pickOptionOne() {
        if (props.mode == "Animals"){
            let nuAni = Math.floor(Math.random() * 10);
            let optName = animals[nuAni].name;
            if (optName !== props.name) {
                setOptOne(optName);
            } else {
                nuAni++;
                setOptOne(optName);
            }

        }
    }

    return(
        <div>
            <img className={"img-center"} src={props.photo}/>
            <br/>
            <input type={"checkbox"} value={props.name} onChange={handleName}/>
            <label>{props.name}</label>
            <br/>
            <input type={"checkbox"} value={props.name}/>
            <label>{optOne}</label>
            <br/>
            <input type={"checkbox"} value={props.name}/>
            <label>{optTwo}</label>
            <br/>
            <button type={"submit"} onClick={saveAnswer}>Uložit odpověď</button>
        </div>
    );
}

export default Otazka;