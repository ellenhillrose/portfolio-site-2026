// password-gate.js — loaded only on password-protected work pages
// Passwords should be moved to a server-side check before production.
// For a static Vercel deploy, store the hashed password in an env variable
// and verify via a Vercel Edge Function or serverless function.

const PASSWORDS = {
  // key: page slug, value: plaintext password (replace before deploy)
  'ai-infrastructure': 'knockknock',
  'food-and-beverage': 'knockknock',
  'venture-capital':   'knockknock',
  'retail-pharmacy':   'knockknock',
  'resume':            'knockknock',
  // note: allison-harding is intentionally NOT password-protected
};

const gate  = document.getElementById('passwordGate');
const form  = document.getElementById('passwordForm');
const input = document.getElementById('passwordInput');
const error = document.getElementById('passwordError');

// Derive the current page slug from the URL path (last non-empty segment)
const slug = location.pathname.split('/').filter(Boolean).pop();
const SESSION_KEY = `unlocked-${slug}`;

function unlock() {
  gate.hidden = true;
  document.body.style.overflow = '';
}

// Persist unlock for the session so refresh doesn't re-prompt
if (sessionStorage.getItem(SESSION_KEY)) {
  unlock();
} else {
  document.body.style.overflow = 'hidden';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value === PASSWORDS[slug]) {
    sessionStorage.setItem(SESSION_KEY, '1');
    unlock();
  } else {
    error.hidden = false;
    input.value = '';
    input.focus();
  }
});
