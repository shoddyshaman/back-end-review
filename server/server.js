const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let songs = [
  {
    id: 1,
    name: "Living on the edge",
    artist: "Bon Jovi",
    category: ["rock", "pop-rock"],
  },
  {
    id: 2,
    name: "Comfortably numb",
    artist: "Pink Floyd",
    category: ["rock", "psychedelic-rock"],
  },
  {
    id: 3,
    name: "As it was",
    artist: "harry Styles",
    category: ["pop"],
  },
  {
    id: 4,
    name: "Unforgiven",
    artist: "Metallica",
    category: ["rock", "heavy-metal"],
  },
  {
    id: 5,
    name: "Dark Days",
    artist: "Local Natives",
    category: ["indie", "indie-chill"],
  },
  {
    id: 6,
    name: "Smells like teen spirit",
    artist: "Nirvana",
    category: ["grunge", "rock"],
  },
];

let id = 7

app.get('/api/songs', (req,res) => {
    res.status(200).send(songs)
})

app.post('/api/song',(req,res) => {
    const { name,artist,category} = req.body
    let newSong = {
        id,
        name,
        artist,
        category
    }
    songs.push(newSong)
    res.status(200).send(songs)
})

app.listen(4004, () => console.log(`server is up and running on 4004`));
