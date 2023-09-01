const endpoint = "http://localhost:8888";

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
    const response = await fetch(`${endpoint}/artists`, {
        method: "POST",
        body: artistAsJson,
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response;
}

export {endpoint, createArtist}