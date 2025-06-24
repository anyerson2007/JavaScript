let numeroSecreto;
let intentos;
let intentoActual;
let continuarDespuesDelModal = null;
let resolverInput = null;

function jugar() {
    numeroSecreto = Math.floor(Math.random() * 10) + 1;
    intentos = 4;
    intentoActual = 1;
    siguienteIntento();
}

function siguienteIntento() {
    if (intentoActual > intentos) {
        mostrarModal(`Lo siento, no adivinaste. El número era ${numeroSecreto}`);
        return;
    }

    mostrarInputModal(`Intento ${intentoActual} de ${intentos}. Adivina el número (1-10 o escribe "Salir")`)
        .then((entrada) => {
            if (entrada === null || entrada.toLowerCase() === "salir") {
                mostrarModal('Juego cancelado');
                return;
            }
        });
}

function mostrarModal(mensaje) {
    const modal = document.getElementById('customModal');
    const modalMsg = document.getElementById('modalMessage');

    modalMsg.textContent = mensaje;
    modal.classList.remove("hidden");
}

function mostrarInputModal(pregunta) {
    const modal = document.getElementById("inputModal");
    const promptA = document.getElementById("inputPrompt");  // corregido el ID
    const inputA = document.getElementById("inputField");

    promptA.textContent = pregunta;
    inputA.value = "";
    modal.classList.remove("hidden");

    return new Promise((resolve) => {
        resolverInput = resolve;
        inputA.focus();
    });
}

function enviarInput() {
    const inputA = document.getElementById('inputField');
    const modal = document.getElementById('inputModal');

    modal.classList.add('hidden');
    if (resolverInput) {
        resolverInput(inputA.value);
        resolverInput = null;
    }
}

function cerrarModal() {
    const modal = document.getElementById('customModal');  // corregido el ID
    modal.classList.add("hidden");

    if (continuarDespuesDelModal) {
        const fn = continuarDespuesDelModal;
        continuarDespuesDelModal = null;
        setTimeout(fn, 0);
    }
}
function validarUsuario(inputA){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(inputA.length < 4){
                reject("El usuario debe tener almenos 4 caracteres");
            }else if(usuario!== baseDeDatos.usuario){
                reject("Usuario no encontrado");
            }else{
                resolve("Usuario verificado.");
            }
        },1500)
    })
}