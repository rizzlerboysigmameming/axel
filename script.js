let scene, camera, renderer;
let axel, echo;

/* ---------------- WORLD SETUP ---------------- */

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // LIGHTING
  const light = new THREE.PointLight(0xffffff, 1.5);
  light.position.set(5, 5, 5);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambient);

  createAxel();
  loadEcho();

  animate();
}

/* ---------------- AXEL (CODE CHARACTER) ---------------- */

function createAxel() {
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0xff00ff })
  );

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0xff66ff })
  );

  head.position.y = 1;

  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x000000 });

  const eye1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), eyeMat);
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

/* ---------------- ECHO (MODEL CHARACTER) ---------------- */

function loadEcho() {
  const loader = new THREE.GLTFLoader();

  loader.load(
    "assets/echo.glb",
    (gltf) => {
      echo = gltf.scene;

      echo.scale.set(0.5, 0.5, 0.5);
      echo.position.set(2, 0, 0);

      scene.add(echo);
    },
    undefined,
    (err) => {
      console.error("Echo failed to load:", err);
    }
  );
}

/* ---------------- AXEL AI BRAIN ---------------- */

function getAxelResponse(input) {
  input = input.toLowerCase();

  if (input.includes("hello")) {
    return "WELCOME TO MY WORLD.";
  }

  if (input.includes("who are you")) {
    return "I AM AXEL. I CONTROL THIS SIMULATION.";
  }

  if (input.includes("echo")) {
    return "ECHO IS ACTIVE AND MOVING.";
  }

  if (input.includes("chaos")) {
    scene.background = new THREE.Color(0x330000);
    return "CHAOS MODE ACTIVATED.";
  }

  if (input.includes("calm")) {
    scene.background = new THREE.Color(0x111111);
    return "WORLD STABILIZED.";
  }

  return "COMMAND RECEIVED.";
}

/* ---------------- INPUT SYSTEM ---------------- */

function sendPrompt() {
  const input = document.getElementById("prompt").value;

  const response = getAxelResponse(input);

  console.log("AXEL:", response);

  // Axel reaction
  if (axel) {
    axel.rotation.y += 0.5;
  }

  // Echo reaction
  if (echo && input.includes("scan")) {
    echo.position.x = Math.random() * 4 - 2;
  }
}

/* ---------------- ANIMATION LOOP ---------------- */

function animate() {
  requestAnimationFrame(animate);

  // AXEL idle motion
  if (axel) {
    axel.rotation.y += 0.005;
    axel.position.y = Math.sin(Date.now() * 0.0015) * 0.2;
  }

  // ECHO follow motion
  if (axel && echo) {
    echo.position.x += (axel.position.x - echo.position.x) * 0.02;
    echo.position.y = Math.sin(Date.now() * 0.002) * 0.3;
  }

  renderer.render(scene, camera);
}

init();
