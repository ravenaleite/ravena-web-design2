// Cena 3D elegante com interação por mouse/toque
const canvas = document.getElementById('canvas3d');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let scene, camera, renderer, raven, ravenMat, wingLeft, wingRight, particles, key, rim;

try {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / 360, 0.1, 100);
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    camera.position.set(0, 0, 6);

    // Objeto principal: corvo estilizado low-poly (referência ao nome Ravena),
    // em bronze/dourado metálico sobre preto — assinatura visual da marca.
    ravenMat = new THREE.MeshPhysicalMaterial({
        color: 0x3a2d10,
        metalness: 0.88,
        roughness: 0.22,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
        reflectivity: 0.8,
        emissive: 0x1a1206,
        flatShading: true,
    });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffd873 });

    raven = new THREE.Group();

    const body = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 1), ravenMat);
    body.scale.set(0.68, 0.55, 1.35);
    raven.add(body);

    const head = new THREE.Mesh(new THREE.IcosahedronGeometry(0.46, 1), ravenMat);
    head.position.set(0, 0.32, 1.15);
    raven.add(head);

    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.55, 4), ravenMat);
    beak.rotation.x = Math.PI / 2;
    beak.rotation.y = Math.PI / 4;
    beak.position.set(0, 0.24, 1.58);
    raven.add(beak);

    const eyeGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.22, 0.4, 1.35);
    raven.add(eyeL);
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
    eyeR.position.set(0.22, 0.4, 1.35);
    raven.add(eyeR);

    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.2, 4), ravenMat);
    tail.scale.set(1, 1, 0.18);
    tail.rotation.x = Math.PI / 2;
    tail.rotation.z = Math.PI / 4;
    tail.position.set(0, -0.02, -1.15);
    raven.add(tail);

    function makeWing(side) {
        const wing = new THREE.Mesh(new THREE.ConeGeometry(0.85, 1.7, 3), ravenMat);
        wing.scale.set(1, 1, 0.16);
        wing.rotation.z = side * (Math.PI / 2 - 0.35);
        wing.rotation.y = -side * 0.25;
        wing.position.set(side * 0.55, 0.05, 0.05);
        raven.add(wing);
        return wing;
    }
    wingLeft = makeWing(1);
    wingRight = makeWing(-1);

    scene.add(raven);

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

    // Iluminação sofisticada (tons dourados/âmbar)
    const hemi = new THREE.HemisphereLight(0xffffff, 0x241f14, 0.6);
    scene.add(hemi);
    key = new THREE.PointLight(0xe0b84b, 1.2, 12);
    key.position.set(4, 2, 6);
    scene.add(key);
    rim = new THREE.DirectionalLight(0x8a6d1f, 0.6);
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

    // Toque/clique no corvo: as asas abrem, a câmera aproxima e a luz pulsa
    const sceneCard = document.getElementById('sceneCard');
    const baseEmissive = new THREE.Color(0x1a1206);
    const burstEmissive = new THREE.Color(0xffcf6b);
    const wingRestZ = { left: wingLeft.rotation.z, right: wingRight.rotation.z };
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

    if (reduceMotion) {
        // Respeita a preferência do usuário por menos movimento: uma única renderização estática
        renderer.render(scene, camera);
    } else {
        // Animação: balanço sutil (sem giro contínuo) + reação ao toque/clique
        let last = performance.now();
        function animate() {
            const now = performance.now();
            const dt = (now - last) * 0.001;
            last = now;

            if (burst > 0) {
                burst = Math.max(0, burst - dt / 1.1);
            }
            const ease = burst * burst * (3 - 2 * burst); // smoothstep

            // o corvo balança devagar, como se observasse ao redor, com influência do mouse/toque
            const idleYaw = Math.sin(now * 0.00018) * 0.22;
            const idleBob = Math.sin(now * 0.0011) * 0.08;
            const targetY = idleYaw + mouseX * 0.0001;
            const targetX = mouseY * 0.00006;
            raven.rotation.y += (targetY - raven.rotation.y) * 0.05;
            raven.rotation.x += (targetX - raven.rotation.x) * 0.05;
            raven.position.y += (idleBob - raven.position.y) * 0.05;

            // asas abrem durante o destaque de toque/clique
            wingLeft.rotation.z = wingRestZ.left - ease * 0.6;
            wingRight.rotation.z = wingRestZ.right + ease * 0.6;

            // partículas giram lentamente
            particles.rotation.y += 0.002 + ease * 0.01;

            // câmera se aproxima e a luz pulsa durante o destaque
            camera.position.z = 6 - ease * 1.4;
            key.intensity = 1.2 + ease * 2.2;
            ravenMat.emissive.copy(baseEmissive).lerp(burstEmissive, ease);

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }
}
