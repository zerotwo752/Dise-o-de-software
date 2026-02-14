const message =
  'Si pudiera elegir un lugar seguro, siempre te elegiría a ti. Gracias por ser mi hogar. ❤️';
const startDate = new Date('2025-02-14T00:00:00');

const typedEl = document.getElementById('typed-message');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const surpriseBtn = document.getElementById('surprise-btn');
const overlay = document.getElementById('overlay');
const closeOverlay = document.getElementById('close-overlay');
const playSceneBtn = document.getElementById('play-scene');

function typeWriter(text, node, speed = 36) {
  let index = 0;

  const timer = setInterval(() => {
    node.textContent = text.slice(0, index);
    index += 1;

    if (index > text.length) {
      clearInterval(timer);
    }
  }, speed);
}

function updateCounter() {
  const now = new Date();
  const diff = now - startDate;

  if (diff <= 0) {
    daysEl.textContent = '0';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = String(days);
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

function floatingHearts() {
  const canvas = document.getElementById('hearts-bg');
  const ctx = canvas.getContext('2d');
  const hearts = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class HeartParticle {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 120;
      this.size = 8 + Math.random() * 12;
      this.speed = 0.5 + Math.random() * 1.4;
      this.alpha = 0.2 + Math.random() * 0.6;
      this.color = ['#ff8fab', '#ff4d6d', '#ffd6e0'][Math.floor(Math.random() * 3)];
    }

    update() {
      this.y -= this.speed;
      this.x += Math.sin(this.y * 0.02) * 0.8;
      if (this.y < -20) this.reset();
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.size / 10, this.size / 10);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.bezierCurveTo(8, -12, 16, 2, 0, 12);
      ctx.bezierCurveTo(-16, 2, -8, -12, 0, -3);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 80; i += 1) hearts.push(new HeartParticle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart) => {
      heart.update();
      heart.draw();
    });
    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize);
  animate();
}

