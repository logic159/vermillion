/**
 * ==========================================================================
 * VERMILLION FRAMES — PERFORMANCE VIDEO AD STUDIO
 * Master JavaScript Application
 * <!-- Developer: Rituraj Shukla -->
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. STICKY HEADER & ACTIVE NAV
     -------------------------------------------------------------------------- */
  const siteHeader = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link, .drawer-nav a');

  const handleHeaderScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 40) {
      siteHeader.classList.add('header-scrolled');
    } else {
      siteHeader.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Set active link based on current page URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --------------------------------------------------------------------------
     2. MOBILE MENU DRAWER
     -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');

  const openDrawer = () => {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.add('open');
      drawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDrawer = () => {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.remove('open');
      drawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeVideoModal();
    }
  });

  /* --------------------------------------------------------------------------
     3. ANIMATED STATS COUNT-UP
     -------------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  if (statNumbers.length > 0) {
    const animateCount = (el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const isDecimal = target % 1 !== 0;
      const duration = 1600; // fast, confident count-up
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        // Fast cubic ease-out
        const currentVal = target * (1 - Math.pow(1 - progress, 3));

        if (frame >= totalFrames) {
          el.innerHTML = `${prefix}${isDecimal ? target.toFixed(1) : Math.round(target)}<span class="stat-suffix">${suffix}</span>`;
          clearInterval(counter);
        } else {
          el.innerHTML = `${prefix}${isDecimal ? currentVal.toFixed(1) : Math.round(currentVal)}<span class="stat-suffix">${suffix}</span>`;
        }
      }, frameRate);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(stat => statsObserver.observe(stat));
  }

  /* --------------------------------------------------------------------------
     4. PORTFOLIO FILTERING (WORK PAGE & HOMEPAGE)
     -------------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.case-study-card[data-category]');

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        portfolioItems.forEach(item => {
          const categories = item.getAttribute('data-category').split(' ');
          if (filter === 'all' || categories.includes(filter)) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. VIDEO MODAL PLAYER
     -------------------------------------------------------------------------- */
  const videoModal = document.getElementById('videoModal');
  const videoTriggers = document.querySelectorAll('[data-video-trigger]');
  const modalVideoTitle = document.getElementById('modalVideoTitle');
  const modalVideoClient = document.getElementById('modalVideoClient');
  const modalVideoMetric = document.getElementById('modalVideoMetric');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  const openVideoModal = (title, client, metric) => {
    if (!videoModal) return;
    if (modalVideoTitle) modalVideoTitle.textContent = title || 'High-Converting Ad Reel';
    if (modalVideoClient) modalVideoClient.textContent = client || 'Vermillion Frames';
    if (modalVideoMetric) modalVideoMetric.textContent = metric || '3.2x ROAS • +42% Hook Rate';
    
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    if (!videoModal) return;
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  videoTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const title = trigger.getAttribute('data-title');
      const client = trigger.getAttribute('data-client');
      const metric = trigger.getAttribute('data-metric');
      openVideoModal(title, client, metric);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeVideoModal);
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  /* --------------------------------------------------------------------------
     6. CREATIVE BRIEF FORM VALIDATION & BUDGET SELECTOR
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('creativeBriefForm');
  const budgetButtons = document.querySelectorAll('.budget-btn');
  const budgetInput = document.getElementById('selectedBudget');

  if (budgetButtons.length > 0 && budgetInput) {
    budgetButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        budgetButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        budgetInput.value = btn.getAttribute('data-budget');
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById('fullName');
      const emailInput = document.getElementById('workEmail');
      const companyInput = document.getElementById('companyName');
      const briefInput = document.getElementById('projectBrief');
      const formSuccess = document.getElementById('formSuccessMessage');

      const validateInput = (input, test) => {
        if (!input) return true;
        if (!test(input.value.trim())) {
          input.classList.add('error');
          isValid = false;
        } else {
          input.classList.remove('error');
        }
      };

      validateInput(nameInput, val => val.length >= 2);
      validateInput(emailInput, val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
      validateInput(companyInput, val => val.length >= 1);
      validateInput(briefInput, val => val.length >= 10);

      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Transmitting Brief...';
        }

        setTimeout(() => {
          if (formSuccess) {
            formSuccess.style.display = 'block';
            contactForm.reset();
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Brief Sent! Strategy Session Queued';
            }
          }
        }, 600);
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. FAQ ACCORDIONS
     -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  /* --------------------------------------------------------------------------
     8. INTERACTIVE VARIATION CALCULATOR (TESTING MATRIX)
     -------------------------------------------------------------------------- */
  const hookCountInput = document.getElementById('calcHooks');
  const bodyCountInput = document.getElementById('calcBodies');
  const ctaCountInput = document.getElementById('calcCTAs');
  const totalVariationsOutput = document.getElementById('totalVariationsCount');

  const updateCalculations = () => {
    if (!hookCountInput || !bodyCountInput || !ctaCountInput || !totalVariationsOutput) return;
    const hooks = parseInt(hookCountInput.value) || 3;
    const bodies = parseInt(bodyCountInput.value) || 2;
    const ctas = parseInt(ctaCountInput.value) || 2;
    const total = hooks * bodies * ctas;
    totalVariationsOutput.textContent = `${total} Ready-to-Test Video Creatives`;
  };

  if (hookCountInput && bodyCountInput && ctaCountInput) {
    [hookCountInput, bodyCountInput, ctaCountInput].forEach(inp => {
      inp.addEventListener('input', updateCalculations);
    });
    updateCalculations();
  }

});
