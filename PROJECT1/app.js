const radioPlayer = document.getElementById("radio-player");
const channels = document.querySelectorAll(".channel");
const manualUrlInput = document.getElementById("manual-url");
const playManualButton = document.getElementById("play-manual");

channels.forEach(channel => {
    channel.addEventListener("click", function() {
        radioPlayer.src = this.dataset.url;
        radioPlayer.play();
    });
});

playManualButton.addEventListener("click", function() {
    radioPlayer.src = manualUrlInput.value;
    radioPlayer.play();
});
