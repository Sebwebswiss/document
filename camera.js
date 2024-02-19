document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('video');
    var canvasOverlay = document.getElementById('overlay');
    var overlayContext = canvasOverlay.getContext('2d');
    var snapshotCanvas = document.getElementById('snapshot');
    var snapButton = document.getElementById('snap');

    // Definiranje ograničenja za pristup zadnjoj kameri
    var constraints = {
        video: {
            facingMode: "environment"
        }
    };

    // Zatraži pristup kameri
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
            video.onloadedmetadata = function() {
                canvasOverlay.width = video.videoWidth;
                canvasOverlay.height = video.videoHeight;
                drawOverlay();
            };
        })
        .catch(function(error) {
            console.log("Ne može se pristupiti kameri: ", error);
        });

    function drawOverlay() {
        var rectWidth = canvasOverlay.width * 0.8;
        var rectHeight = canvasOverlay.height * 0.6;
        var rectX = (canvasOverlay.width - rectWidth) / 2;
        var rectY = (canvasOverlay.height - rectHeight) / 2;

        overlayContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
        overlayContext.fillRect(0, 0, canvasOverlay.width, canvasOverlay.height);

        // Prozirni pravokutnik
        overlayContext.clearRect(rectX, rectY, rectWidth, rectHeight);

        // Opcionalno: Crtanje obruba pravokutnika
        overlayContext.strokeStyle = 'white';
        overlayContext.lineWidth = 4;
        overlayContext.strokeRect(rectX, rectY, rectWidth, rectHeight);
    }

    snapButton.addEventListener("click", function() {
        var rectWidth = video.videoWidth * 0.8;
        var rectHeight = video.videoHeight * 0.6;
        var rectX = (video.videoWidth - rectWidth) / 2;
        var rectY = (video.videoHeight - rectHeight) / 2;

        snapshotCanvas.width = rectWidth;
        snapshotCanvas.height = rectHeight;

        var snapshotContext = snapshotCanvas.getContext('2d');
        // Izrezivanje i snimanje definiranog dijela slike
        snapshotContext.drawImage(video, rectX, rectY, rectWidth, rectHeight, 0, 0, rectWidth, rectHeight);

        // Opcionalno: Prikaz snimljene slike
        var imageDataUrl = snapshotCanvas.toDataURL('image/png');
        var imgElement = document.createElement('img');
        imgElement.src = imageDataUrl;
        document.body.appendChild(imgElement);
    });
});
