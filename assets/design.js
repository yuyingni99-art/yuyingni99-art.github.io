(() => {
  const navigation = document.querySelector('.reading-nav');
  if (!navigation) return;
  const links = [...navigation.querySelectorAll('a[href^="#"]')];
  const sections = links.map(link => document.getElementById(link.hash.slice(1)));
  let scheduled = false;
  let currentIndex = -1;

  const update = () => {
    const threshold = window.innerHeight * 0.35;
    let nextIndex = -1;
    sections.forEach((section, index) => {
      if (section && section.getBoundingClientRect().top <= threshold) nextIndex = index;
    });
    if (nextIndex !== currentIndex) {
      links.forEach((link, index) => {
        if (index === nextIndex) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      const activeLink = links[nextIndex];
      const list = navigation.querySelector('ul');
      if (activeLink && list) {
        const activeBounds = activeLink.getBoundingClientRect();
        const listBounds = list.getBoundingClientRect();
        if (activeBounds.left < listBounds.left || activeBounds.right > listBounds.right) {
          list.scrollLeft += activeBounds.left - listBounds.left - 12;
        }
      }
      currentIndex = nextIndex;
    }
    scheduled = false;
  };
  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  window.addEventListener('pageshow', scheduleUpdate);
  update();
})();
