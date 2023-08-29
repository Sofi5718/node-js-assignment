const endpoint = "./backend/data";

window.addEventListener("load", initApp)

let artists;

async function initApp() {
    artists = await getArtist();
    console.log(artists);
    displayArtists(artists);

}

async function getArtist() {
    const response = await fetch(`${endpoint}/artists.json`);
    const data = await response.json();
    return data;
}

function displayArtists(listOfArtists) {
    document.querySelector("#artists").innerHTML = "";
    for (const artist of listOfArtists) {
        displayArtist(artist);
        
    }
}

function displayArtist(artist) {
    document.querySelector("#artists").insertAdjacentHTML("beforeend",/* html */`
    <article class = "grid-item">
    <img src="" />
    <h2>${artist.name}</h2>
    <p>Birthdate: ${artist.birthdate}</p>
    <p>Active Since: ${artist.ActiveSince}</p>
    <p>Genres: ${artist.genres}</p>
    <p>Labels: ${artist.labels}</p>    
    <P>Website: ${artist.website}</P>
    <p>description ${artist.description}</p>

    </article>
    `)
    
}

async function createArtist(name, birthdate, ActiveSince, genres, labels, website, image, description) {
    const newArtist = {
        name: name,
        birthdate: birthdate,
        ActiveSince: ActiveSince,
        genres: genres,
        labels: labels,
        website: website,
        image: image,
        description: description
    };
    const artistAsJson = JSON.stringify(newArtist);
    const response = await fetch(`${endpoint}/artists.json`, {
        method: "POST",
        body: artistAsJson
    })
    return response;
}