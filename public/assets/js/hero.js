function initHero() {
  // 1. Get the visible elements (targets)
  const heading = document.getElementById("hero-heading");
  const heading_small = document.getElementById("hero-heading-small");
  const subtitle = document.getElementById("hero-subtitle");
  
  // 2. Extract the text from the hidden elements (sources)
  const textHeading = document.getElementById("src-heading")?.textContent || "";
  const textSmall = document.getElementById("src-heading-small")?.textContent || "";
  const textSubtitle = document.getElementById("src-subtitle")?.textContent || "";

  const paragraph = document.getElementById("hero-paragraph");
  const link = document.getElementById("hero-link");

  if (!heading || !heading_small || !subtitle) return;

  function typeWriter(el, text, speed, cb) {
    let i = 0;
    el.textContent = "";
    const cursor = document.createElement("span");
    cursor.textContent = "|";
    cursor.classList.add("text-yellow-500", "animate-pulse");
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

  // Sequence using the extracted text
  typeWriter(heading, textHeading, 100, () => {
    typeWriter(heading_small, textSmall, 100, () => {
      typeWriter(subtitle, textSubtitle, 60, () => {
        // Show paragraph and link after typing finishes
        if (paragraph) paragraph.classList.replace("opacity-0", "opacity-100");
        if (link) link.classList.replace("opacity-0", "opacity-100");
      });
    });
  });
}

