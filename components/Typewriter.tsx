import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  /** When set to true, immediately reveals the full text */
  skip?: boolean;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 30,
  onComplete,
  skip = false,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  // Stable ref so the interval closure always calls the latest onComplete
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Reset animation whenever the source text changes (new scene)
  useEffect(() => {
    setDisplayedText('');
    setIsDone(false);
  }, [text]);

  // Handle click-to-skip (skip prop flipped to true externally)
  useEffect(() => {
    if (skip && !isDone) {
      setDisplayedText(text);
      setIsDone(true);
      onCompleteRef.current?.();
    }
  }, [skip, text, isDone]);

  // Typewriter interval — runs character by character
  useEffect(() => {
    // Already finished (via skip or natural completion)
    if (isDone) return;

    let index = displayedText.length;

    // Edge-case: text is empty or already fully shown
    if (index >= text.length) {
      setIsDone(true);
      onCompleteRef.current?.();
      return;
    }

    const timer = setInterval(() => {
      index += 1;
      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(timer);
        setIsDone(true);
        onCompleteRef.current?.();
      }
    }, speed);

    // Cleanup: clear interval on unmount or when deps change
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, isDone]);

  return (
    <span>
      {displayedText}
      {!isDone && (
        <span className="cursor-blink text-blood-red font-bold" aria-hidden="true">
          |
        </span>
      )}
    </span>
  );
};
