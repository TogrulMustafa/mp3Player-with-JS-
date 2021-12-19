
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const audio = document.querySelector('audio')

const currentTimeEl = document.querySelector('#current-time')
const durationEl = document.querySelector('#duration')
const progressContainer = document.querySelector('#progress-container')
const progressEl = document.querySelector('#progress')

const previousEl = document.querySelector('#previous')
const playEl = document.querySelector('#play')
const nextEl = document.querySelector('#next')

const musics = [
    {
        name:'Dom Dom-1',
        displayName: 'Dom dom kurshunu',
        artist: 'Tatlises'

    },
    {
        name:'Fighters-1',
        displayName: 'Fighters are awesome',
        artist: 'Jackson'
    },
    {
        name:'Leylim-1',
        displayName: 'Leylim',
        artist: 'John'
    },
    {
        name:'Mavişim-1',
        displayName: 'Mavisim',
        artist: 'Dua Lipa'
    },
    {
        name:'little dark age',
        displayName: 'DarkAge',
        artist: 'Andrew VanWyngarden'
    }
]


let isPlaying = false
// ?

// play 
function playSong() {
    isPlaying = true
    // ?
    playEl.classList.replace('fa-play', 'fa-pause')
    playEl.setAttribute('title','pause')
    audio.play()
}

function pauseSong() {
    isPlaying = false
    // ?
    playEl.classList.replace('fa-pause', 'fa-play')
    playEl.setAttribute('title','play')
    audio.pause()
}

playEl.addEventListener('click', () =>(isPlaying ? pauseSong() :playSong()))

// ///////////////////////////////////////////////////////////////////////////////////

function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    audio.src = `audio/${song.name}.mp3`
 }

let songIndex = 0

function previousSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = musics.length-1
    }
    loadSong(musics[songIndex])
    playSong()
}

function nextSong() {
    songIndex++
    if (songIndex > musics.length-1) {
        songIndex = 0
    }
    loadSong(musics[songIndex])
    playSong()
}

loadSong(musics[songIndex])
// Bunu niye yaziriq?

// ///////////////////////////////////////////////////////////////////////////////////

function updateProgressbar(event) {
    if (isPlaying) {
        const {
            duration,currentTime

        } = event.srcElement 
        // ?
        const progressPercent = (currentTime / duration) * 100
        progressEl.style.width = `${progressPercent}%`
        // Mahninin muddetini goster
        const durationMinute = Math.floor(duration / 60)
        const durationSecond = Math.floor(duration % 60)
        if (durationSecond < 10) {
            durationSecond = `0${durationSecond}`
        }
        // Meselen mahninin duration-u 04:00 olsa asagidaki if-de problem yaranacaq?!
        // if (durationSecond) bunun yerine
        if ((durationSecond) || (durationMinute >= 1 && durationSecond == false)) {
            durationEl.textContent = `${durationMinute}:${durationSecond}`
        }
        // Mahninin cari muddetinin hesablanmasi
        let currentMinute = Math.floor(currentTime / 60)
        let currentSecond = Math.floor(currentTime % 60)
        if (currentSecond < 10){
            currentSecond = `0${currentSecond}`
        }
        currentTimeEl.textContent = `${currentMinute}:${currentSecond}`

    }
}


function setProgressbar(event) {
    const clickX = event.offsetX
    const width = this.clientWidth
    const {duration} = audio
    audio.currentTime = (clickX / width) * duration
}

progressContainer.addEventListener('click', setProgressbar)
previousEl.addEventListener('click', previousSong)
nextEl.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgressbar)

// margin error problemini hell etdim
// mahni bitdikden sonra avtomatik novbeti mahniya kecmesi
