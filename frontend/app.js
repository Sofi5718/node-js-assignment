import { endpoint, createArtist } from "./http.js"

window.addEventListener("load", initApp)

let artists;

function initApp() {
    updateArtistLibary();

    document.querySelector("#sort-by").addEventListener("change", sortByChanged);
    document.querySelector("#filter-by").addEventListener("change", filterByChanged);
    document.querySelector("#create-artist").addEventListener("click", showCreateDialog);
}

function showCreateDialog() {
    document.querySelector("#create-dialog").showModal()
    document.querySelector("#form-create").addEventListener("submit", createArtistClicked);
}

async function getArtist() {
    const response = await fetch(`${endpoint}/artists`);
    const data = await response.json();
    console.log(data)
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
    <p>Active Since: ${artist.activeSince}</p>
    <p>Genres: ${artist.genres}</p>
    <p>Labels: ${artist.labels}</p>    
    <P>Website: ${artist.website}</P>
    <p>Description: ${artist.shortDescription}</p>

    </article>
    `)
    
}

// sorter//
function sortArtists(sortBy) {
    if (sortBy === "name") {
        return artists.sort((artistA, artistB) => artistA.name.localeCompare(artistB.name));
    }
    if (sortBy === "birthdate") {
        return artists.sort((artistA, artistB) => artistA.birthdate.localeCompare(artistB.birthdate));
    }
    if (sortBy === "activeSince") {
        return artists.sort((artistA, artistB) => artistA.activeSince.localeCompare(artistB.activeSince));
    }
    if (sortBy === "") {
        return artists;
    }
}

function sortByChanged(event) {
	const selectedValue = event.target.value;
	displayArtists(sortArtists(selectedValue));
}

//filter//
function filterArtists(filterBy) {
	switch (filterBy) {
		case "":
			return artists;
		case "Pop":
			return artists.filter((artist) => artist.genres.includes(filterBy));
		case "Hip-hop":
			return artists.filter((artist) => artist.genres.includes(filterBy));
		case "R&B":
			return artists.filter((artist) => artist.genres.includes(filterBy));
		case "Rap":
			return artists.filter((artist) => artist.genres.includes(filterBy));
		case "Electronic":
			return artists.filter((artist) => artist.genres.includes(filterBy));
		case "Indie":
			return artists.filter((artist) => artist.genres.includes(filterBy));
		
    }
}

function filterByChanged(event) {
	const selectedValue = event.target.value;
	displayArtists(filterArtists(selectedValue));
}

async function createArtistClicked(event) {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const birthdate = form.birthdate.value
    const activeSince = form.activeSince.value
    const genres = form.genres.value
    const labels = form.labels.value
    const website = form.website.value
    const description = form.description.value
    const image = form.image.value
    const response = await createArtist(name, birthdate, activeSince, genres, labels, website, image, description)
    if (response.ok) {
        form.reset();
        updateArtistLibary();

    }
}

async function updateArtistLibary() {
    artists = await getArtist();
    displayArtists(artists);
    
}