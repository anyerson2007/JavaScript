let nameArray = [];
const nameSet = new Set();
const nameMap = new Map(); // ❌ Antes: new MutationObserver() — eso es incorrecto, se usa Map.
let currentId = 1;

// Clase para limpiar nombre (Todo en mayúscula)
class FormatData {
    static cleanName(name) {
        return name.trim().toUpperCase();
    }
}

// Mostrar notificaciones personalizadas
function showMessage(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification show ${type}`;
    setTimeout(() => {
        notification.className = 'notification hidden';
    }, 4000);
}

// Renderizar nombres
function renderList() {
    const list = document.getElementById('nameList');
    list.innerHTML = '';
    nameArray.forEach(name => {
        const div = document.createElement('div');
        div.className = 'item';
        div.textContent = `${nameMap.get(name)}: ${name}`;
        list.appendChild(div);
    });
}

// Agregar nombre
function addName() {
    const input = document.getElementById('nameInput');
    const name = FormatData.cleanName(input.value); // ❌ Antes: input,value
    if (!name) return showMessage("Escriba un nombre válido.", "error");
    if (nameSet.has(name)) return showMessage("Este nombre ya existe.", "info");

    nameArray.push(name);
    nameSet.add(name);
    nameMap.set(name, currentId++);
    input.value = '';

    showMessage("El nombre fue agregado correctamente.", "success");
    renderList();
}

// Eliminar nombre
function deleteName() {
    const input = document.getElementById('nameInput');
    const name = FormatData.cleanName(input.value);
    if (!nameSet.has(name)) return showMessage("Este nombre no está registrado.", "error");

    nameArray = nameArray.filter(n => n !== name);
    nameSet.delete(name);
    nameMap.delete(name);
    input.value = '';

    showMessage("Nombre eliminado correctamente.", "success");
    renderList();
}

// Ordenar alfabéticamente
function sortByname() {
    nameArray.sort((a, b) => a.localeCompare(b)); // ❌ localCompare → ✅ localeCompare
    renderList();
    showMessage("Ordenado alfabéticamente", "success");
}

// Ordenar por cantidad de letras
function sortBylength() {
    nameArray.sort((a, b) => a.length - b.length);
    renderList();
    showMessage("Ordenado por longitud", "success");
}

// Invertir el orden actual
function reversedOrden() {
    nameArray.reverse();
    renderList();
    showMessage("Lista invertida.", "success");
}

// Limpiar todo
function ClearAll() {
    if (!confirm("¿Seguro que desea borrar toda la lista?")) return;
    nameArray = [];
    nameSet.clear();
    nameMap.clear();
    currentId = 1;
    renderList();
    showMessage("No hay vuelta atrás, todo fue borrado", "alert");
}

// Exportar a CSV
function exportToCSV() {
    if (nameArray.length === 0) {
        showMessage("La lista de nombres está vacía. No se puede exportar.", "info");
        return;
    }

    let csvContent = "ID,Nombre\n";
    nameArray.forEach(name => {
        const id = nameMap.get(name);
        csvContent += `${id},"${name}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" }); // ❌ text/cvs → ✅ text/csv
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "lista_nombres.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showMessage("Archivo CSV generado exitosamente.", "success");
}
