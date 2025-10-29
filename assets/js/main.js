(function() {
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // Persisted dark mode
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
  if (isDark) document.documentElement.classList.add('dark');

  const themeBtn = $('#theme-toggle');
  themeBtn && themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const mode = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
  });

  // Mobile menu
  const menuBtn = $('#menu-toggle');
  const nav = $('#site-nav');
  menuBtn && menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Footer year
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();

  // Contact form (basic demo handling)
  const form = $('#contact-form');
  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Thanks! Your message has been received. I'll get back to you soon.");
    form.reset();
  });

  // Simple courses search filter
  const search = $('#course-search');
  if (search) {
    const items = $$('.course-item');
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase();
      items.forEach(li => {
        const text = li.textContent.toLowerCase();
        li.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  // Highlight current nav item (fallback)
  const page = document.body.dataset.page;
  if (page) {
    $$('#site-nav a').forEach(a => {
      if (a.getAttribute('href').includes(page)) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }
})();
