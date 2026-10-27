// 首页导航：滚动到哪个区块，就给对应链接加上 aria-current。没有脚本时页面照常可用。
(() => {
  const links = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  const linkFor = new Map();
  const hero = document.querySelector('.hero');
  if (hero) linkFor.set(hero, null);
  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) linkFor.set(section, link);
  });

  const setCurrent = (current) => {
    links.forEach((link) => {
      if (link === current) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  // 只观察视口中部的一条窄带，避免两个区块同时“命中”
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setCurrent(linkFor.get(entry.target));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  linkFor.forEach((_, section) => observer.observe(section));
})();
