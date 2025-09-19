// src/utils/__tests__/accessibility.test.ts
// Unit tests for accessibility utilities

import { AccessibilityUtils, KeyboardUtils } from '../accessibility';

describe('AccessibilityUtils', () => {
  describe('generateId', () => {
    test('should generate unique IDs', () => {
      const id1 = AccessibilityUtils.generateId();
      const id2 = AccessibilityUtils.generateId();
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^id-\d+$/);
    });

    test('should generate IDs with custom prefix', () => {
      const id = AccessibilityUtils.generateId('test');
      expect(id).toMatch(/^test-\d+$/);
    });
  });

  describe('getAriaLabel', () => {
    test('should return correct Bulgarian ARIA labels', () => {
      expect(AccessibilityUtils.getAriaLabel('search')).toBe('Търсене на коли');
      expect(AccessibilityUtils.getAriaLabel('filter')).toBe('Филтриране на резултатите');
      expect(AccessibilityUtils.getAriaLabel('close')).toBe('Затвори');
    });

    test('should return element name for unknown labels', () => {
      expect(AccessibilityUtils.getAriaLabel('unknown')).toBe('unknown');
    });
  });

  describe('announceToScreenReader', () => {
    beforeEach(() => {
      // Mock document.body.appendChild and removeChild
      document.body.appendChild = jest.fn();
      document.body.removeChild = jest.fn();
    });

    test('should create and remove announcement element', () => {
      const mockElement = {
        setAttribute: jest.fn(),
        style: {},
        textContent: ''
      };
      document.createElement = jest.fn().mockReturnValue(mockElement);
      document.body.appendChild = jest.fn();
      document.body.removeChild = jest.fn();

      AccessibilityUtils.announceToScreenReader('Test message');

      expect(document.createElement).toHaveBeenCalledWith('div');
      expect(mockElement.setAttribute).toHaveBeenCalledWith('aria-live', 'polite');
      expect(mockElement.setAttribute).toHaveBeenCalledWith('aria-atomic', 'true');
      expect(mockElement.textContent).toBe('Test message');
      expect(document.body.appendChild).toHaveBeenCalledWith(mockElement);
    });
  });

  describe('moveFocus', () => {
    test('should focus element and scroll into view', () => {
      const mockElement = {
        focus: jest.fn(),
        scrollIntoView: jest.fn()
      };

      AccessibilityUtils.moveFocus(mockElement as any);

      expect(mockElement.focus).toHaveBeenCalled();
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'center'
      });
    });

    test('should handle null element gracefully', () => {
      expect(() => AccessibilityUtils.moveFocus(null)).not.toThrow();
    });
  });
});

describe('KeyboardUtils', () => {
  describe('handleKeyPress', () => {
    test('should call onEnter for Enter key', () => {
      const mockOnEnter = jest.fn();
      const event = { key: 'Enter', preventDefault: jest.fn() } as any;

      KeyboardUtils.handleKeyPress(event, { onEnter: mockOnEnter });

      expect(mockOnEnter).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    test('should call onSpace for Space key', () => {
      const mockOnSpace = jest.fn();
      const event = { key: ' ', preventDefault: jest.fn() } as any;

      KeyboardUtils.handleKeyPress(event, { onSpace: mockOnSpace });

      expect(mockOnSpace).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    test('should call onEscape for Escape key', () => {
      const mockOnEscape = jest.fn();
      const event = { key: 'Escape', preventDefault: jest.fn() } as any;

      KeyboardUtils.handleKeyPress(event, { onEscape: mockOnEscape });

      expect(mockOnEscape).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    test('should call onArrowUp for ArrowUp key', () => {
      const mockOnArrowUp = jest.fn();
      const event = { key: 'ArrowUp', preventDefault: jest.fn() } as any;

      KeyboardUtils.handleKeyPress(event, { onArrowUp: mockOnArrowUp });

      expect(mockOnArrowUp).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    test('should not call handlers for unmapped keys', () => {
      const mockHandler = jest.fn();
      const event = { key: 'A', preventDefault: jest.fn() } as any;

      KeyboardUtils.handleKeyPress(event, { onEnter: mockHandler });

      expect(mockHandler).not.toHaveBeenCalled();
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });
});