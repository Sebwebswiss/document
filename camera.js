document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var snap = document.getElementById('snap');

    // Definiranje ograničenja za korištenje zadnje kamere
    var constraints = {
        video: {
            facingMode: "environment" // Traži korištenje zadnje kamere
        }
    };

    // Zatraži pristup kameri s definiranim ograničenjima
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            // Postavi izvor video elementa na dobiveni stream
            video.srcObject = stream;
            video.play();
        })
        .catch(function(error) {
            console.log("Greška prilikom pristupa kameri: ", error);
        });
    }

    // Dodaj događaj na gumb za snimanje fotografije
    snap.addEventListener("click", function() {
        // Nacrtaj trenutni prikaz video elementa na canvas element
        context.drawImage(video, 0, 0, 640, 480);
        // Sada možeš spremiti sliku s canvasa ili je dodatno obraditi
    });
});

