const endpoint = "./backend/data";

window.addEventListener("load", initApp)

let artists;

async function initApp() {
    artists = await getArtist();
    console.log(artists);
    displayArtists(artists);

    document.querySelector("#sort-by").addEventListener("change", sortByChanged);
	document.querySelector("#filter-by").addEventListener("change", filterByChanged);
}


async function getArtist() {
    const response = await fetch(`${endpoint}/artists.json`);
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

async function createArtist(name, birthdate, activeSince, genres, labels, website, image, shortDescription) {
    const newArtist = {
        name: name,
        birthdate: birthdate,
        activeSince: activeSince,
        genres: genres,
        labels: labels,
        website: website,
        image: image,
        shortDescription: shortDescription
    };
    const artistAsJson = JSON.stringify(newArtist);
    const response = await fetch(`${endpoint}/artists.json`, {
        method: "POST",
        body: artistAsJson
    })
    return response;
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