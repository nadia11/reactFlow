import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export const BubbleChatBox: React.FC<Props> = ({ className,children }) => {
  const [position, setPosition] = useState({ x: 1000, y: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const chatBoxElement = chatBoxRef.current;
    if (chatBoxElement) {
      const rect = chatBoxElement.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
      chatBoxElement.style.cursor = 'grabbing';
    }
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    },
    [isDragging, dragOffset]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    const chatBoxElement = chatBoxRef.current;
    if (chatBoxElement) {
      chatBoxElement.style.cursor = 'grab';
    }
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);



  return (
    <div
      ref={chatBoxRef}
      className={cn(
        'absolute bg-[#f1f2f9] border-gray-300 shadow-lg cursor-grab z-[9999] min-h-[400px] max-w-md w-full  max-h-[700px] rounded-xl',
        className
      )}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={handleMouseDown}
    >

      {children}
    </div>
  );
};

export default BubbleChatBox;
