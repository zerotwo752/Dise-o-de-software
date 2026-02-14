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
const treeHeart = document.getElementById('tree-heart');

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

function decorateTree() {
  const emojis = ['❤️', '💖', '💘', '💕', '💗'];
  for (let i = 0; i < 90; i += 1) {
    const leaf = document.createElement('span');
    leaf.className = 'heart-leaf';
    leaf.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    leaf.style.left = `${Math.random() * 92}%`;
    leaf.style.top = `${Math.random() * 90}%`;
    leaf.style.animationDelay = `${Math.random() * 2}s`;
    treeHeart.appendChild(leaf);
  }
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

surpriseBtn.addEventListener('click', () => {
  overlay.hidden = false;
});

closeOverlay.addEventListener('click', () => {
  overlay.hidden = true;
});

typeWriter(message, typedEl);
updateCounter();
setInterval(updateCounter, 1000);
decorateTree();
floatingHearts();