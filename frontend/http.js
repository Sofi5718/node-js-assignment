const endpoint = "http://localhost:8888";

async function createArtist(name, birthdate, activeSince, genres, labels, website, image, description) {
    const newArtist = {
        name: name,
        birthdate: birthdate,
        activeSince: activeSince,
        genres: genres,
        labels: labels,
        website: website,
        image: image,
        description: description
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

//delete from grid// 
async function deleteArtist(id) {
    const response = await fetch(`${endpoint}/artists/${id}`, {
        method: "DELETE"
    });
    if (response.ok) {
        updateArtistLibary();
    }
}

//update artist from grid//

async function updateArtist(id, name, birthdate, activeSince, genres, labels, website, image, description) {
    const artistToUpdate = { name, birthdate, activeSince, genres, labels, website, image, description }
    console.log(artistToUpdate);
    const artistAsJson = JSON.stringify(artistToUpdate);
    const response = await fetch(`${endpoint}/artists/${id}`, {
        method: "PUT",
        body: artistAsJson,
        headers: {
            "Content-Type": "application/json"
        } 
    });
    return response;
}



export { endpoint, createArtist, deleteArtist, updateArtist }

