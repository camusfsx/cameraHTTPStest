var video = document.getElementById(`video`)
var ctracker = new clm.tracker()
var canvasInput = document.getElementById(`drawCanvas`)
var canvasContent = canvasInput.getContext(`2d`)
var feedBackText = document.getElementById(`feedBack`)
var front = true
ctracker.init()
ctracker.start(video)
initCameraContext()
document.getElementById('cameraFlip').onclick = () => {
    front = !front
    initCameraContext()
}
function initCameraContext() {
    var cameraContext = navigator.mediaDevices.getUserMedia({
        video: {
            //width: { min: 800, max: 1920 },
            //height: { min: 450, max: 1080 },
            facingMode: (front ? "user" : "environment"),//or "environment" 此变量对桌面端surface暂时无效,但对移动端设备有效
            //frameRate: { ideal: 10, max: 24 }//ideal会影响到正反摄像头的选取
        },
        audio: false
    }).then(function (stream) {
        video.srcObject = stream
        video.onloadedmetadata = function (e) {
            console.log("VideoTracks", stream.getVideoTracks())
            positionLoop()
            function positionLoop() {
                requestAnimationFrame(positionLoop)
                var positions = ctracker.getCurrentPosition()
                if(positions){
                    canvasInput.style.display = `inline-block`
                    feedBackText.textContent = `已检测到面部`
                }else{
                    canvasInput.style.display = `none`
                    feedBackText.textContent = `面部丢失`
                }
            }
            function drawLoop() {
                requestAnimationFrame(drawLoop)
                canvasContent.clearRect(0, 0, canvasInput.width, canvasInput.height)
                ctracker.draw(canvasInput)
            }
            drawLoop()
        }
    }).catch(function (err) {
        console.log('Rejected!', err)
    })
}
var ua =  navigator.userAgent
    console.log(ua)
if (navigator.mediaDevices.getUserMedia) {
    console.log(`browser support`)
} else if (navigator.getUserMedia) {
    console.log(`browser support`)
} else {
    console.log(`Your browser does not seem to support getUserMedia`)
}

