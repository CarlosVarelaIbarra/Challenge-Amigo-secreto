let listaDeAmigos = []; // Lista donde almacenamos los nombres de los participantes
let amigosSeleccionados = [];// Lista donde almacenamos los nombres ya sorteados
let numeroDeSorteo = 0;// Contador para llevar el número de sorteos

// Función para agregar un amigo a la lista
function agregarAmigo() {
    let inputAmigo = document.getElementById("amigo");
    let nombreIngresado = inputAmigo.value.trim();

    if (!nombreIngresado) {
        alert("Ingresa un nombre para continuar");
        return;
    }

    if (listaDeAmigos.includes(nombreIngresado)) {
        alert(`El nombre "${nombreIngresado}" ya está en la lista. Ingresa otro nombre.`);
        return;
    }

    listaDeAmigos.push(nombreIngresado);

    inputAmigo.value = "";
    inputAmigo.focus();

    console.log(listaDeAmigos);
    renderizarLista();

    // Habilitar el botón de reinicio
    const botonReiniciar = document.getElementById("restablecer");
    botonReiniciar.disabled = false;
}
// Función para validar que solo se introduzcan letras y espacios
document.getElementById("amigo").addEventListener("input", function(event) {
    const valor = event.target.value;
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/; // Letras, acentos, ñ y espacios

    // Reemplazar caracteres no válidos
    if (!soloLetras.test(valor)) {
        event.target.value = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    }
});

// Función para mostrar la lista de amigos en la interfaz
function renderizarLista() {
    let listaElementos = document.getElementById("listaAmigos");
    listaElementos.innerHTML = "";

    for (let i = 0; i < listaDeAmigos.length; i++) {
        let item = document.createElement("li");
        item.textContent = listaDeAmigos[i];
        listaElementos.appendChild(item);
    }
}

// Función para realizar el sorteo de un amigo secreto
function sortearAmigo() {
    // Verificar si no hay amigos en la lista
    if (listaDeAmigos.length === 0) {
        alert("No hay amigos para sortear");
        return;
    }

    // Verificar si todos los amigos han sido seleccionados
    if (amigosSeleccionados.length === listaDeAmigos.length) {
        alert("Todos los amigos ya han participado. Agrega nuevos nombres para continuar.");
        return;
    }

    // Seleccionar un amigo que no haya sido sorteado previamente
    let amigoSorteado;
    do {
        let indiceSorteado = Math.floor(Math.random() * listaDeAmigos.length);
        amigoSorteado = listaDeAmigos[indiceSorteado];
    } while (amigosSeleccionados.includes(amigoSorteado));

    // Incrementar el número de sorteos
    numeroDeSorteo++;

    // Agregar el amigo sorteado a la lista de seleccionados
    amigosSeleccionados.push(amigoSorteado);

    // Mostrar el resultado en la interfaz
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `El amigo sorteado es: <strong>${amigoSorteado}</strong>`;

    // Actualizar el historial de ganadores
    actualizarHistorial(amigoSorteado, numeroDeSorteo);

    console.log("Amigos seleccionados:", amigosSeleccionados);
}

// Función para actualizar el historial de ganadores
function actualizarHistorial(nombre, sorteo) {
    let historial = document.getElementById("historialGanadores");

    let item = document.createElement("li");
    item.innerHTML = `<span class="sorteo-numero">Sorteo #${sorteo}:</span> <span class="sorteo-nombre">${nombre}</span>`;
    historial.appendChild(item);
}

// Función para reiniciar el juego
function reiniciarElJuego() {
    // Vaciar las listas
    listaDeAmigos = [];
    amigosSeleccionados = [];
    numeroDeSorteo = 0; // Reiniciar el contador de sorteos

    // Limpiar el contenido visual de las listas y el historial
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("historialGanadores").innerHTML = "";

    // Deshabilitar el botón de reinicio
    const botonReiniciar = document.getElementById("restablecer");
    botonReiniciar.disabled = true;

    alert("El juego se ha reiniciado. ¡Empieza de nuevo!");
}

// Detectar la tecla Enter en el input y agregar el amigo
document.getElementById("amigo").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        agregarAmigo();
    }
});