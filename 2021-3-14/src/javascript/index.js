import '../style.css';
import * as THREE from 'three';
import * as dat from 'dat.gui';

//Debug Tools
const debug = new dat.GUI();

// Canvas Object
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const planeGeometry = new THREE.PlaneBufferGeometry(3,3,64,64);

// Materials
const planeMaterial = new THREE.MeshStandardMaterial({
    color:'blue',
})

// Mesh
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = 181

const pointLight = new THREE.PointLight(0xFFF, 5)
pointLight.position.x = 1
pointLight.position.y = 1
pointLight.position.z = 1
scene.add(pointLight)


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
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 3;
scene.add(camera);

debug.add(camera.position, "x").min(-10).max(10);

/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


const clock = new THREE.Clock();
const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    plane.rotation.z = .05 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()