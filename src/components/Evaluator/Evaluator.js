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

const automaton = new FiniteAutomaton();

automaton.addTransition("q0",'a',"q1");
automaton.addTransition("q0",'a',"q3");
automaton.addTransition("q0",'b',"-");

automaton.addTransition("q1",'a',"-");
automaton.addTransition("q1",'b',"q2");

automaton.addTransition("q2",'a',"q1");
automaton.addTransition("q2",'b',"-");

automaton.addTransition("q3",'a',"-");
automaton.addTransition("q3",'b',"q3");

automaton.setFinalStates(["q2","q3"]);
automaton.setInitialState("q0");

console.log(`a: ${automaton.evaluateStr("a")}` );
console.log(`b: ${automaton.evaluateStr("b")}` );
console.log(`ab: ${automaton.evaluateStr("ab")}` );
console.log(`abbbb: ${automaton.evaluateStr("abbbb")}` );
console.log(`ba: ${automaton.evaluateStr("ba")}` );
console.log(`ababab: ${automaton.evaluateStr("ababab")}` );
console.log(`abababa: ${automaton.evaluateStr("abababa")}` );