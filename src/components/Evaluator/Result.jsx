import "./Result.css";

export default function Result ({automata,cadenas}){
    let response = verifyAutomata(automata);
    console.log(response)
    
    //Sin error
    if (response == null){
        let answers = evaluateAutomata(automata,cadenas);
        console.log(answers);
        return(
            <div className="resultado-container">
            <h2 className="resultado-titulo">Resultado</h2>
            <p>Aquí van los resultados:</p>
            <ol className="resultado-lista">
                {answers.map((answer, index) => (
                    <li key={index}>{answer}</li>
                ))}
            </ol>
        </div>
        )
    }

    //Responde error
    else {
        return(
            <div className="resultado-container">
                <h2 className="resultado-titulo">{response}</h2>
            </div>
        )
    }
}

function verifyAutomata(automata){
    let error = null;
    //console.log(automata.alphabet);
    //console.log(automata.alphabet.length);
    
    //Verificar alfabeto
    automata.alphabet.forEach(element => {
        if(element.length>1){
            //console.log(element);
            error = "Error la logitud de un caracter del abecedario es mayor a 1";
        }
    }); 

    //Verificar estado inicial considerando que solo puede haber un estado inicial y que este debe estar en los estados
    if(!automata.states.includes(automata.initialState )){
        error = "Error el estado inicial no se encuentra en los estados";
    }


    //Verificar estados finales considerando que este debe estar en los estados
    automata.finalStates.forEach(element => {
        if(!automata.states.includes(element)){
            error = "Error un estado final no se encuentra en los estados";
        }
    });


    //Verificar transiciones considerando que los estados de origen y destino deben estar en los estados y los caracteres de transicion deben estar en el alfabeto
    automata.transitions.forEach(element => {

        if(!automata.states.includes(element[0])){
            error = `Error: el estado de origen '${element[0]}' no se encuentra en los estados`;
        }
        
        else 
        if (!(automata.alphabet.includes(element[1]) || element[1] === '' || element[1] === "ε" || element[1] === "E" || element[1] === "")){
            error =  `Error: el carácter de transición '${element[1]}' no se encuentra en el alfabeto`;
        }
        
        else if(!(automata.states.includes(element[2]) || element[2] === "-")){
            error = `Error: el estado de destino '${element[2]}' no se encuentra en los estados`;
        }
    });

    return error;

}

function evaluateAutomata(automata,cadenas){
    const automaton = new FiniteAutomaton();
    automaton.setInitialState(automata.initialState);
    automaton.setFinalStates(automata.finalStates);
    console.log(automata.transitions)

    automata.transitions.forEach(transicion => automaton.addTransition(transicion[0],transicion[1],transicion[2]));
    let response = [];
    
    console.log(cadenas);
    cadenas.forEach(cadena => {
        //console.log(`${cadena}: ${automaton.evaluateStr(cadena)}`);
        response.push(`${cadena}: ${(automaton.evaluateStr(cadena))?("  Pertenece al lenguaje"):("  No pertenece al lenguaje")}   `);
    });
    
    return response;
}

class FiniteAutomaton {
    constructor() {
        this.initial = "";
        this.finalStates = [];
        this.transitions = {};
    }

    addTransition(fromState, symbol, toState) {
        this.transitions[fromState] ??= {};
        this.transitions[fromState][symbol] ??= [];
        this.transitions[fromState][symbol].push(toState);   
    }
    // modificar para soportar Transiciones con Épsilon y con Estados de error de un automata finito


    evaluateStr(str, currentState = this.initial, currentIndex = 0) {    
        if (currentIndex >= str.length) {
            // Check if the current state is a final state
            return this.finalStates.includes(currentState);
        }

        // Handle epsilon transitions (transitions with symbol 'ε')
        const epsilonTransitions = this.transitions[currentState]?.['ε'] || [];
        const epsilonResult = epsilonTransitions.some(nextState => 
            this.evaluateStr(str, nextState, currentIndex)
        );
        if (epsilonResult) {
            return true;
        }

        // Handle normal transitions
        const possibleTransitions = this.transitions[currentState]?.[str[currentIndex]] || [];
        return possibleTransitions.some(nextState => 
            this.evaluateStr(str, nextState, currentIndex + 1)
        );
    }

    setInitialState(state) {
        this.initial = state;
    }
    
    setFinalStates(states) {
        this.finalStates = states;
    }
    
}

