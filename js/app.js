const app = () => {
  const song = document.querySelector(".melody");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //Sounds 
  const sounds = document.querySelectorAll(".sound-picker button");
  //time display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  //Getting the length of the outline
  const outLineLength = outline.getTotalLength();
  console.log(outLineLength);
  //Duration
  let fakeDuration = 600;
  outline.style.strokeDasharray = outLineLength;
  outline.style.strokeDashoffset = outLineLength;

  //select sound
  sounds.forEach(sound =>{
    sound.addEventListener("click", function(){
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

 //playing sounds
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //Select sound & time
  timeSelect.forEach(option => {
    option.addEventListener("click", function(){
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}: ${Math.floor(fakeDuration % 60)} `
    });
  });

  //function to play and stop the melody
  const checkPlaying = song => {
    if(song.paused){
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    }else{
      song.pause();
      video.pause();
      play.src = "./svg/play.svg" 
    }
  };
  //Animating the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let secoonds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    //Animating the bar
    let progress = outLineLength - (currentTime / fakeDuration)  * outLineLength;
    outline.style.strokeDashoffset = progress;
    //Animating the text
    timeDisplay.textContent = `${minutes}:${secoonds}`;
    if(currentTime >= fakeDuration){
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

app();