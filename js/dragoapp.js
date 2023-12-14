//Dragon-Ball app
const urlBase = 'https://dragonball-api.com/api/characters';
let currentPage = 1;
const limit = 5;
let totalPages = 0;
const main = document.getElementById("main");

// Hacer la solicitud a la API
const fetchCharacters = (page) => {
  const url = `${urlBase}?page=${page}&limit=${limit}`;
  fetch(url)
    .then(response => response.json())
    .then(response => {
      printData(response.items);
      updatePagination(response.meta.totalPages, page);
    })
    .catch(error => {
      console.log('Error al hacer la solicitud:', error);
    });
};

fetchCharacters(currentPage);
const updatePagination = (totalPagesFromAPI, currentPage) => {
  totalPages = totalPagesFromAPI;
  document.getElementById('previousPage').parentElement.classList[currentPage === 1 ? 'add' : 'remove']('disabled');
  document.getElementById('nextPage').parentElement.classList[currentPage === totalPages ? 'add' : 'remove']('disabled');
};
document.getElementById('previousPage').addEventListener('click', function (event) {
  event.preventDefault();
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage);
  }
});

document.getElementById('nextPage').addEventListener('click', function (event) {
  event.preventDefault();
  if (currentPage < totalPages) {
    currentPage++;
    fetchCharacters(currentPage);
  }
});

//Funcion prindata
const printData = (characters) => {
  //console.log(characters.length);

  let str = `<div class="row row-cols-1 row-cols-md-2 g-3">`;
  let i = 0;
  let name = [];
  let image = [];
  let race = [];
  let ki = [];
  let maxKi = [];
  let affiliation = [];

  for (i = 0; i < characters.length; i++) {
    name[i] = characters[i].name;
    image[i] = characters[i].image;
    race[i] = characters[i].race;
    ki[i] = characters[i].ki;
    maxKi[i] = characters[i].maxKi;
    affiliation[i] = characters[i].affiliation;


    if (!name[i]) {
      name[i] = "No Name Available.";
    }

    if (!image[i]) {
      image[i] = "No imagen Available.";
    }

    if (!race[i]) {
      race[i] = "No race Available.";
    }

    if (!ki[i]) {
      ki[i] = "No ki Available.";
    }

    if (!maxKi[i]) {
      maxKi[i] = "No maxKi Available.";
    }

    if (!affiliation[i]) {
      affiliation[i] = "No affiliation Available.";
    }

    str = str += `<div class="col">
        <div class="card">
        <img src="${image[i]}" class="card-img modal-trigger" alt="Imagen de ${name[i]}" data-id="${characters[i].id}">
            <div class="card-body">
                <h5 class="card-title">${name[i]}</h5>
                <p class="card-text">${race[i]}</p>
                <h6>Base KI:</h6>
                <p>${ki[i]}</p>
                <h6>Total KI:</h6>
                <p>${maxKi[i]}</p>
                <h6>affiliation:</h6>
                <p>${affiliation[i]}</p>
              </div>
            </div>
          </div>`

  };


  str = str + `</div>`
  main.innerHTML = str;

  document.querySelectorAll('.modal-trigger').forEach(img => {
    img.addEventListener('click', function () {
      const characterId = this.getAttribute('data-id');
      loadData(characterId);
    });
  });

};

function loadData(characterId) {
  fetch(`${urlBase}/${characterId}`)
    .then(response => response.json())
    .then(character => printModal(character));
}

function printModal(character) {
  let myModal = new bootstrap.Modal(document.getElementById('infoModal'));
  myModal.show();
  let modalTitleElement = document.querySelector('#infoModal .modal-title');
  let modalBodyElement = document.querySelector('#infoModal .modal-body');

  modalTitleElement.innerHTML = character.name;
  modalBodyElement.innerHTML = `
    <div>
      <img src="${character.image}" class="card-img-top">
      <p>${character.description}</p>
      <p><strong>Planeta de Origen:</strong> ${character.originPlanet.name}</p>
      <p><strong>Transformaciones:</strong> ${character.transformations.map(t => t.name).join(', ')}</p>
    </div>`;

}

document.addEventListener('DOMContentLoaded', () => {
  fetchCharacters(currentPage);
});