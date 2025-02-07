const inputNu = document.getElementById('CEP')

inputNu.addEventListener('keydown', (e)=>{
    let cep = ""
    if(e.key != 'Backspace'){
        if(inputNu.value.length > 0){
            cep += inputNu.value
            if(cep.length === 5){
                inputNu.value += "-"
            } else if (cep.length === 9){
                cep = cep.slice(0, -1)
                inputNu.value = cep
            }
        }
    }
})