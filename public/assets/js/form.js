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
      formData.delete('cf-turnstile-response');
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const json = await response.json();

      if (json.success) {
        const clientModal = document.getElementById('client-modal');
        if (clientModal) {
          clientModal.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }

        const modal = document.getElementById('thank-you-modal');
        if (modal) modal.classList.remove('hidden');
        form.reset();
      } else {
        const clientModal = document.getElementById('client-modal');
        if (clientModal) {
          clientModal.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        }

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
