const obtenerDatos = () => {
    const url = "data/empleados.json";
    fetch(url)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            console.log(`End of the request`);
        });
};

const cargarJSONArrayBtn = document.querySelector("#cargarJSONArray");
cargarJSONArrayBtn.addEventListener("click", obtenerDatos);
