function initModals() {
  // 1. Select all triggers and their respective modals
  const clientBtns = document.querySelectorAll('.client-modal-btn, #email-protected');
  const clientModal = document.getElementById('client-modal');

  const recruitBtns = document.querySelectorAll('.recruit-modal-btn');
  const recruitModal = document.getElementById('recruit-modal');

  // Helper function to open a modal
  const openModal = (targetModal) => {
    if (targetModal) {
      targetModal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  };

  // Helper function to close a modal
  const closeModal = (targetModal) => {
    if (targetModal) {
      targetModal.classList.add('hidden');
      // Only remove overflow-hidden if no other modals are open
      const anyVisible = document.querySelector('.modal:not(.hidden)');
      if (!anyVisible) {
        document.body.classList.remove('overflow-hidden');
      }
    }
  };

  // 2. Attach Listeners for Client Modal
  clientBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent jump if it's an <a> tag
      openModal(clientModal);
      document.getElementsByTagName("html")[0].style.overflow = "hidden"
    });
  });

  // 3. Attach Listeners for Recruit Modal (The missing part)
  recruitBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(recruitModal);
      document.getElementsByTagName("html")[0].style.overflow = "hidden"

    });
  });

  // 4. Global Close Logic (X buttons)
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      closeModal(modal);
      document.getElementsByTagName("html")[0].style.removeProperty("overflow")
    });
  });

  // 5. Click Outside to Close
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      document.getElementsByTagName("html")[0].style.removeProperty("overflow")

      }
    });
  });
}

// Function for the Thank You modal specifically
function closeThankYou() {
  const thankYouModal = document.getElementById('thank-you-modal');
  if (thankYouModal) {
    thankYouModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}