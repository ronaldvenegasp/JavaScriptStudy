const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
    formulario.addEventListener("submit", buscarClima);
});

function buscarClima(evt) {
    evt.preventDefault();

    // Válidar datos
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;

    if (ciudad === "" || pais === "") {
        // Hubo un error
        mostrarError("Ambos campos son obligatorios");
        return;
    }

    // Consultar la API
    consultarAPI(ciudad, pais);
}

function consultarAPI(ciudad, pais) {
    const appId = "1e4dbd45b04b021be5c9c8ccfbdc1d95";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    spinner();

    setTimeout(() => {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                limpiarHTML();

                if (data.cod !== 200) {
                    data.message
                        ? mostrarError(data.message)
                        : mostrarError(
                                "Hubo un problema al hacer la consulta..."
                        );
                    return;
                }

                // Imprime la respuesta en el HTML
                mostrarClima(data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                console.log(`End of the request`);
            });
    }, 3000);
}

function mostrarClima({ name, main: { temp, temp_max, temp_min } }) {
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement("p");
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add("font-bold", "text-2xl");

    const tempActual = document.createElement("p");
    tempActual.innerHTML = `${centigrados} &#8451;`;
    tempActual.classList.add("font-bold", "text-6xl");

    const tempMax = document.createElement("p");
    tempMax.innerHTML = `Max: ${max} &#8451;`;
    tempMax.classList.add("text-xl");

    const tempMin = document.createElement("p");
    tempMin.innerHTML = `Min: ${min} &#8451;`;
    tempMin.classList.add("text-xl");

    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center", "text-white");
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(tempActual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);
    resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = (grados) => parseInt(grados - 273.15).toFixed(1);

function mostrarError(mensaje) {
    const alerta = document.querySelector(".bg-red-100");

    if (!alerta) {
        // Crear una alerta
        const alerta = document.createElement("div");
        alerta.classList.add(
            "bg-red-100",
            "border-red-400",
            "text-red-700",
            "px-4",
            "py-3",
            "rounded",
            "max-w-md",
            "mx-auto",
            "mt-6",
            "text-center"
        );

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        // Eliminar la alerta
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner() {
    limpiarHTML();

    const divSpinner = document.createElement("div");
    divSpinner.classList.add("sk-chase");
    divSpinner.innerHTML = `
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
    `;

    resultado.appendChild(divSpinner);
}
