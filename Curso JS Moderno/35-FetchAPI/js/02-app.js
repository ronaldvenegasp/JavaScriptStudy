const cargarJSONBtn = document.querySelector("#cargarJSON");
cargarJSONBtn.addEventListener("click", obtenerDatos);

function obtenerDatos() {
    const url = "data/empleado.json";
    fetch(url)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((data) => {
            console.log(data);
            mostrarHTML(data);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            console.log(`End of the request`);
        });
};

function mostrarHTML({empresa, id, nombre, trabajo}) {
    const contenido = document.querySelector(".contenido");
    contenido.innerHTML = `
        <p>ID: ${id}</p>
        <p>Empleado: ${nombre}</p>
        <p>Cargo: ${trabajo}</p>
        <p>Empresa: ${empresa}</p>
    `;
}