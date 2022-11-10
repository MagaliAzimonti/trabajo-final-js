const enfocarCampos = () => {
    const campos = document.querySelectorAll("input", "textarea")
    for (let campo of campos) {
        if (campo.type != "btnSubmit") {
            campo.addEventListener("focus", () => campo.className = "campo-fondo")
            campo.addEventListener("blur", () => campo.className = "")    
        }
    }
}

enfocarCampos()

btnSubmit.addEventListener("mousemove", ()=> {
    btnSubmit.title = "Ingrese sus datos antes de enviar"
})

btnSubmit.addEventListener("mouseover", ()=> {
    btnSubmit.className = "btn btn-warning"
})

btnSubmit.addEventListener("mouseup", ()=> {
    btnSubmit.className = "btn btn-primary"
})

btnSubmit.addEventListener("mouseout", ()=> {
    btnSubmit.className = "btn btn-primary"
})


const alertaFormularioEnviado = (mensaje)=> {
    Swal.fire({
        title: mensaje,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, enviar',
        cancelButtonText: 'Cencelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡El formulario ha sido enviado con éxito!',
            'Nos comunicaremos a la brevedad para confirmar el pago.',
            'success'
          )
          document.querySelector("#paquetesComprados").innerHTML = `Precio total: U$S 0`
        }
        
      })
}

document.addEventListener("submit", (e)=> {
    e.preventDefault()
    guardarDatos()
    alertaFormularioEnviado('¿Seguro que deseas enviar el formulario?')
    
})

function guardarDatos() {
    const datosDeUsuario = {nombre: inputNombre.value,
                            apellido: inputApellido.value,
                            email: inputEmail.value,
                            telefono: inputTelefono.value,
                            asunto: inputAsunto.value,
                            pago: inputPago.value
    }
    let str = JSON.stringify(datosDeUsuario)
    localStorage.setItem("datosDeUsuario", str)
}

function recuperarDatos() {
    if (carritoTotalCambio = JSON.parse(localStorage.getItem("total"))) {
        document.querySelector("#paquetesComprados").innerHTML = `Precio total: U$S${carritoTotalCambio}`
    if (localStorage.getItem("datosDeUsuario")) {
        const datosDeUsuario = JSON.parse(localStorage.getItem("datosDeUsuario"))
        inputNombre.value = datosDeUsuario.nombre
        inputApellido.value = datosDeUsuario.apellido
        inputEmail.value = datosDeUsuario.email
        inputTelefono.value = datosDeUsuario.telefono
        inputAsunto.value = datosDeUsuario.asunto
        inputPago.value = datosDeUsuario.pago 
        }
    }
}

recuperarDatos() 
