// components/thought-marquee.tsx
import React from 'react';

interface ThoughtMarqueeProps {
    text: string;
    speed?: 'slow' | 'medium' | 'fast';
    direction?: 'left' | 'right';
    className?: string;
}

export function ThoughtMarquee({
                                   text,
                                   speed = 'medium',
                                   direction = 'left',
                                   className = '',
                               }: ThoughtMarqueeProps) {
    // Define animation using Tailwind's arbitrary values
    const animationClass = direction === 'left'
        ? 'animate-[marqueeLeft_20s_linear_infinite]'
        : 'animate-[marqueeRight_20s_linear_infinite]';

    const speedClasses = {
        slow: '40s',
        medium: '20s',
        fast: '10s',
    };

    return (
        <div className={`relative flex overflow-hidden rounded-lg border bg-card ${className}`}>
            <div className="flex py-3 w-full">
                <div
                    className={`whitespace-nowrap flex ${animationClass}`}
                    style={{
                        animationDuration: speedClasses[speed],
                    }}
                    aria-live="polite"
                >
          <span className="mx-4 text-lg font-medium text-card-foreground">
            ✨ {text} ✨
          </span>
                    {/* Required duplicate for seamless looping */}
                    <span className="mx-4 text-lg font-medium text-card-foreground">
            ✨ {text} ✨
          </span>
                </div>
            </div>
        </div>
    );
}