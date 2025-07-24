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

// Inject Vercel Analytics tracking script dynamically
// Vercel Analytics
const vaTag = document.createElement("script");
vaTag.innerHTML = `window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`;
document.head.appendChild(vaTag);

const analyticsScript = document.createElement("script");
analyticsScript.defer = true;
analyticsScript.src = "/_vercel/insights/script.js";
document.head.appendChild(analyticsScript);

// Vercel Speed Insights (optional)
const siTag = document.createElement("script");
siTag.innerHTML = `window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };`;
document.head.appendChild(siTag);

const speedScript = document.createElement("script");
speedScript.defer = true;
speedScript.src = "/_vercel/speed-insights/script.js";
document.head.appendChild(speedScript);


//Launching Page Hover Feature
document.addEventListener("DOMContentLoaded", () => {
  const starfield = document.getElementById("starfield");
  const pieSlices = document.querySelectorAll(".pie-slice");
  const body = document.body;

  if (!starfield || !pieSlices.length) return; // Skip if not on landing page

  const bgClasses = ["cover-bg", "career-bg", "resume-bg"];

  function generateStars(zoneStr) {
    starfield.innerHTML = "";
    const zones = zoneStr.split(",").map(pair => {
      const [x, y] = pair.split("x");
      const [xMin, xMax] = x.split("-").map(Number);
      const [yMin, yMax] = y.split("-").map(Number);
      return { xMin, xMax, yMin, yMax };
    });

    let count = 0;
    while (count < 40) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const allowed = zones.some(z => x >= z.xMin && x <= z.xMax && y >= z.yMin && y <= z.yMax);
      if (!allowed) continue;

      const star = document.createElement("span");
      star.className = "star";
      star.style.top = `${y}%`;
      star.style.left = `${x}%`;
      star.style.width = star.style.height = `${(Math.random() * 2 + 1).toFixed(1)}px`;
      star.style.animationDelay = `${(Math.random() * 6).toFixed(1)}s`;
      starfield.appendChild(star);
      count++;
    }
  }

  pieSlices.forEach(slice => {
    const bgClass = slice.dataset.bg;
    const zones = slice.dataset.zones;

    slice.addEventListener("mouseenter", () => {
      body.classList.remove(...bgClasses);
      body.classList.add(bgClass);
      if (zones) generateStars(zones);
    });

    slice.addEventListener("mouseleave", () => {
      body.classList.remove(...bgClasses);
      body.classList.add("landingBackground");
      starfield.innerHTML = "";
    });
  });
});
