import { renderHook, act } from '@testing-library/react-hooks';
import { when } from 'jest-when';

const { useInstruction, INSTRUCTION_COMPLETED_KEY } = jest.requireActual('@contexts/Instruction');

describe('useInstruction', () => {
  let hook;

  beforeEach(() => {
    hook = renderHook(() => useInstruction());
  });

  it('should be open by default', () => {
    expect(hook.result.current.isOpen).toBe(true);
  });

  it('should be at step 0 by default', () => {
    expect(hook.result.current.step).toBe(0);
  });

  describe('when ending', () => {
    beforeEach(() => {
      act(() => hook.result.current.end());
    });

    it('should be marked as completed', () => {
      expect(localStorage.setItem).toHaveBeenCalledWith(INSTRUCTION_COMPLETED_KEY, true);
    });
  });

  describe('when already completed', () => {
    beforeEach(() => {
      when(localStorage.getItem).calledWith(INSTRUCTION_COMPLETED_KEY).mockReturnValue(true);
      hook = renderHook(() => useInstruction());
    });

    it('should not be open', () => {
      expect(hook.result.current.isOpen).toBe(false);
    });

    describe('when opening', () => {
      beforeEach(() => {
        act(() => hook.result.current.open());
      });

      it('should be forced open', () => {
        expect(hook.result.current.isOpen).toBe(true);
      });
    });
  });

  describe('when going to next step', () => {
    beforeEach(() => {
      act(() => hook.result.current.next());
    });

    it('should be on step 1', () => {
      expect(hook.result.current.step).toBe(1);
    });
  });

  describe('when current step is 1', () => {
    beforeEach(() => {
      hook = renderHook(() => useInstruction(1));
    });

    describe('when going to previous step', () => {
      beforeEach(() => {
        act(() => hook.result.current.previous());
      });

      it('should be on step 0', () => {
        expect(hook.result.current.step).toBe(0);
      });
    });
  });
});
