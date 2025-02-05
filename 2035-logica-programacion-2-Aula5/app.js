let numeroSecreto = 0;  // Se declara una variable 'numeroSecreto' e inicializa en 0. Almacena el número secreto que el usuario debe adivinar.
let intentos = 0;  // Se declara una variable 'intentos' que lleva la cuenta de los intentos del usuario.
let listaNumerosSorteados = [];  // Se crea un array que almacenará los números ya sorteados para evitar duplicados.
let numeroMaximo = 10;  // Se define el valor máximo posible para el número secreto (en este caso, 10).

// Función para asignar un texto a un elemento HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);  // Selecciona el elemento HTML utilizando el selector 'elemento'.
    elementoHTML.innerHTML = texto;  // Asigna el 'texto' como contenido de ese elemento.
    return;  // Termina la función sin devolver nada.
}

// Función para verificar si el intento del usuario es correcto
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);  // Obtiene el valor ingresado por el usuario y lo convierte a número entero.

    // Si el número ingresado por el usuario es igual al número secreto
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);  // Muestra un mensaje de éxito con el número de intentos.
        document.getElementById('reiniciar').removeAttribute('disabled');  // Habilita el botón de reiniciar el juego.
    } else {
        // El usuario no acertó el número
        if (numeroDeUsuario > numeroSecreto) {  // Si el número del usuario es mayor que el número secreto
            asignarTextoElemento('p','El número secreto es menor');  // Informa que el número secreto es menor.
        } else {  // Si el número del usuario es menor que el número secreto
            asignarTextoElemento('p','El número secreto es mayor');  // Informa que el número secreto es mayor.
        }
        intentos++;  // Incrementa el contador de intentos.
        limpiarCaja();  // Limpia el campo de texto del input.
    }
    return;  // Termina la función.
}

// Función para limpiar el campo de texto donde el usuario introduce el número
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';  // Limpia el contenido del input con id 'valorUsuario'.
}

// Función para generar un número secreto aleatorio
function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;  // Genera un número aleatorio entre 1 y 'numeroMaximo'.

    console.log(numeroGenerado);  // Imprime el número generado en la consola (para depuración).
    console.log(listaNumerosSorteados);  // Imprime la lista de números sorteados en la consola (para depuración).

    // Si ya se sorteó todos los números posibles
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');  // Muestra un mensaje indicando que no hay más números disponibles.
    } else {
        // Si el número generado ya fue sorteado
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();  // Vuelve a generar un número secreto si ya se sorteó antes.
        } else {
            listaNumerosSorteados.push(numeroGenerado);  // Agrega el número generado a la lista de sorteados.
            return numeroGenerado;  // Devuelve el número secreto generado.
        }
    }
}

// Función para inicializar el juego
function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto!');  // Cambia el texto del título (h1).
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);  // Muestra el mensaje con las instrucciones.
    numeroSecreto = generarNumeroSecreto();  // Genera el número secreto y lo asigna a 'numeroSecreto'.
    intentos = 1;  // Inicializa el contador de intentos a 1.
    console.log(numeroSecreto);  // Imprime el número secreto en la consola (para depuración).
}

// Función para reiniciar el juego
function reiniciarJuego() {
    limpiarCaja();  // Limpia el campo de entrada de texto.
    condicionesIniciales();  // Llama a la función que inicializa las condiciones del juego.
    document.querySelector('#reiniciar').setAttribute('disabled','true');  // Deshabilita el botón de reiniciar para evitar múltiples clics.
}

// Llama a la función que inicializa el juego cuando se carga el script.
condicionesIniciales();