function createLoveTreeScene() {
  const canvas = document.getElementById('love-scene');
  const ctx = canvas.getContext('2d');
  const size = { width: canvas.width, height: canvas.height };

  const groundY = size.height - 58;
  const seedStartY = 64;
  const trunkBase = { x: size.width / 2, y: groundY };
  const trunkTopY = 225;

  const branches = [
    [trunkBase.x, 278, trunkBase.x - 44, 248],
    [trunkBase.x, 258, trunkBase.x + 54, 222],
    [trunkBase.x, 248, trunkBase.x - 70, 196],
    [trunkBase.x, 236, trunkBase.x + 74, 186],
    [trunkBase.x - 44, 248, trunkBase.x - 98, 211],
    [trunkBase.x + 54, 222, trunkBase.x + 112, 188],
    [trunkBase.x - 70, 196, trunkBase.x - 122, 163],
    [trunkBase.x + 74, 186, trunkBase.x + 126, 149],
    [trunkBase.x - 98, 211, trunkBase.x - 130, 170],
    [trunkBase.x + 112, 188, trunkBase.x + 146, 156],
  ];

  const blossoms = Array.from({ length: 260 }, () => {
    const t = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random());
    const x = 16 * Math.sin(t) ** 3;
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    return {
      x: trunkBase.x + x * 8.8 * radius,
      y: trunkTopY + 20 - y * 10.8 * radius,
      size: 6 + Math.random() * 7,
      color: ['#ff5a7d', '#ff98b6', '#dc1239', '#ff7aa6'][Math.floor(Math.random() * 4)],
      swayOffset: Math.random() * Math.PI * 2,
    };
  });

  let startAt = 0;
  let sceneDone = false;

  function drawHeart(x, y, sizePx, color, alpha = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(sizePx / 14, sizePx / 14);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -4);
    ctx.bezierCurveTo(9, -14, 18, 3, 0, 14);
    ctx.bezierCurveTo(-18, 3, -9, -14, 0, -4);
    ctx.fill();
    ctx.restore();
  }

  function drawBaseScene() {
    ctx.fillStyle = '#f8eee7';
    ctx.fillRect(0, 0, size.width, size.height);

    ctx.strokeStyle = '#2d2a2a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(42, groundY);
    ctx.lineTo(size.width - 42, groundY);
    ctx.stroke();
  }

  function drawTrunk(progress) {
    if (progress <= 0) return;
    const trunkHeight = (groundY - trunkTopY) * progress;

    ctx.fillStyle = '#9d5f23';
    ctx.beginPath();
    ctx.moveTo(trunkBase.x - 18 * progress, groundY);
    ctx.lineTo(trunkBase.x + 18 * progress, groundY);
    ctx.lineTo(trunkBase.x + 7, groundY - trunkHeight);
    ctx.lineTo(trunkBase.x - 7, groundY - trunkHeight);
    ctx.closePath();
    ctx.fill();
  }

  function drawBranches(progress) {
    if (progress <= 0) return;

    const visibleBranches = Math.floor(branches.length * progress);
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#80511f';

    for (let i = 0; i < visibleBranches; i += 1) {
      const [x1, y1, x2, y2] = branches[i];
      const local = Math.min(Math.max(progress * branches.length - i, 0), 1);
      ctx.lineWidth = Math.max(2, 8 - i * 0.6);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x1 + (x2 - x1) * local, y1 + (y2 - y1) * local);
      ctx.stroke();
    }
  }

  function drawBlossoms(progress, now) {
    if (progress <= 0) return;

    const count = Math.floor(blossoms.length * progress);
    for (let i = 0; i < count; i += 1) {
      const b = blossoms[i];
      const sway = Math.sin(now / 520 + b.swayOffset) * 1.2;
      drawHeart(b.x + sway, b.y, b.size, b.color, Math.min(progress * 1.4, 1));
    }
  }

  function render(now) {
    if (!startAt) startAt = now;
    const elapsed = now - startAt;

    const seedDuration = 1350;
    const trunkDuration = 1600;
    const branchDuration = 1400;
    const bloomDuration = 1700;

    drawBaseScene();

    const seedProgress = Math.min(elapsed / seedDuration, 1);
    const seedY = seedStartY + (groundY - 6 - seedStartY) * seedProgress;

    if (seedProgress < 1) {
      drawHeart(trunkBase.x, seedY, 12, '#cf1f3d');
    }

    const trunkStart = seedDuration - 120;
    const trunkProgress = Math.min(Math.max((elapsed - trunkStart) / trunkDuration, 0), 1);
    drawTrunk(trunkProgress);

    const branchStart = trunkStart + trunkDuration * 0.48;
    const branchProgress = Math.min(Math.max((elapsed - branchStart) / branchDuration, 0), 1);
    drawBranches(branchProgress);

    const blossomStart = branchStart + branchDuration * 0.55;
    const blossomProgress = Math.min(Math.max((elapsed - blossomStart) / bloomDuration, 0), 1);
    drawBlossoms(blossomProgress, now);

    const total = blossomStart + bloomDuration + 250;
    if (elapsed < total) {
      requestAnimationFrame(render);
    } else {
      sceneDone = true;
      playSceneBtn.disabled = false;
      playSceneBtn.textContent = '↻';
    }
  }

  function play() {
    playSceneBtn.disabled = true;
    sceneDone = false;
    startAt = 0;
    requestAnimationFrame(render);
  }

  drawBaseScene();
  drawHeart(trunkBase.x, seedStartY, 12, '#cf1f3d');

  playSceneBtn.addEventListener('click', play);

  return {
    play,
    isDone: () => sceneDone,
  };
}

surpriseBtn.addEventListener('click', () => {
  overlay.hidden = false;
});

closeOverlay.addEventListener('click', () => {
  overlay.hidden = true;
});

typeWriter(message, typedEl);
updateCounter();
setInterval(updateCounter, 1000);
floatingHearts();

const scene = createLoveTreeScene();
setTimeout(() => {
  if (!scene.isDone()) scene.play();
}, 650);
