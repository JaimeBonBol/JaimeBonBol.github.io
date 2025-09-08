// Inicializa EmailJS
emailjs.init("9Umg-js8UJUN_kRdK");

// Escucha cualquier submit en el documento
document.addEventListener('submit', function (event) {
    // Solo actuamos si el formulario es el de contacto
    if (event.target && event.target.id === 'form-contacto') {
        event.preventDefault();

        const form = event.target;
        const estado = document.getElementById("estado");

        // Enviar con EmailJS
        emailjs.sendForm("service_wdhdvst", "template_8rbyng7", form)
            .then(() => {
                estado.innerText = "Mensaje enviado con éxito.";
                form.reset();
            })
            .catch((error) => {
                estado.innerText = "Error al enviar. Intenta de nuevo.";
                console.error("Error EmailJS:", error);
            });
    }
});