import mocks from './mocks.js';
import {useState} from 'react';

function Business(props) {

    const handleClick = () => {
        props.setKeys(prev => {
            console.log(`func check ${props.name} got code: ${props.code}`);
            const newKeys = [...prev];  

            const i = newKeys.findIndex(data => data.name == props.name);

            if (i == -1) {
                newKeys.push({name: props.name, code: props.code});  
            } else {
                newKeys.filter(data => data.name !== props.name);
            }

            return newKeys;  
        });
    }

    console.log(`The ${props.name} got code: ${props.code}`)
    
    function renderVisited() {
    
    }

    return (
        <div className="business">
            <h1>{props.name}</h1>
            <button onClick={handleClick}>Visit</button>
            <button>Check Visited</button>
        </div>
    )
}

export default Business;