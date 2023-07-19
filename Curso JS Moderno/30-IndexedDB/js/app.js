let DB;

/**
 * Initializes the CRM database when the DOM content is loaded.
 * @function
 * @name init
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", () => {
  crmDB();

  /** Setting a timer to execute the `crearCliente()`
   * function after a delay of 5000 milliseconds (5 seconds).
   */
  setTimeout(() => {
    crearCliente();
  }, 5000);
});

/**
 * The function creates an indexedDB database named "crm".
 * Opens a new IndexedDB database with the name "crm" and version number 1.
 * Sets up event listeners for errors, success, and database upgrades.
 * When a database upgrade is triggered, creates an object store with keyPath "crm"
 * and autoIncrement true, and creates indexes for "nombre", "email", and "telefono".
 * @function
 * @name crmDB
 * @returns {void}
 */
function crmDB() {
  let crmDB = window.indexedDB.open("crm", 1);
  crmDB.onerror = function () {
    console.log("There was an error creating the database");
  };

  crmDB.onsuccess = function () {
    console.log("Database created successfully");
    DB = crmDB.result;
  };

  crmDB.onupgradeneeded = function (e) {
    console.log("This method executes when the database changes");
    console.log(e.target.result);
    const db = e.target.result;
    const objectStore = db.createObjectStore("crm", {
      keyPath: "crm",
      autoIncrement: true,
    });
    objectStore.createIndex("nombre", "nombre", { unique: true });
    objectStore.createIndex("email", "email", { unique: true });
    objectStore.createIndex("telefono", "telefono", { unique: false });
    console.log("Columns created successfully");
  };
}

/**
 * Creates a new client and adds it to the "crm" object store in the "crm" database.
 * @function
 * @name crearCliente
 * @returns {void}
 */
function crearCliente() {
  // Create a new transaction in "crm" database for read and write operations
  let transaction = DB.transaction(["crm"], "readwrite");

  // Set up event handlers for transaction completion and error
  transaction.oncomplete = function () {
    console.log("Transaction completed.");
  };
  transaction.onerror = function () {
    console.log("Transaction error occurred.");
  };

  // Get the "crm" object store from the transaction
  const objectStore = transaction.objectStore("crm");

  // Create a new client object with some sample data
  const nuevoCliente = {
    nombre: "Ronald",
    email: "correo@correo.com",
    telefono: "1234567890",
  };

  // Add the new client object to the object store using the add() method
  const request = objectStore.add(nuevoCliente);

  // Set up event handlers for request success and error
  request.onsuccess = function () {
    console.log("Client added.");
  };
  request.onerror = function () {
    console.log("Error adding client.");
  };
}
