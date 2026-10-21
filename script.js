/**
 * ============================================================================
 * PORTFOLIO WEBSITE JAVASCRIPT
 * Description: Modular, accessible, and event-driven interactivity
 * Features:
 *   1. Accessible Theme Manager (Dark/Light mode toggle with persistence)
 *   2. Mobile Hamburger Navigation Menu (Accessible keyboard & touch support)
 *   3. Client-Side Contact Form Validation & Accessible Status Announcements
 *   4. Active Navigation Link Highlighting on Scroll (IntersectionObserver)
 * Compliant with: AGENTS.md Specifications
 * ============================================================================
 */

(() => {
  'use strict';

  /* ==========================================================================
     1. THEME MANAGER (Dark / Light Mode Toggle)
     ========================================================================== */
  const ThemeManager = (() => {
    const STORAGE_KEY = 'portfolio-theme';
    const THEME_ATTR = 'data-theme';
    const themeToggleBtn = document.getElementById('theme-toggle');

    /**
     * Determines the initial theme based on localStorage or system preferences.
     * @returns {'light' | 'dark'}
     */
    const getPreferredTheme = () => {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    /**
     * Applies the theme to the root HTML document and updates accessibility attributes.
     * @param {'light' | 'dark'} theme
     */
    const applyTheme = (theme) => {
      document.documentElement.setAttribute(THEME_ATTR, theme);

      if (themeToggleBtn) {
        const isDark = theme === 'dark';
        themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        const accessibleLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';
        themeToggleBtn.setAttribute('aria-label', accessibleLabel);
        themeToggleBtn.setAttribute('title', accessibleLabel);
      }
    };

    /**
     * Toggles between light and dark themes and persists preference.
     */
    const toggleTheme = () => {
      const currentTheme = document.documentElement.getAttribute(THEME_ATTR) || getPreferredTheme();
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, newTheme);
      applyTheme(newTheme);
    };

    /**
     * Initializes theme listeners and default state.
     */
    const init = () => {
      const initialTheme = getPreferredTheme();
      applyTheme(initialTheme);

      if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
      }

      // Listen for system theme changes if user hasn't set an explicit preference
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    };

    return { init };
  })();

  /* ==========================================================================
     2. MOBILE NAVIGATION CONTROLLER
     ========================================================================== */
  const NavigationController = (() => {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const primaryNav = document.getElementById('primary-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    /**
     * Sets the open or closed state of the mobile menu.
     * @param {boolean} isOpen
     */
    const setMenuState = (isOpen) => {
      if (!primaryNav || !mobileMenuToggle) return;

      primaryNav.classList.toggle('is-open', isOpen);
      mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
      mobileMenuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
      );
    };

    /**
     * Toggles the current menu state.
     */
    const toggleMenu = () => {
      const isCurrentlyExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      setMenuState(!isCurrentlyExpanded);
    };

    /**
     * Closes the mobile navigation menu.
     */
    const closeMenu = () => {
      setMenuState(false);
    };

    /**
     * Initializes mobile menu event listeners.
     */
    const init = () => {
      if (!mobileMenuToggle || !primaryNav) return;

      // Click event for hamburger button
      mobileMenuToggle.addEventListener('click', toggleMenu);

      // Close menu when clicking on any navigation anchor link
      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          closeMenu();
        });
      });

      // Close menu when pressing Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
          closeMenu();
          mobileMenuToggle.focus();
        }
      });

      // Close menu when clicking outside of navbar
      document.addEventListener('click', (e) => {
        if (
          primaryNav.classList.contains('is-open') &&
          !primaryNav.contains(e.target) &&
          !mobileMenuToggle.contains(e.target)
        ) {
          closeMenu();
        }
      });

      // Reset menu state when resizing window to desktop breakpoint (> 1024px)
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && primaryNav.classList.contains('is-open')) {
          closeMenu();
        }
      });
    };

    return { init };
  })();

  /* ==========================================================================
     3. CONTACT FORM VALIDATOR & ACCESSIBLE SUBMISSION
     ========================================================================== */
  const ContactFormValidator = (() => {
    const form = document.getElementById('contact-form');
    if (!form) return { init: () => {} };

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('contact-submit-btn');

    /**
     * Clears error messages for a specified field.
     * @param {HTMLElement} inputElement
     * @param {string} errorElementId
     */
    const clearError = (inputElement, errorElementId) => {
      const errorSpan = document.getElementById(errorElementId);
      if (errorSpan) errorSpan.textContent = '';
      inputElement.removeAttribute('aria-invalid');
    };

    /**
     * Sets error messages and accessibility attributes for an invalid field.
     * @param {HTMLElement} inputElement
     * @param {string} errorElementId
     * @param {string} message
     */
    const setError = (inputElement, errorElementId, message) => {
      const errorSpan = document.getElementById(errorElementId);
      if (errorSpan) errorSpan.textContent = message;
      inputElement.setAttribute('aria-invalid', 'true');
    };

    /**
     * Validates email format using standard regex.
     * @param {string} email
     * @returns {boolean}
     */
    const isValidEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    /**
     * Validates all form inputs.
     * @returns {boolean}
     */
    const validateForm = () => {
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        setError(nameInput, 'name-error', 'Please enter your full name.');
        isValid = false;
      } else if (nameInput.value.trim().length < 2) {
        setError(nameInput, 'name-error', 'Name must be at least 2 characters long.');
        isValid = false;
      } else {
        clearError(nameInput, 'name-error');
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        setError(emailInput, 'email-error', 'Please enter your email address.');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        setError(emailInput, 'email-error', 'Please provide a valid email format (e.g., name@example.com).');
        isValid = false;
      } else {
        clearError(emailInput, 'email-error');
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        setError(subjectInput, 'subject-error', 'Please provide a message subject.');
        isValid = false;
      } else {
        clearError(subjectInput, 'subject-error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        setError(messageInput, 'message-error', 'Please enter your message.');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        setError(messageInput, 'message-error', 'Message must be at least 10 characters long.');
        isValid = false;
      } else {
        clearError(messageInput, 'message-error');
      }

      return isValid;
    };

    /**
     * Handles form submission with simulated feedback.
     * @param {Event} e
     */
    const handleSubmit = (e) => {
      e.preventDefault();

      if (!validateForm()) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please correct the errors in the form before submitting.';
        }
        return;
      }

      // Display sending progress
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Message...';
      }

      if (formStatus) {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
      }

      // Simulate network request latency (1.2 seconds)
      setTimeout(() => {
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
        }

        form.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Message</span><span aria-hidden="true">&rarr;</span>';
        }

        // Auto-clear success message after 7 seconds
        setTimeout(() => {
          if (formStatus) {
            formStatus.className = 'form-status';
            formStatus.textContent = '';
          }
        }, 7000);
      }, 1200);
    };

    const init = () => {
      form.addEventListener('submit', handleSubmit);

      // Real-time error clearance on user input
      nameInput.addEventListener('input', () => clearError(nameInput, 'name-error'));
      emailInput.addEventListener('input', () => clearError(emailInput, 'email-error'));
      subjectInput.addEventListener('input', () => clearError(subjectInput, 'subject-error'));
      messageInput.addEventListener('input', () => clearError(messageInput, 'message-error'));
    };

    return { init };
  })();

  /* ==========================================================================
     4. SCROLL SPY (Active Navigation Link Highlighting)
     ========================================================================== */
  const ScrollSpy = (() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const init = () => {
      if (!('IntersectionObserver' in window) || sections.length === 0) return;

      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activeId = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              if (href === `#${activeId}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
              } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
              }
            });
          }
        });
      }, observerOptions);

      sections.forEach((section) => observer.observe(section));
    };

    return { init };
  })();

  /* ==========================================================================
     INITIALIZATION ON DOM READY
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    NavigationController.init();
    ContactFormValidator.init();
    ScrollSpy.init();
  });
})();
