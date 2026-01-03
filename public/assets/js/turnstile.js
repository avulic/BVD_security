let widgetFormId = null;
let widgetPhoneId = null;
let turnstileSolved = false;

function initTurnstile() {
  window.addEventListener("load", () => {
    if (typeof turnstile === "undefined") return;
    renderTurnstiles();
  });
}

function renderTurnstiles() {
  const formEl = document.getElementById("turnstile-form");
  const phoneEl = document.getElementById("turnstile-phone");

  if (!formEl && !phoneEl) return;

  if (formEl) {
    widgetFormId = turnstile.render(formEl, {
      sitekey: "0x4AAAAAACJpcX4KfjbhT0Ma",
      theme: "dark",
      callback: token => onTurnstileSuccess(token, "form"),
    });
  }

  if (phoneEl) {
    widgetPhoneId = turnstile.render(phoneEl, {
      sitekey: "0x4AAAAAACJpcX4KfjbhT0Ma",
      theme: "dark",
      callback: token => onTurnstileSuccess(token, "phone"),
    });
  }
}

function onTurnstileSuccess(token, source) {
  if (turnstileSolved) return;
  turnstileSolved = true;

  if (source === "form" && widgetPhoneId !== null) {
    turnstile.remove(widgetPhoneId);
    const el = document.getElementById("turnstile-phone");
    if (el) el.style.display = "none";
  }

  if (source === "phone" && widgetFormId !== null) {
    turnstile.remove(widgetFormId);
    const el = document.getElementById("turnstile-form");
    if (el) el.style.display = "none";
  }

  fetch("https://late-mud-12c8.antevulic96.workers.dev/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  })
    .then(r => r.json())
    .then(data => {
      ["phone-1-number", "phone-2-number", "email-protected"].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        if (id.includes("email")) {
          // Email handling
          el.innerHTML = data.email;
          //el.href = `mailto:${data.email}`;
        } else {
          // Phone handling
          const phone = data.phone.replace(/\D/g, ""); // digits only
          el.href = `https://api.whatsapp.com/send?phone=${phone}`;
          el.innerHTML = data.phone
        }
        // Hide skeleton loader
        const skeleton = el.nextElementSibling;
        if (skeleton) skeleton.style.display = "none";
      });
      const phone1 = document.getElementById("turnstile-phone-email");
      if (phone1) phone1.style.display = "inline";
    });
}