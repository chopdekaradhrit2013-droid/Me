(() => {
  const MAX = 7200;
  const SECTIONS = {
    hero: 0,
    about: 0.16,
    work: 0.34,
    skills: 0.62,
    contact: 0.80,
  };

  const lines = [
    "Building things people actually open.",
    "Study tools. Browser games. Cinematic sites.",
    "Shipped from a browser. Made to feel expensive.",
  ];

  const spacer = document.getElementById("scroll-spacer");
  spacer.style.height = `calc(${MAX}px + 100vh)`;

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  const loader = document.getElementById("loader");
  const fill = document.getElementById("loader-fill");
  const num = document.getElementById("loader-num");
  const photo = document.getElementById("hero-photo");
  const img = new Image();
  img.src = "./hero.jpg";

  let loaded = 0;
  const tickLoad = (p) => {
    loaded = Math.max(loaded, p);
    fill.style.width = loaded + "%";
    num.textContent = Math.round(loaded);
  };

  let fake = 0;
  const fakeTimer = setInterval(() => {
    fake = Math.min(92, fake + Math.random() * 11);
    if (!img.complete) tickLoad(fake);
  }, 90);

  img.onload = img.onerror = () => {
    clearInterval(fakeTimer);
    tickLoad(100);
    setTimeout(() => loader.classList.add("done"), 280);
  };

  const panels = [...document.querySelectorAll(".panel")];
  let target = 0;
  let current = 0;
  let raf = 0;

  function opacityFor(p, start, end, fade = 0.04) {
    if (p < start || p > end) return 0;
    if (p < start + fade) return 0.5 - 0.5 * Math.cos(((p - start) / fade) * Math.PI);
    if (end < 1 && p > end - fade) return 0.5 - 0.5 * Math.cos(((end - p) / fade) * Math.PI);
    return 1;
  }

  function apply(p) {
    photo.style.transform = `scale(${1 + p * 0.08}) translate3d(0, ${p * -18}px, 0)`;
    panels.forEach((el) => {
      const start = +el.dataset.start;
      const end = +el.dataset.end;
      const t = opacityFor(p, start, end);
      el.style.opacity = String(t);
      el.style.visibility = t === 0 ? "hidden" : "visible";
      el.style.transform = `translate3d(0, ${(1 - t) * 22}px, 0)`;
      el.style.pointerEvents = t < 0.12 ? "none" : "auto";
    });
  }

  function loop() {
    const k = innerWidth <= 768 ? 0.2 : 0.11;
    current += (target - current) * k;
    apply(current);
    raf = requestAnimationFrame(loop);
  }

  addEventListener("scroll", () => {
    target = Math.min(Math.max(scrollY / MAX, 0), 1);
  }, { passive: true });

  apply(0);
  raf = requestAnimationFrame(loop);

  function go(key) {
    const p = typeof key === "number" ? key : (SECTIONS[key] ?? 0);
    const mid = key === "hero" ? 0 : key === "contact" ? 1 : p + 0.06;
    scrollTo({ top: mid * MAX, behavior: "smooth" });
  }

  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => go(btn.dataset.go));
  });

  const typed = document.getElementById("typed");
  let li = 0, ci = 0, del = false;
  function type() {
    const line = lines[li];
    typed.textContent = line.slice(0, ci);
    if (!del && ci < line.length) {
      ci++;
      setTimeout(type, 42);
    } else if (!del && ci === line.length) {
      del = true;
      setTimeout(type, 1600);
    } else if (del && ci > 0) {
      ci--;
      setTimeout(type, 22);
    } else {
      del = false;
      li = (li + 1) % lines.length;
      setTimeout(type, 240);
    }
  }
  type();
})();
