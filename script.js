/* ==========================================================
   PRIME HOUSE – script.js (Vanilla ES6+)
   1. Data  2. Helpers  3. Navbar  4. Reveal  5. Menu
   6. Lightbox  7. Reservation form  8. Misc
   ========================================================== */
(() => {
  'use strict';

  /* ---------- 1. DATA ---------- */
  const IMG = (id, w = 600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

  const CATEGORIES = [
    { id: 'steaks', label: 'Signature Steaks' },
    { id: 'burgers', label: 'Premium Burgers' },
    { id: 'starters', label: 'Starters & Sides' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'drinks', label: 'Drinks' }
  ];

  // Sample menu data (prices in EGP). Edit freely.
  const MENU = [
    { cat: 'steaks', name: 'Premium Ribeye', desc: '300g marbled ribeye, garlic thyme butter.', price: 1450, img: 'photo-1558030006-450675393462' },
    { cat: 'steaks', name: 'Filet Mignon', desc: '220g center-cut filet, red wine jus.', price: 1650, img: 'photo-1600565193348-f74bd3c7ccdf' },
    { cat: 'steaks', name: 'T-Bone Steak', desc: '450g strip and filet grilled on the bone.', price: 1850, img: 'photo-1546964124-0cce460f38ef' },
    { cat: 'steaks', name: 'New York Strip', desc: '280g strip loin with peppercorn sauce.', price: 1300, img: 'photo-1600891964092-4316c288032e' },
    { cat: 'steaks', name: 'Grilled Tenderloin', desc: 'Sliced tenderloin with roasted vegetables.', price: 1350, img: 'photo-1432139555190-58524dae6a55' },
    { cat: 'steaks', name: 'Tomahawk for Two', desc: '1kg bone-in ribeye, served sliced.', price: 3600, img: 'photo-1544025162-d76694265947' },

    { cat: 'burgers', name: 'Prime Classic Burger', desc: 'Beef patty, cheddar, pickles, house sauce.', price: 420, img: 'photo-1568901346375-23c9450c58cd' },
    { cat: 'burgers', name: 'Truffle Mushroom Burger', desc: 'Sautéed mushrooms, swiss cheese, truffle mayo.', price: 520, img: 'photo-1550547660-d9450f859349' },
    { cat: 'burgers', name: 'Smoky BBQ Burger', desc: 'Crispy onions, smoked sauce, double cheddar.', price: 480, img: 'photo-1553979459-d2229ba7433b' },
    { cat: 'burgers', name: 'Steakhouse Double', desc: 'Two patties, caramelized onions, special sauce.', price: 590, img: 'photo-1586190848861-99aa4a171e90' },

    { cat: 'starters', name: 'Caesar Salad', desc: 'Romaine, parmesan, croutons, classic dressing.', price: 260, img: 'photo-1550304943-4f24f54ddde9' },
    { cat: 'starters', name: 'Crispy Calamari', desc: 'Lightly fried, served with lemon aioli.', price: 340, img: 'photo-1604909052743-94e838986d24' },
    { cat: 'starters', name: 'Truffle Fries', desc: 'Hand-cut fries, parmesan, truffle oil.', price: 190, img: 'photo-1573080496219-bb080dd4f877' },
    { cat: 'starters', name: 'Creamy Mashed Potato', desc: 'Buttery mash with chives.', price: 140, img: 'photo-1568600891621-50f697b9a1f0' },
    { cat: 'starters', name: 'Grilled Vegetables', desc: 'Seasonal vegetables with olive oil and herbs.', price: 160, img: 'photo-1540420773420-3366772f4999' },

    { cat: 'desserts', name: 'Chocolate Fondant', desc: 'Warm molten center with vanilla ice cream.', price: 230, img: 'photo-1624353365286-3f8d62daad51' },
    { cat: 'desserts', name: 'Classic Cheesecake', desc: 'New York style with berry compote.', price: 210, img: 'photo-1533134242443-d4fd215305ad' },
    { cat: 'desserts', name: 'Crème Brûlée', desc: 'Vanilla custard with a caramelized top.', price: 220, img: 'photo-1470124182917-cc6e71b22ecc' },
    { cat: 'desserts', name: 'Sticky Toffee Pudding', desc: 'Date sponge with warm toffee sauce.', price: 200, img: 'photo-1551024601-bec78aea704b' },

    { cat: 'drinks', name: 'Fresh Lemon Mint', desc: 'Freshly squeezed lemon with mint.', price: 90, img: 'photo-1513558161293-cdaf765ed2fd' },
    { cat: 'drinks', name: 'Iced Latte', desc: 'Espresso, cold milk and ice.', price: 110, img: 'photo-1461023058943-07fcbe16d735' },
    { cat: 'drinks', name: 'Sparkling Water', desc: 'Chilled 750ml bottle.', price: 85, img: 'photo-1523362628745-0c100150b504' },
    { cat: 'drinks', name: 'Mocktail of the Day', desc: 'Seasonal fruit, soda and herbs.', price: 140, img: 'photo-1470337458703-46ad1756a187' }
  ];

  /* ---------- 2. HELPERS ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const formatPrice = n => `EGP ${n.toLocaleString('en-US')}`;
  const escapeHTML = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Inline SVG shown when any image fails to load, so layouts never break
  const FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E6D5BF"/><stop offset="1" stop-color="#B68A63"/></linearGradient></defs>' +
    '<rect width="600" height="450" fill="url(#g)"/>' +
    '<text x="300" y="235" text-anchor="middle" font-family="Georgia,serif" font-size="34" letter-spacing="6" fill="#38271E">PRIME HOUSE</text></svg>'
  );
  const applyFallback = img => {
    if (img.dataset.fallback) return;
    img.dataset.fallback = '1';
    img.src = FALLBACK;
    img.classList.add('img-fallback');
  };
  // 'error' doesn't bubble, so listen in the capture phase
  document.addEventListener('error', e => { if (e.target.tagName === 'IMG') applyFallback(e.target); }, true);
  // Catch images that already failed before this script attached the listener
  window.addEventListener('load', () => {
    $$('img').forEach(img => { if (img.complete && img.currentSrc && img.naturalWidth === 0) applyFallback(img); });
  });

  /* ---------- 3. NAVBAR ---------- */
  const navbar = $('#navbar');
  const nav = $('#nav');
  const navToggle = $('#navToggle');
  const toTop = $('#toTop');

  const setMenu = open => {
    nav.classList.toggle('is-open', open);
    navbar.classList.toggle('menu-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('no-scroll', open);
  };
  navToggle.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    setMenu(open);
    if (open) $('.nav__link', nav).focus({ preventScroll: true });
  });
  // Close the mobile menu after a link is chosen
  $$('a', nav).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); navToggle.focus(); }
  });
  window.addEventListener('resize', () => { if (window.innerWidth >= 992) setMenu(false); });

  // Solid navbar + back-to-top visibility on scroll
  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 40);
    toTop.classList.toggle('is-visible', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  // Highlight the nav link for the section in view.
  // Signature Dishes belongs to "Menu"; the reservation section has no link (CTA button).
  const navLinks = $$('.nav__link');
  const spyTarget = { signature: '#menu', reservation: null };
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        const href = id in spyTarget ? spyTarget[id] : `#${id}`;
        navLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === href));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section[id]').forEach(s => spy.observe(s));
  }

  /* ---------- 4. SCROLL REVEAL ---------- */
  const revealEls = $$('.reveal, .fade-in');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- 5. MENU + FILTERS ---------- */
  const filtersWrap = $('#menuFilters');
  const menuGrid = $('#menuGrid');
  const menuStatus = $('#menuStatus');
  let activeCat = CATEGORIES[0].id;

  const renderFilters = () => {
    filtersWrap.innerHTML = CATEGORIES.map(c =>
      `<button type="button" class="filter-btn${c.id === activeCat ? ' is-active' : ''}" aria-pressed="${c.id === activeCat}" data-cat="${c.id}">${escapeHTML(c.label)}</button>`
    ).join('');
  };

  const renderMenu = announce => {
    const items = MENU.filter(i => i.cat === activeCat);
    menuGrid.innerHTML = items.map((item, idx) => `
      <article class="card menu-item" style="animation-delay:${idx * 60}ms">
        <div class="card__media"><img src="${IMG(item.img)}" alt="${escapeHTML(item.name)}" loading="lazy" width="600" height="400"></div>
        <div class="card__body">
          <div class="menu-item__top"><h3 class="card__title">${escapeHTML(item.name)}</h3><p class="price">${formatPrice(item.price)}</p></div>
          <p class="card__text">${escapeHTML(item.desc)}</p>
        </div>
      </article>`).join('');
    if (announce) {
      const label = CATEGORIES.find(c => c.id === activeCat).label;
      menuStatus.textContent = `Showing ${items.length} items in ${label}`;
    }
  };

  filtersWrap.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn || btn.dataset.cat === activeCat) return;
    activeCat = btn.dataset.cat;
    $$('.filter-btn', filtersWrap).forEach(b => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    renderMenu(true);
  });
  renderFilters();
  renderMenu(false);

  /* ---------- 6. GALLERY LIGHTBOX ---------- */
  const lightbox = $('#lightbox');
  const lbImg = $('#lbImg');
  const lbCaption = $('#lbCaption');
  const galleryItems = $$('.gallery__item');
  let lbIndex = 0;
  let lastFocus = null;

  const showLb = i => {
    lbIndex = (i + galleryItems.length) % galleryItems.length;
    const item = galleryItems[lbIndex];
    delete lbImg.dataset.fallback;       // allow the fallback again for the new image
    lbImg.classList.remove('img-fallback');
    lbImg.src = item.dataset.full;
    lbImg.alt = $('img', item).alt;
    lbCaption.textContent = item.dataset.caption || '';
  };
  const openLb = i => {
    lastFocus = document.activeElement;
    showLb(i);
    lightbox.hidden = false;
    document.body.classList.add('no-scroll');
    $('#lbClose').focus();
  };
  const closeLb = () => {
    lightbox.hidden = true;
    document.body.classList.remove('no-scroll');
    if (lastFocus) lastFocus.focus();
  };

  galleryItems.forEach((item, i) => item.addEventListener('click', () => openLb(i)));
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', () => showLb(lbIndex - 1));
  $('#lbNext').addEventListener('click', () => showLb(lbIndex + 1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
  document.addEventListener('keydown', e => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
    if (e.key === 'ArrowRight') showLb(lbIndex + 1);
    // Keep keyboard focus inside the dialog
    if (e.key === 'Tab') {
      const f = $$('button', lightbox);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- 7. RESERVATION FORM ---------- */
  const form = $('#reservationForm');
  const success = $('#formSuccess');
  const dateInput = $('#date');
  const timeSelect = $('#time');
  const guestsSelect = $('#guests');

  const pad = n => String(n).padStart(2, '0');
  const toISODate = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  // Time slots (12:00 PM – 11:30 PM, every 30 min), matching the opening hours
  const slots = [];
  for (let h = 12; h <= 23; h++) [0, 30].forEach(m => slots.push({ h, m }));
  const slotLabel = ({ h, m }) => `${((h + 11) % 12) + 1}:${pad(m)} ${h >= 12 ? 'PM' : 'AM'}`;

  // Rebuild the time list; for today, hide slots that have already passed
  const renderTimes = () => {
    const now = new Date();
    const isToday = dateInput.value === toISODate(now);
    const keep = timeSelect.value;
    const available = slots.filter(s => !isToday || s.h * 60 + s.m > now.getHours() * 60 + now.getMinutes());
    const placeholder = available.length ? 'Select time' : 'No slots left today – pick another date';
    timeSelect.innerHTML = `<option value="">${placeholder}</option>` +
      available.map(s => `<option value="${pad(s.h)}:${pad(s.m)}">${slotLabel(s)}</option>`).join('');
    if ([...timeSelect.options].some(o => o.value === keep)) timeSelect.value = keep;
  };

  guestsSelect.innerHTML = '<option value="">Select</option>' +
    Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1} ${i ? 'guests' : 'guest'}</option>`).join('');

  dateInput.min = toISODate(new Date()); // prevents picking past dates in the date picker
  renderTimes();
  dateInput.addEventListener('change', renderTimes);

  const validators = {
    fullName: v => v.trim().length < 2 ? 'Please enter your full name.' : '',
    phone: v => {
      const digits = v.replace(/\D/g, '');
      if (!v.trim()) return 'Please enter your phone number.';
      if (!/^\+?[\d\s\-()]+$/.test(v.trim()) || digits.length < 8 || digits.length > 15) return 'Enter a valid phone number (8–15 digits).';
      return '';
    },
    email: v => {
      if (!v.trim()) return 'Please enter your email address.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter a valid email address.';
    },
    date: v => {
      if (!v) return 'Please choose a reservation date.';
      const picked = new Date(`${v}T00:00:00`);
      const today = new Date(); today.setHours(0, 0, 0, 0);
      return picked < today ? 'Reservation date cannot be in the past.' : '';
    },
    time: v => v ? '' : 'Please select a time.',
    guests: v => v ? '' : 'Please select the number of guests.'
  };
  const fieldNames = Object.keys(validators);

  const setError = (name, msg) => {
    const input = form.elements[name];
    $(`#${name}-error`).textContent = msg;
    input.closest('.field').classList.toggle('has-error', Boolean(msg));
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  };
  const validateField = name => setError(name, validators[name](form.elements[name].value));

  fieldNames.forEach(name => {
    const el = form.elements[name];
    const recheck = () => { if (el.closest('.field').classList.contains('has-error')) validateField(name); };
    el.addEventListener('blur', () => validateField(name));
    el.addEventListener('input', recheck);
    el.addEventListener('change', recheck);
  });
  // Changing the date can change the time list, so re-check time too
  dateInput.addEventListener('change', () => { if (form.elements.time.closest('.field').classList.contains('has-error')) validateField('time'); });

  form.addEventListener('submit', e => {
    e.preventDefault();
    success.hidden = true;
    const results = fieldNames.map(n => validateField(n));
    if (results.includes(false)) {
      form.elements[fieldNames[results.indexOf(false)]].focus();
      return;
    }
    const firstName = form.elements.fullName.value.trim().split(/\s+/)[0];
    const dateText = new Date(`${form.elements.date.value}T00:00:00`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const timeText = timeSelect.options[timeSelect.selectedIndex].text;
    const guests = form.elements.guests.value;
    // textContent (not innerHTML) so user input is never parsed as HTML
    success.textContent = `Thank you, ${firstName}! This is a frontend demonstration only: no real booking has been created, and nothing was sent or stored. (Details entered: ${dateText} at ${timeText}, ${guests} ${guests === '1' ? 'guest' : 'guests'}.)`;
    success.hidden = false;
    form.reset();
    renderTimes();
    fieldNames.forEach(n => setError(n, ''));
    success.focus();
  });

  // "Reserve This Offer" buttons pre-fill the special-requests box
  $$('[data-offer]').forEach(a => a.addEventListener('click', () => {
    const note = `Interested in: ${a.dataset.offer} (demo offer)`;
    const box = form.elements.requests;
    if (!box.value.includes(note)) box.value = box.value ? `${note}\n${box.value}` : note;
  }));

  /* ---------- 8. MISC ---------- */
  $('#year').textContent = new Date().getFullYear();

  // Placeholder social links are not real accounts – tell the visitor instead of navigating
  const toast = $('#toast');
  let toastTimer;
  $$('[data-demo-link]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    toast.textContent = 'Demo placeholder: this is not an active social media account.';
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 3200);
  }));
})();
