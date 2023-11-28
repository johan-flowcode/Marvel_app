//Dragon-Ball app
const url = 'https://dragonball-api.com/api/characters';
const main = document.getElementById("main");

// Hacer la solicitud a la API
fetch(url)
  .then(response => response.json())
  .then(response => printData(response.items))
  .catch(error => {
    console.log('Error al hacer la solicitud:', error);
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
            <img src="${image[i]}" class="card-img" alt="imagen">
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


};