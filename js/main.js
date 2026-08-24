document.addEventListener('DOMContentLoaded', () => {
  
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

  const preloader = document.getElementById('preloader');
  if (preloader) {
    const hidePreloader = () => preloader.classList.add('loaded');
    
    if (document.readyState === 'complete') {
      hidePreloader();
    } else {
      window.addEventListener('load', hidePreloader);
    }
    
    setTimeout(hidePreloader, 2000);
  }

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'F12') {
      e.preventDefault();
    }
    
    if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) {
      e.preventDefault();
    }

    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
    }

    if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
    }
  });

  setInterval(() => {
    const startTime = performance.now();
    debugger;
    const endTime = performance.now();
    if (endTime - startTime > 100) {
      window.location.reload();
    }
  }, 1000);

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
  });

});