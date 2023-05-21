

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
avviaBrano(localStorage.getItem("nameArtist_Player"), localStorage.getItem("nameArtist_Player"), localStorage.getItem("imgAlbum_Player"),localStorage.getItem("preview_Player"))

//ho creato un riferimento alla lista <ul> con id list-playlist
const listaDaPopulare = document.getElementById("list-playlist");

for (let i = 0; i < playlistNames.length; i++) {
  const elementoLi = document.createElement("li");
  elementoLi.innerText = playlistNames[i];
  listaDaPopulare.appendChild(elementoLi);
}



const cover = document.getElementById('cover');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id)

fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + id)
  .then(res => res.json())
  .then(artista => {

    console.log(artista)
    document.getElementById('artist_likes').innerText += artista.name
    document.getElementById('img_artist_like').style.background = `url('${artista.picture_small}')`
    document.getElementById('random_number').innerText = Math.round(Math.random() * 20 + 5)

    document.querySelector('.container-artista').style.background = `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.9)), url('${artista.picture_big}')`
    document.querySelector('.container-artista').style.backgroundSize = "cover"
    document.querySelector('.container-artista').style.backgroundRepeat = "no-repeat"
    document.querySelector('.container-artista').style.backgroundPosition = "0% 30%"

    document.querySelector('h1 b').innerText = artista.name
    document.getElementById('views').innerText = artista.nb_fan
    console.log(artista.tracklist)
    fetch(artista.tracklist)
      .then(pop => pop.json())
      .then(popolari => {
        console.log(popolari.data)
        popolari.data.forEach((element, i) => {
          document.getElementById('popolari').innerHTML += `<div class="col-8 d-flex">
                <div class="me-2 mt-2">${i + 1}</div>
                <div class="mb-2 me-2" style="background-image: url('${element.album.cover}'); width:50px; height: 40px; background-size: cover;" ></div>
                 <a  style="text-decoration: none; color: white; cursor:pointer" onclick="avviaBrano('${element.title}','${element.artist.name}','${element.album.cover}','${element.preview}')"><div class="w-100 ms-2 mb-2 mt-2" style="font-size:10px">${element.title_short}</div></a>
             </div>
             
             <div class="col-2 text-end mb-2 mt-2" style="font-size:10px; opacity:0.6">${element.rank}</div>
             <div class="col-2 text-end mb-2 mt-2" style="font-size:10px; opacity:0.6">${(element.duration / 60).toFixed(0)}:${((element.duration) % 60) < 10 ? "0" + ((element.duration) % 60) : ((element.duration) % 60)}</div>
             
             `
        });

      })




  })

  .catch(err => console.log(err))
function avviaBrano(title, name_artist, img, preview) {

  console.log(preview)
  console.log(title)
  console.log(title, name_artist, img)
  document.querySelector('.container-imgPlayer img').src = img
  document.querySelector('.titlePlayer b').innerText = name_artist
  document.querySelector('#artistPlayer_album').innerText = title
  document.querySelector('#artistPlayer_album_coda').innerText = title
  document.querySelector('.bi-heart-fill').classList.remove('color_heart')
  let play = false
  let progress_bar_interval
  document.getElementById('button_play_album').addEventListener('click', () => {

    play = !play
    console.log(play)
    if (play) {

      let n = 0

      progress_bar_interval = setInterval(function () {


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



      document.getElementById('container-scroll-text').classList.add('container-scroll-text')
      document.getElementById('text-animation_album').classList.add('text-animation')
      document.getElementById('artistPlayer_album').classList.add('artistPlayer')
      document.querySelector('#artistPlayer_album_coda').style.display = 'block'
      document.querySelector('#artistPlayer_album_coda').classList.add('artistPlayer')
      document.getElementById('container_play').innerHTML = `<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>`
      document.getElementById('audio').innerHTML = `<audio controls autoplay>
                                                            <source src='${preview}' type="audio/mpeg">
                                                        </audio>`
    } else {
      document.getElementById('audio').innerHTML = ''

      document.getElementById('container-scroll-text').classList.remove('container-scroll-text')
      document.getElementById('text-animation_album').classList.remove('text-animation')
      document.getElementById('artistPlayer_album').classList.remove('artistPlayer')
      document.querySelector('#artistPlayer_album_coda').style.display = 'none'
      document.querySelector('#artistPlayer_album_coda').classList.remove('artistPlayer')
      //document.getElementById('little-heart').classList.remove('color_heart')
      console.log(progress_bar_interval)
      clearInterval(progress_bar_interval)
      console.log(document.getElementById('container_play'))
      document.getElementById('container_play').innerHTML = `<path id="simbolo_play" d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
            `
    }



  })




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


