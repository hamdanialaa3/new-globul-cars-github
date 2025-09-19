// src/components/Accessibility.tsx
// Accessibility Components for Bulgarian Car Marketplace

import React from 'react';
import { AccessibilityUtils, AriaLiveRegionProps, AccessibleButtonProps, AccessibleFieldProps } from '../utils/accessibility';

// ARIA live region for dynamic content updates
export const AriaLiveRegion: React.FC<AriaLiveRegionProps> = ({
  message,
  priority = 'polite',
  'aria-label': ariaLabel
}) => {
  return (
    <div
      aria-live={priority}
      aria-label={ariaLabel}
      style={{
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }}
    >
      {message}
    </div>
  );
};

// Accessible button component
export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  onClick,
  children,
  ariaLabel,
  disabled = false,
  variant = 'primary',
  size = 'medium'
}) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  };

  const getBackgroundColor = () => {
    if (disabled) return '#ccc';
    switch (variant) {
      case 'primary': return '#1976d2';
      case 'danger': return '#d32f2f';
      default: return '#757575';
    }
  };

  return (
    <button
      onClick={onClick}
      onKeyPress={handleKeyPress}
      aria-label={ariaLabel}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      style={{
        padding: getPadding(),
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: getFontSize(),
        fontWeight: '500',
        backgroundColor: getBackgroundColor(),
        color: 'white',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease'
      }}
    >
      {children}
    </button>
  );
};

// Accessible form field wrapper
export const AccessibleField: React.FC<AccessibleFieldProps> = ({
  label,
  error,
  required = false,
  children,
  description
}) => {
  const fieldId = AccessibilityUtils.generateId('field');
  const errorId = error ? AccessibilityUtils.generateId('error') : undefined;
  const descId = description ? AccessibilityUtils.generateId('desc') : undefined;

  const describedBy = [errorId, descId].filter(Boolean).join(' ') || undefined;

  return (
    <div style={{ marginBottom: '16px' }}>
      <label
        htmlFor={fieldId}
        style={{
          display: 'block',
          marginBottom: '4px',
          fontWeight: '500',
          color: error ? '#d32f2f' : '#333'
        }}
      >
        {label}
        {required && <span style={{ color: '#d32f2f' }} aria-label="Задължително"> *</span>}
      </label>

      {description && (
        <p
          id={descId}
          style={{
            margin: '0 0 8px 0',
            fontSize: '14px',
            color: '#666'
          }}
        >
          {description}
        </p>
      )}

      <div>
        {React.isValidElement(children) ? (
          React.cloneElement(children, {
            id: fieldId,
            'aria-describedby': describedBy,
            'aria-invalid': !!error,
            'aria-required': required
          } as any)
        ) : (
          children
        )}
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          style={{
            margin: '4px 0 0 0',
            fontSize: '14px',
            color: '#d32f2f'
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

// Skip navigation component
export const SkipNavigation: React.FC = () => {
  React.useEffect(() => {
    const skipLink = AccessibilityUtils.createSkipLink('main-content', 'Отиди към основното съдържание');
    document.body.insertBefore(skipLink, document.body.firstChild);

    return () => {
      if (skipLink.parentNode) {
        skipLink.parentNode.removeChild(skipLink);
      }
    };
  }, []);

  return null;
};

// Screen reader only text
export const ScreenReaderOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <span
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0'
      }}
    >
      {children}
    </span>
  );
};

// Focus trap hook for modals
export const useFocusTrap = (containerRef: React.RefObject<HTMLElement>) => {
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cleanup = AccessibilityUtils.trapFocus(container);
    return cleanup;
  }, [containerRef]);
};