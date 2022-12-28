import React, {useEffect, useState} from "react";

function Otazka(props) {

    const [pickedName, setPickedName] = useState();
    const [qNumber, setQNumber] = useState(props.qNumber);

    useEffect(() =>{
        setQNumber(props.qNumber);
    })

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

    return(
        <div>
            <img className={"img-center"} src={props.photo}/>
            <br/>
            <input type={"checkbox"} value={props.name} onChange={handleName}/>
            <label>{props.name}</label>
            <br/>
            <input type={"checkbox"} value={props.name}/>
            <br/>
            <button type={"submit"} onClick={saveAnswer}>Uložit odpověď</button>
        </div>
    );
}

export default Otazka;