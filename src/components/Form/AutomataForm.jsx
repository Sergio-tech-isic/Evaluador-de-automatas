import { useState } from "react";
import "./AutomataForm.css";
import Result from "../Evaluator/Result";

export default function AutomataForm() {
    const [alphabet, setAlphabet] = useState("a,b");
    const [states, setStates] = useState("q0,q1,q2,q3");
    const [initialState, setInitialState] = useState("q0");
    const [finalStates, setFinalStates] = useState("q2,q3");
    const [transitions, setTransitions] = useState([
        "q0,a,q1",
        "q0,a,q3",
        "q0,b,-",
        "q1,a,-",
        "q1,b,q2",
        "q2,a,q1",
        "q2,b,-",
        "q3,a,-",
        "q3,b,q3"
    ]);

    const [strings, setStrings] = useState(["a","b","ab","abbbb","ba","ababab","abababa"]);
    const [content, setContent] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        const automata = {
            alphabet: alphabet.split(",").map((a) => a.trim()),
            states: states.split(",").map((s) => s.trim()),
            initialState: initialState.trim(),
            finalStates: finalStates.split(",").map((f) => f.trim()),
            transitions: transitions.map(t => {
                const [from, symbol, to] = t.split(",");
                return [from.trim(), symbol.trim(), to.trim()];
            })
        };
        setContent(<Result automata={automata} cadenas={strings}  />)

        
        console.log("Automata Data:", automata);
    };


    const addTransition = () => {
        setTransitions([...transitions, ""]);
    };

    const updateTransition = (index, value) => {
        const newTransitions = [...transitions];
        newTransitions[index] = value;
        setTransitions(newTransitions);
    };

    const removeTransition = (index) => {
        setTransitions(transitions.filter((_, i) => i !== index));
    };


    const addString = () => {
        setStrings([...strings, ""]);
    };

    const updateString = (index, value) => {
        const newStrings = [...strings];
        newStrings[index] = value;
        setStrings(newStrings);
    };

    const removeString = (index) => {
        setStrings(strings.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="container">
            <h2 className="title">Ingrese el Automata</h2>
            <form onSubmit={handleSubmit} className="form">
                    <p>Alfabeto separados por comas sin espacios:</p>
                    <input
                        type="text"
                        placeholder="a,b,c"
                        value={alphabet}
                        onChange={(e) => setAlphabet(e.target.value)}
                        required
                    />
                    <br />

                    <p>Estados separados por comas sin espacios:</p>
                    <input
                        type="text"
                        placeholder="q0,q1,q2"
                        value={states}
                        onChange={(e) => setStates(e.target.value)}
                        required
                    />
                    <br />

                    <p>Estado inicial</p>
                    <input
                        type="text"
                        placeholder="q0"
                        value={initialState}
                        onChange={(e) => setInitialState(e.target.value)}
                        required
                    />
                    <br />

                    <p>Estados finales separados por comas sin espacios:</p>
                    <input
                        type="text"
                        placeholder="q0,q2"
                        value={finalStates}
                        onChange={(e) => setFinalStates(e.target.value)}
                        required
                    />
                    <br />

                    <p>Transiciones <br />
                        Formato: <br />
                        q0,a,q1 <br />
                        q1,b,q2 <br />
                        q2,a,-
                    </p>

                    {transitions.map((str, index) => (
                        <div key={index} className="entradas">
                            <input
                                type="text"
                                placeholder="q0,a,q1"
                                value={str}
                                onChange={(e) => updateTransition(index, e.target.value)}
                                required
                            />
                            <button className="x" type="button" onClick={() => removeTransition(index)} >
                                X
                            </button>
                        </div>
                    ))}

                    <button className="agregar" type="button" onClick={addTransition}>
                        Agregar transicion
                    </button>

                    <h3>Cadenas a evaluar</h3>
                    {strings.map((str, index) => (
                        <div key={index} className="entradas">
                            {index+1}
                            <input
                                type="text"
                                placeholder="Ingresar cadena"
                                value={str}
                                onChange={(e) => updateString(index, e.target.value)}
                            />
                            <button className="x" type="button" onClick={() => removeString(index)} >
                                X
                            </button>
                        </div>
                    ))}

                    <button className="agregar" type="button" onClick={addString}>
                        Agregar cadena
                    </button>
                    <button className="evaluar" type="submit">
                        Evaluar
                    </button>
                </form>
            </div>
            {content}
        </div>
        
    );
}
