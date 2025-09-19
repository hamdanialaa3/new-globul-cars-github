// src/utils/accessibility.ts
// Accessibility utilities for Bulgarian Car Marketplace

// Generate unique IDs for accessibility
export class AccessibilityUtils {
  private static idCounter = 0;

  static generateId(prefix: string = 'id'): string {
    return `${prefix}-${++this.idCounter}`;
  }

  // ARIA label generators for common elements
  static getAriaLabel(element: string, context?: string): string {
    const labels: { [key: string]: { bg: string; en: string } } = {
      search: {
        bg: 'Търсене на коли',
        en: 'Search cars'
      },
      filter: {
        bg: 'Филтриране на резултатите',
        en: 'Filter results'
      },
      sort: {
        bg: 'Сортиране на резултатите',
        en: 'Sort results'
      },
      favorite: {
        bg: 'Добави в любими',
        en: 'Add to favorites'
      },
      contact: {
        bg: 'Свържи се с продавача',
        en: 'Contact seller'
      },
      share: {
        bg: 'Сподели обявата',
        en: 'Share listing'
      },
      menu: {
        bg: 'Отвори менюто',
        en: 'Open menu'
      },
      close: {
        bg: 'Затвори',
        en: 'Close'
      },
      loading: {
        bg: 'Зареждане',
        en: 'Loading'
      },
      error: {
        bg: 'Грешка',
        en: 'Error'
      }
    };

    const label = labels[element];
    return label ? label.bg : element;
  }

  // Screen reader announcements
  static announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';

    document.body.appendChild(announcement);
    announcement.textContent = message;

    // Remove after announcement
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 1000);
  }

  // Focus management
  static moveFocus(element: HTMLElement | null): void {
    if (element) {
      element.focus();
      // Scroll into view if needed
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Trap focus within a container (for modals, etc.)
  static trapFocus(container: HTMLElement): () => void {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }

      if (e.key === 'Escape') {
        // Find and click the close button if it exists
        const closeButton = container.querySelector('[aria-label*="Затвори"], [aria-label*="Close"]') as HTMLElement;
        if (closeButton) {
          closeButton.click();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    // Focus first element
    if (firstElement) {
      firstElement.focus();
    }

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }

  // Skip link for keyboard navigation
  static createSkipLink(targetId: string, text: string = 'Отиди към основното съдържание'): HTMLElement {
    const skipLink = document.createElement('a');
    skipLink.href = `#${targetId}`;
    skipLink.textContent = text;
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 1000;
      border-radius: 4px;
      font-weight: bold;
    `;

    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });

    return skipLink;
  }
}

// Keyboard navigation utilities
export const KeyboardUtils = {
  // Handle common keyboard interactions
  handleKeyPress: (
    event: React.KeyboardEvent,
    actions: {
      onEnter?: () => void;
      onSpace?: () => void;
      onEscape?: () => void;
      onArrowUp?: () => void;
      onArrowDown?: () => void;
      onArrowLeft?: () => void;
      onArrowRight?: () => void;
    }
  ) => {
    switch (event.key) {
      case 'Enter':
        if (actions.onEnter) {
          event.preventDefault();
          actions.onEnter();
        }
        break;
      case ' ':
        if (actions.onSpace) {
          event.preventDefault();
          actions.onSpace();
        }
        break;
      case 'Escape':
        if (actions.onEscape) {
          event.preventDefault();
          actions.onEscape();
        }
        break;
      case 'ArrowUp':
        if (actions.onArrowUp) {
          event.preventDefault();
          actions.onArrowUp();
        }
        break;
      case 'ArrowDown':
        if (actions.onArrowDown) {
          event.preventDefault();
          actions.onArrowDown();
        }
        break;
      case 'ArrowLeft':
        if (actions.onArrowLeft) {
          event.preventDefault();
          actions.onArrowLeft();
        }
        break;
      case 'ArrowRight':
        if (actions.onArrowRight) {
          event.preventDefault();
          actions.onArrowRight();
        }
        break;
    }
  }
};

// Types for accessibility components (to be used in .tsx files)
export interface AriaLiveRegionProps {
  message: string;
  priority?: 'polite' | 'assertive';
  'aria-label'?: string;
}

export interface AccessibleButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

export interface AccessibleFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  description?: string;
}