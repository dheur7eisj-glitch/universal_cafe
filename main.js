/* ============================================================
   Universal Cafe — Main JavaScript
   Features:
   - Sticky header with scroll detection
   - Mobile hamburger menu toggle
   - Menu tab switching
   - Reviews carousel with autoplay
   - Scroll-triggered fade animations
   - Counter animation for stats
   - Back to Top button
============================================================ */

(function () {
  'use strict';

  /* --------------------------------------------------------
     DOM ELEMENTS
  -------------------------------------------------------- */
  const header       = document.getElementById('header');
  const hamburger    = document.getElementById('hamburger');
  const navLinks     = document.getElementById('navLinks');
  const menuTabs     = document.querySelectorAll('.menu-tab');
  const menuPanels   = document.querySelectorAll('.menu-panel');
  const reviewCards  = document.querySelectorAll('.review-card');
  const prevBtn      = document.getElementById('prevReview');
  const nextBtn      = document.getElementById('nextReview');
  const dotsContainer = document.getElementById('carouselDots');
  const backToTop    = document.getElementById('backToTop');
  const statNums     = document.querySelectorAll('.stat-num');

  /* --------------------------------------------------------
     STICKY HEADER
  -------------------------------------------------------- */
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top visibility
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* --------------------------------------------------------
     BACK TO TOP
  -------------------------------------------------------- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* --------------------------------------------------------
     MOBILE HAMBURGER MENU
  -------------------------------------------------------- */
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    // Prevent body scroll when nav is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* --------------------------------------------------------
     MENU TABS
  -------------------------------------------------------- */
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update tabs
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panels
      menuPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `tab-${target}`) {
          panel.classList.add('active');
        }
      });
    });
  });

  /* --------------------------------------------------------
     REVIEWS CAROUSEL
  -------------------------------------------------------- */
  let currentReview = 0;
  const total = reviewCards.length;

  // Build dots
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Review ${i + 1}`);
    dot.addEventListener('click', () => goToReview(i));
    dotsContainer.appendChild(dot);
  }

  function goToReview(index) {
    reviewCards[currentReview].classList.remove('active');
    dotsContainer.querySelectorAll('.dot')[currentReview].classList.remove('active');

    currentReview = (index + total) % total;

    reviewCards[currentReview].classList.add('active');
    dotsContainer.querySelectorAll('.dot')[currentReview].classList.add('active');
  }

  prevBtn.addEventListener('click', () => goToReview(currentReview - 1));
  nextBtn.addEventListener('click', () => goToReview(currentReview + 1));

  // Autoplay every 5 seconds
  let autoplayInterval = setInterval(() => goToReview(currentReview + 1), 5000);

  // Pause on hover
  const carousel = document.getElementById('reviewsCarousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    carousel.addEventListener('mouseleave', () => {
      autoplayInterval = setInterval(() => goToReview(currentReview + 1), 5000);
    });
  }

  /* --------------------------------------------------------
     SCROLL FADE-UP ANIMATIONS
  -------------------------------------------------------- */
  const fadeEls = document.querySelectorAll(
    '.service-card, .highlight-card, .gallery-item, .review-card, .about-grid, .stat-item, .info-block, .menu-item, .pillar, .extra-item'
  );

  // Add fade-up class to animatable elements
  fadeEls.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Staggered delay
        const siblings = Array.from(entry.target.parentElement.children);
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 80}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => observer.observe(el));

  /* --------------------------------------------------------
     COUNTER ANIMATION
  -------------------------------------------------------- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();

    function update(time) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statNums.forEach(el => counterObserver.observe(el));

  /* --------------------------------------------------------
     SMOOTH SCROLL FOR ANCHOR LINKS
  -------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // header height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* --------------------------------------------------------
     ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  -------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.remove('active-link');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active-link');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* --------------------------------------------------------
     TICKER PAUSE ON HOVER
  -------------------------------------------------------- */
  const ticker = document.querySelector('.ticker');
  if (ticker) {
    ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
    ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
  }

  /* --------------------------------------------------------
     GALLERY LIGHTBOX (simple)
  -------------------------------------------------------- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;

      // Create overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(44,24,16,0.92);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; animation: fadeIn 0.3s ease;
      `;

      const image = document.createElement('img');
      image.src = img.src;
      image.style.cssText = `
        max-width: 90vw; max-height: 88vh;
        object-fit: contain; border-radius: 12px;
        box-shadow: 0 30px 80px rgba(0,0,0,0.5);
      `;

      const close = document.createElement('button');
      close.innerHTML = '✕';
      close.style.cssText = `
        position: absolute; top: 24px; right: 32px;
        background: none; border: none; color: white;
        font-size: 1.8rem; cursor: pointer; opacity: 0.8;
      `;

      overlay.appendChild(image);
      overlay.appendChild(close);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      function closeOverlay() {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
      }

      overlay.addEventListener('click', closeOverlay);
      close.addEventListener('click', closeOverlay);
    });
  });

  console.log('🍵 Universal Cafe website loaded successfully.');

})();
