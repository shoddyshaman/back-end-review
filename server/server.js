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
    id++
})

app.put('/api/song/:id',(req,res) => {
  const { id } = req.params
  const {name,artist,category} = req.body
  console.log(category)
  //locate the element using the id
  const index = songs.findIndex((song) => {
    return song.id === +id
  })

  //findIndex will return the index if it is able to find the element, if not its gonna return -1
  if(index !== -1){
    const updatedSong = {
      id,
      name,
      artist,
      category
    }
    //replace the old element with the updated one
    songs.splice(index,1,updatedSong)
    res.status(200).send(songs)
  } else {
    res.status(400).send('song not found')
  }
})

app.delete('/api/song/:id', (req,res) => {
  const {id} = req.params

  //locate the element in the array
  const index = songs.findIndex(song => song.id === +id)

  //findIndex will return the index if it is able to find the element, if not its gonna return -1
  if(index !== -1){
    songs.splice(index,1)
    res.status(200).send(songs)
  }
  else {
    res.status(400).send('cannot delete song')
  }
})

app.listen(4004, () => console.log(`server is up and running on 4004`));
