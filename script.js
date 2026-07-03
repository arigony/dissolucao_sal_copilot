// ===== Animação Didática =====
const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
function createParticles() {
  particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 8,
      color: i % 2 === 0 ? "#ff6b6b" : "#4dabf7",
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2
    });
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animate);
}
createParticles();
animate();

// ===== Simulação Interativa =====
const concSlider = document.getElementById("concentration");
const concValue = document.getElementById("concentrationValue");
const graphCanvas = document.getElementById("graphCanvas");
const gctx = graphCanvas.getContext("2d");

function drawGraph(conc) {
  gctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
  gctx.beginPath();
  gctx.moveTo(40, graphCanvas.height - 40);
  gctx.lineTo(graphCanvas.width - 20, graphCanvas.height - 40);
  gctx.lineTo(graphCanvas.width - 20, 20);
  gctx.stroke();

  gctx.beginPath();
  gctx.moveTo(40, graphCanvas.height - 40);
  for (let x = 0; x <= conc; x += 0.1) {
    let y = Math.log(x + 1) * 40;
    gctx.lineTo(40 + x * 60, graphCanvas.height - 40 - y);
  }
  gctx.strokeStyle = "#0077b6";
  gctx.stroke();
}

concSlider.addEventListener("input", () => {
  concValue.textContent = concSlider.value + " mol/L";
  drawGraph(parseFloat(concSlider.value));
});
drawGraph(1);

// ===== Quiz =====
const quizData = [
  {
    question: "O que acontece com o NaCl quando dissolvido em água?",
    options: ["Forma moléculas de NaCl", "Dissocia em íons Na⁺ e Cl⁻", "Evapora"],
    answer: 1
  },
  {
    question: "Qual molécula estabiliza os íons em solução?",
    options: ["H₂O", "CO₂", "O₂"],
    answer: 0
  }
];

const quizContainer = document.getElementById("quizContainer");
quizData.forEach((q, i) => {
  const div = document.createElement("div");
  div.innerHTML = `<p>${q.question}</p>`;
  q.options.forEach((opt, j) => {
    div.innerHTML += `<label><input type="radio" name="q${i}" value="${j}"> ${opt}</label><br>`;
  });
  quizContainer.appendChild(div);
});

document.getElementById("submitQuiz").addEventListener("click", () => {
  let score = 0;
  quizData.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && parseInt(selected.value) === q.answer) {
      score++;
    }
  });
  document.getElementById("quizFeedback").textContent =
    score === quizData.length ? "Excelente! Você acertou todas." : "Revise os conceitos e tente novamente.";
  document.getElementById("quizScore").textContent = `Pontuação: ${score}/${quizData.length}`;
});
