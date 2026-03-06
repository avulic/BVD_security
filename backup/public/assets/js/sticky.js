function initSticky() {
  const sticky = document.getElementById('sticky-buttons');
  const services = document.getElementById('services');

  if (!sticky || !services) return;

  function checkPosition() {
    const bottom = services.getBoundingClientRect().bottom;
    sticky.classList.toggle('unstick', bottom <= window.innerHeight);
  }

  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', checkPosition);
  checkPosition();
}
