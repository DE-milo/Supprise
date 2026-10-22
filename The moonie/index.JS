document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".Button");
  const cover = document.querySelector(".Cover");
  const surprise = document.querySelector(".Suprise");
  const audio = document.getElementById("audio");
  const form = cover.querySelector("form");
 
  // Stop the form from ever reloading the page
  form.addEventListener("submit", (e) => e.preventDefault());
 
  // Each image wrapper div (.1 to .7) becomes a bouncing item
  const items = Array.from(surprise.querySelectorAll("div")).map((el) => ({
    el,
    x: 0,
    y: 0,
    vx: (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 3),
    vy: (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 3),
  }));
 
  function startBouncing() {
    items.forEach((item) => {
      const s = item.el.style;
      s.position = "fixed";
      s.margin = "0";
      s.zIndex = "1";
      s.willChange = "transform";
      s.left = "0";
      s.top = "0";
 
      const w = item.el.offsetWidth || 150;
      const h = item.el.offsetHeight || 150;
      item.x = Math.random() * Math.max(window.innerWidth - w, 1);
      item.y = Math.random() * Math.max(window.innerHeight - h, 1);
    });
 
    function animate() {
      const maxW = window.innerWidth;
      const maxH = window.innerHeight;
 
      items.forEach((item) => {
        const w = item.el.offsetWidth || 150;
        const h = item.el.offsetHeight || 150;
 
        item.x += item.vx;
        item.y += item.vy;
 
        if (item.x <= 0) { item.x = 0; item.vx *= -1; }
        else if (item.x + w >= maxW) { item.x = maxW - w; item.vx *= -1; }
 
        if (item.y <= 0) { item.y = 0; item.vy *= -1; }
        else if (item.y + h >= maxH) { item.y = maxH - h; item.vy *= -1; }
 
        item.el.style.transform = `translate(${item.x}px, ${item.y}px)`;
      });
 
      requestAnimationFrame(animate);
    }
 
    requestAnimationFrame(animate);
  }
 
  button.addEventListener("click", () => {
    // Hide the cover
    cover.style.display = "none";
 
    // Show the surprise as a full-screen black stage
    Object.assign(surprise.style, {
      display: "block",
      position: "fixed",
      inset: "0",
      background: "#000",
      overflow: "hidden",
    });
 
    // Keep the birthday text centered on top, not blocking anything
    surprise.querySelectorAll(":scope > p").forEach((p) => {
      Object.assign(p.style, {
        position: "relative",
        zIndex: "10",
        color: "#fff",
        textAlign: "center",
        fontSize: "2rem",
        margin: "0.5rem 0",
        pointerEvents: "none",
      });
    });
 
    // Play audio on a user click (browsers block autoplay otherwise)
    audio.loop = true;
    audio.currentTime = 0;
    audio.play().catch((err) => console.error("Audio failed:", err));
 
    startBouncing();
  });
});
