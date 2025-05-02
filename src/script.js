import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.176.0/+esm'; 
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/+esm';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function loadObjects(){
  const canvas = document.querySelector("canvas.webgl");
  const scene = new THREE.Scene();
  let renderer;
  let camera;

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.25,
    20
  );
  camera.position.set(-1.8, 0.6, 2.7);

  const loader = new GLTFLoader();
  loader.load(
    "static/box.gltf",
    function (gltf) {
      scene.add(gltf.scene);
      render();
    }
  );

  const color = new THREE.Color("rgb(255, 255, 255)");
  scene.background = color;

  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; //added contrast for filmic look
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding; //extended color space for the hdr

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render); // use if there is no animation loop to render after any changes
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.target.set(0, 0, -0.2);
  controls.update();

  window.addEventListener("resize", onWindowResize);
  function render(){
    renderer.render(scene, camera);
  }
}

function loadWorld(){
  const World = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.8, 0)
  });
  const timeStep = 1/60;
}
function init(){ 
  loadObjects();
  loadObjects.render();
  loadWorld();
  animate();
}

function animate(){
  world.step(timeStep);
  requestAnimationFrame(animate);
  world.fixedStep();
}

init();