const obtenerDatos = () => {
    const url = "data/datos.txt";
    fetch(url)
        .then((response) => {
            if (response.status === 200) {
                return response.text();
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

const cargarTxtBtn = document.querySelector("#cargarTxt");
cargarTxtBtn.addEventListener("click", obtenerDatos);
