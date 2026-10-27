(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    document.documentElement.classList.add('source-effects');
    const images = document.querySelectorAll('.img-load img');
    images.forEach(image => {
      const markLoaded = () => window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => image.closest('.img-load').classList.add('loaded'));
      });
      if (image.complete) markLoaded();
      image.addEventListener('load', markLoaded, { once: true });
      image.addEventListener('error', markLoaded, { once: true });
    });
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('acted');
          observer.unobserve(entry.target);
        });
      });
      document.querySelectorAll('.case__head, .timeline > li, .about__intro').forEach(element => {
        element.classList.add('act');
        observer.observe(element);
      });
    }
  }

})();
