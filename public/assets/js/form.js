function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;

    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Šaljem...';

    try {
      const formData = new FormData(form);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const json = await response.json();

      if (json.success) {
        const modal = document.getElementById('thank-you-modal');
        if (modal) modal.classList.remove('hidden');
        form.reset();
      } else {
        alert(json.message || 'Došlo je do greške pri slanju.');
      }
    } catch {
      alert('Greška pri slanju. Molimo pokušajte kasnije.');
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
}
