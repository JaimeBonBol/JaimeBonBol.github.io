(function() {
  emailjs.init("9Umg-js8UJUN_kRdK"); 
})();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contacto");
  const estado = document.getElementById("estado");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    emailjs.sendForm("service_wdhdvst", "template_8rbyng7", this)
      .then(() => {
        estado.innerText = "✅ Mensaje enviado con éxito.";
        form.reset();
      })
      .catch((error) => {
        estado.innerText = "❌ Error al enviar. Intenta de nuevo.";
        console.error("Error:", error);
      });
  });
});
