import React, {useState} from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormCheck from 'react-bootstrap/FormCheck';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { normal, symbol, other } from "./options";

import "./styles.css";
/*
Password Generator
Made by Magnus Jackson on 17/12/2021
Does not have any dependencies
Does not require any props
*/
export default function Password_Generator():JSX.Element {
    // states
    const [size, setSize] = useState(5);
    const [caps, setCaps] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [symbols, setSymbols] = useState(false);
    const [otherVal, setOther] = useState(false);
    const [generatedPass, setPass] = useState("Generate a Password");

    // types of states
    type stateType = 'caps' | 'numbers' | 'symbols' | 'otherVal' | "normal";

    const getActive = (options: boolean[]): stateType[] => {
        let names: stateType[] = ["caps", "numbers", "symbols", "otherVal"];
        let returnString: stateType[] = []; 
        for (let i in options) {
            if (options[i]){
                returnString.push(names[i])
            }
        }
        return returnString;
    }

    // gets random number from 0 to max
    function getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
      }
    
    // generates the password
    const generate_Password = () => {
        let pass: string = "";
        let options = [caps, numbers, symbols, otherVal];
        let active = getActive(options);
        active.push('normal');
        for (let i = 0; i <= size; i++) {
            let random = getRandomInt(active.length);
            switch (active[random]) {
                case "caps":
                    // logic for caps
                    let randomCaps = getRandomInt(normal.length);
                    pass += normal[randomCaps].toUpperCase();
                    break;
                case "numbers":
                    // logic for numbers
                    let randomNumber = getRandomInt(9);
                    pass += randomNumber.toString();
                    break;
                case "symbols": 
                    // logic for symbols
                    let randomSymbol = getRandomInt(symbol.length);
                    pass += symbol[randomSymbol];
                    break;
                case "otherVal":
                    // Logic for otherVals
                    let randomOther = getRandomInt(other.length);
                    pass += other[randomOther];
                    break;
                case "normal":
                    // logic for normal
                    let randomNormal = getRandomInt(normal.length);
                    pass += normal[randomNormal];
                    break;
            }
        }
        setPass(pass);
    }

    // returns JSX
    return (
        <div className="container">
            <Form>
                <h3><u>Password Generator</u></h3>
                <Form.Group>
                    <Form.Label>Size {size}</Form.Label><br/>
                    <Form.Range min={3} max={25} value={size} onChange={(e:any) => setSize(parseInt(e.target.value))} style={{width: "80%"}} />
                </Form.Group>
                {/* Options */}
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Check type="checkbox" label="Caps" onChange={() => setCaps(!caps)} />
                            <Form.Check type="checkbox" label="Numbers" onChange={() => setNumbers(!numbers)} />
                        </Col>
                        <Col>
                            <Form.Check type="checkbox" label="Symbols" onChange={() => setSymbols(!symbols)} />
                            <Form.Check type="checkbox" label="Other Characters ({}, (), <>, ...)" onChange={() => setOther(!otherVal)} />
                        </Col>
                    </Row>
                </Form.Group>
                <Button type="button" onClick={() => generate_Password()} variant="primary">Generate</Button>
            </Form>
            <div className="Output">
                <h3>{generatedPass}</h3>
            </div>
        </div>
    );
}