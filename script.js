// api convertora de endereco para cordenadas

async function localMapa (estado, cidade, bairro, lougradouro){
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${estado} ${cidade} ${bairro} ${lougradouro}&format=json`)
    const responseCodenada = await response.json()

    const cordenadas = [responseCodenada[0].lat, responseCodenada[0].lon]
    mapa.setView(cordenadas, 17) 

    if(circulo){
        mapa.removeLayer(circulo)
    }

    circulo = L.circle(cordenadas, {
        color: '#73a6d9',
        fillColor: '#73a6d9',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(mapa);
}

let circulo

// Uso da API para consultar cep

const inputNu = document.getElementById('CEP')
const botao = document.getElementById('botaoProcurar')

botao.addEventListener("click", async () =>{
    let cep = `${inputNu.value}`
    cep = cep.replace('-', '')
    if(cep.length === 8){
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const responseCep = await response.json()

        const estado = document.getElementById('estado')
        const cidade = document.getElementById('cidade')
        const bairro = document.getElementById('bairro')
        const logradouro = document.getElementById('logradouro')

        if(responseCep.estado != undefined){
            estado.textContent = ` ${responseCep.estado}`
            cidade.textContent = ` ${responseCep.localidade}`
            bairro.textContent = ` ${responseCep.bairro}` 
            logradouro.textContent = ` ${responseCep.logradouro}`
            const infoLocal = document.getElementById('infoLocal')
            const section = document.getElementById('consulta')
            
            const infoLocalDisplay = window.getComputedStyle(infoLocal).display

            if(infoLocalDisplay === 'none'){
                const sectionstyle = window.getComputedStyle(section).width
                const infoLocalWidth = window.getComputedStyle(infoLocal).width

                let calc = ((Number(sectionstyle.replaceAll('px', '')) / 100 * 50)-( Number(infoLocalWidth.replaceAll('px', '')) / 100 * 50)) / 100 * 50
                
                infoLocal.style.transition = '300ms'
                infoLocal.style.display = 'flex'
                infoLocal.style.left = '-450px'
                setInterval(() => {
                    infoLocal.style.left = `${calc}px`
                    setInterval(() => {
                        infoLocal.style.removeProperty('left')
                    }, 200)
                }, 200)
            }
            localMapa(responseCep.estado, responseCep.localidade, responseCep.bairro, responseCep.logradouro)
        }
    }
})

// Mapa

let mapa = L.map('mapa').setView([-29.76643, -51.119649], 5) 

const layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    minZoom: 3,
});
layer.addTo(mapa)