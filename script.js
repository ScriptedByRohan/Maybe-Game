// Setting up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// FPS player setup
let player = {
  velocity: new THREE.Vector3(),
  speed: 0.1,
  turnSpeed: Math.PI * 0.01
};

// Player (camera) positioning
camera.position.z = 5;
camera.position.y = 1.6; // Player's height

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 10, 5);
scene.add(directionalLight);

// Adding a basic cube as an enemy
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const enemy = new THREE.Mesh(geometry, material);
enemy.position.z = -10;
scene.add(enemy);

// Control and movement variables
let keys = {};

document.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});

function movePlayer() {
  if (keys['w']) {
    camera.translateZ(-player.speed);
  }
  if (keys['s']) {
    camera.translateZ(player.speed);
  }
  if (keys['a']) {
    camera.translateX(-player.speed);
  }
  if (keys['d']) {
    camera.translateX(player.speed);
  }
  if (keys['ArrowLeft']) {
    camera.rotation.y += player.turnSpeed;
  }
  if (keys['ArrowRight']) {
    camera.rotation.y -= player.turnSpeed;
  }
}

function animate() {
  requestAnimationFrame(animate);

  movePlayer();

  // Check collision with enemy
  if (camera.position.distanceTo(enemy.position) < 1) {
    console.log("Enemy hit!");
    enemy.material.color.set(0x00ff00); // Change color on hit
  }

  renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
