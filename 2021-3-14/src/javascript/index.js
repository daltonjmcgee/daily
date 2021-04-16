import '../style.css';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

const getWeather = async () => {
    const weatherData = await fetch("https://api.openweathermap.org/data/2.5/weather?zip=78210&appid=49fa4d1476bb1690d0c95d785a336e03")
    const json = await weatherData.json();
    document.getElementById('temperature').innerHTML = Math.round((json.main.temp-273.15)*9/5+32) + "° F";
}

getWeather();

// Canvas Object
const canvas = document.querySelector('canvas.webgl');

// Loaders
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/texture.png');
const displacement = textureLoader.load('/displacement.png');
const alpha = textureLoader.load('/alpha.png');

// Scene
const scene = new THREE.Scene();

// Objects
const planeGeometry = new THREE.PlaneBufferGeometry(4,4,64,64);

// Materials
const displacementValue = 1;
const planeMaterial = new THREE.MeshStandardMaterial({
    color:'gray',
    map:texture,
    displacementMap: displacement,
    displacementScale: displacementValue,
    alphaMap: alpha,
    transparent: true,
    depthTest: false,
})

// Mesh
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = 4.72;
plane.rotation.z = 4.8;


const col = {
    pointLight:0xaec4fc,
    spotLight:0x985f5f};
const pointLight = new THREE.PointLight(col.pointLight, 4.5)
pointLight.position.x = .58
pointLight.position.y = 1.41
pointLight.position.z = 2.48
scene.add(pointLight)

const spotLight = new THREE.SpotLight(col.spotLight, 2.4)
spotLight.position.x = -0.73
spotLight.position.y = 0.7
spotLight.position.z = 1.31
spotLight.penumbra = .61;
scene.add(spotLight)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = -1.15;
camera.position.y = 1.25;
camera.position.z = 1.35;    ;
camera.rotation.x = -0.78;
camera.rotation.y = -0.1;
camera.rotation.z = -0.22;
scene.add(camera);


/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// let mouse = {
//     x: 0,
//     y: 0,
// };
// const animatePlane = (e) => {
//     mouse.x = e.clientX;
//     mouse.y = e.clientY;
//     console.log(mouse)
// }

// Custom Dragable Feature
var mouse = {x:0,y:0};
var mouseDown = false;
var delta = {
    x: 0,
    y: 0,
    previous: {
        x:0,
        y:0,
    },
    sign: true,
};
const rotationSpeed = 0.0025;

canvas.addEventListener("mousedown", (e)=>{
    e.preventDefault();
    mouseDown = true;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})
canvas.addEventListener("mousemove", (e)=>{
    mouse.y = e.clientY;
    if (!mouseDown) return;
    delta.previous.x = delta.x;
    delta.x = e.clientX - mouse.x;
    delta.sign = delta.previous.x < delta.x ? true : false;
    plane.rotation.z += delta.sign ? rotationSpeed : -rotationSpeed;
    e.preventDefault();
})
canvas.addEventListener("mouseup", (e)=>{
    mouseDown = false;
})


// Animation
const clock = new THREE.Clock();
const animate = () =>
{
    const elapsedTime = clock.getElapsedTime()
    plane.rotation.z = plane.rotation.z + (delta.sign ? rotationSpeed : -rotationSpeed);
    planeMaterial.displacementScale = displacementValue + (-mouse.y * .0008)
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(animate)
}

animate()


