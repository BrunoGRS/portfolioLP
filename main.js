/**
 * main.js - Funcionalidades Dinâmicas e de Conversão (Next Tab)
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
     1. ANIMAÇÕES DE SCROLL (Intersection Observer)
     ========================================== */
  // Define os elementos que vão ser animados
  const elementsToAnimate = document.querySelectorAll(
    ".card-feature, .card-step, .card-bento-dark, .card-bento-gradient, .comp-card, .pricing-offer-card",
  );

  // Prepara os elementos escondendo-os via JS (assim não quebra se o JS falhar)
  elementsToAnimate.forEach((el) => {
    el.classList.add("js-scroll-hidden");
  });

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, // Ativa quando 10% do elemento aparece na tela
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("js-scroll-visible");
        observer.unobserve(entry.target); // Anima apenas uma vez
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach((el) => observer.observe(el));

  /* ==========================================
     2. SMART ACCORDION (FAQ)
     ========================================== */
  // Fecha a aba anterior ao abrir uma nova
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      // Se o usuário clicou no summary (título)
      if (e.target.tagName === "SUMMARY" || e.target.closest("summary")) {
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.hasAttribute("open")) {
            otherItem.removeAttribute("open");
          }
        });
      }
    });
  });

  /* ==========================================
     3. SMART HEADER (Esconde ao descer, Mostra ao subir)
     ========================================== */
  const header = document.querySelector("header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Adiciona fundo escuro/blur quando sai do topo
    if (currentScroll > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }

    // Esconde/Mostra baseado na direção
    if (currentScroll > lastScroll && currentScroll > 200) {
      // Rolando para baixo -> Esconde
      header.style.transform = "translateY(-100%)";
    } else {
      // Rolando para cima -> Mostra
      header.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });

  /* ==========================================
     4. RASTREAMENTO DE BOTÕES (Eventos Meta/Google)
     ========================================== */
  const wppButtons = document.querySelectorAll('a[href*="whatsapp.com"]');

  wppButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Aqui você pode plugar seu Pixel do FB ou Tag do Google no futuro
      // Exemplo: if (typeof fbq === 'function') fbq('track', 'Lead');
      console.log("🚀 Evento Disparado: Clique no botão do WhatsApp!");
    });
  });

  /* ==========================================
     5. POPUP DE INTENÇÃO DE SAÍDA (Exit Intent)
     ========================================== */
  // Verifica se o popup já foi mostrado nesta sessão
  if (!sessionStorage.getItem("exitIntentShown")) {
    // Cria o HTML do Modal dinamicamente
    const modalHTML = `
      <div id="exit-modal" class="exit-modal">
        <div class="exit-modal-content card-glass">
          <span class="close-modal"><i class="ph ph-x"></i></span>
          <h2 style="font-size: 1.8rem; margin-bottom: 10px;">Ainda na dúvida? 🤔</h2>
          <p style="color: var(--text-gray); margin-bottom: 25px; font-size: 0.95rem;">
            Não feche a página ainda! Que tal uma análise <strong>gratuita e rápida</strong> de como seria o site ideal para o seu negócio?
          </p>
          <a href="https://api.whatsapp.com/send/?phone=5549998316596&" class="btn btn-primary btn-full" style="font-size: 1rem; padding: 16px;">
            Falar com um Especialista Agora
          </a>
        </div>
      </div>
    `;

    // Insere no final do body
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modal = document.getElementById("exit-modal");
    const closeBtn = document.querySelector(".close-modal");

    // Detecta quando o mouse sai pelo topo da tela
    document.addEventListener("mouseleave", (e) => {
      if (e.clientY < 0 && !sessionStorage.getItem("exitIntentShown")) {
        modal.classList.add("show-modal");
        sessionStorage.setItem("exitIntentShown", "true");
      }
    });

    // Fechar o modal
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show-modal");
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show-modal");
      }
    });
  }
});

// --- BOTÃO VOLTAR AO TOPO ---
const backToTopBtn = document.querySelector(".btn-back-to-top");

window.addEventListener("scroll", () => {
  // Se a rolagem passar de 300 pixels, mostra o botão
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    // Caso contrário, esconde
    backToTopBtn.classList.remove("show");
  }
});
