// play-sliders.js — handles slider overlays on the Play page

const sliders = document.querySelectorAll('.play-slider');

export function openSlider(id) {
  const slider = document.getElementById(`slider-${id}`);
  if (!slider) return;

  slider.hidden = false;
  document.body.style.overflow = 'hidden';

  gsap.fromTo(slider,
    { x: '100%' },
    { x: '0%', duration: 0.7, ease: 'power3.out' }
  );
}

export function closeSlider(slider) {
  gsap.to(slider, {
    x: '100%',
    duration: 0.5,
    ease: 'power3.in',
    onComplete: () => {
      slider.hidden = true;
      document.body.style.overflow = '';
    }
  });
}

// Wire up close buttons
sliders.forEach((slider) => {
  const closeBtn = slider.querySelector('.play-slider__close');
  if (closeBtn) closeBtn.addEventListener('click', () => closeSlider(slider));
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  sliders.forEach((slider) => {
    if (!slider.hidden) closeSlider(slider);
  });
});
