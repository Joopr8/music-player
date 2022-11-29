const image = document.querySelector("img");
const title = document.getElementById("title");
const audio = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const currTimeEl = document.getElementById("current-time");
const durantionEl = document.getElementById("duration");
const progressBar = document.getElementById("progress");

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army(Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Jacinto Design",
  },
];

let isPlaying = false;

//Play
const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  audio.play();
};

//Pause
const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  audio.pause();
};

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//Update DOM
const loadSong = (song) => {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
};

let songIndex = 0;
loadSong(songs[songIndex]);

const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

//Get current time of audio
const updateProgessBar = (e) => {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    let progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    //Calculate displays for duration
    timeConverter(duration, durantionEl);
    timeConverter(currentTime, currTimeEl);
  }
};

const timeConverter = (time, element) => {
  let timeConverted;
  let minutes = Math.floor(time / 60);
  let extraSeconds = Math.floor(time % 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
  //Delay
  if (minutes && extraSeconds) {
    timeConverted = minutes + " : " + extraSeconds;
    element.textContent = timeConverted;
  }
};

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgessBar);
