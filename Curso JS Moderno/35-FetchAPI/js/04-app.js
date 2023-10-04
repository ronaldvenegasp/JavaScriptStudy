const cargarAPIBtn = document.querySelector("#cargarAPI");
cargarAPIBtn.addEventListener("click", obtenerDatos);

function obtenerDatos() {
    const url = "https://picsum.photos/list";

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
}
