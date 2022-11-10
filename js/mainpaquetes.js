const renderizarPaquetes = document.getElementById('paquetes')


paquetes.forEach(({img, destino, año, salida, precio}) =>{
    const paqueteHTML = 
    `
    <div class="col">
    <div class="paquete card shadow h-100">
        <img src="${img}" class="paquete-image card-img-top">
        <div class="card-body">
            <h3 class="paquete-title card-title">${destino} ${año} DESDE ${salida}</h3>
            <p class="paquete-precio card-text">U$S ${precio}</p>
        </div>
        <div class="paquete-footer card-footer">
            <div class="paquete-btn btn btn-primary añadirCarrito">Añadir al carrito</div>
        </div>
    </div>
    </div>
    </div>
    `;
    document.getElementById('paquetes').innerHTML += paqueteHTML;
})

const añadirCarritoBotones = document.querySelectorAll('.añadirCarrito')
    añadirCarritoBotones.forEach(añadirCarritoBtn => {
        añadirCarritoBtn.addEventListener('click', añadirCarritoClick)
    })

    const carritoPaquetes = document.querySelector('.carritoPaquetes')

    function añadirCarritoClick(event) {
        const button = event.target
        const paquete = button.closest('.paquete')
        const paqueteTitulo = paquete.querySelector('.paquete-title').textContent
        const paquetePrecio = paquete.querySelector('.paquete-precio').textContent
        const paqueteImage = paquete.querySelector('.paquete-image').src
        button.addEventListener('click', () => {
            Toastify({
                text: (`Ha sido añadido al carrito el paquete ${paqueteTitulo}`),
                duration: 3000,
                gravity: 'bottom',
                position: 'left'
            }).showToast(); 
        })
        añadirPaqueteCarrito(paqueteTitulo, paquetePrecio, paqueteImage)
        
    }

    function añadirPaqueteCarrito(paqueteTitulo, paquetePrecio, paqueteImage){

        const carritoLista = document.createElement('div')
        const carritoData = `
        <div class="row carritoPaquete">
            <div class="col-6">
                <div class="d-flex align-items-center h-100 border-bottom pb-2 pt-3>
                    <img src=${paqueteImage}>
                    <h6 class="carritoPaqueteTitulo ml-3 mb-0">${paqueteTitulo}</h6>
                </div>
            </div>
            <div class="col-2">
                <div class="d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <p class="mb-0 carritoPaquetePrecio">${paquetePrecio}</p>
                </div>
            </div>
            <div class="col-4">
                <div class="d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                    <input type="number" class="carritoPaqueteCantidad"  value="1">
                    <button class="btn btn-danger btnEliminar" type="button">Eliminar</button>
                </div>
            </div>
        </div>`

        carritoLista.innerHTML = carritoData
        carritoPaquetes.append(carritoLista)

        carritoLista.querySelector('.btnEliminar').addEventListener('click', eliminarPaqueteCarrito)
        carritoLista.querySelector('.carritoPaqueteCantidad').addEventListener('change', carritoCantidadCambio)
        carritoTotalCambio()
    }

    function carritoTotalCambio() {
        let total = 0

    
        const carritoTotal = document.querySelector('.carritoTotal')

        const carritoPaqs = document.querySelectorAll('.carritoPaquete')

        carritoPaqs.forEach(carritoPaquete => {
            const carritoPaquetePrecioElemento = carritoPaquete.querySelector('.carritoPaquetePrecio')
            const carritoPaquetePrecio = parseFloat(carritoPaquetePrecioElemento.textContent.replace('U$S', ''))
            const carritoPaqueteCantidadElemento = carritoPaquete.querySelector('.carritoPaqueteCantidad')
            const carritoPaqueteCantidad = parseFloat(carritoPaqueteCantidadElemento.value)
            total = total + carritoPaquetePrecio * carritoPaqueteCantidad

            
        })
        carritoTotal.innerHTML = `U$S ${total}`
        let str = JSON.stringify(total)
        localStorage.setItem("total", str)
    }

    function eliminarPaqueteCarrito(event) {
        const botonRemover = event.target 
        botonRemover.closest('.carritoPaquete').remove()
        carritoTotalCambio()
    
    }

    function carritoCantidadCambio(event) {
        const cantidad = event.target
        cantidad.value <= 0 ? (cantidad.value = 1 ) : null
        carritoTotalCambio()
    }


    const trasladoPaquetes = ['Hotel Boutique', 'Cabañas', 'Apart Hotel', 'Todas']

    trasladoPaquetes.forEach(traslado => {

        const btn = document.createElement('button');
        btn.innerHTML = traslado;
        btn.classList.add('btn', 'btn-dark', 'm-2');

        btn.addEventListener('click', ()=>{
            if(traslado === 'Todas') {

                document.getElementById('paquetes').innerHTML = "";

                paquetes.forEach(({img, destino, año, salida, precio}) =>{
                    const paqueteHTML = 
                    `
                    <div class="col">
                    <div class="paquete card shadow h-100">
                        <img src="${img}" class="paquete-image card-img-top">
                        <div class="card-body">
                            <h3 class="paquete-title card-title">${destino} ${año} DESDE ${salida}</h3>
                            <p class="paquete-precio card-text">U$S ${precio}</p>
                        </div>
                        <div class="paquete-footer card-footer">
                            <div class="paquete-btn btn btn-primary añadirCarrito">Añadir al carrito</div>
                        </div>
                    </div>
                    </div>
                    </div>
                    `;
                    document.getElementById('paquetes').innerHTML += paqueteHTML;
                })

                const añadirCarritoBotones = document.querySelectorAll('.añadirCarrito')
                añadirCarritoBotones.forEach(añadirCarritoBtn => {
                    añadirCarritoBtn.addEventListener('click', añadirCarritoClick)
                })
                    
            } else {
                const paqueteFiltrados = paquetes.filter(paq => paq.traslado === traslado)

                console.log(paqueteFiltrados)

                document.querySelector('#paquetes').innerHTML = ""

                paqueteFiltrados.forEach(paquete =>{

                    const paqueteHTML = 
                        `
                        <div class="col">
                        <div class="paquete card shadow h-100">
                            <img src="${paquete.img}" class="paquete-image card-img-top">
                            <div class="card-body">
                                <h3 class="paquete-title card-title">${paquete.destino} ${paquete.año} DESDE ${paquete.salida}</h3>
                                <p class="paquete-precio card-text">U$S ${paquete.precio}</p>
                            </div>
                            <div class="card-footer">
                                <div class="paquete-btn btn btn-primary añadirCarrito">Añadir al carrito</div>
                            </div>
                        </div>
                        </div>
                        </div>
                        
                        `;
                        document.getElementById('paquetes').innerHTML += paqueteHTML;
                })
                const añadirCarritoBotones = document.querySelectorAll('.añadirCarrito')
                añadirCarritoBotones.forEach(añadirCarritoBtn => {
                    añadirCarritoBtn.addEventListener('click', añadirCarritoClick)
                })
            }
        })

        document.querySelector('#traslados').appendChild(btn);
    })
