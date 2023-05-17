// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('@contexts/Instruction', () => ({
  useInstruction: () => ({
    isOpen: false,
    step: 0,
    open: jest.fn(),
    next: jest.fn(),
    previous: jest.fn(),
    end: jest.fn(),
  }),
}));

Storage.prototype.setItem = jest.fn();
Storage.prototype.getItem = jest.fn();
