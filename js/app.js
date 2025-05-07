cargarHtml('home.html');

async function cargarHtml(archivoHtml) {
    
    // Se obtiene el archivo que le paso por parámetros, es decir el html que voy a cargar en mi página principal.
    const response = await fetch(archivoHtml);

    if(!response.ok) throw new Error("Error al cargar el archivo XML");

    //Se convierte el objeto respuesta( el html ) a texto plano.
    const texto = await response.text();

    //Se inserta el contenido del html que está en texto plano a mi div.
    document.getElementById("contenido-html").innerHTML = texto;

}