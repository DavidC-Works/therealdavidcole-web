document.addEventListener("DOMContentLoaded", () => {
  const starfield = document.getElementById("starfield");
  if (!starfield) return;

  const zoneData = document.body.dataset.starZones;
  if (!zoneData) return;

  const zones = zoneData.split(",").map(pair => {
    const [x, y] = pair.split("x");
    const [xMin, xMax] = x.split("-").map(Number);
    const [yMin, yMax] = y.split("-").map(Number);
    return { xMin, xMax, yMin, yMax };
  });

  const isAllowed = (x, y) =>
    zones.some(({ xMin, xMax, yMin, yMax }) =>
      x >= xMin && x <= xMax && y >= yMin && y <= yMax
    );

  const starCount = 60;
  let generated = 0;

  while (generated < starCount) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    if (!isAllowed(x, y)) continue;

    const star = document.createElement("span");
    star.classList.add("star");
    star.style.top = `${y}%`;
    star.style.left = `${x}%`;
    const size = (Math.random() * 3 + 1).toFixed(1);
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${(Math.random() * 8).toFixed(1)}s`;
    star.style.opacity = "0";
    starfield.appendChild(star);
    generated++;
  }

  // Fade in stars after paint
  requestAnimationFrame(() => {
    starfield.querySelectorAll(".star").forEach(star => {
      star.style.transition = "opacity 1s ease";
      star.style.opacity = "0.4";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".copy-email").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      const email = el.dataset.email;
      navigator.clipboard.writeText(email).then(() => {
        const msg = el.nextElementSibling;
        if (msg && msg.classList.contains("emailCopied")) {
          msg.classList.remove("hidden");
          setTimeout(() => msg.classList.add("hidden"), 1500);
        }
      }).catch(err => console.error("Clipboard error:", err));
    });
  });
});

