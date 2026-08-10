// Cena 3D elegante com interação por mouse/toque
const canvas = document.getElementById('canvas3d');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let scene, camera, renderer, gem, gemMat, gemCore, particles, key, rim;

try {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / 360, 0.1, 100);
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    camera.position.set(0, 0, 6);

    // Objeto principal: gema facetada (lapidação tipo brilhante), em tom
    // creme/pérola metálico sobre preto — paleta minimalista, um só acento vermelho.
    gemMat = new THREE.MeshPhysicalMaterial({
        color: 0xd9d2c2,
        metalness: 0.6,
        roughness: 0.08,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        reflectivity: 1,
        transmission: 0.15,
        emissive: 0x1a1712,
        flatShading: true,
    });
    gem = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, 0), gemMat);
    scene.add(gem);

    // Núcleo interno luminoso vermelho, visível entre as facetas (acento único da marca)
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xe8402c, transparent: true, opacity: 0.35 });
    gemCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 0), coreMat);
    scene.add(gemCore);

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
    particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Iluminação sofisticada (branco-creme neutro, com leve toque vermelho no contorno)
    const hemi = new THREE.HemisphereLight(0xffffff, 0x1c1a16, 0.6);
    scene.add(hemi);
    key = new THREE.PointLight(0xf2ede1, 1.2, 12);
    key.position.set(4, 2, 6);
    scene.add(key);
    rim = new THREE.DirectionalLight(0xe8402c, 0.4);
    rim.position.set(-5, -2, 5);
    scene.add(rim);
} catch (err) {
    // Dispositivo sem suporte a WebGL: esconde a cena 3D sem quebrar o layout
    console.warn('Cena 3D desativada (WebGL indisponível):', err);
    canvas.style.display = 'none';
    const overlay = document.querySelector('.canvas-overlay');
    if (overlay) overlay.style.display = 'none';
}

if (renderer) {
    // Responsividade e redimensionamento (breakpoints sincronizados com styles.css --hero-size)
    function resize() {
        const w = window.innerWidth;
        let h;
        if (w <= 420) h = 170;
        else if (w <= 768) h = 220;
        else if (w <= 1024) h = 280;
        else h = 360;

        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Interação por mouse e por toque (parallax suave, funciona em Android/iPhone/tablet)
    let mouseX = 0, mouseY = 0;
    function updatePointer(clientX, clientY) {
        mouseX = clientX - window.innerWidth / 2;
        mouseY = clientY - (canvas.clientHeight / 2);
    }
    window.addEventListener('mousemove', (e) => updatePointer(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
        if (e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    // Toque/clique na gema: destaque vermelho, câmera aproxima, giro acelera
    const sceneCard = document.getElementById('sceneCard');
    const baseEmissive = new THREE.Color(0x1a1712);
    const burstEmissive = new THREE.Color(0xff6647);
    let burst = 0;
    function triggerBurst() {
        burst = 1;
    }
    if (sceneCard) {
        sceneCard.addEventListener('click', triggerBurst);
        sceneCard.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
            triggerBurst();
        }, { passive: false });
    }

    // Animação: giro contínuo e visível, sempre ativo (mais lento se o
    // usuário pedir menos movimento no sistema, mas nunca parado) + reação ao toque/clique
    const spinSpeed = reduceMotion ? 0.15 : 0.4;
    let last = performance.now();
    function animate() {
        const now = performance.now();
        const dt = (now - last) * 0.001;
        last = now;

        if (burst > 0) {
            burst = Math.max(0, burst - dt / 1.1);
        }
        const ease = burst * burst * (3 - 2 * burst); // smoothstep

        // giro contínuo da gema, com leve inclinação seguindo o mouse/toque
        gem.rotation.y += (spinSpeed + ease * 1.2) * dt;
        gem.rotation.x += (0.12 + ease * 0.6) * dt;
        const tiltZ = reduceMotion ? 0 : mouseX * 0.00025;
        const tiltX = reduceMotion ? 0 : mouseY * 0.00015;
        gem.rotation.z += (tiltZ - gem.rotation.z) * 0.05;
        camera.position.x += (tiltX * 2 - camera.position.x) * 0.05;

        gemCore.rotation.y -= (spinSpeed * 1.6) * dt;
        gemCore.rotation.x += (spinSpeed * 0.8) * dt;

        // partículas giram lentamente
        particles.rotation.y += 0.002 + ease * 0.01;

        // câmera se aproxima e a luz pulsa durante o destaque
        camera.position.z = 6 - ease * 1.4;
        key.intensity = 1.2 + ease * 2.2;
        gemMat.emissive.copy(baseEmissive).lerp(burstEmissive, ease);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}
