import React, { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import { ScrollProgress, ScrollToTop } from '../ui/scroll-progress';
import { useSmoothScroll } from '../../hooks/useScrollEffects';
import { Sparkles } from 'lucide-react';
import { CtaButton } from '@/components/ui/cta-button';
import OpeningOrchestrator from '../ui/opening-orchestrator';

import { AntiGravityCanvas } from '../ui/anti-gravity-canvas';

const Layout = ({ children, stars = {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  useSmoothScroll();

  const [showComponentsCard, setShowComponentsCard] = useState(false);
  const [componentsCollapsed, setComponentsCollapsed] = useState(false);
  const cardRef = useRef(null);
  const [bottomOffset, setBottomOffset] = useState(0);
  const [suppressChrome, setSuppressChrome] = useState(false);
  const scrollLimitRef = useRef({ enabled: false, max: 0, touchStartY: 0 });

  const starsConfig = {
    enabled: stars.enabled !== false,
    transparent: stars.transparent ?? false,
    maxStars: stars.maxStars ?? 800,
    hue: stars.hue ?? 0,
    brightness: stars.brightness ?? 1,
    speedMultiplier: stars.speedMultiplier ?? 0.8,
    twinkleIntensity: stars.twinkleIntensity ?? 25,
    className: stars.className ?? 'z-0',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Hide global chrome when mobile menu is open and limit scroll on mobile
  useEffect(() => {
    const cleanupScrollGuards = () => {
      if (scrollLimitRef.current.enabled) {
        window.removeEventListener('scroll', onScrollClamp, { passive: true });
        window.removeEventListener('wheel', onWheelGuard, { passive: false });
        window.removeEventListener('touchstart', onTouchStart, { passive: false });
        window.removeEventListener('touchmove', onTouchMoveGuard, { passive: false });
        scrollLimitRef.current.enabled = false;
      }
      // Restore any body styles if we altered them in the future
    };

    const onScrollClamp = () => {
      const max = scrollLimitRef.current.max;
      if (window.scrollY > max) {
        window.scrollTo(0, max);
      }
    };
    const onWheelGuard = (e) => {
      const max = scrollLimitRef.current.max;
      if (window.scrollY >= max && e.deltaY > 0) {
        e.preventDefault();
      }
    };
    const onTouchStart = (e) => {
      const t = e.touches && e.touches[0];
      if (t) scrollLimitRef.current.touchStartY = t.clientY;
    };
    const onTouchMoveGuard = (e) => {
      const t = e.touches && e.touches[0];
      if (!t) return;
      const dy = scrollLimitRef.current.touchStartY - t.clientY; // positive when scrolling down
      if (dy > 0) {
        const max = scrollLimitRef.current.max;
        if (window.scrollY >= max) {
          e.preventDefault();
        }
      }
    };

    const handler = (e) => {
      const desiredOpen = !!(e?.detail?.open);
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

      if (!isMobile) {
        // Ensure desktop never gets suppressed
        setSuppressChrome(false);
        cleanupScrollGuards();
        return;
      }

      setSuppressChrome(desiredOpen);
      if (desiredOpen) {
        setShowComponentsCard(false);
        // Install scroll guards to clamp to ~50% of page height
        const doc = document.documentElement;
        const max = Math.floor(doc.scrollHeight * 0.5);
        scrollLimitRef.current.max = max;
        if (!scrollLimitRef.current.enabled) {
          window.addEventListener('scroll', onScrollClamp, { passive: true });
          window.addEventListener('wheel', onWheelGuard, { passive: false });
          window.addEventListener('touchstart', onTouchStart, { passive: false });
          window.addEventListener('touchmove', onTouchMoveGuard, { passive: false });
          scrollLimitRef.current.enabled = true;
        }
        // Immediately clamp if already beyond
        if (window.scrollY > max) window.scrollTo(0, max);
      } else {
        cleanupScrollGuards();
      }
    };

    window.addEventListener('dc_mobile_nav', handler);
    return () => {
      window.removeEventListener('dc_mobile_nav', handler);
      cleanupScrollGuards();
    };
  }, []);

  // Mouse spotlight tracking
  useEffect(() => {
    const handle = (e) => {
      const x = e.clientX + 'px';
      const y = e.clientY + 'px';
      document.documentElement.style.setProperty('--spot-x', x);
      document.documentElement.style.setProperty('--spot-y', y);
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  useEffect(() => {
    // Show floating components card on pages except Contact and Components; respect snooze timestamp
    const path = location.pathname.toLowerCase();
    const isContact = path.startsWith('/contact');
    const isComponents = path.startsWith('/components');
    const baseDelay = 2600;
    const nextStr = typeof window !== 'undefined' ? sessionStorage.getItem('dc_components_card_next') : null;
    const until = nextStr ? Math.max(0, Number(nextStr) - Date.now()) : 0;
    const delay = until > 0 ? until : baseDelay;

    // Hide immediately on excluded routes
    if (isContact || isComponents) {
      setShowComponentsCard(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowComponentsCard(true);
      setComponentsCollapsed(true); // start minimized
    }, delay);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Reserve space equal to card height when expanded and near bottom edge
  useEffect(() => {
    const measure = () => {
      if (cardRef.current && showComponentsCard && !componentsCollapsed) {
        const rect = cardRef.current.getBoundingClientRect();
        const nearBottom = rect.bottom > window.innerHeight - 56; // keep content visible if docked near bottom
        setBottomOffset(nearBottom ? rect.height + 24 : 0);
      } else {
        setBottomOffset(0);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [showComponentsCard, componentsCollapsed]);



  return (
    <div className="min-h-screen overflow-hidden relative select-none" style={{ backgroundColor: 'var(--dc-bg)', color: 'var(--dc-text)' }}>
      {/* Rotating Stars Background */}
      {/* Opening Orchestrator (very light, CSS-driven) */}
      <OpeningOrchestrator />

      {starsConfig.enabled && (
        <AntiGravityCanvas className={starsConfig.className} />
      )}

      {/* Futuristic background overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid ol ol-grid" />
        <div className="absolute inset-0 bg-scanlines ol ol-scan" />
        <div className="absolute inset-0 bg-grain" />
        {/* Disable cursor spotlight on components page to avoid perceived flicker over demos */}
        {!location.pathname.toLowerCase().startsWith('/components') && (
          <div className="absolute inset-0 cursor-spotlight ol ol-spot" style={{ '--spot-x': 'var(--spot-x)', '--spot-y': 'var(--spot-y)' }} />
        )}
      </div>

      {!suppressChrome && <ScrollProgress />}
      <Navigation />
      {!suppressChrome && <ScrollToTop />}

      {/* Page Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 px-4 md:px-0 space-y-8 md:space-y-0"
        style={{ paddingBottom: bottomOffset }}
      >
        {children}
      </motion.main>

      {/* Floating non-modal components card (global) */}
      {showComponentsCard && (
        !componentsCollapsed ? (
          <motion.div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-24 z-40" ref={cardRef}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative max-w-md w-[92vw] sm:w-[26rem] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/40 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl" />

              <div className="relative p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/25 to-blue-600/25 border border-white/15 flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5 text-cyan-200" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white font-semibold text-base sm:text-lg">Want to know the components implemented in this website?</h4>
                    <p className="text-slate-300/90 text-sm mt-1">Browse live demos, props, and interactions used across DevCatalyst.</p>
                    <div className="mt-4 flex items-center gap-3">
                      <CtaButton
                        size="md"
                        variant="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          const onComponents = location.pathname.toLowerCase().startsWith('/components');
                          if (onComponents) {
                            try {
                              window.dispatchEvent(new CustomEvent('dc_open_components', { detail: { action: 'scroll' } }));
                            } catch (_) {}
                          } else {
                            navigate('/components');
                          }
                        }}
                      >
                        Know more
                      </CtaButton>
                      <button
                        className="text-slate-300/80 text-sm underline-offset-4 hover:underline"
                        onClick={() => {
                          setShowComponentsCard(false);
                          try { sessionStorage.setItem('dc_components_card_next', String(Date.now() + 120000)); } catch (e) { void e; }
                        }}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                  <button
                    aria-label="Close"
                    className="ml-auto text-slate-300/70 hover:text-white transition-colors"
                    onClick={() => {
                      setShowComponentsCard(false);
                      try { sessionStorage.setItem('dc_components_card_next', String(Date.now() + 120000)); } catch (e) { void e; }
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setComponentsCollapsed(false)}
            className="fixed bottom-20 right-5 md:bottom-24 md:right-8 z-40 inline-flex items-center justify-center w-12 h-12 p-0 rounded-2xl bg-gradient-to-r from-cyan-500/30 to-blue-600/30 border border-white/25 text-slate-100 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)] safe-bottom safe-right touch-target"
            title="Open components info"
            aria-label="Open components info"
          >
            <Sparkles className="w-6 h-6 text-cyan-100" />
          </motion.button>
        )
      )}
    </div>
  );
};

export default Layout;
