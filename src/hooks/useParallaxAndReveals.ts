import { useEffect } from 'react';

/**
 * Hook implementing the exact logic from the user's imported JavaScript script:
 * 1. IntersectionObserver for .reveal elements adding .is-visible
 * 2. Parallax on .parallax and [data-scroll-bg] on scroll
 * 3. Mouse pointer tracking on .hero-mark.parallax with data-mouse-depth
 */
export function useParallaxAndReveals() {
  useEffect(() => {
    // 1. Intersection Observer for .reveal elements
    const observedElements = new WeakSet<Element>();

    const checkElementVisibility = (element: Element) => {
      const rect = element.getBoundingClientRect();
      // If already within or intersecting viewport, reveal immediately
      if (rect.top < window.innerHeight + 50 && rect.bottom > -50) {
        element.classList.add('is-visible');
        return true;
      }
      return false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '60px 0px' }
    );

    const observeElement = (element: Element) => {
      if (observedElements.has(element)) return;
      observedElements.add(element);

      if (checkElementVisibility(element)) {
        return;
      }
      observer.observe(element);
    };

    const scanAndObserve = () => {
      const revealElements = document.querySelectorAll('.reveal:not(.is-visible)');
      revealElements.forEach((element) => observeElement(element));
    };

    scanAndObserve();

    // 2. MutationObserver to handle dynamically mounted React elements
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldScan = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          shouldScan = true;
          break;
        }
      }
      if (shouldScan) {
        scanAndObserve();
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 3. Scroll Parallax for .parallax and [data-scroll-bg]
    let ticking = false;

    function updateParallax() {
      const middle = window.innerHeight / 2;
      const parallaxItems = document.querySelectorAll<HTMLElement>('.parallax');
      const scrollBackgrounds = document.querySelectorAll<HTMLElement>('[data-scroll-bg]');

      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.parallax || 0.05);
        const offset = (item.getBoundingClientRect().top - middle) * speed;
        item.style.setProperty('--parallax-y', `${offset}px`);
      });

      scrollBackgrounds.forEach((section) => {
        const speed = Number(section.dataset.scrollBg || 0.08);
        const offset = (section.getBoundingClientRect().top - middle) * speed;
        section.style.setProperty('--scroll-bg-y', `${offset}px`);
      });

      ticking = false;
    }

    const onScroll = () => {
      if (!ticking && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax();

    // 4. Pointermove for .hero-mark.parallax
    const onPointerMove = (event: PointerEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const x = event.clientX - window.innerWidth / 2;
      const y = event.clientY - window.innerHeight / 2;
      const heroMarks = document.querySelectorAll<HTMLElement>('.hero-mark.parallax');

      heroMarks.forEach((mark) => {
        const depth = Number(mark.dataset.mouseDepth || 0);
        mark.style.setProperty('--mouse-x', `${x * depth}px`);
        mark.style.setProperty('--mouse-y', `${y * depth}px`);
      });
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);
}
