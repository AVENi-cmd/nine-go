document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const accItems = document.querySelectorAll('.glass-acc-item');
  accItems.forEach(item => {
    const trigger = item.querySelector('.acc-trigger');
    const body = item.querySelector('.acc-body');

    if (item.classList.contains('active')) {
      body.style.maxHeight = body.scrollHeight + 'px';
    }

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      accItems.forEach(other => {
        other.classList.remove('active');
        const otherBody = other.querySelector('.acc-body');
        if (otherBody) otherBody.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  const counters = document.querySelectorAll('.counter');
  let counted = false;
  const countUp = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, 35);
    });
  };

  const heroBar = document.querySelector('.hero-metrics-bar');
  if (heroBar) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) {
        countUp();
        counted = true;
      }
    }, { threshold: 0.5 });
    observer.observe(heroBar);
  }
});
