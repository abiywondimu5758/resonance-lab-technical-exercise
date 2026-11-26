const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
const compact = window.matchMedia('(max-width: 1200px)');

// Enhancement only: without this script, every navigation link stays visible.
if (header && toggle && navigation) {
  const label = toggle.querySelector('.menu-label');
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  function setOpen(open, returnFocus = false) {
    toggle.setAttribute('aria-expanded', String(open));
    header.dataset.menuOpen = String(open);
    label.textContent = open ? 'Close' : 'Menu';
    if (returnFocus) toggle.focus();
  }

  function syncLayout() {
    // Do not leave keyboard focus in a navigation region that becomes hidden.
    const focusedLink = navigation.contains(document.activeElement);
    toggle.hidden = !compact.matches;
    setOpen(false, compact.matches && focusedLink);
  }

  toggle.addEventListener('click', () => setOpen(!isOpen()));
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false, true);
      event.preventDefault();
    }
  });

  navigation.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || !compact.matches) return;
    setOpen(false);

    // Focus the destination instead of leaving focus in the now-hidden menu.
    // The browser still performs normal hash navigation.
    const href = link.getAttribute('href');
    if (href.startsWith('#') && href.length > 1) {
      const destination = document.getElementById(href.slice(1));
      if (destination) {
        destination.setAttribute('tabindex', '-1');
        destination.focus({ preventScroll: true });
      }
    }
  });

  document.addEventListener('pointerdown', event => {
    if (isOpen() && !header.contains(event.target)) setOpen(false);
  });
  header.addEventListener('focusout', event => {
    if (isOpen() && event.relatedTarget && !header.contains(event.relatedTarget)) setOpen(false);
  });
  compact.addEventListener('change', syncLayout);
  header.classList.add('navigation-ready');
  syncLayout();
}
