var front = true
initCameraContext()
document.getElementById('cameraFlip').onclick = () => {
    front = !front
    initCameraContext()
}

function initCameraContext(){
    var cameraContext = navigator.mediaDevices.getUserMedia({
        video: {
            width: { min: 800, max: 1920 },
            height: { min: 450, max: 1080 },
            facingMode: (front ? "user" : "environment"),//or "environment" 此变量对桌面端surface暂时无效,但对移动端设备有效
            frameRate: { ideal: 10, max: 24 }//ideal会影响到正反摄像头的选取
        },
        audio: true
    }).then(function (stream) {
        var video = document.getElementById('video')
        video.srcObject = stream
        video.play()
        console.dir(video.srcObject)
        video.onloadedmetadata = function (e) {
            console.log("AudioTracks", stream.getAudioTracks())
            console.log("VideoTracks", stream.getVideoTracks())
        }
    }).catch(function (err) {
        console.log('Rejected!', err)
    })
}

