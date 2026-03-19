import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const BubbleMenu = ({ 
  logo, 
  items, 
  menuAriaLabel = "Toggle navigation", 
  menuBg = "#ffffff", 
  menuContentColor = "#111111",
  useFixedPosition = false,
  animationEase = "backOut",
  animationDuration = 0.5,
  staggerDelay = 0.12
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    open: {
      transition: {
        staggerChildren: staggerDelay,
      }
    },
    closed: {
      transition: {
        staggerChildren: staggerDelay,
        staggerDirection: -1,
      }
    }
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        ease: animationEase,
        duration: animationDuration
      }
    },
    closed: {
      y: -50,
      opacity: 0,
      scale: 0.3,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className={`${useFixedPosition ? 'fixed bottom-8 right-8' : 'relative'} z-[60]`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={containerVariants}
            className="absolute top-14 right-0 flex flex-col items-end gap-3 mt-4"
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                style={{ rotate: item.rotation }}
                whileHover={{ scale: 1.1, rotate: 0 }}
              >
                <Link
                  to={item.href}
                  aria-label={item.ariaLabel}
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 rounded-full shadow-lg transition-all text-sm font-bold block whitespace-nowrap"
                  style={{
                    backgroundColor: menuBg,
                    color: menuContentColor,
                    ...(item.hoverStyles ? { '--hover-bg': item.hoverStyles.bgColor, '--hover-text': item.hoverStyles.textColor } : {})
                  }}
                  onMouseEnter={(e) => {
                    if (item.hoverStyles) {
                      e.currentTarget.style.backgroundColor = item.hoverStyles.bgColor;
                      e.currentTarget.style.color = item.hoverStyles.textColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = menuBg;
                    e.currentTarget.style.color = menuContentColor;
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label={menuAriaLabel}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95"
        style={{ backgroundColor: menuBg, color: menuContentColor }}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          logo || <div className="font-bold text-xl">M</div>
        )}
      </button>
    </div>
  );
};

export default BubbleMenu;
