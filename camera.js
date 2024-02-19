document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var snap = document.getElementById('snap');

    // Zatraži pristup kameri
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.srcObject = stream;
            video.play();
        });
    }

    // Dodaj događaj na gumb za snimanje fotografije
    snap.addEventListener("click", function() {
        context.drawImage(video, 0, 0, 640, 480);
        // Sada možeš spremiti sliku s canvasa ili je dodatno obraditi
    });
});
