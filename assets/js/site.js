/* Grace Noodle: site behavior (cart, showcase, menu, pickup ordering). Vanilla JS, no libraries. */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MENU = window.AKIDA_MENU || [];
  var PLATES = window.AKIDA_PLATES || [];
  var HOURS = window.AKIDA_HOURS || {};
  var PHONE = '(804) 855-0495';

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function money(n) { return '$' + n.toFixed(2); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var ITEMS = {}, CAT_OF = {};
  MENU.forEach(function (c) { c.items.forEach(function (i) { ITEMS[i.id] = i; CAT_OF[i.id] = c; }); });
  var PLATE_OF = {};
  PLATES.forEach(function (p) { PLATE_OF[p.item] = p.img; });
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var base = (document.body.getAttribute('data-base') || '');

  /* ---------- New York time ---------- */
  function nyNow() {
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false, weekday: 'short' })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { y: +p.year, m: +p.month, d: +p.day, dow: days[p.weekday], min: (+p.hour % 24) * 60 + (+p.minute) };
  }
  function toMin(hm) { var a = hm.split(':'); return +a[0] * 60 + +a[1]; }
  function fmtMin(m) { var h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + (mm ? ':' + (mm < 10 ? '0' : '') + mm : '') + ' ' + ap; }
  function fmtMinFull(m) { var h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + ':' + (mm < 10 ? '0' : '') + mm + ' ' + ap; }
  var DAYN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function openStatus() {
    var n = nyNow(), today = HOURS[n.dow] || [];
    for (var i = 0; i < today.length; i++) {
      var o = toMin(today[i][0]), c = toMin(today[i][1]);
      if (n.min >= o && n.min < c) return { open: true, text: 'Open now', sub: 'until ' + fmtMin(c) };
      if (n.min < o) return { open: false, text: 'Closed now', sub: 'opens ' + fmtMin(o) + ' today' };
    }
    for (var k = 1; k <= 7; k++) {
      var dw = (n.dow + k) % 7, w = HOURS[dw] || [];
      if (w.length) return { open: false, text: 'Closed now', sub: 'opens ' + (k === 1 ? 'tomorrow' : DAYN[dw]) + ' at ' + fmtMin(toMin(w[0][0])) };
    }
    return { open: false, text: 'Closed', sub: '' };
  }
  $$('[data-open-status]').forEach(function (el) {
    var s = openStatus();
    el.classList.toggle('is-open', s.open);
    el.innerHTML = '<span class="dot" aria-hidden="true"></span><span>' + s.text + '</span>' + (s.sub ? '<span class="sub">' + s.sub + '</span>' : '');
  });
  $$('[data-today-row]').forEach(function (row) { if (+row.getAttribute('data-today-row') === nyNow().dow) row.classList.add('is-today'); });

  /* ---------- cart ---------- */
  var cart = store.get('grace-noodle-cart', []).filter(function (l) { return ITEMS[l.id]; });
  function save() { store.set('grace-noodle-cart', cart); renderCart(); }
  function lineKey(id, opt) { return id + (opt ? '|' + opt : ''); }
  function addItem(id, opt, qty) {
    var k = lineKey(id, opt), l = cart.filter(function (x) { return x.k === k; })[0];
    if (l) l.q += qty || 1; else cart.push({ k: k, id: id, o: opt || '', q: qty || 1 });
    save();
    announce(ITEMS[id].name + (opt ? ' (' + opt + ')' : '') + ' added to your order.');
  }
  function setQty(k, q) { cart = cart.filter(function (x) { if (x.k === k) x.q = q; return x.q > 0; }); save(); }
  function count() { return cart.reduce(function (s, l) { return s + l.q; }, 0); }
  function subtotal() { return cart.reduce(function (s, l) { return s + l.q * ITEMS[l.id].price; }, 0); }
  function hasLunch() { return cart.some(function (l) { return CAT_OF[l.id] && CAT_OF[l.id].lunchOnly; }); }
  function hasRaw() { return cart.some(function (l) { return ITEMS[l.id].raw; }); }

  var live = $('#sr-live');
  function announce(t) { if (live) { live.textContent = ''; setTimeout(function () { live.textContent = t; }, 30); } }

  function thumbFor(id) {
    var img = PLATE_OF[id];
    return img ? base + 'assets/img/plates/' + img + '-160.webp' : '';
  }

  function renderCart() {
    var n = count();
    $$('[data-cart-count]').forEach(function (b) { b.textContent = n; b.hidden = n === 0; });
    var list = $('#cart-lines'); if (!list) return;
    if (!cart.length) {
      list.innerHTML = '<p class="cart-empty">Your order is empty. Add a plate from the showcase or the menu.</p>';
    } else {
      list.innerHTML = cart.map(function (l) {
        var it = ITEMS[l.id], th = thumbFor(l.id);
        return '<div class="cart-line">' +
          (th ? '<img src="' + th + '" alt="" width="56" height="56" loading="lazy">' : '<span class="cart-mark" aria-hidden="true">' + esc(l.id) + '</span>') +
          '<div class="cl-txt"><p class="cl-name">' + esc(it.name) + (l.o ? ' <span>(' + esc(l.o) + ')</span>' : '') + '</p><p class="cl-price">' + money(it.price * l.q) + '</p></div>' +
          '<div class="qty" role="group" aria-label="Quantity for ' + esc(it.name) + '">' +
          '<button type="button" data-q="-1" data-k="' + esc(l.k) + '" aria-label="Remove one">&minus;</button><span>' + l.q + '</span>' +
          '<button type="button" data-q="1" data-k="' + esc(l.k) + '" aria-label="Add one">+</button></div></div>';
      }).join('');
    }
    $$('[data-cart-subtotal]').forEach(function (e) { e.textContent = money(subtotal()); });
    var go = $('#cart-checkout'); if (go) go.setAttribute('aria-disabled', cart.length ? 'false' : 'true');
    var lunchNote = $('#cart-lunch-note'); if (lunchNote) lunchNote.hidden = !hasLunch();
    if (document.body.classList.contains('page-order')) renderOrder();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-q]');
    if (b) { var k = b.getAttribute('data-k'), l = cart.filter(function (x) { return x.k === k; })[0]; if (l) setQty(k, l.q + +b.getAttribute('data-q')); }
  });

  /* drawer */
  var drawer = $('#cart'), lastFocus = null;
  function openCart() {
    if (!drawer) return; lastFocus = document.activeElement;
    drawer.hidden = false; requestAnimationFrame(function () { drawer.classList.add('open'); });
    document.body.classList.add('cart-open');
    var c = $('.cart-close', drawer); if (c) c.focus();
  }
  function closeCart() {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove('open'); document.body.classList.remove('cart-open');
    setTimeout(function () { drawer.hidden = true; }, reduce ? 0 : 320);
    if (lastFocus) lastFocus.focus();
  }
  $$('[data-open-cart]').forEach(function (b) { b.addEventListener('click', openCart); });
  $$('[data-close-cart]').forEach(function (b) { b.addEventListener('click', closeCart); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeCart(); closeNav(); } });
  var co = $('#cart-checkout');
  if (co) co.addEventListener('click', function (e) { if (!cart.length) e.preventDefault(); });

  /* fly-to-cart */
  function flyToCart(fromEl, id) {
    var target = $$('.cart-btn').filter(function (b) { return b.offsetParent !== null; })[0];
    var src = thumbFor(id);
    if (reduce || !fromEl || !target || !src || !fromEl.animate) { bump(target); return; }
    var a = fromEl.getBoundingClientRect(), t = target.getBoundingClientRect();
    var size = Math.min(Math.max(a.width, 60), 220);
    var g = document.createElement('img');
    g.src = src; g.alt = ''; g.className = 'fly';
    g.style.width = g.style.height = size + 'px';
    g.style.left = (a.left + a.width / 2 - size / 2) + 'px';
    g.style.top = (a.top + a.height / 2 - size / 2) + 'px';
    document.body.appendChild(g);
    var dx = (t.left + t.width / 2) - (a.left + a.width / 2), dy = (t.top + t.height / 2) - (a.top + a.height / 2);
    var s = 28 / size;
    var anim = g.animate([
      { transform: 'translate(0,0) scale(1) rotate(0deg)', opacity: 1 },
      { transform: 'translate(' + dx * 0.45 + 'px,' + (dy * 0.45 - 140) + 'px) scale(' + (0.55 + s / 2) + ') rotate(200deg)', opacity: 1, offset: 0.55 },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ') rotate(420deg)', opacity: 0.2 }
    ], { duration: 820, easing: 'cubic-bezier(.45,.05,.4,1)' });
    anim.onfinish = function () { g.remove(); bump(target); };
  }
  function bump(t) { if (!t || reduce || !t.animate) return; t.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }], { duration: 380, easing: 'ease-out' }); }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-add]'); if (!b) return;
    var id = b.getAttribute('data-add'), opt = '';
    var optSel = b.getAttribute('data-opt-from') && $(b.getAttribute('data-opt-from'));
    if (optSel) opt = optSel.value || (optSel.querySelector && (optSel.querySelector('input:checked') || {}).value) || '';
    if (!opt && ITEMS[id] && ITEMS[id].options) opt = ITEMS[id].options[0];
    var from = b.getAttribute('data-fly-from') ? $(b.getAttribute('data-fly-from')) : b;
    addItem(id, opt, 1);
    flyToCart(from, id);
    b.classList.add('added'); var t0 = b.getAttribute('data-label') || b.textContent;
    if (!b.getAttribute('data-label')) b.setAttribute('data-label', t0);
    var lab = b.querySelector('.lab'); if (lab) { lab.textContent = 'Added'; setTimeout(function () { lab.textContent = 'Add to order'; b.classList.remove('added'); }, 1400); }
  });

  /* ---------- mobile nav ---------- */
  var navBtn = $('.nav-toggle'), nav = $('#site-nav');
  function closeNav() { if (navBtn && navBtn.getAttribute('aria-expanded') === 'true') { navBtn.setAttribute('aria-expanded', 'false'); document.body.classList.remove('nav-open'); } }
  if (navBtn) navBtn.addEventListener('click', function () {
    var o = navBtn.getAttribute('aria-expanded') === 'true';
    navBtn.setAttribute('aria-expanded', o ? 'false' : 'true'); document.body.classList.toggle('nav-open', !o);
  });
  if (nav) nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeNav(); });

  /* header shadow */
  var hdr = $('.site-header');
  function onScrollHdr() { if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScrollHdr, { passive: true }); onScrollHdr();

  /* reveals */
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }); }, { rootMargin: '0px 0px -10% 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else { $$('.reveal').forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- showcase (home) ---------- */
  var show = $('#showcase');
  if (show && PLATES.length) initShowcase();

  function initShowcase() {
    var N = PLATES.length, idx = 0;
    var stage = $('.sc-stage', show), rail = $('.sc-rail', show);
    var tKick = $('.sc-kicker', show), tTitle = $('.sc-title', show), tJp = $('.sc-jp', show), tLine = $('.sc-line', show), tPrice = $('.sc-price', show), tCount = $('.sc-count', show);
    var addBtn = $('.sc-add', show), optWrap = $('.sc-opts', show), labelBtn = $('.sc-labels-btn', show);
    var plateA = $('.plate.a', show), plateB = $('.plate.b', show), front = plateA;
    show.style.setProperty('--steps', N);

    rail.innerHTML = PLATES.map(function (p, i) {
      var it = ITEMS[p.item];
      return '<li><button type="button" class="sc-pick" data-i="' + i + '" aria-label="' + esc(p.title) + ', ' + money(it.price) + '">' +
        '<img src="assets/img/plates/' + p.img + '-160.webp" alt="" width="48" height="48" loading="lazy" decoding="async">' +
        '<span class="nm">' + esc(p.title) + '</span><span class="pr">' + money(it.price) + '</span></button></li>';
    }).join('');
    var dots = $('.sc-dots', show);
    if (dots) dots.innerHTML = PLATES.map(function (p, i) { return '<button type="button" data-i="' + i + '" aria-label="Show ' + esc(p.title) + '"></button>'; }).join('');

    function fill(el, p) {
      var img = $('img', el);
      img.src = 'assets/img/plates/' + p.img + '-900.webp';
      img.srcset = 'assets/img/plates/' + p.img + '-480.webp 480w, assets/img/plates/' + p.img + '-900.webp 900w';
      img.alt = p.title + ' from Grace Noodle, seen from above (illustrative image)';
      $('.labels', el).innerHTML = p.labels.map(function (l, i) {
        var side = l[1] > 50 ? 'r' : 'l', edge = l[1] < 32 ? ' edge-l' : l[1] > 68 ? ' edge-r' : '';
        return '<span class="lbl ' + side + edge + '" style="--x:' + l[1] + '%;--y:' + l[2] + '%;--d:' + (i * 70) + 'ms"><i data-n="' + (i + 1) + '"></i><b>' + esc(l[0]) + '</b></span>';
      }).join('');
      var lg = $('.sc-legend', show);
      if (lg) lg.innerHTML = p.labels.map(function (l, i) { return '<li><span>' + (i + 1) + '</span>' + esc(l[0]) + '</li>'; }).join('');
    }
    function setText(p) {
      var it = ITEMS[p.item];
      tKick.textContent = p.kicker; tTitle.textContent = p.title; tJp.textContent = p.jp; tLine.textContent = p.line;
      tPrice.textContent = money(it.price);
      tCount.innerHTML = '<b>' + (idx < 9 ? '0' : '') + (idx + 1) + '</b> / ' + (N < 10 ? '0' : '') + N;
      addBtn.setAttribute('data-add', p.item);
      addBtn.setAttribute('aria-label', 'Add ' + p.title + ' to order, ' + money(it.price));
      if (it.options) {
        optWrap.hidden = false;
        optWrap.innerHTML = it.options.map(function (o, i) { return '<label><input type="radio" name="sc-opt" value="' + esc(o) + '"' + (i === 0 ? ' checked' : '') + '><span>' + esc(o) + '</span></label>'; }).join('');
        addBtn.setAttribute('data-opt-from', '.sc-opts');
      } else { optWrap.hidden = true; optWrap.innerHTML = ''; addBtn.removeAttribute('data-opt-from'); }
      $$('.sc-pick', rail).forEach(function (b, i) {
        b.classList.toggle('on', i === idx); b.setAttribute('aria-current', i === idx ? 'true' : 'false');
        if (i === idx && rail.offsetParent) { var li = b.parentElement, top = (li.offsetTop - rail.offsetTop) - rail.clientHeight / 2 + li.offsetHeight / 2; rail.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' }); }
      });
      if (dots) $$('button', dots).forEach(function (b, i) { b.classList.toggle('on', i === idx); });
      var txt = $('.sc-text', show);
      if (!reduce && txt.animate) txt.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 480, easing: 'cubic-bezier(.2,.7,.2,1)' });
    }
    fill(plateA, PLATES[0]); setText(PLATES[0]);
    plateB.style.opacity = '0';

    function go(n, dir) {
      if (n === idx) return;
      dir = dir || (n > idx ? 1 : -1);
      idx = n;
      var back = front === plateA ? plateB : plateA;
      fill(back, PLATES[n]);
      hideLabels();
      if (reduce || !back.animate) {
        front.style.opacity = '0'; back.style.opacity = '1';
      } else {
        var w = Math.max(window.innerWidth * 0.55, 360);
        front.animate([{ transform: 'translateX(0) rotate(0deg)', opacity: 1 }, { transform: 'translateX(' + (-dir * w) + 'px) rotate(' + (-dir * 160) + 'deg)', opacity: 0 }], { duration: 700, easing: 'cubic-bezier(.6,.0,.4,1)', fill: 'forwards' });
        back.style.opacity = '1';
        back.animate([{ transform: 'translateX(' + (dir * w) + 'px) rotate(' + (dir * 220) + 'deg)', opacity: 0 }, { transform: 'translateX(0) rotate(0deg)', opacity: 1 }], { duration: 760, easing: 'cubic-bezier(.2,.7,.15,1)', fill: 'forwards' });
      }
      front.setAttribute('aria-hidden', 'true'); back.removeAttribute('aria-hidden');
      front = back;
      addBtn.setAttribute('data-fly-from', '.plate:not([aria-hidden]) img');
      setText(PLATES[n]);
    }
    addBtn.setAttribute('data-fly-from', '.plate:not([aria-hidden]) img');

    /* scroll-driven stepping (desktop and phone): the section is tall; the stage is sticky */
    function scrollToIdx(i) {
      var top = show.getBoundingClientRect().top + window.scrollY;
      var span = show.offsetHeight - window.innerHeight;
      var y = top + span * ((i + 0.5) / N);
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    }
    var ticking = false;
    function onScroll() {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var r = show.getBoundingClientRect(), span = show.offsetHeight - window.innerHeight;
        if (span <= 0) return;
        var p = Math.min(Math.max(-r.top / span, 0), 0.9999);
        var n = Math.floor(p * N);
        if (n !== idx) go(n);
        show.style.setProperty('--p', p.toFixed(4));
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    show.addEventListener('click', function (e) {
      var b = e.target.closest('[data-i]'); if (b) scrollToIdx(+b.getAttribute('data-i'));
      var nx = e.target.closest('.sc-next'), pv = e.target.closest('.sc-prev');
      if (nx) scrollToIdx(Math.min(idx + 1, N - 1));
      if (pv) scrollToIdx(Math.max(idx - 1, 0));
    });
    show.addEventListener('keydown', function (e) {
      if (e.target.closest('input, textarea, select')) return;
      if (e.key === 'ArrowRight') { scrollToIdx(Math.min(idx + 1, N - 1)); }
      if (e.key === 'ArrowLeft') { scrollToIdx(Math.max(idx - 1, 0)); }
    });

    /* spin + hover labels */
    var angle = 0, speed = 6, target = 6, last = 0, running = false, inView = false, hovering = false;
    function frame(t) {
      if (!running) return;
      var dt = last ? Math.min((t - last) / 1000, 0.05) : 0; last = t;
      speed += (target - speed) * Math.min(dt * 4, 1);
      if (hovering) {
        var goal = Math.round(angle / 360) * 360;
        angle += (goal - angle) * Math.min(dt * 6, 1);
      } else angle += speed * dt;
      var img = $('.plate:not([aria-hidden]) .spin', show); if (img) img.style.transform = 'rotate(' + angle.toFixed(2) + 'deg)';
      requestAnimationFrame(frame);
    }
    function start() { if (reduce || running) return; running = true; last = 0; requestAnimationFrame(frame); }
    function stop() { running = false; }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { inView = es[0].isIntersecting; if (inView) start(); else stop(); }).observe(stage);
    } else start();
    function showLabels() { hovering = true; target = 0; stage.classList.add('show-labels'); show.classList.add('labels-on'); labelBtn.setAttribute('aria-pressed', 'true'); labelBtn.querySelector('span').textContent = 'Hide ingredients'; }
    function hideLabels() { hovering = false; target = 6; stage.classList.remove('show-labels'); show.classList.remove('labels-on'); labelBtn.setAttribute('aria-pressed', 'false'); labelBtn.querySelector('span').textContent = 'Show ingredients'; }
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (canHover) {
      stage.addEventListener('mouseenter', showLabels);
      stage.addEventListener('mouseleave', hideLabels);
    }
    labelBtn.addEventListener('click', function () { if (stage.classList.contains('show-labels')) hideLabels(); else showLabels(); });
  }

  /* ---------- menu page ---------- */
  var menuRoot = $('#menu-root');
  if (menuRoot) {
    menuRoot.innerHTML = MENU.map(function (c) {
      return '<section class="mcat reveal" id="' + c.id + '" aria-labelledby="h-' + c.id + '">' +
        '<header class="mcat-head"><h2 id="h-' + c.id + '">' + esc(c.name) + '</h2><span class="jp" lang="ja">' + esc(c.jp) + '</span>' +
        (c.note ? '<p class="mcat-note">' + esc(c.note) + '</p>' : '') + '</header><ul class="mlist">' +
        c.items.map(function (it) {
          var th = PLATE_OF[it.id];
          var opts = it.options ? '<span class="mopts" id="opt-' + it.id + '" role="radiogroup" aria-label="Style">' + it.options.map(function (o, i) { return '<label><input type="radio" name="o-' + it.id + '" value="' + esc(o) + '"' + (i === 0 ? ' checked' : '') + '><span>' + esc(o) + '</span></label>'; }).join('') + '</span>' : '';
          return '<li class="mitem' + (th ? ' has-img' : '') + '">' +
            (th ? '<img class="mthumb" id="th-' + it.id + '" src="assets/img/plates/' + th + '-160.webp" alt="" width="64" height="64" loading="lazy" decoding="async">' : '') +
            '<div class="mtxt"><h3><span class="code">' + esc(it.id.replace(/^N(\d+)S?$/, '$1').replace(/^N24([AB])$/, '24$1')) + '</span> ' + esc(it.name) + (it.spicy ? ' ' + '<svg class="chili" viewBox="0 0 24 24" role="img" aria-label="Spicy"><title>Spicy</title><path d="M14.5 4.5c.5-1.5 2-2 3-1.5M15.5 6c3 1 4 4 2.5 7.5C16 18 11 21 5.5 20.5 4 20.3 3.4 19 4.4 18c3-3 4.6-6.5 6.6-9.5C12.3 6.6 13.8 5.6 15.5 6z"/></svg>' : '') + '</h3>' +
            (it.desc ? '<p>' + esc(it.desc) + '</p>' : '') + opts + '</div>' +
            '<div class="mbuy"><span class="mprice">' + money(it.price) + '</span>' +
            '<button type="button" class="btn-add" data-add="' + it.id + '"' + (it.options ? ' data-opt-from="#opt-' + it.id + '"' : '') + (th ? ' data-fly-from="#th-' + it.id + '"' : '') + ' aria-label="Add ' + esc(it.name) + ' to order"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg><span class="lab">Add to order</span></button></div></li>';
        }).join('') + '</ul></section>';
    }).join('');
    // radio groups inside .mopts: make "data-opt-from" read the checked radio
    $$('.reveal', menuRoot).forEach(function (el) { el.classList.add('in'); });
    // active chip on scroll
    var chips = $$('.mnav a');
    if ('IntersectionObserver' in window) {
      var mio = new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) { chips.forEach(function (a) { var on = a.getAttribute('href') === '#' + en.target.id; a.classList.toggle('on', on); if (on && a.scrollIntoView && window.innerWidth < 900) { var p = a.parentElement.parentElement; p.scrollTo({ left: a.offsetLeft - 16, behavior: reduce ? 'auto' : 'smooth' }); } }); } });
      }, { rootMargin: '-45% 0px -50% 0px' });
      $$('.mcat', menuRoot).forEach(function (s) { mio.observe(s); });
    }
  }

  /* ---------- order page ---------- */
  function buildSlots() {
    var n = nyNow(), out = [], lunchOnly = hasLunch(), daysShown = 0;
    for (var k = 0; k < 7 && daysShown < 3; k++) {
      var dw = (n.dow + k) % 7, wins = HOURS[dw] || [];
      if (lunchOnly) wins = wins.filter(function (w) { return w[0] === '11:30'; });
      var dt = new Date(Date.UTC(n.y, n.m - 1, n.d + k, 12));
      var label = k === 0 ? 'Today' : k === 1 ? 'Tomorrow' : DAYN[dw];
      var dateTxt = dt.toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric' });
      var slots = [];
      wins.forEach(function (w) {
        var o = toMin(w[0]) + 15, c = toMin(w[1]) - 15;
        var from = k === 0 ? Math.max(o, Math.ceil((n.min + 25) / 15) * 15) : o;
        for (var m = from; m <= c; m += 15) slots.push(m);
      });
      if (slots.length) { daysShown++; out.push({ label: label + ' · ' + dateTxt, slots: slots, dateTxt: dateTxt }); }
    }
    return out;
  }
  function renderOrder() {
    var sum = $('#order-summary'), sel = $('#pickup-time'), form = $('#order-form');
    if (!sum || !form) return;
    if (!cart.length) {
      sum.innerHTML = '<p class="cart-empty">Your order is empty. <a href="menu.html">Open the menu</a> or <a href="index.html#showcase">browse the plates</a>.</p>';
      form.classList.add('is-empty');
    } else {
      form.classList.remove('is-empty');
      sum.innerHTML = '<ul class="osum">' + cart.map(function (l) {
        var it = ITEMS[l.id];
        return '<li><span class="q">' + l.q + ' &times;</span><span class="n">' + esc(it.name) + (l.o ? ' (' + esc(l.o) + ')' : '') + (it.spicy ? ' ' + '<svg class="chili" viewBox="0 0 24 24" role="img" aria-label="Spicy"><title>Spicy</title><path d="M14.5 4.5c.5-1.5 2-2 3-1.5M15.5 6c3 1 4 4 2.5 7.5C16 18 11 21 5.5 20.5 4 20.3 3.4 19 4.4 18c3-3 4.6-6.5 6.6-9.5C12.3 6.6 13.8 5.6 15.5 6z"/></svg>' : '') + '</span><span class="p">' + money(it.price * l.q) + '</span></li>';
      }).join('') + '</ul><p class="osub"><span>Subtotal</span><b>' + money(subtotal()) + '</b></p><p class="otax">Sales tax is added at pickup. You pay at the counter.</p>' +
        '<p class="oraw">Prices are confirmed when Grace Noodle calls you back.</p>';
    }
    if (sel) {
      var cur = sel.value, groups = buildSlots();
      sel.innerHTML = '<option value="">Choose a pickup time</option>' + groups.map(function (g) {
        return '<optgroup label="' + esc(g.label) + '">' + g.slots.map(function (m) { var v = g.dateTxt + ', ' + fmtMinFull(m); return '<option value="' + esc(v) + '">' + fmtMinFull(m) + '</option>'; }).join('') + '</optgroup>';
      }).join('');
      if (cur) sel.value = cur;
      var ln = $('#lunch-limit'); if (ln) ln.hidden = !hasLunch();
    }
  }
  var oform = $('#order-form');
  if (oform) {
    renderOrder();
    oform.addEventListener('submit', function (e) {
      var err = $('#order-error'); err.textContent = '';
      if (!cart.length) { e.preventDefault(); err.textContent = 'Add at least one item before sending your order.'; return; }
      var bad = $$('[required]', oform).filter(function (f) { return !f.value.trim(); });
      var ph = $('#o-phone'); if (ph && ph.value && ph.value.replace(/\D/g, '').length < 10) bad.push(ph);
      $$('[aria-invalid]', oform).forEach(function (f) { f.removeAttribute('aria-invalid'); });
      if (bad.length) { e.preventDefault(); bad.forEach(function (f) { f.setAttribute('aria-invalid', 'true'); }); err.textContent = 'Please fill in your name, a 10-digit phone number and a pickup time.'; bad[0].focus(); return; }
      $('#o-items').value = cart.map(function (l) { var it = ITEMS[l.id]; return l.q + ' x ' + l.id + ' ' + it.name + (l.o ? ' (' + l.o + ')' : '') + ' = ' + money(it.price * l.q); }).join('\n');
      $('#o-total').value = money(subtotal());
      store.set('grace-noodle-last-order', { items: cart, total: subtotal(), time: $('#pickup-time').value, name: $('#o-name').value });
    });
  }
  if (document.body.classList.contains('page-received')) {
    var lo = store.get('grace-noodle-last-order', null);
    var box = $('#received-detail');
    if (lo && box) box.innerHTML = '<p>Pickup: <b>' + esc(lo.time || '') + '</b></p><p>Subtotal: <b>' + money(lo.total || 0) + '</b> (tax added at pickup)</p>';
    cart = []; store.set('grace-noodle-cart', []);
  }

  renderCart();
  var yr = $('[data-year]'); if (yr) yr.textContent = new Date().getFullYear();
})();
