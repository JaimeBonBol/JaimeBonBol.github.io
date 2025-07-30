let menuVisible = false;

//Elementos HTML
const nav = document.getElementById("nav");

//Función para ocultar o mostrar el menú
function mostrarOcultarMenu(){
    if(menuVisible){
        nav.classList = "";
        menuVisible = false;
    }else{
        nav.classList = "responsive";   //Para que se le apliquen los estilos dados en el @media...
        menuVisible = true;
    }
}

//Función para ocultar el menú una vez que selecciono una opción.
function seleccionar(){
    nav.classList = "";
    menuVisible = false;
}