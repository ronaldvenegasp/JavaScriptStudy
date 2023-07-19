// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
const tweet = document.querySelector("#tweet");
let tweets = [];

// Eventos
eventListeners();

function eventListeners() {
  formulario.addEventListener("submit", agregarTweet);
  tweet.addEventListener("keypress", agregarTweet);
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    creatHTML();
  });
}

// Funciones
function agregarTweet(e) {
  if (e.key === "Enter" || e.type === "submit") {
    e.preventDefault();

    if (!tweet.value.length) {
      mostrarError("Un mensaje no puede ir vacio");
      return;
    }

    const tweetObj = {
      id: Date.now(),
      tweet: tweet.value,
    };

    tweets = [...tweets, tweetObj];

    creatHTML();

    formulario.reset();
  }
}

function mostrarError(error) {
  if (!document.querySelector("#mensaje-error")) {
    const mensajeError = document.createElement("p");
    mensajeError.id = "mensaje-error";
    mensajeError.textContent = error;
    mensajeError.classList.add("error");

    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeError);

    setTimeout(() => {
      mensajeError.remove();
    }, 3000);
  }
}

function creatHTML() {
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      const li = document.createElement("li");
      li.innerText = tweet.tweet;
      li.appendChild(btnEliminar);
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  creatHTML();
}

function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
