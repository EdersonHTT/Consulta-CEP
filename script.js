// api convertora de endereco para cordenadas

async function localMapa (estado, cidade, bairro, lougradouro){
    if(window.innerWidth < 800){
        setTimeout(async () => {    
            if(abrirMapa){
                map()
                abrirMapa = false
            }

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
        }, 50);
    } else {
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

        abrirMapa = true
    }
}

let abrirMapa = true
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
                infoLocal.style.transition = '500ms'
                infoLocal.style.display = 'flex'
                setInterval(() => {
                    infoLocal.style.filter = 'opacity(100%)'
                }, 300)
            }
            
            if(window.innerWidth <= 800){
                document.getElementById('conteiner').style.height = 'auto'
            } 

            if(widthAtual != window.innerWidth){
                cepLocalizado = ''
                widthAtual = window.innerWidth
            }
 
            if(cepLocalizado != cep){
                localMapa(responseCep.estado, responseCep.localidade, responseCep.bairro, responseCep.logradouro)
                cepLocalizado = cep
            }
        }
    }
})

let cepLocalizado
let widthAtual

// Mapa

function map(){
    mapa = L.map('mapa').setView([-26.76643, -60.119649], 4) 

    const layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        minZoom: 3,
    });
    layer.addTo(mapa)
}
let mapa

trocaMapa()