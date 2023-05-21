


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


//ho creato un riferimento alla lista <ul> con id list-playlist
const listaDaPopulare = document.getElementById("list-playlist");

for (let i = 0; i < playlistNames.length; i++) {
    const elementoLi = document.createElement("li");
    elementoLi.innerText = playlistNames[i];
    listaDaPopulare.appendChild(elementoLi);
}
    

avviaBrano(localStorage.getItem("nameArtist_Player"), localStorage.getItem("nameArtist_Player"), localStorage.getItem("imgAlbum_Player"),localStorage.getItem("preview_Player"))




const cover = document.getElementById('cover');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id)
fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + id)
    .then(response => response.json())
    .then(artist => {
        console.log(artist)
        let red = Math.round(Math.random()*255)
        let green = Math.round(Math.random()*255)
        let blue = Math.round(Math.random()*255)
        document.querySelector('.main-album').style.background = `linear-gradient(180deg, rgba(${red},${green},${blue},0.5) 5%, rgba(18,18,18,0.4) 60%)`
        console.log(document.querySelector('.main-album'))
        console.log(`linear-gradient(180deg, rgba(${red},${green},${blue}) 40%, rgba(18,18,18,1) 60%)`)
        cover.innerHTML = `<div class="row pt-5 ms-3 container-fluid">
                <div class='container-fluid col-md-4 col-12 container-img-album' >
                    <div id="cover_Album" style="background-image: url('${artist.cover}'); box-shadow: 2px 2px 100px rgba(${red},${green},${blue},1)"></div>
                </div>
                <div class="col-md-8 col-12 d-flex container-fluid">
                    <div class="card-body d-flex flex-column justify-content-end">
                        <p id="p_Album" class="m-0">ALBUM</p>
                        <h5 id="title_Album" class="card-title col-12" style="text-shadow: 1px 0px 33px rgba(${red},${green},${blue},1);">${artist.title}</h5>
                        <div id="dettagli_Album" class="d-flex">
                            <div style="background-image: url('${artist.artist.picture_small}'); width: 20px;height: 20px; background-size: contain; box-shadow: 1px 0px 33px rgba(${red},${green},${blue},1)" class="rounded-circle me-2"></div>
                            <p class="card-text me-2 mt-1"><b>${artist.artist.name}</b></p>
                            <p class="card-text me-2 mt-1">${artist.release_date.substr(0, 4)}</p>
                            <p class="card-text me-2 mt-1">${artist.nb_tracks} brani</p>
                            <p class="card-text me-2 mt-1">${(artist.duration / 60).toFixed(0)} min, ${(artist.duration % 60)} sec </p>
                        </div>
                    </div>
                </div>
            </div>`
    })
console.log(id)
fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + id)
    .then(response => response.json())
    .then(tracks => {



        console.log(tracks.tracks)

        tracks.tracks.data.forEach((element, i) => {
            console.log(element.preview)
            document.getElementById('caratteristiche_singola_track').innerHTML += `<div class='container-fluid' style='height:100%'> <div id="track" style="width: 100%; font-size: 0.8em; opacity: 0.75;" class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex col-4">
                    <div class="me-3 ">${i + 1}</div>
                    <div>
                       <a style="text-decoration: none; color: white;" href="#" onclick="avviaBrano('${element.title_short.replaceAll("'", "‛")}', '${element.artist.name}','${element.album.cover_small}','${element.preview}')"><div><b>${element.title_short}</b></div></a>
                       <a style="text-decoration: none; color: white;" href="./artisti.html?id=${element.artist.id}"><div>${element.artist.name}</div></a>
                    </div>
                    
                </div>

                <div class="col-4 text-center" >${element.rank}</div>
                <div class="col-4 text-end">${(element.duration / 60).toFixed(0)}:${((element.duration) % 60) < 10 ? "0" + ((element.duration) % 60) : ((element.duration) % 60)}</div>
                </div>
                </div>`

        });

    })




function avviaBrano(title, name_artist, img, preview) {

    document.querySelector('.container-imgPlayer img').src = img
    document.querySelector('.titlePlayer b').innerText = name_artist
    document.querySelector('#artistPlayer_album').innerText = title
    document.querySelector('#artistPlayer_album_coda').innerText = title
    document.getElementById('little-heart').classList.remove('color_heart')
    console.log(preview)

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
                    document.getElementById('artistPlayer_album_coda').style.opacity = '0'
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
            
            console.log(progress_bar_interval)
            clearInterval(progress_bar_interval)
            console.log(document.getElementById('container_play'))
            document.getElementById('container_play').innerHTML = `<path id="simbolo_play" d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
            `
        }



    })

}



let i_like_it_little_heart = false
function like_little_heart(){
  i_like_it_little_heart = !i_like_it_little_heart
  if(i_like_it_little_heart){
    document.getElementById('little-heart').classList.add('color_heart')
  }
  else{
    document.getElementById('little-heart').classList.remove('color_heart')
  }
  console.log(i_like_it_little_heart)
  
  
}

let i_like_it_big_heart = false
function like_big_heart(){
  i_like_it_big_heart = !i_like_it_big_heart
  if(i_like_it_big_heart){
    document.getElementById('big-heart').classList.add('color_heart')
  }
  else{
    document.getElementById('big-heart').classList.remove('color_heart')
  }
  console.log(i_like_it_big_heart)
  
  
}


function download(){
    
        document.querySelector('.bi-box-arrow-down').classList.add('download_class')
        
        setTimeout(()=>{

            document.querySelector('.spinner-border').style.opacity = '1'
            document.querySelector('.spinner-border').style.color = 'rgb(30, 215, 96)'
           
        },1000)
        
        setTimeout(()=>{
            document.querySelector('.spinner-border').style.opacity = '0'
            document.querySelector('.bi-box-arrow-down').classList.remove('download_class')
        }, 5000)

       setTimeout(()=>{
        document.querySelectorAll('.bi-caret-down-fill').forEach(element=>{
            element.classList.add('download_arrow')
        })
       }, 3000)
       
        document.querySelectorAll('.bi-caret-down-fill').forEach(element=>{
            setTimeout(()=>{
                element.classList.remove('download_arrow')
            },7000)
            })

    

}

