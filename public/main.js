console.log('hello universe')

let baseURL = 'http://localhost:4004'
const displaySection = document.querySelector('#display-section')
const form = document.querySelector('form')
const nameInput = document.querySelector('#song-name')
const artistInput = document.querySelector('#artist-name')
const categories = document.querySelector('#categories')

const newSong = document.querySelector('#new-song')
const newArtist = document.querySelector('#new-artist')
const newCategories = document.querySelector('#new-categories')
const songUpdateId = document.querySelector('#song-id')
const editForm = document.querySelector('#edit-form')

const getAllSongs = () => {
    // console.log('I RAN')

    axios.get(`${baseURL}/api/songs`)
    .then(res => {
        // console.log(res.data)
        createSongDisplay(res.data)
    })
}

const deleteSong = (id) => {
    axios.delete(`${baseURL}/api/song/${id}`)
    .then(res => {
        createSongDisplay(res.data)
    })
    .catch(err => {
        alert(err.message)
        console.log(err)
    })
}


const createSongCard = (obj) => {
    let card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `
    <h2>${obj.name}</h4>
    <h4>${obj.artist}</h6>
    <ul>
    <li>${obj.category[0]}</li>
    <li>${obj.category[1] || 'N/A'}</li>
    <li>${obj.category[2] || 'N/A'}</li>
    </ul>
    <button onclick="deleteSong(${obj.id})">Delete</button>
    <br>
    `
    displaySection.appendChild(card)
}

const createSongDisplay = (arr) => {
    displaySection.innerHTML = ``
    arr.map(song => {
        return createSongCard(song)
    })
}

const formHandler = (e) => {
    e.preventDefault()
    
    // 'pop,rock,grunge' = ['pop','rock','grunge']
    let newCat = categories.value.split(',')
    console.log(newCat)
    const body = {
        name:nameInput.value,
        artist:artistInput.value,
        category:newCat
    }

    axios.post(`${baseURL}/api/song`, body)
    .then(res => createSongDisplay(res.data))
    .catch(err => console.log(err))
}

const editFormHandler = (e) => {
    e.preventDefault()
    //we will get the info from the inputs on event firing
    //we are gonna package that info into a body(except for id which will be a param) and then send it with the http request
    let newCat = newCategories.value.split(',')
    const body = {
        name:newSong.value,
        artist:newArtist.value,
        category:newCat
    }
    //axios request
    axios.put(`${baseURL}/api/song/${songUpdateId.value}`,body)
    .then(res => {
        console.log(res.data)
        createSongDisplay(res.data)
    })
    .catch(err => {
        alert(err.message)
    })
} 


form.addEventListener('submit',formHandler)
editForm.addEventListener('submit',editFormHandler)
document.addEventListener('DOMContentLoaded',getAllSongs)