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

  /* Scroll progress bar */
  const progress = document.getElementById("scrollProgress");
  if (progress) {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      progress.style.width = max > 0 ? (window.scrollY / max) * 100 + "%" : "0%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Cursor glow — fareyi takip eden ışık */
  const glow = document.getElementById("cursorGlow");
  if (glow && window.matchMedia("(hover: hover)").matches) {
    let gx = innerWidth / 2, gy = innerHeight / 2, tx = gx, ty = gy, raf = null;
    document.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.transform = "translate(" + (gx - 190) + "px," + (gy - 190) + "px)";
      raf = requestAnimationFrame(loop);
    })();
  }

  /* Card 3D tilt */
  if (window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".card, .shot-frame, .tl-body, .step").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "perspective(700px) rotateY(" + (x * 6) + "deg) rotateX(" + (-y * 6) + "deg) translateY(-4px)";
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* Hero parallax — fare ile hafif kayma */
  const hero = document.querySelector(".hero");
  if (hero) {
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / innerWidth - 0.5);
      const y = (e.clientY / innerHeight - 0.5);
      const ph = hero.querySelector(".hero-pheonix");
      const bg = hero.querySelector(".hero-bg");
      if (ph) ph.style.translate = (x * -20) + "px " + (y * -12) + "px";
      if (bg) bg.style.translate = (x * 14) + "px " + (y * 10) + "px";
    });
  }

  /* Reveal-on-scroll — varyasyonlu animasyonlar */
  const staggerParents = [".grid", ".steps", ".spec-grid", ".cmp-grid", ".shots", ".rel"];
  const childSel = ".card, .step, .spec-item, .cmp-item, .shot, .rel";
  const revealEls = document.querySelectorAll(".section-head, .download-card, .faq details, .wiki-toc, .tl-item");
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
    revealEls.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
    /* stagger: parent'a bak, child'lar tek tek gelsin */
    document.querySelectorAll(staggerParents.join(",")).forEach((g) => {
      g.classList.add("stagger");
      io.observe(g);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
    document.querySelectorAll(staggerParents.join(",")).forEach((g) => g.classList.add("in"));
  }

  /* İndirme butonu statısı + sayaç */
  const btn = document.getElementById("downloadBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      const label = btn.querySelector("svg").outerHTML;
      btn.innerHTML = label + " İndirme başlatılıyor…";
      setTimeout(() => {
        btn.innerHTML = label + " ISO'yu İndir";
      }, 2600);
      countDownload();
    });
  }

  /* İndirme sayacı — localStorage tabanlı gerçek sayım */
  function countDownload() {
    try {
      const key = "anka_downloads";
      let n = parseInt(localStorage.getItem(key) || "0", 10);
      localStorage.setItem(key, String(n + 1));
      renderCount();
    } catch (e) {
      /* localStorage kapalıysa sessiz geç */
    }
  }
  function renderCount() {
    const el = document.getElementById("dlCount");
    if (!el) return;
    try {
      const n = parseInt(localStorage.getItem("anka_downloads") || "0", 10);
      el.textContent = n.toLocaleString("tr-TR") + ".";
    } catch (e) {
      el.textContent = "0.";
    }
  }
  renderCount();

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