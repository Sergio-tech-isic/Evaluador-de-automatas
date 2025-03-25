import { useState } from "react";
import "./AutomataForm.css";
import Result from "../Evaluator/Result";

export default function AutomataForm() {
    const [alphabet, setAlphabet] = useState("a,b");
    const [states, setStates] = useState("q0,q1,q2,q3");
    const [initialState, setInitialState] = useState("q0");
    const [finalStates, setFinalStates] = useState("q2,q3");
    const [transitions, setTransitions] = useState(
        [   "q0,a,q1",
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
            transitions
            
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
            <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
                <h2 style={{ textAlign: "center" }}>Ingrese el Automata</h2>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

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
                        <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <input
                                type="text"
                                placeholder="q0,a,q1"
                                value={str}
                                onChange={(e) => updateTransition(index, e.target.value)}
                                required
                            />
                            <button type="button" onClick={() => removeTransition(index)} style={{ padding: "5px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer" }}>
                                X
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={addTransition} style={{ padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
                        Agregar transicion
                    </button>

                    <h3>Cadenas a evaluar</h3>
                    {strings.map((str, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <input
                                type="text"
                                placeholder="Ingresar cadena"
                                value={str}
                                onChange={(e) => updateString(index, e.target.value)}
                            />
                            <button type="button" onClick={() => removeString(index)} style={{ padding: "5px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer" }}>
                                X
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={addString} style={{ padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
                        Agregar cadena
                    </button>
                    <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
                        Evaluar
                    </button>
                </form>
            </div>
            {content}
        </div>
        
    );
}
