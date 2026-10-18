const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visivel");
    }
  });
});

document.querySelectorAll(".texto-animado").forEach((el) =>
  observador.observe(el)
);

// Atualiza o ano no rodapé automaticamente
const anoAtualEl = document.getElementById("anoAtual");
if (anoAtualEl) {
  anoAtualEl.textContent = new Date().getFullYear();
}
