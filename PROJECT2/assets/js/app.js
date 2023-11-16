const radioPlayer = document.getElementById("radio-player");
const channels = document.querySelectorAll(".channel");
const manualUrlInput = document.getElementById("manual-url");
const playManualButton = document.getElementById("play-manual");
const nextChannelButton = document.getElementById("next-channel");
const backChannelButton = document.getElementById("back-channel");
let currentChannelIndex = 0;

function playChannel(index) {
    if (index >= 0 && index < channels.length) {
        radioPlayer.src = channels[index].dataset.url;
        radioPlayer.play();
        currentChannelIndex = index;
    }
}

function playNextChannel() {
    currentChannelIndex = (currentChannelIndex + 1) % channels.length;
    playChannel(currentChannelIndex);
}

function playPreviousChannel() {
    currentChannelIndex = (currentChannelIndex - 1 + channels.length) % channels.length;
    playChannel(currentChannelIndex);
}

channels.forEach((channel, index) => {
    channel.addEventListener("click", function() {
        playChannel(index);
    });
});

playManualButton.addEventListener("click", function() {
    radioPlayer.src = manualUrlInput.value;
    radioPlayer.play();
});

nextChannelButton.addEventListener("click", playNextChannel);
backChannelButton.addEventListener("click", playPreviousChannel);

channels.forEach((channel, index) => {
    channel.addEventListener("click", function() {
        channels.forEach((c) => c.classList.remove("active"));
        this.classList.add("active");
    });
});

function playNextChannel() {
    currentChannelIndex = (currentChannelIndex + 1) % channels.length;
    playChannel(currentChannelIndex);
    channels.forEach((c) => c.classList.remove("active"));
    channels[currentChannelIndex].classList.add("active");
}

function playPreviousChannel() {
    currentChannelIndex = (currentChannelIndex - 1 + channels.length) % channels.length;
    playChannel(currentChannelIndex);
    channels.forEach((c) => c.classList.remove("active"));
    channels[currentChannelIndex].classList.add("active");
}


/*==================== SHOW NAVBAR ====================*/
const showMenu = (headerToggle, navbarId) =>{
    const toggleBtn = document.getElementById(headerToggle),
    nav = document.getElementById(navbarId)
    
    if(headerToggle && navbarId){
        toggleBtn.addEventListener('click', ()=>{
            nav.classList.toggle('show-menu')
            toggleBtn.classList.toggle('bx-x')
        })
    }
}
showMenu('header-toggle','navbar')

/*==================== LINK ACTIVE ====================*/
const linkColor = document.querySelectorAll('.nav__link')

function colorLink(){
    linkColor.forEach(l => l.classList.remove('active'))
    this.classList.add('active')
}

linkColor.forEach(l => l.addEventListener('click', colorLink))

playManualButton.addEventListener("click", function() {
    const manualUrlValue = manualUrlInput.value;
    if (manualUrlValue) {
        radioPlayer.src = manualUrlValue;
        radioPlayer.play();
    } else {
        alert("Harap isi URL saluran terlebih dahulu.");
    }
    
    radioPlayer.addEventListener("error", function() {
        alert("Saluran tidak ditemukan. Pastikan URL saluran yang Anda masukkan benar.");
    });
});
