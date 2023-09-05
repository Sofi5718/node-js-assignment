import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express()
const port = 8888;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`App is running http://localhost:${port}`);
});

app.get("/artists", async (request, response) => {
    const data = await fs.readFile("./backend/data/artists.json")
    const artists = JSON.parse(data);
    response.json(artists);
})

app.post("/artists", async (request, response) => {
    const newArtist = request.body;
    newArtist.id = new Date().getTime();

    const data = await fs.readFile("./backend/data/artists.json");
    const artists = JSON.parse(data);

    artists.push(newArtist);
    fs.writeFile("./backend/data/artists.json", JSON.stringify(artists));
    response.json(artists);
})

app.delete("/artists/:id", async (request, response) => {
    const id = Number(request.params.id);
    console.log(id);

    const data = await fs.readFile("./backend/data/artists.json");
    const artists = JSON.parse(data);
    let newArtists = artists.filter((artist) => artist.id !== id);
    fs.writeFile("./backend/data/artists.json", JSON.stringify(newArtists));
    response.json(artists);
})

app.put("/artists/:id", async (request, response) => {
    const id = Number(request.params.id);
    const data = await fs.readFile("./backend/data/artists.json");
    const artists = JSON.parse(data);
    let artistToUpdate = artists.find(artist => artist.id === id);
    const body = request.body
    artistToUpdate.name = body.name
    artistToUpdate.birthdate = body.birthdate
    artistToUpdate.activeSince = body.activeSince
    artistToUpdate.genres = body.genres
    artistToUpdate.labels = body.labels
    artistToUpdate.website = body.website
    artistToUpdate.image = body.image
    artistToUpdate.description = body.description

    fs.writeFile("./backend/data/artists.json", JSON.stringify(artists));
    response.json(artists);
    
})