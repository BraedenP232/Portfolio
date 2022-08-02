import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 3);
pointLight.position.set(30, 30, -100);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const braedenTexture = new THREE.TextureLoader().load('braeden.jpeg');

const braeden = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshBasicMaterial({ map: braedenTexture }));

scene.add(braeden);

// Earth

const earthTexture = new THREE.TextureLoader().load('earth.jpeg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(5, 30, 30),
    new THREE.MeshStandardMaterial({
        map: earthTexture,
    })
);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
    })
);

// Sun

const sunTexture = new THREE.TextureLoader().load('sun.jpeg');

const sun = new THREE.Mesh(
    new THREE.SphereGeometry(70, 32, 32),
    new THREE.MeshBasicMaterial({
        map: sunTexture,
    })
);

// Uranus

const uranusTexture = new THREE.TextureLoader().load('uranus.jpeg');
const uranus = new THREE.Mesh(
    new THREE.SphereGeometry(3, 14, 14),
    new THREE.MeshStandardMaterial({
        map: uranusTexture,
        normalMap: normalTexture,
    })
);

// Saturn

const saturnTexture = new THREE.TextureLoader().load('saturn.jpeg');
const saturnRingTexture = new THREE.TextureLoader().load('saturnring.png');

const saturn = new THREE.Mesh(
    new THREE.SphereGeometry(5, 45, 40),
    new THREE.MeshStandardMaterial({
        map: saturnTexture,
    }),
);
const saturnRing = new THREE.Mesh(
    new THREE.RingGeometry(7, 14, 40),
    new THREE.MeshStandardMaterial({
        map: saturnRingTexture,
        side: THREE.DoubleSide
    }),
);

scene.add(earth, moon, uranus, saturn, saturnRing, sun);

moon.position.setZ(20);
moon.position.setX(-25);
moon.position.setY(-5);

earth.position.setZ(10);
earth.position.setX(-25);
earth.position.setY(-5);

uranus.position.setZ(70);
uranus.position.setX(-100);

saturn.position.setZ(40);
saturn.position.setY(30);
saturn.position.setX(-80);

saturnRing.position.setZ(40);
saturnRing.position.setY(30);
saturnRing.position.setX(-80);

saturnRing.rotateY(-42);
saturnRing.rotateX(1.6);

sun.position.setZ(-100);
sun.position.setX(30);
sun.position.setY(30);

braeden.position.z = -5;
braeden.position.x = 2;

// Scroll Animation

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    earth.rotation.x += 0.01;
    earth.rotation.y += 0.009;
    earth.rotation.z += 0.03;

    braeden.rotation.y += 0.01;
    braeden.rotation.z += 0.01;

    saturn.rotation.x += 0.01;
    saturn.rotation.y += 0.01;
    saturn.rotation.z += 0.01;

    saturnRing.rotation.x += 0.0004;
    saturnRing.rotation.y += 0.0004;
    saturnRing.rotation.z += 0.01;

    uranus.rotation.x += 0.007;
    uranus.rotation.y += -0.007;
    uranus.rotation.z += 0.007;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Object OnClick Function 

function onDocumentMouseMove(event) {

    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    let objectIsHighlighted = false;
    var intersects = raycaster.intersectObjects(sceneMeshes, false);

    if (intersects.length > 0) {
        $('html,body').css('cursor', 'pointer');
        alert("yup");
    } else {
        $('html,body').css('cursor', 'default');
    }

}

// Animation Loop

function animate() {
    requestAnimationFrame(animate);

    earth.rotation.x += 0.002;
    earth.rotation.y += 0.003;
    earth.rotation.z += 0.001;

    saturn.rotation.x += 0.00005;
    saturn.rotation.y += 0.0002;
    saturn.rotation.z += 0.0001;

    saturnRing.rotation.x += 0.00005;
    saturnRing.rotation.y += 0.00005;
    saturnRing.rotation.z += 0.0002;

    uranus.rotation.x += 0.002;
    uranus.rotation.y += -0.001;
    uranus.rotation.z += 0.01;

    moon.rotation.x += 0.005;

    braeden.rotation.x += 0.002;
    braeden.rotation.y += 0.002;
    braeden.rotation.z += 0.002;

    // controls.update();

    renderer.render(scene, camera);
}

animate();