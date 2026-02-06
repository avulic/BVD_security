/**
 * PRODUCTION READY SINGLETON TURNSTILE
 */
const CONFIG = {
    SITE_KEY: "0x4AAAAAACJpcX4KfjbhT0Ma",
    API_URL: "https://late-mud-12c8.antevulic96.workers.dev/",
    TURNSTILE_IDS: ["turnstile-phone", "turnstile-modal"],
    UI: {
        MODAL_WRAP: "turnstile-phone-email",
        CARD_PHONE: "phone-2-container",
        CARD_EMAIL: "email-protected"
    }
};

let isSolved = false;
let renderedWidgets = new Set(); // Tracks which IDs are already rendered

function initTurnstile() {
    // We use a small interval to ensure the Cloudstile API is ready
    const checkReady = setInterval(() => {
        if (typeof turnstile !== "undefined") {
            clearInterval(checkReady);
            renderAll();
        }
    }, 100);
}

function renderAll() {
    CONFIG.TURNSTILE_IDS.forEach(id => {
        const container = document.getElementById(id);
        
        // CRITICAL: Only render if container exists AND isn't already rendered
        if (container && !renderedWidgets.has(id)) {
            // Clear container first to prevent stacking
            container.innerHTML = '<p class="text-[10px] text-gray-400 mb-1 uppercase tracking-widest">Verifikacija podataka:</p>';
            
            turnstile.render(container, {
                sitekey: CONFIG.SITE_KEY,
                theme: "dark",
                callback: (token) => handleGlobalSuccess(token)
            });
            
            renderedWidgets.add(id);
        }
    });
}

async function handleGlobalSuccess(token) {
    if (isSolved) return;
    isSolved = true;

    // 1. Hide all widget containers immediately
    CONFIG.TURNSTILE_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });

    try {
        const response = await fetch(CONFIG.API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
        });
        
        const data = await response.json();
        if (data) revealData(data);
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

function revealData(data) {
    const cleanPhone = data.phone.replace(/\D/g, "");

    // Update Modal
    const modal = document.getElementById(CONFIG.UI.MODAL_WRAP);
    if (modal) {
        modal.classList.remove("hidden");
        const mLink = modal.querySelector(".phone-1-number");
        if (mLink) {
            mLink.href = `https://api.whatsapp.com/send?phone=${cleanPhone}`;
            mLink.textContent = data.phone;
        }
    }

    // Update Card Phone
    updateField(CONFIG.UI.CARD_PHONE, `https://api.whatsapp.com/send?phone=${cleanPhone}`, data.phone);
    
    // Update Card Email
    updateField(CONFIG.UI.CARD_EMAIL, `mailto:${data.email}`, data.email);
}

function updateField(containerId, href, text) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const link = container.querySelector("a");
    const loader = container.querySelector(".secure-blur");
    if (link) {
        link.href = href;
        link.textContent = text;
        link.style.display = "block";
    }
    if (loader) loader.style.display = "none";
}

// Start
initTurnstile();