const API_BASE = "https://api-colombia.com/api/v1";

const departmentSelect = document.getElementById("departments");
const content = document.getElementById("content");

async function loadDepartments() {
    try {
        const res = await fetch(`${API_BASE}/Department`);
        const departments = await res.json();

        departmentSelect.innerHTML = `<option value="">--seleccione un departamento--</option>`;

        departments.forEach(dep => {
            const option = document.createElement("option");
            option.value = dep.id;
            option.textContent = dep.name;
            departmentSelect.appendChild(option);
        });
    } catch (error) {
        content.innerHTML = "<p style='color:red'>Error al cargar los departamentos.</p>";
    }
}

departmentSelect.addEventListener("change", async function () {
    const departamentId = this.value;

    if (!departamentId) {
        content.innerHTML = "<p>Seleccione un departamento para ver sus ciudades.</p>";
        return;
    }

    content.innerHTML = "<p>Cargando ciudades...</p>";

    try {
        const res = await fetch(`${API_BASE}/Department/${departamentId}/Cities`);
        const cities = await res.json();

        if (cities.length === 0) {
            content.innerHTML = "<p>No se encontraron ciudades para este departamento.</p>";
        } else {
            content.innerHTML = "<h2>Ciudades del Departamento</h2>";
            cities.forEach(city => {
                const div = document.createElement("div");
                div.className = "item";
                div.innerHTML = `<strong>${city.name}</strong>`;
                content.appendChild(div);
            });
        }
    } catch (error) {
        content.innerHTML = "<p style='color:red'>Error al cargar las ciudades.</p>";
    }
});
function showView(id) {
    document.querySelectorAll(".view").forEach(view => view.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
  
  
    if (id === "presidents") loadPresidents();
    else if (id === "regions") loadRegions();
    else if (id === "attractions") loadAttractions();
    else if (id === "country") loadCountry();
  }
  async function loadPresidents() {
    const section = document.getElementById("presidents");
    section.innerHTML = "<p>Cargando presidentes...</p>";

    try {
        const res = await fetch(`${API_BASE}/President`);
        let presidents = await res.json();

        // Ordenar del más antiguo al actual por fecha de inicio (startPeriodDate)
        presidents.sort((a, b) => new Date(a.startPeriodDate) - new Date(b.startPeriodDate));

        section.innerHTML = "<h2>Presidentes de Colombia</h2>";
        presidents.forEach(president => {
            const div = document.createElement("div");
            div.className = "item";
            div.innerHTML = `
                <strong>${president.name}</strong> (${new Date(president.startPeriodDate).getFullYear()} - ${new Date(president.endPeriodDate).getFullYear()})
                <br>
                <em>${president.politicalParty}</em>
            `;
            section.appendChild(div);
        });
    } catch (error) {
        section.innerHTML = "<p style='color:red'>Error al cargar los presidentes.</p>";
    }
}
async function loadAirportsByDepartment(departmentId) {
    const content = document.getElementById("airportsContent");
    content.innerHTML = "<p>Cargando aeropuertos...</p>";

    try {
        const res = await fetch(`${API_BASE}/Airport`);
        const airports = await res.json();

        // Filtrar aeropuertos que coincidan con el departamento
        const filtered = airports.filter(airport => airport?.city?.departmentId === departmentId);

        if (filtered.length === 0) {
            content.innerHTML = "<p>No se encontraron aeropuertos en este departamento.</p>";
            return;
        }

        content.innerHTML = "<h2>Aeropuertos en el Departamento</h2>";
        filtered.forEach(airport => {
            const div = document.createElement("div");
            div.className = "item";
            div.innerHTML = `
                <strong>${airport.name}</strong><br>
                Ciudad: ${airport.city.name}<br>
                Código IATA: ${airport.iataCode || "N/A"}
            `;
            content.appendChild(div);
        });
    } catch (error) {
        content.innerHTML = "<p style='color:red'>Error al cargar los aeropuertos.</p>";
    }
}
departmentSelect.addEventListener("change", async function () {
    const departamentId = this.value;

    if (!departamentId) {
        content.innerHTML = "<p>Seleccione un departamento para ver sus ciudades.</p>";
        document.getElementById("airportsContent").innerHTML = "<p>Seleccione un departamento para ver sus aeropuertos.</p>";
        return;
    }

    content.innerHTML = "<p>Cargando ciudades...</p>";

    try {
        const res = await fetch(`${API_BASE}/Department/${departamentId}/Cities`);
        const cities = await res.json();

        if (cities.length === 0) {
            content.innerHTML = "<p>No se encontraron ciudades para este departamento.</p>";
        } else {
            content.innerHTML = "<h2>Ciudades del Departamento</h2>";
            cities.forEach(city => {
                const div = document.createElement("div");
                div.className = "item";
                div.innerHTML = `<strong>${city.name}</strong>`;
                content.appendChild(div);
            });
        }

        // Cargar aeropuertos también
        loadAirportsByDepartment(departamentId);

    } catch (error) {
        content.innerHTML = "<p style='color:red'>Error al cargar las ciudades.</p>";
    }
});

loadDepartments();
