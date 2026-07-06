// about.js — page-specific GSAP animations

// Fade + slide up each section row on scroll
gsap.utils.toArray('.about-row').forEach((row) => {
  gsap.from(row, {
    scrollTrigger: {
      trigger: row,
      start: 'top 88%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 24,
    duration: 0.7,
    ease: 'power3.out',
  });
});

// Headline is static — no animation
