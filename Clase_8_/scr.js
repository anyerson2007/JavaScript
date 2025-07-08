const input = document.getElementById('nueva-tarea');
const btnAgregar = document.getElementById('agregar-btn');
const lista = document.getElementById('lista-tareas');
const mensajeError = document.getElementById('mensaje-error');
const completadasSpan = document.getElementById('completadas');
const totalSpan = document.getElementById('total');

btnAgregar.addEventListener('click', agregarTarea);

function agregarTarea(){
    const texto = input.value.trim();

    if(!texto || tareaExiste(texto)){
        mensajeError.classList.remove('oculto');
        return;
    }

    mensajeError.classList.add('oculto');

    const li = document.createElement('li');
    li.classList.add('tarea');
    li.setAttribute('data-completado','false');

    const span = document.createElement('span');
    span.textContent = texto;

    const divBotones = document.createElement('div');
    divBotones.classList.add('botones');

    const btnCompletar = document.createElement('button');
    btnCompletar.textContent = '✅';
    btnCompletar.classList.add('btn', 'btn-completar');
    btnCompletar.addEventListener('click', ()=>toggleCompletada(li));

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '🗑️';
    btnEliminar.classList.add('btn', 'btn-eliminar');
    btnEliminar.addEventListener('click', ()=>eliminarTarea(li));

    divBotones.append(btnCompletar, btnEliminar);
    li.append(span, divBotones);
    lista.appendChild(li);

    input.value = '';
    actualizarContadores();
}

function tareaExiste(texto){
    const tareas = document.querySelectorAll('.tarea span');
    return Array.from(tareas).some(el => el.textContent.toLowerCase() === texto.toLowerCase());
}

function toggleCompletada(tarea){
    const completado = tarea.getAttribute('data-completado') === true;

    if(completado){
        tarea.classList.remove('completada');
        tarea.setAttribute('data-completado','false');
    }else{
        tarea.classList.add('completada');
        tarea.setAttribute('data-completado','true');
    }

    actualizarContadores();
}

function eliminarTarea(tarea){
    tarea.remove();
    actualizarContadores();
}

function actualizarContadores(){
    const total = document.querySelectorAll('.tarea').length;
    const completadas = document.querySelectorAll('.tarea[data-completado="true"]').length;

    totalSpan.textContent = total;
    completadasSpan.textContent = completadas;
}