import React, {useCallback, useState} from "react";

var axios = require('axios');


function VyberRole(props) {

    const [testCode, setTestCode] = useState();
    const [selectedCategory, setSelectedCategory] = useState();

    const triggerAPI = useCallback(async () => {
        // Use async await instead of chained promise
        const res = await axios.post("http://localhost:8000", { code: testCode });
        console.log(res)
    }, [testCode]);



    const [code, setCode] = useState();

    function handleCode(e) {
        setCode(e.target.value);
    }

    function passCode() {
        triggerAPI();
        props.handleTest(code);
    }

    return(
        <div>
            <input type={"text"} onChange={handleCode}/>
            <button type={"submit"} onClick={passCode}>Začít test</button>
            <br/>
            <button type={"submit"}>Vytvořit test</button>
        </div>
    )
}

export default VyberRole;