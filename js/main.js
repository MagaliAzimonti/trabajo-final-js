let cardsAMostrar = ""
let contenidoJSON = []

const URL = `js/db.json`

const contenidoDOM = document.querySelector('#hoteles')
const cargandoDOM = document.querySelector('#loading')


window.addEventListener("DOMContentLoaded", ()=> {
    setTimeout(() => {
        obtengoHoteles(URL)
    }, 2000)
}) 

const obtengoHoteles = (URL) => {
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        contenidoJSON = data
        contenidoJSON.forEach(hoteles => {
            cardsAMostrar += renderizarHoteles(hoteles) 
        });
        contenidoDOM.innerHTML = cardsAMostrar
    })
    .catch((err)=> contenidoDOM.innerHTML = devolverError(err))
    .finally(() => cargandoDOM.innerHTML = "")
} 
const renderizarHoteles = (hoteles) => {
    const {img, destino, valoración, tipo} = hoteles
        let hotelHTML = 
        `
        <div class="col">
        <div class="hotel card shadow h-100">
            <img src="${img}" class="hotel-image card-img-top">
            <div class="card-body">
                <h3 class="hotel-title card-title">${destino}</h3>
                <p>Valoración: ${valoración}</p>
                <p class="hotel-precio card-text">Alojamiento: ${tipo}</p>
            </div>
            <div class="hotel-footer card-footer">
                <a href="../pages/shop.html" class="btn btn-primary">Ver más</a>
            </div>
        </div>
        </div>
        </div>
        ` 
        return hotelHTML
        
}

const devolverError = () => {
    let hotelErrorHTML = 
    `
    <div class="container">
    <div class="alert alert-primary d-flex align-items-center mt-5" role="alert">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>
    <div>
    El contenido no se encuentra disponible. Intente nuevamente.
    </div>
    </div>
    </div>
    `
    return hotelErrorHTML
}