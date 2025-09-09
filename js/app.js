let menuVisible = false;
let nav; // declaración variable global

// Por defecto aparezca el idioma en español
localStorage.setItem("lenguaje", "es")

// Cargar encabezado y footer lo primero
cargarEncabezado();

cargarContenido();

cargarFooter();


//Elementos HTML
// const nav = document.getElementById("nav");

//Función para ocultar o mostrar el menú
function mostrarOcultarMenu() {
    if (!nav) return; // Si nav no existe, no hacer nada


    if (menuVisible) {
        nav.classList = "";
        menuVisible = false;
    } else {
        nav.classList = "responsive";   //Para que se le apliquen los estilos dados en el @media...
        menuVisible = true;
    }
}

//Función para ocultar el menú una vez que selecciono una opción.
function seleccionar() {
    nav.classList = "";
    menuVisible = false;
}

// USO DE FETCH PARA CARGAR UN HTML U OTRO DEPENDIENDO DEL IDIOMA ALMACENADO EN LOCALSTORAGE

// Función para cargar el encabezado
async function cargarEncabezado() {

    const lenguaje = localStorage.getItem("lenguaje");

    const response = await fetch(`pages/header-${lenguaje}.html`);

    if (!response.ok) throw new Error("Error al cargar encabezado");

    const texto = await response.text();

    document.getElementById("contenedor-header").innerHTML = texto;

    // Ahora que el header está cargado, obtenemos nav
    nav = document.getElementById("nav");

}


// Función para cargar footer
async function cargarFooter() {

    const lenguaje = localStorage.getItem("lenguaje");

    const response = await fetch(`pages/footer-${lenguaje}.html`);

    if (!response.ok) throw new Error("Error al cargar encabezado");

    const texto = await response.text();

    document.getElementById("footer").innerHTML = texto;

}

// Función para cargar el contenido del portfolio
async function cargarContenido() {

    // Se obtiene el lenguaje almacenado en el localStorgae
    const lenguaje = localStorage.getItem("lenguaje");

    // Se obtiene el archivo que voy a cargar en mi página principal.
    const response = await fetch(`pages/contenido-${lenguaje}.html`);

    if (!response.ok) throw new Error("Error al cargar encabezado");

    // Se convierte el objeto respuesta (html) a texto plano.
    const texto = await response.text();

    //Se inserta el contenido del html que está en texto plano a mi div.
    document.getElementById("contenido").innerHTML = texto;

    // Conectar el formulario después de insertar el contenido (así me aseguro que ha cargado el formulario en el DOM)
    // conectarFormulario();


}


// Función para cmabiar el idioma
function cambiarIdioma() {

    // Obtener el idioma actual guardado en localStorage
    const idiomaActual = localStorage.getItem("lenguaje");

    // Cargar en una variable el siguiente idioma dependiendo del valor del actual.
    let siguienteIdioma;

    if (idiomaActual === "en") {
        siguienteIdioma = "es";
    } else {
        siguienteIdioma = "en";
    }

    // Asignar a la variable de localStorage el siguiente idioma para que cambie el valor guardado.
    localStorage.setItem("lenguaje", siguienteIdioma);

    // Recargar las ṕaginas ahora con el siguiente idioma.
    cargarEncabezado();
    cargarContenido();
    cargarFooter();

}


