// Variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
const resultado = document.querySelector("#resultado");

// Definir los años mínimo y máximo
const max = new Date().getFullYear();
const min = max - 10;

// Generar un objeto con la búsqueda
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); // Muesta los autos al cargar
  llenarSelectMarca(); // Llena las opciones de marca
  llenarSelectYear(); // Llena las opciones de años
  llenarSelectPuertas(); // Llena las opciones de puertas
  llenarSelectTransmision(); // Llena las opciones de transmision
  llenarSelectColor(); // Llena las opciones de color
});

marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = parseInt(e.target.value);
  filtrarAuto();
});

minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = parseInt(e.target.value);
  filtrarAuto();
});

maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = parseInt(e.target.value);
  filtrarAuto();
});

puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);
  filtrarAuto();
});

transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});

color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();
});

// Funciones
const mostrarAutos = (autos) => {
  limpiarHTML();
  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const autoHTML = document.createElement("p");
    autoHTML.textContent = `
            ${marca}  ${modelo} - ${year} - ${puertas} puertas - 
            Transmisión: ${transmision} - Precio: $${precio} - Color: ${color}
        `;
    resultado.appendChild(autoHTML);
  });
};

const limpiarHTML = () => {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
};

const llenarSelectMarca = () => {
  const marcas = autos.map((auto) => auto.marca);
  const marcasUnicas = marcas.reduce((arr, valor) => {
    if (arr.indexOf(valor) < 0) {
      arr.push(valor);
    }
    return arr;
  }, []);

  marcasUnicas.forEach((marcaAuto) => {
    const opcion = document.createElement("option");
    opcion.value = marcaAuto;
    opcion.textContent = marcaAuto;
    marca.appendChild(opcion); // Agrega las opciones de marca al select
  });
};

const llenarSelectYear = () => {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion); // Agrega las opciones de año al select
  }
};

const llenarSelectPuertas = () => {
  const cantidadPuertas = autos.map((auto) => auto.puertas).sort();
  const puertasUnicas = cantidadPuertas.reduce((arr, valor) => {
    if (arr.indexOf(valor) < 0) {
      arr.push(valor);
    }
    return arr;
  }, []);

  puertasUnicas.forEach((puertasAuto) => {
    const opcion = document.createElement("option");
    opcion.value = puertasAuto;
    opcion.textContent = puertasAuto;
    puertas.appendChild(opcion); // Agrega las opciones de puertas al select
  });
};

const llenarSelectTransmision = () => {
  const tiposTransmision = autos.map((auto) => auto.transmision).sort();
  const transmisionUnicas = tiposTransmision.reduce((arr, valor) => {
    if (arr.indexOf(valor) < 0) {
      arr.push(valor);
    }
    return arr;
  }, []);

  transmisionUnicas.forEach((transmisionAuto) => {
    const opcion = document.createElement("option");
    opcion.value = transmisionAuto;
    opcion.textContent =
      transmisionAuto.charAt(0).toUpperCase() + transmisionAuto.slice(1);
    transmision.appendChild(opcion); // Agrega las opciones de transmisión al select
  });
};

const llenarSelectColor = () => {
  const colores = autos.map((auto) => auto.color).sort();
  const coloresUnicos = colores.reduce((arr, valor) => {
    if (arr.indexOf(valor) < 0) {
      arr.push(valor);
    }
    return arr;
  }, []);

  coloresUnicos.forEach((coloresAuto) => {
    const opcion = document.createElement("option");
    opcion.value = coloresAuto;
    opcion.textContent = coloresAuto;
    color.appendChild(opcion); // Agrega las opciones de colores al select
  });
};

const filtrarAuto = () => {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);
  
  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
};

const noResultado = () => {
  limpiarHTML();
  const noResultado = document.createElement("div");
  noResultado.classList.add("alerta", "error");
  noResultado.textContent = "No hay resultados. Intenta con otros parámetros de búsqueda.";
  resultado.appendChild(noResultado);
}

const filtrarMarca = (auto) => {
  if (datosBusqueda.marca) {
    return auto.marca === datosBusqueda.marca;
  }
  return auto;
};

const filtrarYear = (auto) => {
  if (datosBusqueda.year) {
    return auto.year === datosBusqueda.year;
  }
  return auto;
};

const filtrarMinimo = (auto) => {
  if (datosBusqueda.minimo) {
    return auto.precio >= datosBusqueda.minimo;
  }
  return auto;
};

const filtrarMaximo = (auto) => {
  if (datosBusqueda.maximo) {
    return auto.precio <= datosBusqueda.maximo;
  }
  return auto;
};

const filtrarPuertas = (auto) => {
  if (datosBusqueda.puertas) {
    return auto.puertas === datosBusqueda.puertas;
  }
  return auto;
};

const filtrarTransmision = (auto) => {
  if (datosBusqueda.transmision) {
    return auto.transmision === datosBusqueda.transmision;
  }
  return auto;
};

const filtrarColor = (auto) => {
  if (datosBusqueda.color) {
    return auto.color === datosBusqueda.color;
  }
  return auto;
};
