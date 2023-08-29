const notificarBtn = document.querySelector("#notificar");
notificarBtn.addEventListener("click", () => {
    Notification.requestPermission()
        .then((resultado) => console.log(resultado))
        .catch((error) => console.error(`Error: ${error}`));
});

const verNotificacion = document.querySelector("#verNotificacion");
verNotificacion.addEventListener("click", () => {
  if (Notification.permission === "granted") {
    const notificación = new Notification("Esta es la notificación", {
      icon: "../img/ccj.png",
      body: "Código con Juan, aprende con proyectos reales"
    });

    notificación.onclick = () => {
      window.open("https://www.codigoconjuan.com");
    }
  }
});
