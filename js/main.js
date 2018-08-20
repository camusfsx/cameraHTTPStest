var front = true
initCameraContext()
document.getElementById('cameraFlip').onclick = () => {
    front = !front
    initCameraContext();
}
function initCameraContext(){
    var cameraContext = navigator.mediaDevices.getUserMedia({
        video: {
            width: { min: 400, max: 1920 },
            height: { min: 300, max: 1080 },
            facingMode: (front ? "user" : "environment"),//or "environment" 此变量对surface暂时无效
            frameRate: { ideal: 10, max: 24 }//ideal会影响到正反摄像头的选取
        },
        audio: true
    }).then(function (stream) {
        var video = document.getElementById('video')
        var front = false
        video.srcObject = stream
        video.onloadedmetadata = function (e) {
            console.log("AudioTracks", stream.getAudioTracks())
            console.log("VideoTracks", stream.getVideoTracks())
        }
    }).catch(function (err) {
        console.log('Rejected!', err)
    })
}

