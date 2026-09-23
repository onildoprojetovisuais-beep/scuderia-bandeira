// Rastro de cursor customizado ("rastro de fogo") — cor de marca (--vermelho: #ff4747)
(() => {
  const canvas = document.getElementById('trailCanvas');
  if (!canvas) return;

  const isTouch = 'ontouchstart' in window;
  if (isTouch) return;

  const ctx = canvas.getContext('2d');
  const RGB_RED = [255, 71, 71]; // --vermelho em rgb (resto da home)
  const RGB_LIME = [202, 211, 2]; // --vermelho do escopo .caterham (--lime) em rgb
  const TRAIL_LIFE = 480; // ms
  const MAX_TRAIL_POINTS = 36; // buffer fixo — trail não cresce sem limite em mouse rápido/mouse de alta taxa de amostragem
  const MAX_SPARKS = 80;
  const FOLLOW = 0.28; // suavização do cursor — evita "parada seca" e trailing picotado
  const COLOR_FOLLOW = 0.06; // suavização da transição de cor — crossfade fluido ao entrar/sair do Caterham

  const caterhamEl = document.getElementById('caterham');

  // posição "crua" do evento vs. posição suavizada usada para desenhar —
  // a suavização é o que dá a sensação fluida e faz o rastro desacelerar
  // até parar em vez de simplesmente sumir quando o mouse para.
  const raw = { x: -100, y: -100 };
  const smooth = { x: -100, y: -100 };
  let hasMouse = false;

  // 0 = vermelho (padrão), 1 = lima do Caterham — interpolado suavemente
  // conforme o cursor entra/sai da seção, em vez de trocar a cor de golpe.
  let colorT = 0;
  let RGB = '255, 71, 71';

  let points = []; // {x, y, born}
  let sparks = [];
  let lastSparkPos = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('load', resize);
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener(
    'mousemove',
    (e) => {
      raw.x = e.clientX;
      raw.y = e.clientY;
      if (!hasMouse) {
        smooth.x = raw.x;
        smooth.y = raw.y;
      }
      hasMouse = true;
    },
    { passive: true }
  );

  document.body.style.cursor = 'none';

  function updateColor() {
    let targetT = 0;
    if (caterhamEl && hasMouse) {
      const r = caterhamEl.getBoundingClientRect();
      const inside = smooth.x >= r.left && smooth.x <= r.right && smooth.y >= r.top && smooth.y <= r.bottom;
      targetT = inside ? 1 : 0;
    }
    colorT += (targetT - colorT) * COLOR_FOLLOW;
    if (colorT < 0.0005) colorT = 0;
    if (colorT > 0.9995) colorT = 1;

    const r = Math.round(RGB_RED[0] + (RGB_LIME[0] - RGB_RED[0]) * colorT);
    const g = Math.round(RGB_RED[1] + (RGB_LIME[1] - RGB_RED[1]) * colorT);
    const b = Math.round(RGB_RED[2] + (RGB_LIME[2] - RGB_RED[2]) * colorT);
    RGB = `${r}, ${g}, ${b}`;
  }

  function updateTrailAndSparks(now) {
    smooth.x += (raw.x - smooth.x) * FOLLOW;
    smooth.y += (raw.y - smooth.y) * FOLLOW;

    if (hasMouse) {
      const last = points[points.length - 1];
      if (!last || Math.hypot(smooth.x - last.x, smooth.y - last.y) > 3) {
        points.push({ x: smooth.x, y: smooth.y, born: now });
        if (points.length > MAX_TRAIL_POINTS) points.shift();
      }

      if (!lastSparkPos) lastSparkPos = { x: smooth.x, y: smooth.y };
      const dx = smooth.x - lastSparkPos.x;
      const dy = smooth.y - lastSparkPos.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 10) {
        const nx = dx / dist;
        const ny = dy / dist;
        for (let i = 0; i < 3; i++) {
          const spread = (Math.random() - 0.5) * 1.2;
          const speed = 1 + Math.random() * 2.5;
          sparks.push({
            x: smooth.x,
            y: smooth.y,
            vx: (-nx + spread) * speed,
            vy: (-ny + spread) * speed,
            radius: 1.5 + Math.random() * 3.5,
            life: 1,
          });
        }
        if (sparks.length > MAX_SPARKS) sparks.splice(0, sparks.length - MAX_SPARKS);
        lastSparkPos = { x: smooth.x, y: smooth.y };
      }
    }

    points = points.filter((p) => now - p.born < TRAIL_LIFE);
  }

  function drawTrail(now) {
    if (points.length < 2) return;

    // desenha o rastro em poucas "bandas" (poucos stroke()/blur por frame,
    // em vez de um por segmento) — é o que elimina o travamento em
    // movimentos rápidos, mantendo o afinamento/gradiente visual.
    const BANDS = 4;
    const n = points.length;

    ctx.filter = 'blur(4px)';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let b = 0; b < BANDS; b++) {
      const startIdx = Math.floor((b / BANDS) * (n - 1));
      const endIdx = Math.floor(((b + 1) / BANDS) * (n - 1));
      if (endIdx <= startIdx) continue;

      const head = points[endIdx];
      const age = now - head.born;
      const t = Math.max(0, 1 - age / TRAIL_LIFE);
      if (t <= 0) continue;

      const bandT = (b + 1) / BANDS;

      ctx.beginPath();
      ctx.moveTo(points[startIdx].x, points[startIdx].y);
      for (let i = startIdx + 1; i <= endIdx; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = `rgba(${RGB}, ${(t * (0.15 + 0.85 * bandT)).toFixed(3)})`;
      ctx.lineWidth = 4 + 18 * t * bandT;
      ctx.stroke();
    }

    ctx.filter = 'none';
  }

  function drawSparks() {
    if (!sparks.length) return;
    sparks = sparks.filter((s) => s.life > 0);
    for (const s of sparks) {
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.88;
      s.vy *= 0.88;
      s.life -= 0.04;

      ctx.beginPath();
      ctx.fillStyle = `rgba(${RGB}, ${Math.max(0, s.life) * 0.7})`;
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawCursor() {
    if (!hasMouse) return;
    ctx.beginPath();
    ctx.fillStyle = `rgb(${RGB})`;
    ctx.arc(smooth.x, smooth.y, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = `rgba(${RGB}, 0.3)`;
    ctx.lineWidth = 1;
    ctx.arc(smooth.x, smooth.y, 10, 0, Math.PI * 2);
    ctx.stroke();
  }

  function loop() {
    const now = performance.now();

    updateTrailAndSparks(now);
    updateColor();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTrail(now);
    drawSparks();
    drawCursor();

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
