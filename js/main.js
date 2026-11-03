/* ===================================================================
   BARBEARIA TÔ EM CASA — INTERAÇÕES PRINCIPAIS & CONTROLES
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  setupNavbar();
  setupMobileMenu();
  setupHeroVideo();
  setupGalleryFiltersAndLightbox();
  setupContactForm();
});

// 1. Navbar Scroll Effect
function setupNavbar() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('header-scrolled');
    } else {
      navbar.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// 2. Menu Mobile Drawer
function setupMobileMenu() {
  const btnToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!btnToggle || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // Animar links do menu com GSAP se disponível
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(mobileLinks, 
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
      );
    }
  };

  const closeMenu = () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
    document.body.style.overflow = '';
  };

  btnToggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      closeMenu();
    }
  });
}

// 3. Controles do Vídeo do Hero
function setupHeroVideo() {
  const video = document.getElementById('hero-video');
  const btnSound = document.getElementById('hero-video-sound');
  const btnPlayPause = document.getElementById('hero-video-playpause');

  if (!video) return;

  if (btnSound) {
    btnSound.addEventListener('click', () => {
      video.muted = !video.muted;
      const soundIcon = btnSound.querySelector('svg');
      if (video.muted) {
        btnSound.setAttribute('aria-label', 'Ativar som');
        btnSound.title = 'Ativar som';
        if (soundIcon) {
          soundIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          `;
        }
      } else {
        btnSound.setAttribute('aria-label', 'Desativar som');
        btnSound.title = 'Desativar som';
        if (soundIcon) {
          soundIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          `;
        }
      }
    });
  }

  if (btnPlayPause) {
    btnPlayPause.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        btnPlayPause.title = 'Pausar vídeo';
        btnPlayPause.querySelector('svg').innerHTML = `
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        `;
      } else {
        video.pause();
        btnPlayPause.title = 'Reproduzir vídeo';
        btnPlayPause.querySelector('svg').innerHTML = `
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        `;
      }
    });
  }
}

// 4. Galeria de Fotos com Filtros & Lightbox
function setupGalleryFiltersAndLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  // Filtros de Categoria
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-gold', 'text-black', 'border-gold');
        b.classList.add('bg-zinc-900', 'text-zinc-400', 'border-zinc-800');
      });
      btn.classList.add('bg-gold', 'text-black', 'border-gold');
      btn.classList.remove('bg-zinc-900', 'text-zinc-400', 'border-zinc-800');

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(item, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 });
          }
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox
  if (lightbox && lightboxImg) {
    galleryItems.forEach(item => {
      const img = item.querySelector('img');
      const captionText = item.querySelector('.gallery-overlay-caption')?.textContent || 'Barbearia Tô em Casa';

      item.addEventListener('click', () => {
        if (img) {
          lightboxImg.src = img.src;
          if (lightboxCaption) lightboxCaption.textContent = captionText;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
}

// 5. Formulário de Contato Rápido
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn ? btn.innerHTML : 'Enviar Mensagem';

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Enviando...
      `;
    }

    setTimeout(() => {
      form.reset();
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
      if (typeof showToast === 'function') {
        showToast('Mensagem enviada com sucesso! Retornaremos em breve.');
      }
    }, 1000);
  });
}
