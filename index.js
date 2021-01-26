
window.onload = function (){
    let button = document.querySelector("#recherche");
    let search = document.querySelector("#search");
    let output = document.querySelector("#output");
    button.addEventListener('click',(event) => {
       getDataFromItunes(search)
    });
}

async function getDataFromItunes() {
    console.log(search);
    console.log('Bonjour');
    let url= 'https://itunes.apple.com/search?term='+search.value;

    await fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            let finalHTML = '';
            json.results.forEach(monson=>
            {
               finalHTML += `<figure>
               <figcaption>${monson.trackName}</figcaption>
               <img src="${monson.artworkUrl100}">
               <audio
                   controls
                    src="${monson.previewUrl}">
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
                </figure>
                <br/> `
            })
            output.innerHTML = finalHTML;
        })
        .catch( error => console.log(error));
}




