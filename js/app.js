// Establecer idioma por defecto si no hay.
if(!localStorage.getItem("lang")){
    localStorage.setItem("lang", "en")
}

actualizarBotonIdioma();
let paginaActual = "home";
cargarHtml(paginaActual);

async function cargarHtml(archivoHtml) {
    
    //Se guarda la página actual para recargar si se cambia idioma.
    paginaActual = archivoHtml;

    const lang = localStorage.getItem("lang");
    const archivoCambiar = `${archivoHtml}-${lang}.html`;

    // Se obtiene el archivo que le paso por parámetros, es decir el html que voy a cargar en mi página principal.
    const response = await fetch(archivoCambiar);

    if(!response.ok) throw new Error("Error al cargar el archivo HTML");

    //Se convierte el objeto respuesta( el html ) a texto plano.
    const texto = await response.text();

    //Se inserta el contenido del html que está en texto plano a mi div.
    document.getElementById("contenido-html").innerHTML = texto;

}

function cambiarIdioma(){

    //Obtener el idioma actual guardado en localStorage
    const idiomaActual = localStorage.getItem("lang") || "en";

    //Si el idioma actual es inglés, el siguiente será español, si no al al revés.
    let siguienteIdioma;
    if (idiomaActual === "en") {
        siguienteIdioma = "es";
    } else {
        siguienteIdioma = "en";
    }

    localStorage.setItem("lang", siguienteIdioma);

    // Actualizar botón para mostrar bandera del idioma al que se puede cambiar
    actualizarBotonIdioma();

    // Recargar el contenido actual con el nuevo idioma
    cargarHtml(paginaActual);

}

function actualizarBotonIdioma() {
    const idioma = localStorage.getItem("lang") || "en";
    const langBtnLabel = document.getElementById("lang-btn-label");
    
    if (idioma === "en") {
        // Si está en inglés, botón muestra bandera de España para cambiar a español
        langBtnLabel.innerHTML = `<img src="images/es.png" style="width:20px;">`;
    } else {
        // Si está en español, botón muestra bandera de Reino Unido para cambiar a inglés
        langBtnLabel.innerHTML = `<img src="images/en.png" style="width:20px;">`;
    }
}
