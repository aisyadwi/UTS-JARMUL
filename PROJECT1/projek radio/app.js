document.addEventListener("DOMContentLoaded", function () {
    const radioPlayer = document.getElementById("radio-player");
    const playButton = document.getElementById("play");
    const pauseButton = document.getElementById("pause");
    const stopButton = document.getElementById("stop");
    const volumeControl = document.getElementById("volume");

    const channels = {
        channel1: "https://n09.radiojar.com/7csmg90fuqruv?rj-ttl=5&rj-tok=AAABi1a6tNAASKcdf2zHx1TfNg",
        channel2: "https://i.klikhost.com/9006/stream/1/",
        channel3: "https://n01.radiojar.com/4ywdgup3bnzuv?rj-ttl=5&rj-tok=AAABi1bwWFIAhMoLvGmLyAYIKA",
        channel4: "https://stream-node0.rri.co.id/streaming/22/9022/rrimakasarpro1.mp3",
        channel5: "https://stream.cloudmu.id/listen/delta_fm/radio.mp3",
    };

    playButton.addEventListener("click", () => {
        const selectedChannel = document.querySelector(".channel-list button.active");
        if (selectedChannel) {
            radioPlayer.src = channels[selectedChannel.id];
            radioPlayer.play();
        }
    });

    pauseButton.addEventListener("click", () => {
        radioPlayer.pause();
    });

    stopButton.addEventListener("click", () => {
        radioPlayer.pause();
        radioPlayer.currentTime = 0;
    });

    volumeControl.addEventListener("input", () => {
        radioPlayer.volume = volumeControl.value;
    });

    const channelButtons = document.querySelectorAll(".channel-list button");
    channelButtons.forEach((button) => {
        button.addEventListener("click", () => {
            channelButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });
});

playButton.addEventListener("click", () => {
    const selectedChannel = document.querySelector(".channel-list button.active");
    if (selectedChannel) {
        radioPlayer.src = channels[selectedChannel.id];
        radioPlayer.play();

        // Hapus kelas "active" dari tombol saluran sebelumnya
        channelButtons.forEach((btn) => btn.classList.remove("active"));
        // Tambahkan kelas "active" ke tombol saluran yang dipilih
        selectedChannel.classList.add("active");
    }
});
