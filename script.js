const inputNu = document.getElementById('CEP')

inputNu.addEventListener('keydown', (e)=>{
    let nu = ''
    if(e.key != 'Backspace'){
        if(inputNu.value.length > 0){
            nu += inputNu.value
            if(nu.length === 5){
                inputNu.value += "-"
            } else if (nu.length === 9){
                nu = nu.slice(0, -1)
                inputNu.value = nu
            }
        }
    }
})

// Uso da API para consultar cep

const botao = document.getElementById('botaoProcurar')
botao.addEventListener("click", async () =>{
    const cep = `${inputNu.value}`
    cep.replace('-', '')
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const responseCep = await response.json()

    alert(responseCep.bairro)
})

