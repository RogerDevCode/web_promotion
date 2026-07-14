window.openWhatsAppWithFallback = function openWhatsAppWithFallback(url) {
  const popup = window.open(url, '_blank', 'noopener');

  if (popup) {
    try {
      popup.focus();
    } catch (error) {
      // Ignore focus issues from strict browsers.
    }
    return true;
  }

  window.location.href = url;
  return false;
};

window.themeController = window.themeController || (() => {
  const root = document.documentElement;
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';

  function readStoredTheme() {
    try {
      return window.localStorage ? window.localStorage.getItem('theme') : null;
    } catch (error) {
      return null;
    }
  }

  function writeStoredTheme(theme) {
    try {
      if (window.localStorage) {
        window.localStorage.setItem('theme', theme);
      }
    } catch (error) {
      // Ignore storage restrictions from embedded/privacy contexts.
    }
  }

  function applyTheme(theme) {
    const normalizedTheme = theme === DARK_THEME ? DARK_THEME : LIGHT_THEME;
    root.classList.toggle('light-theme', normalizedTheme === LIGHT_THEME);
    root.dataset.theme = normalizedTheme;

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', normalizedTheme === DARK_THEME ? '#282A36' : '#EAEAE1');
    }

    return normalizedTheme;
  }

  return {
    DARK_THEME,
    LIGHT_THEME,
    applyTheme,
    readStoredTheme,
    writeStoredTheme,
    getInitialTheme() {
      return readStoredTheme() === DARK_THEME ? DARK_THEME : LIGHT_THEME;
    },
  };
})();

window.landingApp = function landingApp() {
  const themeController = window.themeController;

  return {
    mobileMenu: false,
    showVideo: false,
    planTimes: { esencial: 0, profesional: 0, premium: 0 },
    activePlan: null,
    hoverStart: null,
    darkMode: themeController ? themeController.getInitialTheme() === themeController.DARK_THEME : false,

    syncTheme(nextTheme) {
      if (themeController) {
        themeController.writeStoredTheme(nextTheme);
        this.darkMode = themeController.applyTheme(nextTheme) === themeController.DARK_THEME;
        return;
      }

      this.darkMode = nextTheme === 'dark';
      document.documentElement.classList.toggle('light-theme', !this.darkMode);
    },

    init() {
      this.syncTheme(this.darkMode ? 'dark' : 'light');
    },

    toggleTheme() {
      this.syncTheme(this.darkMode ? 'light' : 'dark');
    },

    startPlanHover(plan) {
      this.activePlan = plan;
      this.hoverStart = Date.now();
    },

    endPlanHover(plan) {
      if (this.activePlan === plan && this.hoverStart) {
        this.planTimes[plan] += Date.now() - this.hoverStart;
        this.activePlan = null;
        this.hoverStart = null;
      }
    },

    getMostViewedPlan() {
      let maxTime = 0;
      let mostViewed = 'Atención Clara';
      const planLabels = {
        esencial: 'Presencia Propia',
        profesional: 'Atención Clara',
        premium: 'Venta Activa',
      };

      for (const [plan, time] of Object.entries(this.planTimes)) {
        if (time > maxTime) {
          maxTime = time;
          mostViewed = planLabels[plan] || plan;
        }
      }

      return mostViewed;
    },
  };
};
