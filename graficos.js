
document.addEventListener("DOMContentLoaded", function () {
  // --- Funções do Modelo ---

  /* Função Logística do Conhecimento */
  function K(t) {
    return 100 / (1 + Math.exp(-0.2 * (t - 10)));
  }

  
   /* Derivada da Função */
  function K_derivada(t) {
    const expTerm = Math.exp(-0.2 * (t - 10));
    return (20 * expTerm) / Math.pow(1 + expTerm, 2);
  }

  // --- Geração de Dados ---
  const labels = []; // Eixo X 
  const dataConhecimento = []; // Eixo Y (K(t))
  const dataVelocidade = []; // Eixo Y (K'(t))

  // Gerar dados de t=0 até t=40
  for (let t = 0; t <= 40; t += 1) {
    labels.push(t);
    dataConhecimento.push(K(t));
    dataVelocidade.push(K_derivada(t));
  }

  // --- Gráfico 1: Curva de Aprendizagem  ---
  const ctxAprendizagem = document
    .getElementById("graficoAprendizagem")
    .getContext("2d");

  new Chart(ctxAprendizagem, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Nível de Conhecimento K(t)",
          data: dataConhecimento,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: false,
          tension: 0.4,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'A Curva "S" do Aprendizado',
          font: { size: 16 },
        },
      },
      scales: {
        x: { title: { display: true, text: "Tempo de Estudo (t)" } },
        y: {
          title: { display: true, text: "Conhecimento K(t) (0-100)" },
          min: 0,
          max: 110, 
        },
      },
    },
  });

  // --- Gráfico 2: Velocidade de Aprendizado ---
  const ctxVelocidade = document
    .getElementById("graficoVelocidade")
    .getContext("2d");

  new Chart(ctxVelocidade, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Velocidade de Aprendizado K'(t)",
          data: dataVelocidade,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: false,
          tension: 0.4,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Velocidade de Aprendizado (Derivada)",
          font: { size: 16 },
        },
        subtitle: {
          display: true,
          text: "O pico da curva (t=10) é a fase de aprendizado mais intenso.",
        },
      },
      scales: {
        x: { title: { display: true, text: "Tempo de Estudo (t)" } },
        y: {
          title: { display: true, text: "Velocidade (conhecimento/tempo)" },
        },
      },
    },
  });

  // --- Gráfico 3: Integral ---
  const ctxIntegral = document
    .getElementById("graficoIntegral")
    .getContext("2d");

  new Chart(ctxIntegral, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Velocidade de Aprendizado K'(t)",
          data: dataVelocidade,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: "origin", 
          tension: 0.4,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Conhecimento Acumulado (Integral)",
          font: { size: 16 },
        },
        subtitle: {
          display: true,
          text: "A área total sob esta curva é o Conhecimento Total (K(t))",
        },
      },
      scales: {
        x: { title: { display: true, text: "Tempo de Estudo (t)" } },
        y: {
          title: { display: true, text: "Velocidade (conhecimento/tempo)" },
          beginAtZero: true,
        },
      },
    },
  });
});
