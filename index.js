let video = document.querySelector("video");
let recordBtnCont = document.querySelector(".record-btn-container");
let recordBtn = document.querySelector(".record-btn");

let recordFlag = false;

let recorder;
let chunks=[];

let constraints={
    audio:true,
    video:true,
}

navigator.mediaDevices.getUserMedia(constraints)
.then((stream)=>{
    console.log(stream);
    video.srcObject=stream;

    recorder = new MediaRecorder(stream);
    recorder.addEventListener("start",(e)=>{
        chunks=[];
    })
    recorder.addEventListener("dataavailable",(e)=>{
        chunks.push(e.data);
    })
    recorder.addEventListener("stop",(e)=>{
        let blob = new Blob(chunks,{type:"video/mp4"});
        let videoURL = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href=videoURL;
        a.download="stream.mp4";
        a.click();
    })
    recordBtnCont.addEventListener("click",(e)=>{
        if(!recorder) return;

        recordFlag = !recordFlag;
        if(recordFlag){
            recorder.start();
            recordBtn.classList.add("scale-record");
        }else{
            recorder.stop();
            recordBtn.classList.remove("scale-record")
        }
    })
})

