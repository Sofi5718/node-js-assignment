import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();
const port = 8888;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`App is running http://localhost:${port}`);
});

app.get("/artists", async (request, response) => {
  const data = await fs.readFile("./backend/data/artists.json");
  const artists = JSON.parse(data);
  response.json(artists);
});

app.post("/artists", async (request, response) => {
  const newArtist = request.body;
  newArtist.id = new Date().getTime();

  const data = await fs.readFile("./backend/data/artists.json");
  const artists = JSON.parse(data);

  artists.push(newArtist);
  fs.writeFile("./backend/data/artists.json", JSON.stringify(artists));
  response.json(artists);
});

app.delete("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);
  console.log(id);

  const data = await fs.readFile("./backend/data/artists.json");
  const artists = JSON.parse(data);
  let newArtists = artists.filter((artist) => artist.id !== id);
  fs.writeFile("./backend/data/artists.json", JSON.stringify(newArtists));
  response.json(artists);
});

app.put("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);
  const data = await fs.readFile("./backend/data/artists.json");
  const artists = JSON.parse(data);
  let artistToUpdate = artists.find((artist) => artist.id === id);
  const body = request.body;
  artistToUpdate.name = body.name;
  artistToUpdate.birthdate = body.birthdate;
  artistToUpdate.activeSince = body.activeSince;
  artistToUpdate.genres = body.genres;
  artistToUpdate.labels = body.labels;
  artistToUpdate.website = body.website;
  artistToUpdate.image = body.image;
  artistToUpdate.description = body.description;

  fs.writeFile("./backend/data/artists.json", JSON.stringify(artists));
  response.json(artists);
});

//favoritliste//

app.get("/fav", async (request, response) => {
  const favID = await getFavorites();
  const artists = await getArtists();
  const favorites = artists.filter((artist) => favID.includes(artist.id));
  response.json(favorites);
});

app.post("/fav", async (request, response) => {
  const newID = request.body.id;
  const getFav = await getFavorites();
  if (!getFav.includes(newID)) {
    getFav.push(newID);
    fs.writeFile("./backend/data/fav.json", JSON.stringify(getFav));
  }
  const artists = await getArtists();
  const favorites = artists.filter((artist) => getFav.includes(artist.id));
  response.json(favorites);
});

app.delete("/fav/:id", async (request, response) => {
  const idToDelete = Number(request.params.id);
  const favs = await getFavorites();

  if (favs.includes(idToDelete)) {
    const newFavs = favs.filter((id) => id !== idToDelete);
    fs.writeFile("./backend/data/fav.json", JSON.stringify(newFavs));

    const artists = await getArtists();
    const favorites = artists.filter((artist) => newFavs.includes(artist.id));

    response.json(favorites);
  } else {
    response.status(404).json({ Error: "Kunstner id findes ikke i favoritter" });
  }
});

async function getFavorites() {
  const data = await fs.readFile("./backend/data/fav.json");
  return JSON.parse(data);
}

async function getArtists() {
  const data = await fs.readFile("./backend/data/artists.json");
  return JSON.parse(data);
}
