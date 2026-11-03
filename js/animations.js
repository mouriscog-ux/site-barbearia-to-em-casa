/* ===================================================================
   BARBEARIA TÔ EM CASA — ANIMAÇÕES CINEMATOGRÁFICAS (GSAP + SCROLLTRIGGER)
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Registrar plugins GSAP
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    initPreloader();
    initHeroAnimations();
    initScrollAnimations();
    initTextMasks();
    initButtonMicrointeractions();
  } else {
    // Fallback caso GSAP não esteja presente
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
  }
});

// 1. Pré-carregador & Entrada Cinematográfica
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const preloaderLine = document.querySelector('.preloader-line');
  const preloaderLogo = document.querySelector('.preloader-logo');

  if (!preloader) return;

  const tl = gsap.timeline({
    onComplete: () => {
      preloader.style.pointerEvents = 'none';
      ScrollTrigger.refresh();
    }
  });

  tl.to(preloaderLine, {
    width: '100%',
    duration: 1,
    ease: 'power2.inOut'
  })
  .to(preloaderLogo, {
    scale: 1.05,
    opacity: 0.8,
    duration: 0.5,
    ease: 'power1.out'
  }, '-=0.3')
  .to(preloader, {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut'
  })
  .set(preloader, {
    display: 'none'
  });
}

// 2. Animação de Entrada do Hero
function initHeroAnimations() {
  const heroTitleLines = document.querySelectorAll('.hero-title-line');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroActions = document.querySelector('.hero-actions');
  const heroStats = document.querySelectorAll('.hero-stat-item');
  const heroVideo = document.querySelector('.hero-video-bg');

  const heroTl = gsap.timeline({ delay: 0.8 });

  if (heroVideo) {
    heroTl.fromTo(heroVideo, 
      { scale: 1.15, filter: 'brightness(0.3) contrast(1.2)' },
      { scale: 1.04, filter: 'brightness(0.65) contrast(1.1)', duration: 2.2, ease: 'power2.out' },
      0
    );
  }

  if (heroTitleLines.length > 0) {
    heroTl.from(heroTitleLines, {
      yPercent: 120,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out'
    }, 0.2);
  }

  if (heroSubtitle) {
    heroTl.from(heroSubtitle, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out'
    }, '-=0.6');
  }

  if (heroActions) {
    heroTl.from(heroActions, {
      y: 25,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5');
  }

  if (heroStats.length > 0) {
    heroTl.from(heroStats, {
      y: 20,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.4');
  }
}

// 3. Revelação de Títulos e Textos com Máscaras
function initTextMasks() {
  const maskedHeaders = document.querySelectorAll('.section-title-masked');

  maskedHeaders.forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      yPercent: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });
}

// 4. Animações com ScrollTrigger nas Seções
function initScrollAnimations() {
  // Animação de cards de Serviços
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length > 0) {
    gsap.from(serviceCards, {
      scrollTrigger: {
        trigger: '#servicos',
        start: 'top 75%'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }

  // Animação da Seção Sobre Nós
  const aboutImages = document.querySelectorAll('.about-img-reveal');
  const aboutTexts = document.querySelectorAll('.about-text-reveal');

  if (aboutImages.length > 0) {
    gsap.from(aboutImages, {
      scrollTrigger: {
        trigger: '#sobre',
        start: 'top 75%'
      },
      scale: 0.95,
      opacity: 0,
      duration: 1.1,
      stagger: 0.2,
      ease: 'power2.out'
    });
  }

  if (aboutTexts.length > 0) {
    gsap.from(aboutTexts, {
      scrollTrigger: {
        trigger: '#sobre',
        start: 'top 75%'
      },
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power2.out'
    });
  }

  // Animação dos Profissionais
  const barberCards = document.querySelectorAll('.barber-card');
  if (barberCards.length > 0) {
    gsap.from(barberCards, {
      scrollTrigger: {
        trigger: '#profissionais',
        start: 'top 75%'
      },
      y: 50,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }

  // Animação da Galeria
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    gsap.from(galleryItems, {
      scrollTrigger: {
        trigger: '#galeria',
        start: 'top 75%'
      },
      scale: 0.92,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power2.out'
    });
  }

  // Animação dos Depoimentos
  const reviewCards = document.querySelectorAll('.review-card');
  if (reviewCards.length > 0) {
    gsap.from(reviewCards, {
      scrollTrigger: {
        trigger: '#depoimentos',
        start: 'top 75%'
      },
      y: 35,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out'
    });
  }

  // Parallax suave no background decorativo
  gsap.utils.toArray('.parallax-layer').forEach(layer => {
    gsap.to(layer, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: layer,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });
}

// 5. Microinterações em Botões
function initButtonMicrointeractions() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.3,
        ease: 'power1.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)'
      });
    });
  });
}
