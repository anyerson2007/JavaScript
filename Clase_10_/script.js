function getTarjeta(){
    const id = document.getElementById("selector").value;
    return document.getElementById(id);
}

function log(msg){
    const logBox = document.getElementById("log");
    logBox.textContent += `> ${msg}\n`;
    logBox.scrollTop = logBox.scrollHeight;
}

function validarClase(clase){
    if (!clase || clase.trim() === ""){
        alert("Por favor, ingrese una clase válida.");
        return false;
    }
    return true;
}

function agregarClase(){
    const clase = document.getElementById("inputClase").value.trim();

    if (!validarClase(clase)) return;

    const tarjeta = getTarjeta();
    tarjeta.classList.add(clase);
    log(`Clase "${clase}" agregada a ${tarjeta.id}`);
}

function quitarClase(){
    const clase = document.getElementById("inputClase").value.trim();

    if (!validarClase(clase)) return;

    const tarjeta = getTarjeta();
    const existe = tarjeta.classList.contains(clase);
    tarjeta.classList.remove(clase);
    log(`Clase "${clase}" eliminada de ${tarjeta.id}`)
}

function verificarClase(){
    const clase = document.getElementById("inputClase").value.trim();

    if (!validarClase(clase)) return;

    const tarjeta = getTarjeta();
    const existe = tarjeta.classList.contains(clase);
    log(`${tarjeta.id} contiene la clase ${clase}? -> ${existe}`);
}

function alternarClase(){
    const clase = document.getElementById("inputClase").value.trim();

    if (!validarClase(clase)) return;

    const tarjeta = getTarjeta();
    tarjeta.classList.toggle(clase);`,toggle sirve para alternar entre modo oscuro y claro de la paguina`
    log(`Clase "${clase}" alternada en ${tarjeta.id}`);
}

function reemplazarClase(){
    const clase = document.getElementById("inputClase").value.trim();

    const nuevaClase = prompt("Nueva clase para reemplazar: ");

    if(!validarClase(clase) || !validarClase(nuevaClase))return;

    const tarjeta = getTarjeta();
    tarjeta.classList.replace();
    log(`Clase "${clase}" remplazada por "${nuevaClase}" en ${tarjeta.id}`);
}

function cambiarTexto(){
    const nuevotexto = document.getElementById("nuevoTexto").value;

    const tarjeta = getTarjeta();
    tarjeta.textContent = nuevotexto;
    log(`textcontent actualizado en ${tarjeta.id}`);

}

function cambiarHTML(){
    const nuevoHtml = document.getElementById("nuevoTexto").value;

    const tarjeta = getTarjeta();
    tarjeta.innerHTML = nuevoHTML;
    log(`innerHTML actualizado en ${tarjeta.id}`);

}

function mostrarInfo(){
    const tarjeta = getTarjeta();

    const info = `
    📃Informacion del DOM para ${tarjeta.id}:
    -nodeName: ${tarjeta.nodeName}
    -classList: ${Array.from(tarjeta.classList).join(',')|| "(Vacio)"}
    -classList.length: ${tarjeta.classList.length}
    -textCont: ${tarjeta.textContent}
    -innerHTML: ${tarjeta.innerHTML}
    `

    log(info)
}