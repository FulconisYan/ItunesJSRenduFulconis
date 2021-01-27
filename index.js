let arrayAudio = [];
let arrayplay = [];
let arraypause = [];
let arraystop = [];
let arrayAudioVerif = [];


window.onload = function (){
    let button = document.querySelector("#recherche");
    let search = document.querySelector("#search");
    let output = document.querySelector("#output");
    button.addEventListener('click',(event) => {
       getDataFromItunes(search).then( action => {
                let loader = document.querySelector(".loader");
                for (let j=0; j<arrayAudio.length; j++)
                {
                    let audio;
                    let play;
                    let pause;
                    audio = document.querySelector("#"+arrayAudio[j]);
                    arrayAudioVerif.push(audio);
                    play = document.querySelector("#"+arrayplay[j]);
                    play.addEventListener('click', (event) => {
                        arrayAudioVerif.forEach(element =>{
                            if (element.play())
                            {
                                element.pause();
                            }
                        });
                       audio.play();
                    });
                    pause = document.querySelector("#"+arraypause[j]);
                    pause.addEventListener('click', (event) => {
                        audio.pause();
                    });
                    stop = document.querySelector("#"+arraystop[j]);
                    stop.addEventListener('click', (event) => {
                        audio.currentTime = 0;
                        audio.pause();
                    });
                }
                loader.className += ' hidden';

           });
    });
}

let myHeaders = new Headers();

let options = {
    method: 'GET',
    mode: 'cors',
    headers: myHeaders,
    cache: 'default'
};

async function getDataFromItunes(search) {
    let url= 'https://itunes.apple.com/search?term='+search.value;
    await fetch(url,options)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            let beginHTML = ''
            let finalHTML = '';
            arrayAudio = [];
            arrayplay = [];
            arraypause = [];
            arraystop = [];
            let i = 0;
            beginHTML+=  `<div class="loader" id="loader-6">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div> <h4> Nombre de pistes trouvés : ${json.results.length}</h4>`;

            loaderImage.innerHTML = beginHTML;

            json.results.forEach(monson=>
            {
               arrayAudio.push("audio"+i);
               arrayplay.push("playbutton"+i);
               arraypause.push("pausebutton"+i);
               arraystop.push("stopbutton"+i);
               finalHTML += `
               <div id="morceaux">
                    <div id="titre">
                        <figcaption>${monson.trackName}</figcaption> <br/>
                    </div>
                    <div id="splashmusique">
                        <div class="card-image">
                        <img src="${monson.artworkUrl100}">
                        </div>
                        <div class="lecteur">
                        <audio
                            src="${monson.previewUrl}" id="audio${i}">
                            Your browser does not support the
                            <code>audio</code> element.
                        </audio>
                        </div>
                        <div id="boutons">
                            <button id="playbutton${i}" class="btn waves-effect waves-light" type="submit" name="play"> Play </button>
                            <button id="pausebutton${i}" class="btn waves-effect waves-light" type="submit" name="pause"> Pause </button>
                            <button id="stopbutton${i}" class="btn waves-effect waves-light" type="submit" name="stop"> Stop </button>
                        </div>
                        <div id="boutons">
                            <p>Style de musique : ${monson.primaryGenreName} |</p>
                        </div>
                        <div id="boutons">
                            <p>Date de parution : ${monson.releaseDate}</p>
                        </div>         
                    </div>
                </div>
                <br/> `;
                i = i+1;
            })

            output.innerHTML = finalHTML;
        })
        .catch(error => console.log(error));
}




