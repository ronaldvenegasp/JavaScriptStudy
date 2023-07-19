(function () {
  let DB;
  let idCliente;

  const nombreInput = document.querySelector("#nombre");
  const empresaInput = document.querySelector("#empresa");
  const emailInput = document.querySelector("#email");
  const telefonoInput = document.querySelector("#telefono");

  const formulario = document.querySelector("#formulario");

  document.addEventListener("DOMContentLoaded", function () {
    conectarDB();

    // Actualiza el registro
    formulario.addEventListener("submit", actualizarCliente);

    // Verificar el ID de la URL
    const urlParams = new URLSearchParams(window.location.search);
    idCliente = urlParams.get("id");

    if (idCliente) {
      setTimeout(() => {
        obtenerCLiente(idCliente);
      }, 500);
    }
  });

  function actualizarCliente(e) {
    e.preventDefault();

    if (
      nombreInput.value === "" ||
      empresaInput.value === "" ||
      emailInput.value === "" ||
      telefonoInput.value === ""
    ) {
      imprimirAlerta("Todos los campos son obligatorios", "error");
      return;
    }

    // Actualizar cliente
    const clienteActualizado = {
      id: Number(idCliente),
      nombre: nombreInput.value,
      empresa: empresaInput.value,
      email: emailInput.value,
      telefono: telefonoInput.value,
    };

    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");
    objectStore.put(clienteActualizado);

    transaction.onerror = function (error) {
      console.log(error.target.error);
      imprimirAlerta("Hubo un error", "error");
    };

    transaction.oncomplete = function () {
      console.log("Editado correctamente");
      imprimirAlerta("Editado correctamente");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    };
  }

  function obtenerCLiente(id) {
    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    const cliente = objectStore.openCursor();
    cliente.onsuccess = function (e) {
      const cursor = e.target.result;

      if (cursor) {
        if (cursor.value.id === Number(id)) {
          llenarFormulario(cursor.value);
        }
        cursor.continue();
      }
    };
  }

  function llenarFormulario(cliente) {
    const { nombre, empresa, email, telefono } = cliente;
    nombreInput.value = nombre;
    empresaInput.value = empresa;
    emailInput.value = email;
    telefonoInput.value = telefono;
  }

  function conectarDB() {
    const abrirConexion = window.indexedDB.open("crm", 1);

    abrirConexion.onerror = function () {
      console.log("Hubo un error");
    };

    abrirConexion.onsuccess = function () {
      DB = abrirConexion.result;
    };
  }
})();
