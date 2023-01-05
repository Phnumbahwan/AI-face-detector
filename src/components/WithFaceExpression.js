import * as faceapi from "face-api.js";
import {useEffect, useRef, useState} from "react";

const WithFaceExpression = () => {
    const videoWidth = 480;
    const videoHeight = 640;
    const videoFixHeight = 640 - 250;
    const [initializing, setInitializing] = useState(false);
    const videoRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';
            setInitializing(true);
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
            ]).then(startVideo);
        }
        loadModels();
    },[])

    const startVideo = () => {
        const constraints = {
            video: {}
        };
        navigator.mediaDevices.getUserMedia(constraints)
            .then((mediaStream) => {
                const video = document.querySelector('video');
                video.srcObject = mediaStream;
                video.onloadedmetadata = () => {
                    video.play();
                };
            })
            .catch((err) => {
                // always check for errors at the end.
                console.error(`${err.name}: ${err.message}`);
            });
    }

    const handleVideoOnPlay = () => {
        setInterval( async () => {
            if(initializing) {
                setInitializing(false);
            }
            canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
            const displaySize = {
                width: videoWidth,
                height: videoWidth
            }
            faceapi.matchDimensions(canvasRef.current, displaySize);
            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            const resizedDetection = faceapi.resizeResults(detections, displaySize);
            canvasRef.current.getContext("2d").clearRect(0,0, videoWidth, videoFixHeight);
            faceapi.draw.drawDetections(canvasRef.current, resizedDetection);
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetection);
            faceapi.draw.drawFaceExpressions(canvasRef.current, detections);
        }, 100)
    }

    return (
        <div style={{ marginTop:"50px" }}>
            <p>{initializing ? "Initializing..." : ""}</p>
            <div className={'center'}>
                <video ref={videoRef} autoPlay muted onPlay={handleVideoOnPlay}
                       style={
                           {
                               position:"absolute",
                               marginLeft:"auto",
                               marginRight:"auto",
                               textAlign:"center",
                               zIndex:9,
                               width:videoWidth,
                               height:videoHeight
                           }
                       }
                />
                <canvas ref={canvasRef}
                        style={
                            {
                                position:"relative",
                                margin:"auto",
                                left:0,
                                right:0,
                                textAlign:"center",
                                zIndex:9,
                                width:videoWidth,
                                height:videoFixHeight
                            }
                        }
                />
            </div>
        </div>
    )
}

export default WithFaceExpression;