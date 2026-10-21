// List of cameras. Add more here to show them in the dropdown.
let cameras = [
  { name: "Camera 1", protocol: "Wi-Fi" }
];

// Grab the parts of the page we need
let video = document.getElementById("video");
let noSignal = document.getElementById("noSignal");
let connectButton = document.getElementById("connectButton");
let cameraList = document.getElementById("cameraList");
let cameraName = document.getElementById("cameraName");
let fpsText = document.getElementById("fps");
let qualityText = document.getElementById("quality");
let protocolText = document.getElementById("protocol");


// Put every camera into the dropdown
for (let i = 0; i < cameras.length; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.textContent = cameras[i].name;
  cameraList.appendChild(option);
}


// Show the info for whatever camera is picked
function showCamera() {
  let camera = cameras[cameraList.value];
  cameraName.textContent = camera.name;
  protocolText.textContent = camera.protocol;
}


// Turn on the camera and show it on the screen
async function connect() {
  try {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    noSignal.style.display = "none";

    // Read the FPS and size from the camera
    let settings = stream.getVideoTracks()[0].getSettings();
    fpsText.textContent = Math.round(settings.frameRate);
    qualityText.textContent = settings.width + " x " + settings.height;
  } catch (error) {
    alert("Could not connect to the camera.");
  }
}


cameraList.addEventListener("change", showCamera);
connectButton.addEventListener("click", connect);

showCamera();
