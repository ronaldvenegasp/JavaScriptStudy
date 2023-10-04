const notificarBtn = document.querySelector("#notificar");

notificarBtn.addEventListener("click", () => {
    // Utilizando Notification API
    Notification.requestPermission().then((result) =>
        console.log(`El resultado es ${result}`)
    );
});

const verNotificacion = document.querySelector("#verNotificacion");

verNotificacion.addEventListener("click", () => {
    // Creando una nueva notificación una vez el usuario dio permiso
    if (Notification.permission === "granted") {
        const notificacion = new Notification("Esta es la notificación", {
            icon: "img/ccj.png",
            body: "Código con Juan, aprende con proyectos reales",
        });

        notificacion.onclick = () =>
            window.open("https://www.codigoconjuan.com");
    }
});
