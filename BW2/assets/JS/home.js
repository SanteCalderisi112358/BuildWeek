

// ____SEZIONE BUONASERA____ //



var oraCorrente = new Date().getHours();
console.log(oraCorrente)
var saluto;

if (oraCorrente >= 6 && oraCorrente < 12) {
  saluto = "Buongiorno";
} else if (oraCorrente >= 12 && oraCorrente < 18) {
  saluto = "Buon pomeriggio";
} else if (oraCorrente >= 18 && oraCorrente < 24) {
  saluto = "Buonasera";
} else if (oraCorrente >= 0 && oraCorrente < 6) {
  saluto = "Buonanotte";
}

document.getElementById("saluto").innerHTML = saluto;






//Questo sarà l'array che cicleremo per populare la spazio dedicato alle playlist

const playlistNames = [
  "Amour toujours❤️",
  "Cuori solitari",
  "Blue Lips",
  "Love songs",
  "One Step Closer",
  "Kissy",
  "Enemies to lovers",
  "Holde me closed",
  "First Date",
  "Oh honey",
  "My Valentine🌹",
  "Nostalgic Memories",
  "False alarm",
  "Mood boost",
  "Fellin'Good",
  "Dance to the Beat",
  "Zero Stress",
  "Kitcken Music",
  "Quiet Sounds🍃",
  "Enjoy your coffee",
  "Wine Please",
  "Beer Drinkin",
  "8 Hour Deep Sleep🌙",
  "Rock Indie",
  "Hip Hop Control",
  "Jazzy Mood",
  "Lips of an Angel",
  "Versatile Emotions😊",
  "Closer to Fine",
  "No song without you",
];
console.log(playlistNames);

//ho creato un riferimento alla lista <ul> con id list-playlist
const listaDaPopulare = document.getElementById("list-playlist");

for (let i = 0; i < playlistNames.length; i++) {
  const elementoLi = document.createElement("li");
  elementoLi.innerText = playlistNames[i];
  listaDaPopulare.appendChild(elementoLi);
}



//nascondi annunci
const annunci = document.querySelector('.container-annunci');
const btnAnnunci = document.querySelector('.nascondi-annunci');
btnAnnunci.addEventListener('click', function () {
  annunci.classList.add('d-none');
})


//Al caricmaneto della pagina vengono generate le card

var array_artisti = ['Queen', 'Maneskin', 'Thasup', 'Beyoncè', 'Miley Cyrus', 'Beatles', 'Harry Styles', 'Bad Bunny', 'Rihanna', 'coldplay', 'Lucio Dalla', 'Elodie', 'Cardi B', 'Taylor Swift', 'Coez', 'Carl Brave', 'Frah Quintale', 'Maroon 5', 'Annalisa', 'Sfera Ebbasta', 'Pinguini tattici nucleari', 'Pavarotti', 'Cesare Cremonini', 'Jovanotti', 'Elisa', 'Travis Scott', 'Justin Bieber', 'Drake', 'Florence + The Machine', 'Blanco', 'Lady Gaga', 'JAY-Z', 'Raffaella Carrà', 'Britney Spears', 'Abba', 'Labrinth', 'Lazza', 'Franco Battiato', 'Avril Lavigne', 'Machine Gun Kelly', 'Nicki Minaj', 'Ed Sheeran', 'Salmo']

console.log(array_artisti.length)
const random_number = Math.round(Math.random() * array_artisti.length)
console.log(random_number)
const random_artist = array_artisti[random_number]
fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + random_artist)
  .then(queen => queen.json())
  .then(randomMusic => {
    console.log(randomMusic)
    const random_number_track_home = Math.round(Math.random() * randomMusic.data.length)
    


    document.querySelector('.container-imgPlayer img').src = randomMusic.data[random_number_track_home].album.cover_small
    document.querySelector('.titlePlayer b').innerText = randomMusic.data[random_number_track_home].artist.name
    document.querySelector('#artistPlayer_album').innerText = randomMusic.data[random_number_track_home].title.replaceAll("'", "‛")
    localStorage.setItem("imgAlbum_Player", randomMusic.data[random_number_track_home].album.cover_small)  
    localStorage.setItem("titleTrack_Player", randomMusic.data[random_number_track_home].title.replaceAll("'", "‛"))   
    localStorage.setItem("nameArtist_Player", randomMusic.data[random_number_track_home].artist.name) 
    localStorage.setItem("preview_Player", randomMusic.data[random_number_track_home].preview)
    document.querySelector('#artistPlayer_album_coda').innerText = randomMusic.data[random_number_track_home].title.replaceAll("'", "‛")
    document.getElementById('div_play_album').innerHTML = `<button type="button" class="btn-circle" id="button_play_album" onclick="avviaBrano('${randomMusic.data[random_number_track_home].preview}')" >
      <svg xmlns="http://www.w3.org/2000/svg" id="container_play" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
          <path id="simbolo_play" d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
      </svg></button>`

    randomMusic.data.forEach(element => {
      cardsHome.innerHTML += `<div class="col-3 rounded border border-0 cardsAltroCheTiPiace">
          <div class="card m-2" style="heigth:50px">
            <img class="card-img-top p-2 rounded" src=${element.album.cover} alt="Card image cap" width="30px">
              <div class="card-body">
              <a href="./artisti.html?id=${element.artist.id}"><h5 class="card-title">${element.artist.name}</h5></a>
              <a href="./album.html?id=${element.album.id}"><h5 class="card-title">${element.album.title}</h5></a>

              </div>
          </div>
        </div>`
    })
  })





