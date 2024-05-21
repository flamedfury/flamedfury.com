document.addEventListener('DOMContentLoaded', function () {
  const themeToggleBtn = document.querySelector('#theme-toggle');
  const themeLabel = document.querySelector('#theme-label');
  const lightIcon = document.querySelector('.light-icon');
  const darkIcon = document.querySelector('.dark-icon');
  const storageKey = 'theme-preference';

  // Fetches the color preference from localStorage or system settings
  function getColorPreference() {
    const storedPreference = localStorage.getItem(storageKey);
    if (storedPreference) {
      return storedPreference;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  let currentTheme = getColorPreference();

  function updateTheme() {
    const isDark = currentTheme === 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem(storageKey, currentTheme);

    themeLabel.textContent = isDark ? '{{ meta.themeSwitch.dark }}' : '{{ meta.themeSwitch.light }}';
    themeToggleBtn.setAttribute('aria-pressed', isDark);
    lightIcon.style.display = isDark ? 'none' : 'block';
    darkIcon.style.display = isDark ? 'block' : 'none';
  }

  themeToggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    updateTheme();
  });

  // Add event listener for system color scheme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    currentTheme = e.matches ? 'dark' : 'light';
    updateTheme();
  });

  updateTheme(); // Initialize theme on load
});