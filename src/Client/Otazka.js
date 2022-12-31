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

        let odpoved;

        if (pickedName == props.name){
            alert("Správně");
            odpoved = true;
        } else {
            alert("špatně!");
            odpoved = false;
        }

        const data = {
            name: pickedName,
            qNumber: qNumber,
            odpoved: odpoved
        }
        props.onNextQuestion(data);
    }

    function handleName(e) {
        setPickedName(e.target.value);
    }



    return(
        <div>
            <img className={"img-center"} src={props.photo}/>
            <br/>
            <h1>Co je na obrázku ?</h1>
            <input type={"text"} onChange={handleName}/>
            <button className={"button-34"} type={"submit"} onClick={saveAnswer}>Odpovědět</button>
        </div>
    );
}

export default Otazka;