//Gestione Cards della Homepage-"Altro che può piacere"
//mi aggancio all'icona "cerca", al form e al button "Cerca"
//mi aggancio al div che contiene le cards generate da js

const cardsHome = document.getElementById('homeAltroCheTiPiaceCards')
const cerca = document.querySelector('#search button');
//rendo invisibile il form per la ricerca e il button
cerca.style.display = 'none'
document.querySelector('#search input').style.display = 'none'


//definisco la funzione "faiComparireInputFunction" definita con onclick nell'html:
//questa funzione si avvia quando viene premuta l'icona della ricerca:
//mostra il campo input e il button "Cerca" e nasconde l'icona lente 
function faiComparireInputFunction() {
  cerca.style.display = 'block'

  document.querySelector('#search input').style.display = 'block'
  document.getElementById('sparire').style.display = 'none'
}

//quando clicco sul button "cerca" (ora visibile):
//1. evito il refresh della pagina (con e.preventDefaul())
//2. memorizza nella variabile query il valore dell'input introdotto dall'utente
//3. memorizza in url l'url specifico 
//4. fa la chimata all'API
//5. l'array che ritorna viene sputato nel DOM con un forEach e per ogni elemento definito da "query" ci crea una card che viene mostrata nel div homeAltroCheTiPiaceCards
cerca.addEventListener('click', (e) => {
  e.preventDefault()

  const query = document.querySelector('#search input').value
  console.log(query)
  const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q={${query}}`;
  fetch(url)
    .then(response => response.json())
    .then(musica => {
      console.log(musica)

      cardsHome.innerHTML = ""
      musica.data.forEach(element => {
        cardsHome.innerHTML += `<div class="col-3 rounded border border-0 cardsAltroCheTiPiace">
          <div class="card m-2" style="heigth:50px">
            <img class="card-img-top p-2 rounded" src=${element.album.cover} alt="Card image cap" width="30px">
              <div class="card-body">
                <a href="./artisti.html?id=${element.artist.id}"><h5 class="card-title">${element.artist.name}</h5></a>
                <a href="./album.html?id=${element.album.id}"><h5 class="card-title">${element.album.title}</h5></a>

              </div>
          </div>
        </div>`
      })


    })

  document.querySelector('#search input').value = ''

})

console.log(cerca)
console.log(search)




let play = false

let progress_bar_interval

function avviaBrano(preview) {



  play = !play

  if (play) {

    let n = 0

    progress_bar_interval = setInterval(function () {

      document.getElementById('artistPlayer_album_coda').style.display = 'block'
      document.getElementById('artistPlayer_album_coda').classList.add('artistPlayer')
      document.getElementById('progress_audio').style.width = `${n * (100 / 30)}%`
      document.getElementById('start_traccia').innerText = "0:" + (n < 10 ? "0" + n : n)
      n++
      if (n > 30) {
        clearInterval(progress_bar_interval)
        document.getElementById('artistPlayer_album_coda').style.display = 'none'
        document.getElementById('artistPlayer_album_coda').classList.remove('artistPlayer')
        document.getElementById('container_play').innerHTML = `<path id="simbolo_play" d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
          `
        document.getElementById('container-scroll-text').classList.remove('container-scroll-text')
        document.getElementById('text-animation_album').classList.remove('text-animation')
        document.getElementById('artistPlayer_album').classList.remove('artistPlayer')
        document.getElementById('progress_audio').style.width = `0%`
      }

    }, 1000)


    document.getElementById('artistPlayer_album_coda').style.display = 'block'
    document.getElementById('artistPlayer_album_coda').classList.add('artistPlayer')
    document.getElementById('container-scroll-text').classList.add('container-scroll-text')
    document.getElementById('text-animation_album').classList.add('text-animation')
    document.getElementById('artistPlayer_album').classList.add('artistPlayer')
    document.getElementById('container_play').innerHTML = `<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>`
    document.getElementById('audio').innerHTML = `<audio controls autoplay>
                                                          <source src='${preview}' type="audio/mpeg">
                                                      </audio>`
  } else {
    document.getElementById('audio').innerHTML = ''
    document.getElementById('artistPlayer_album_coda').style.display = 'none'
    document.getElementById('artistPlayer_album_coda').classList.remove('artistPlayer')
    document.getElementById('container-scroll-text').classList.remove('container-scroll-text')
    document.getElementById('text-animation_album').classList.remove('text-animation')
    document.getElementById('artistPlayer_album').classList.remove('artistPlayer')
    console.log(progress_bar_interval)
    clearInterval(progress_bar_interval)
    console.log(document.getElementById('container_play'))
    document.getElementById('container_play').innerHTML = `<path id="simbolo_play" d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
          `
  }





}

let i_like_it = false
function like(){
  i_like_it = !i_like_it
  if(i_like_it){
    document.querySelector('.bi-heart-fill').classList.add('color_heart')
  }
  else{
    document.querySelector('.bi-heart-fill').classList.remove('color_heart')
  }
  console.log(i_like_it)
  
  
}

var toggleBtn = document.getElementById('toggle-btn');
    toggleBtn.onclick = function() {
        this.classList.toggle('toggle-btn--dark');
        document.body.classList.toggle('light-mode');
        document.querySelector('.sidebar-amici').classList.toggle('light-mode');
        document.querySelector('.sidebar').classList.toggle('light-mode');
        document.querySelector('.container-annunci').classList.toggle('light-mode');
        document.querySelector('.player').classList.toggle('light-mode');
    };