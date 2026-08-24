document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1. MENÚ MÓVIL Y HEADER
     ========================================= */
  const menuBtn = document.querySelector('.menu');
  const navLinks = document.querySelector('.nav nav');
  const navHeader = document.querySelector('.nav');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navLinks.setAttribute('aria-hidden', String(!isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navLinks.setAttribute('aria-hidden', 'true');
      });
    });
  }

  if (navHeader) {
    window.addEventListener('scroll', () => {
      navHeader.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* =========================================
     2. DIAGNÓSTICO (SÍNTOMAS)
     ========================================= */
  const symptomButtons = document.querySelectorAll('.symptoms button');
  const answerText = document.querySelector('.answer-text');
  const answerCta = document.querySelector('.answer-cta');

  if (symptomButtons.length > 0) {
    symptomButtons.forEach(button => {
      button.addEventListener('click', () => {
        symptomButtons.forEach(b => b.classList.remove('selected'));
        button.classList.add('selected');

        const answer = button.getAttribute('data-answer') || '';
        const ctaText = button.getAttribute('data-cta') || 'Solicitar servicio';
        const link = button.getAttribute('href') || '#';

        if (answerText) answerText.textContent = answer;
        if (answerCta) {
          answerCta.textContent = ctaText;
          answerCta.setAttribute('href', link);
          answerCta.classList.remove('hidden');
        }
      });
    });
  }

  /* =========================================
     3. PREGUNTAS FRECUENTES (FAQ ACORDEÓN)
     ========================================= */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.removeAttribute('open');
          }
        });
      }
    });
  });

  /* =========================================
     4. SLIDER ANTES Y DESPUÉS (TOUCH/MOUSE FIX)
     ========================================= */
  const slider = document.querySelector('.slider');
  const beforeWrapper = document.querySelector('.image-before-wrapper');
  const sliderLine = document.querySelector('.slider-line');
  const sliderButton = document.querySelector('.slider-button');

  if (slider && beforeWrapper) {
    const updateSlider = (val) => {
      beforeWrapper.style.width = `${val}%`;
      if (sliderLine) sliderLine.style.left = `${val}%`;
      if (sliderButton) sliderButton.style.left = `${val}%`;
    };

    ['input', 'change', 'touchmove'].forEach(evt => {
      slider.addEventListener(evt, (e) => {
        updateSlider(e.target.value);
      });
    });

    updateSlider(slider.value || 50);
  }

});

// Ocultar Preloader suavemente al cargar todo el sitio
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('loaded');
    });
    
    // Fallback por si las imágenes se demoran mucho en cargar
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 2000);
  }

  /* =========================================
     5. PROTECCIÓN DE CÓDIGO E IMÁGENES (BLOQUEO)
     ========================================= */

  // 1. Deshabilitar clic derecho
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // 2. Prevenir arrastrar imágenes
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
  });

  // 3. Bloquear atajos de teclado comunes (F12, DevTools, Inspeccionar, Ver Código)
  document.addEventListener('keydown', (e) => {
    // Tecla F12
    if (e.key === 'F12') {
      e.preventDefault();
    }
    
    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools e Inspeccionar)
    if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) {
      e.preventDefault();
    }

    // Ctrl+U (Ver código fuente)
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
    }

    // Ctrl+S (Guardar página)
    if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
    }
  });

  // 4. Trampa Anti-DevTools (Pausa la ejecución si abren la consola)
  setInterval(() => {
    const startTime = performance.now();
    debugger;
    const endTime = performance.now();
    if (endTime - startTime > 100) {
      window.location.reload();
    }
  }, 1000);