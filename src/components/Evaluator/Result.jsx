
export default function Result ({automata,cadenas}){
    let response = verifyAutomata(automata);
    console.log(response)
    
    //Sin error
    if (response == null){
        return(
            <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
                <h2 style={{ textAlign: "center" }}>Resultado</h2>
            </div>
        )
    }

    //Responde error
    else {
        return(
            <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
                <h2 style={{ textAlign: "center" }}>{response}</h2>
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