//->Marvel_app
//const privatekey = 'a6c804042f3a4a77f9daff37de78b56a8c3e1069';
const urlBase = "https://gateway.marvel.com:443/v1/public/characters";
const apiKey = 'fd88e38c3ed7b80d16123b62c8b2878d';
const ts = "24/11/2023, 19:44:16"; // Timestamp
const hash = "1712104d6a67de7da2cac3f1be00b1f7"; // Hash generado para la solicitud
const main = document.getElementById("main");

// Construir la URL con los parámetros necesarios
const url = `${urlBase}?ts=${encodeURIComponent(ts)}&apikey=${apiKey}&hash=${hash}`;

// Hacer la solicitud a la API
fetch(url)
  .then(response => response.json())
  .then(response => printData(response.data.results))
  .catch(error => {
    console.log('Error al hacer la solicitud:', error);
  });

  //Funcion prindata
const printData = (personajes) => {

  let str = '<div class="row row-cols-1 row-cols-md-3 g-3">';
  personajes.forEach(personaje => {
    const name = personaje.name || "No Name Available";
    const img = `${personaje.thumbnail.path}.${personaje.thumbnail.extension}`;
    const bio = personaje.description || "No Description Available";
    const comicLinkUrl = personaje.urls.find(url => url.type === 'comiclink')?.url || '#';
    
    str +=
      `<div class="col"> 
        <div class="card">
          <a href="${comicLinkUrl}"  target="_blank">
            <img src="${img}" class="card-img-top" alt="Image of ${name}"/>
          </a>
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${bio}</p>
          </div>
        </div>
      </div>`;
  });


  str = str + '</div>'
  main.innerHTML = str;


};

//Listener para formulario de busqueda
document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Previene el comportamiento por defecto del formulario
  const searchTerm = document.getElementById('searchInput').value;
  searchCharacters(searchTerm); // Función que realiza la búsqueda
});

// Función para buscar personajes
const searchCharacters = (searchTerm) => {
  const searchUrl = `${urlBase}?nameStartsWith=${encodeURIComponent(searchTerm)}&ts=${encodeURIComponent(ts)}&apikey=${apiKey}&hash=${hash}`;
  fetch(searchUrl)
    .then(response => response.json())
    .then(response => printData(response.data.results))
    .catch(error => {
      console.error('Error en la búsqueda:', error);
    });
};



