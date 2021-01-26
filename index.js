function envoyerRequete(location) {
    return new Promise((resolve, reject) => {
        console.log(`making request to ${location}`);
        if (location === "Google") {
            resolve("Google dit hello !");
        } else {
            reject({ message: "On ne peut parler qu'à Google" });
        }
    });
}

function traiterReponse(response) {
    return new Promise((resolve, reject) => {
        console.log("Traitement de la réponse");
        resolve(`Réponse traitée... ${response}`);
    });
}

fetch("https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/")
    .then(response => response.json())
    .then(json => console.log(json));


