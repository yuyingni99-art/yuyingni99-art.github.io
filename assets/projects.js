(() => {
  document.querySelectorAll('[data-screenshot-gallery]').forEach(gallery => {
    const buttons = [...gallery.querySelectorAll('[data-screenshot-target]')];
    const panels = [...gallery.querySelectorAll('[data-screenshot-panel]')];
    const select = target => {
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.screenshotTarget === target)));
      panels.forEach(panel => { panel.hidden = panel.id !== target; });
    };
    buttons.forEach(button => button.addEventListener('click', () => select(button.dataset.screenshotTarget)));
    if (buttons.length) {
      select(buttons[0].dataset.screenshotTarget);
      gallery.querySelector('.screenshot-switch').hidden = false;
    }
  });

  const directory = document.querySelector('.page-hero');
  const returnLink = document.querySelector('.project-return');
  const navigation = document.querySelector('.reading-nav');
  const header = document.querySelector('.site-header');
  if (!directory || (!returnLink && !navigation)) return;
  const directoryContent = directory.querySelector('.toc') || directory;
  if (navigation) navigation.classList.add('is-scroll-controlled');

  let scheduled = false;
  const update = () => {
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const directoryScrolled = directoryContent.getBoundingClientRect().bottom <= headerHeight;
    if (returnLink) returnLink.hidden = !directoryScrolled;
    if (navigation) navigation.classList.toggle('is-visible', directoryScrolled);
    scheduled = false;
  };
  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('pageshow', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  update();
})();
