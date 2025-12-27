'use client';

import React, { useState, useEffect } from 'react';

interface TextTypeProps {
  text: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string;
  className?: string;
}

export const TextType: React.FC<TextTypeProps> = ({
  text,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 1500,
  loop = false,
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  className = '',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursorState, setShowCursorState] = useState(true);

  useEffect(() => {
    if (!isTyping && !isDeleting && !loop) {
      // Typing complete, no loop - just show cursor
      return;
    }

    if (isTyping && currentIndex < text.length) {
      // Typing phase
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
        
        if (currentIndex + 1 >= text.length) {
          setIsTyping(false);
          if (loop) {
            // Wait before starting to delete
            setTimeout(() => {
              setIsDeleting(true);
            }, pauseDuration);
          }
        }
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }

    if (isDeleting && loop && displayedText.length > 0) {
      // Deleting phase (only if loop is true)
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length - 1));
        
        if (displayedText.length <= 1) {
          setIsDeleting(false);
          setCurrentIndex(0);
          setIsTyping(true);
        }
      }, deletingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isTyping, isDeleting, text, typingSpeed, deletingSpeed, pauseDuration, loop, displayedText]);

  // Cursor blinking animation
  useEffect(() => {
    if (!showCursor) {
      setShowCursorState(false);
      return;
    }

    if (hideCursorWhileTyping && isTyping) {
      setShowCursorState(false);
      return;
    }

    const interval = setInterval(() => {
      setShowCursorState((prev) => !prev);
    }, 530); // Blink speed

    return () => clearInterval(interval);
  }, [showCursor, hideCursorWhileTyping, isTyping]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && showCursorState && (
        <span className="text-type__cursor">{cursorCharacter}</span>
      )}
    </span>
  );
};

