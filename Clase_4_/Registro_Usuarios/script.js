let editIndex = null;

function crearUsuario(nombre, edad) {
    return {
        nombre,
        edad,
        saludar() {
            console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
        }
    };
}

// Guardar en localStorage
function guardarUsuarios(lista) {
    localStorage.setItem("usuarios", JSON.stringify(lista));
}

// Cargar desde localStorage
function cargarUsuarios() {
    const data = localStorage.getItem("usuarios");
    return data ? JSON.parse(data) : [];
}

// Mostrar alerta
function mostrarAlerta(msg) {
    const alerta = document.getElementById("alerta");
    alerta.textContent = msg;
    alerta.classList.remove("hidden");
    setTimeout(() => alerta.classList.add("hidden"), 4000);
}

// Validaciones
function esNombreValido(nombre) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,30}$/.test(nombre);
}

function esEdadValida(edad) {
    return edad >= 1 && edad <= 120;
}

// Mostrar Usuarios
function mostrarUsuarios(lista) {
    const contenedor = document.getElementById("userList");
    contenedor.innerHTML = "";

    lista.forEach((usuario, index) => {
        const { nombre, edad } = usuario;

        const card = document.createElement("div");
        card.className = "user-card";
        card.innerHTML = `
        <div>
            <strong>${nombre}</strong> (${edad} años)
        </div>
        <div>
            <button onclick="editarUsuario(${index})">Editar</button>
            <button onclick="eliminarUsuario(${index})">Eliminar</button>
        </div>`;
        contenedor.appendChild(card);
    });
}

// Clonar usuario (solo ejemplo)
function clonarUsuario(usuario) {
    const copia1 = Object.assign({}, usuario);
    const copia2 = { ...usuario };
    console.log("Clonación: ", copia1, copia2);
}

// Eliminar usuario
function eliminarUsuario(index) {
    const usuarios = cargarUsuarios();
    usuarios.splice(index, 1);
    guardarUsuarios(usuarios);
    mostrarUsuarios(usuarios);
}

// Editar usuario
function editarUsuario(index) {
    const usuario = cargarUsuarios()[index];
    const form = document.getElementById("userForm");

    if (!usuario) return;

    form.nombre.value = usuario.nombre;
    form.edad.value = usuario.edad;
    editIndex = index;

    document.getElementById("btnGuardar").textContent = "Actualizar";
    document.getElementById("btnCancelar").classList.remove("hidden");
}

// Cancelar edición
document.getElementById("btnCancelar").addEventListener("click", () => {
    resetFormulario();
});

// Guardar o actualizar usuario
document.getElementById("userForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;
    const nombre = form.nombre.value.trim().toUpperCase();
    const edad = parseInt(form.edad.value.trim());

    if (!esNombreValido(nombre)) {
        mostrarAlerta("Nombre no válido.");
        return;
    }

    if (isNaN(edad) || !esEdadValida(edad)) {
        mostrarAlerta("Edad no válida.");
        return;
    }

    const usuario = crearUsuario(nombre, edad);
    const usuarios = cargarUsuarios();

    if (editIndex === null) {
        // Crear nuevo usuario
        guardarUsuarios([...usuarios, usuario]);
    } else {
        // Actualizar usuario existente
        usuarios[editIndex] = usuario;
        guardarUsuarios(usuarios);
        editIndex = null;
    }

    usuario.saludar();
    mostrarUsuarios(cargarUsuarios());
    resetFormulario();
});

// Resetear formulario
function resetFormulario() {
    const form = document.getElementById("userForm");
    form.reset();
    editIndex = null;
    document.getElementById("btnGuardar").textContent = "Guardar";
    document.getElementById("btnCancelar").classList.add("hidden");
}

// Inicializar en carga del documento
document.addEventListener("DOMContentLoaded", () => {
    mostrarUsuarios(cargarUsuarios());
});
