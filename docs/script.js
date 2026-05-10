let scene, camera, renderer;
let axel;

function init() {

  // SCENE
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222222);

  // CAMERA
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 5;

  // RENDERER
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  // LIGHTS
  const light = new THREE.PointLight(0xffffff, 2);
  light.position.set(5, 5, 5);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);

  // AXEL
  createAxel();

  animate();
}

function createAxel() {

  const group = new THREE.Group();

  // BODY
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0xff00ff })
  );

  // HEAD
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0xff66ff })
  );

  head.position.y = 1;

  // EYES
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x000000 });

  const eye1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.1, 0.1),
    eyeMat
  );

  const eye2 = eye1.clone();

  eye1.position.set(0.2, 1.1, 0.4);
  eye2.position.set(-0.2, 1.1, 0.4);

  group.add(body);
  group.add(head);
  group.add(eye1);
  group.add(eye2);

  axel = group;

  scene.add(axel);
}

function sendPrompt() {

  const input = document.getElementById("prompt").value;

  console.log("USER:", input);

  if (axel) {
    axel.rotation.y += 0.5;
  }
}

function animate() {

  requestAnimationFrame(animate);

  if (axel) {
    axel.rotation.y += 0.01;
    axel.position.y = Math.sin(Date.now() * 0.002) * 0.2;
  }

  renderer.render(scene, camera);
}

init();
