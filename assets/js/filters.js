 document.addEventListener("DOMContentLoaded", () => {
        const filters = document.querySelector("#filters");
        const items = Array.from(document.querySelectorAll(".card-item"));

        if (!filters || items.length === 0) return;

        const ANIM_MS = 220;

        function applyFilter(filter) {
          items.forEach((item) => {
            const cat = item.dataset.category || "";
            const shouldShow = filter === "all" || cat === filter;

            // Quer mostrar
            if (shouldShow) {
              // Se estava escondido, volta e faz animação de entrada
              if (item.classList.contains("is-hidden")) {
                item.classList.remove("is-hidden");
                // força reflow pra garantir animação
                item.getBoundingClientRect();
                item.classList.remove("is-hiding");
                item.style.opacity = "0";
                item.style.transform = "translateY(10px) scale(0.98)";
                item.style.filter = "blur(2px)";

                requestAnimationFrame(() => {
                  item.style.opacity = "";
                  item.style.transform = "";
                  item.style.filter = "";
                });
              } else {
                item.classList.remove("is-hiding");
                item.classList.remove("is-hidden");
              }
              return;
            }

            // Quer esconder
            if (item.classList.contains("is-hidden")) return;

            item.classList.add("is-hiding");

            // depois da animação, coloca display:none
            window.setTimeout(() => {
              // só confirma se ainda deve ficar escondido
              const stillShouldHide = !(
                filter === "all" || (item.dataset.category || "") === filter
              );
              if (stillShouldHide) {
                item.classList.add("is-hidden");
              }
            }, ANIM_MS);
          });
        }

        filters.addEventListener("click", (e) => {
          const btn = e.target.closest("button[data-filter]");
          if (!btn) return;

          // botão ativo
          filters.querySelectorAll("button").forEach((b) => {
            b.classList.remove("is-active", "active");
          });
          btn.classList.add("is-active", "active");

          applyFilter(btn.dataset.filter);
        });
      });