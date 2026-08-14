/* ANKA-OS — site JS */
(function () {
  "use strict";

  /* Tema değiştirici */
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("anka-theme");
  if (savedTheme === "light") root.classList.replace("dark", "light");

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isLight = root.classList.toggle("light");
      localStorage.setItem("anka-theme", isLight ? "light" : "dark");
    });
  }

  /* Mobil menü */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", open);
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => navLinks.classList.remove("open"))
    );
  }

  /* Back-to-top */
  const toTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    toTop.classList.toggle("visible", window.scrollY > 600);
  });
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* Nav şeffaflığı: scroll'da gölge */
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.style.boxShadow = window.scrollY > 10 ? "0 4px 20px rgba(0,0,0,.18)" : "none";
  });

  /* Reveal-on-scroll */
  const revealEls = document.querySelectorAll(".section-head, .card, .step, .download-card, .faq details, .shot, .spec-item, .wiki-toc, .rel, .tl-item, .cmp-item");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* İndirme butonu statısı */
  const btn = document.getElementById("downloadBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      const label = btn.querySelector("svg").outerHTML;
      btn.innerHTML = label + " İndirme başlatılıyor…";
      setTimeout(() => {
        btn.innerHTML = label + " ISO'yu İndir";
      }, 2600);
    });
  }

  /* Checksum kopyalama */
  const copyBtn = document.getElementById("copyChecksum");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const code = document.getElementById("checksumText");
      const value = code.dataset.hash || code.textContent.trim();
      navigator.clipboard
        .writeText(value)
        .then(() => {
          const old = copyBtn.textContent;
          copyBtn.textContent = "Kopyalandı ✓";
          setTimeout(() => (copyBtn.textContent = old), 1800);
        })
        .catch(() => {});
    });
  }
})();