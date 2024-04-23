const storageKey = 'theme-preference';
const lightLabel = '{{ meta.themeSwitch.light }}';
const darkLabel = '{{ meta.themeSwitch.dark }}';

const theme = {
  value: getColorPreference()
};

window.onload = () => {
  const themeToggleButton = document.querySelector('#theme-toggle');
  const switcher = document.querySelector('[data-theme-switcher]');

  if (!switcher) {
    return;
  }

  switcher.removeAttribute('hidden');
  reflectPreference();

  // Event listener for the theme toggle button
  themeToggleButton.addEventListener('click', toggleTheme);

  // Update button's aria-pressed attribute based on the current theme
  themeToggleButton.setAttribute('aria-pressed', theme.value === 'light');

  // Set the button text based on the current theme
  updateButtonText();
};

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  setPreference();
  updateButtonText();
}

function updateButtonText() {
  const themeToggleButton = document.querySelector('#theme-toggle');
  const themeToggleText = document.querySelector('#theme-toggle-text');

  if (theme.value === 'light') {
    // Show "DARK" when in light mode
    themeToggleText.textContent = darkLabel;
    themeToggleButton.setAttribute('aria-pressed', false);
  } else {
    // Show "LIGHT" when in dark mode
    themeToggleText.textContent = lightLabel;
    themeToggleButton.setAttribute('aria-pressed', true);
  }
}

function getColorPreference() {
  if (localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey);
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

function setPreference() {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
}

function reflectPreference() {
  document.firstElementChild.setAttribute('data-theme', theme.value);
  updateButtonText();
}

// Set early so no page flashes / CSS is made aware
reflectPreference();
