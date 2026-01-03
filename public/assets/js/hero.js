function initHero() {
  const heading = document.getElementById("hero-heading");
  const subtitle = document.getElementById("hero-subtitle");
  const paragraph = document.getElementById("hero-paragraph");
  const link = document.getElementById("hero-link");

  if (!heading || !subtitle) return;

  function typeWriter(el, text, speed, cb) {
    let i = 0;
    el.textContent = "";
    const cursor = document.createElement("span");
    cursor.textContent = "|";
    cursor.classList.add("text-yellow-500");
    el.appendChild(cursor);

    const typing = setInterval(() => {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i++]), cursor);
      } else {
        clearInterval(typing);
        cursor.remove();
        if (cb) cb();
      }
    }, speed);
  }

  typeWriter(heading, "B.V.D", 150, () => {
    typeWriter(subtitle, "Sigurnost u svakom trenutku", 80, () => {
      if (paragraph) paragraph.classList.add("opacity-100");
      if (link) link.classList.add("opacity-100");
    });
  });
}
