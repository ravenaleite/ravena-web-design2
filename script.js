/* =============================================================================
   Ravena Web Design — cena 3D e interface

   A biblioteca Three.js pesa ~600 KB, doze vezes mais que este site inteiro, e
   existe só para a gema girar. Por isso ela não vem no HTML: é baixada por este
   script apenas quando o aparelho e a conexão comportam. Quem abre no celular
   ou num sinal fraco recebe a página sem esse peso, e o layout se fecha sozinho
   pela classe "sem-3d" (ver styles.css).
   ========================================================================== */

const canvas = document.getElementById('canvas3d');
const sceneCard = document.getElementById('sceneCard');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Verificação de integridade (SRI): o navegador calcula o hash do arquivo que
   baixou e só executa se bater com o THREE_SRI abaixo — se o CDN for
   comprometido, o script é recusado.

   Ao trocar a versão do Three.js, o hash MUDA e precisa ser copiado de novo da
   página do cdnjs. Nunca invente um hash: hash errado impede o carregamento, e
   como a falha aqui é silenciosa (a página cai em "sem-3d" e continua inteira),
   a gema simplesmente não aparece e ninguém percebe. Para conferir no site
   publicado: F12 -> Console. "Failed to find a valid digest" = hash errado. */
const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
const THREE_SRI = 'sha384-CI3ELBVUz9XQO+97x6nwMDPosPR5XvsxW2ua7N1Xeygeh1IxtgqtCkGfQY9WWdHu';

let scene, camera, renderer, gem, gemMat, gemCore, particles, key, rim;

/* Sem cena: o cartão deixa de ser anunciado como botão, para o leitor de tela
   não oferecer um controle que não faz nada. */
function desativarCena() {
    document.documentElement.classList.add('sem-3d');
    if (!sceneCard) return;
    sceneCard.removeAttribute('role');
    sceneCard.removeAttribute('tabindex');
    sceneCard.removeAttribute('aria-label');
    sceneCard.setAttribute('aria-hidden', 'true');
}

/* ---------------------------------------------------------------- montagem */
function montarCena() {
    try {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / 360, 0.1, 100);
        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        camera.position.set(0, 0, 6);

        // Gema facetada em cristal ciano-metálico sobre azul profundo, com núcleo
        // rosa-neon visível entre as facetas — o par de acentos da marca.
        gemMat = new THREE.MeshPhysicalMaterial({
            color: 0xbfe9ff,
            metalness: 0.6,
            roughness: 0.08,
            clearcoat: 1,
            clearcoatRoughness: 0.04,
            reflectivity: 1,
            transmission: 0.15,
            emissive: 0x0a1a33,
            flatShading: true,
        });
        gem = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, 0), gemMat);
        scene.add(gem);

        const coreMat = new THREE.MeshBasicMaterial({
            color: 0xff0080, transparent: true, opacity: 0.35,
        });
        gemCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 0), coreMat);
        scene.add(gemCore);

        // Partículas sutis ao redor
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
        particles = new THREE.Points(particlesGeo, new THREE.PointsMaterial({
            color: 0xaad4ff, size: 0.02, transparent: true, opacity: 0.8,
        }));
        scene.add(particles);

        // Luz branco-azulada neutra, com leve contorno rosa-neon
        scene.add(new THREE.HemisphereLight(0xffffff, 0x0d1330, 0.6));
        key = new THREE.PointLight(0xcfe9ff, 1.2, 12);
        key.position.set(4, 2, 6);
        scene.add(key);
        rim = new THREE.DirectionalLight(0xff0080, 0.4);
        rim.position.set(-5, -2, 5);
        scene.add(rim);

        return true;
    } catch (err) {
        console.warn('Cena 3D desativada:', err);
        return false;
    }
}

