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

    //Verificar estado inicial
    //aqui ha y aasdlfkjsdalf

    //Verificar estados finales


    //Verificar transiciones

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

    evaluateStr(str, currentState = this.initial, currentIndex = 0) {    
        if (currentIndex >= str.length) {
            return this.finalStates.includes(currentState);
        }

        const possibleTransitions = this.transitions[currentState]?.[str[currentIndex]] || [];

        return possibleTransitions.some(nextState => 
            this.transitions[nextState] && this.evaluateStr(str, nextState, currentIndex + 1)
        );
    }

    setInitialState(state) {
        this.initial = state;
    }
    
    setFinalStates(states) {
        this.finalStates = states;
    }
    
}