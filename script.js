// Uso da API para consultar cep

const botao = document.getElementById('botaoProcurar')
botao.addEventListener("click", async () =>{
    let cep = `${inputNu.value}`
    cep = cep.replace('-', '')
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const responseCep = await response.json()

    alert(responseCep.bairro)
})