/* ------------------------------------------------------------- interação */
function iniciarCena() {
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

    let mouseX = 0, mouseY = 0;
    function updatePointer(clientX, clientY) {
        mouseX = clientX - window.innerWidth / 2;
        mouseY = clientY - (canvas.clientHeight / 2);
    }
    window.addEventListener('mousemove', (e) => updatePointer(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
        if (e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    // Destaque ao tocar, clicar ou apertar Enter/Espaço no cartão
    const baseEmissive = new THREE.Color(0x0a1a33);
    const burstEmissive = new THREE.Color(0x00ffff);
    let burst = 0;
    const triggerBurst = () => { burst = 1; ligarLoop(); };

    if (sceneCard) {
        sceneCard.addEventListener('click', triggerBurst);
        sceneCard.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
            triggerBurst();
        }, { passive: false });
        sceneCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                triggerBurst();
            }
        });
    }

    // O loop para quando a cena sai da tela: sem isso, 600 partículas
    // continuariam sendo desenhadas enquanto a pessoa lê o rodapé.
    let naTela = true;
    let rodando = false;
    let last = performance.now();

    function ligarLoop() {
        if (rodando) return;
        rodando = true;
        last = performance.now();
        requestAnimationFrame(animate);
    }

    if ('IntersectionObserver' in window) {
        new IntersectionObserver((entradas) => {
            naTela = entradas[0].isIntersecting;
            if (naTela) ligarLoop();
        }, { threshold: 0 }).observe(canvas);
    }

    const spinSpeed = reduceMotion ? 0.15 : 0.4;

    function animate() {
        if (!naTela) { rodando = false; return; }

        const now = performance.now();
        const dt = (now - last) * 0.001;
        last = now;

        if (burst > 0) burst = Math.max(0, burst - dt / 1.1);
        const ease = burst * burst * (3 - 2 * burst); // smoothstep

        gem.rotation.y += (spinSpeed + ease * 1.2) * dt;
        gem.rotation.x += (0.12 + ease * 0.6) * dt;
        const tiltZ = reduceMotion ? 0 : mouseX * 0.00025;
        const tiltX = reduceMotion ? 0 : mouseY * 0.00015;
        gem.rotation.z += (tiltZ - gem.rotation.z) * 0.05;
        camera.position.x += (tiltX * 2 - camera.position.x) * 0.05;

        gemCore.rotation.y -= (spinSpeed * 1.6) * dt;
        gemCore.rotation.x += (spinSpeed * 0.8) * dt;

        particles.rotation.y += 0.002 + ease * 0.01;

        camera.position.z = 6 - ease * 1.4;
        key.intensity = 1.2 + ease * 2.2;
        gemMat.emissive.copy(baseEmissive).lerp(burstEmissive, ease);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    ligarLoop();
}

/* ------------------------------------------------------- carga condicional */
if (canvas && !document.documentElement.classList.contains('sem-3d')) {
    const s = document.createElement('script');
    s.src = THREE_URL;
    s.integrity = THREE_SRI;
    s.crossOrigin = 'anonymous';
    s.referrerPolicy = 'no-referrer';
    s.onload = () => {
        if (typeof THREE === 'undefined' || !montarCena()) desativarCena();
        else iniciarCena();
    };
    // CDN fora do ar, bloqueado pela rede ou hash inválido: a página segue inteira.
    s.onerror = desativarCena;
    document.head.appendChild(s);
} else {
    desativarCena();
}


/* =============================================================================
   INTERFACE — independente da cena 3D. Roda em qualquer aparelho.
   ========================================================================== */

(function interfaceDoSite() {
    'use strict';

    const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const temObserver = 'IntersectionObserver' in window;

    /* Entrada suave ao rolar. A classe .reveal é adicionada aqui, e não no HTML,
       de propósito: se este script não rodar, o conteúdo continua visível em vez
       de sumir para sempre. */
    if (temObserver && !menosMovimento) {
        const blocos = document.querySelectorAll('.hero, .section, .contact');
        blocos.forEach((bloco) => bloco.classList.add('reveal'));

        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (!entrada.isIntersecting) return;
                entrada.target.classList.add('visivel');
                observador.unobserve(entrada.target);
            });
           /* threshold 0 de propósito, não 0.12: uma seção mais alta que a
              janela nunca alcança 12% de si mesma visível. Medido em 740x360
              (celular deitado), a seção de preços chega a no máximo 11,8% — com
              limiar de 0.12 ela ficaria invisível para sempre. Com 0, o gatilho
              é o rootMargin: revela quando entra 40px na tela. */
        }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

        blocos.forEach((bloco) => observador.observe(bloco));
    }

    /* Botão flutuante de WhatsApp: some ao chegar no contato, que já tem dois
       botões para a mesma ação. */
    const zap = document.getElementById('zapFlutuante');
    const contato = document.getElementById('contato');

    if (zap && contato && temObserver) {
        new IntersectionObserver((entradas) => {
            zap.classList.toggle('oculto', entradas[0].isIntersecting);
        }, { threshold: 0.25 }).observe(contato);
    }
})();
