// Cena 3D elegante com interação por mouse
const canvas = document.getElementById('canvas3d');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / 360, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

camera.position.set(0, 0, 6);

// Objetos principais: TorusKnot elegante
const knotGeo = new THREE.TorusKnotGeometry(1.25, 0.35, 160, 32);
const knotMat = new THREE.MeshPhysicalMaterial({
    color: 0x8b2635,
    metalness: 0.9,
    roughness: 0.18,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    reflectivity: 0.9,
    emissive: 0x1a0509,
});
const knot = new THREE.Mesh(knotGeo, knotMat);
scene.add(knot);

// Partículas sutis
const particlesGeo = new THREE.BufferGeometry();
const count = 600;
const positions = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
    const phi = Math.acos((Math.random() * 2) - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 3.5 + Math.random() * 1.8;
    positions[i * 3 + 0] = Math.sin(phi) * Math.cos(theta) * r;
    positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r * 0.6;
    positions[i * 3 + 2] = Math.cos(phi) * r;
}
particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particlesMat = new THREE.PointsMaterial({ color: 0xcccccc, size: 0.02, transparent: true, opacity: 0.8 });
const particles = new THREE.Points(particlesGeo, particlesMat);
scene.add(particles);

// Iluminação sofisticada
const hemi = new THREE.HemisphereLight(0xffffff, 0x202030, 0.6);
scene.add(hemi);
const key = new THREE.PointLight(0xb2495a, 1.2, 12);
key.position.set(4, 2, 6);
scene.add(key);
const rim = new THREE.DirectionalLight(0x7a1f2b, 0.6);
rim.position.set(-5, -2, 5);
scene.add(rim);

// Responsividade e redimensionamento
function resize() {
    const w = window.innerWidth;
    const h = Math.max(220, Math.min(520, Math.round((w < 768) ? 220 : 360)));
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize, { passive: true });
resize();

// Interação por mouse (parallax suave)
let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2);
    mouseY = (e.clientY - (canvas.clientHeight / 2));
});

// Animação
let last = performance.now();
function animate() {
    const now = performance.now();
    const dt = (now - last) * 0.001;
    last = now;

    // rotação automática com influência do mouse
    const targetY = mouseX * 0.00012;
    const targetX = mouseY * 0.00008;
    knot.rotation.y += (0.15 + targetY - knot.rotation.y) * 0.06;
    knot.rotation.x += (0.02 + targetX - knot.rotation.x) * 0.06;
    knot.rotation.z += 0.01 * dt * 60;

    // partículas giram lentamente
    particles.rotation.y += 0.002;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
