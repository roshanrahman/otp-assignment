import { useEffect, useRef, useState } from "react";

/**
 * useCountdownTimer lets you create countdown timers that countdown from the given number. Ticks every 1 second.
 *
 * @param {number} countFrom Seconds to countdown from.
 *
 */
export function useCountdownTimer(countFrom: number) {
  const FREQUENCY = 1000;
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(countFrom);
  const timerRef = useRef<number | undefined>();

  const startTimer = () => {
    setCountdown(countFrom);
    setIsActive(true);
  };
  const resetTimer = () => {
    setIsActive(false);
    setCountdown(countFrom);
  };

  const updateCountdownUntilZero = () => {
    setCountdown((countdown) => countdown - 1);
  };

  useEffect(() => {
    if (countdown === 0) {
      setIsActive(false);
    }
  }, [countdown]);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        updateCountdownUntilZero();
      }, FREQUENCY);
    } else {
      clearInterval(timerRef.current);
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, [isActive]);

  return { startTimer, countdown, isActive, resetTimer };
}
