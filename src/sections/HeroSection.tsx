import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { CONFIG } from '../constants';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import './HeroSection.css';

interface HeroSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export default function HeroSection({ onNext, onBack }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(containerRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut',
    })
    .from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.5')
    .from(buttonRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
    }, '-=0.2');

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="hero-section"
    >
      <button onClick={onBack} className="back-button" aria-label="Go Back">
        <ArrowLeft size={24} />
      </button>

      {/* Background Image */}
      <div 
        className="hero-bg"
        style={{ backgroundImage: `url(${CONFIG.assets.heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="hero-overlay"
        style={{ 
          background: `linear-gradient(to bottom, ${CONFIG.colors.deepNight}80, ${CONFIG.colors.accent}40)` 
        }}
      />

      {/* Content */}
      <div className="hero-content">
        <div ref={textRef}>
          <h3 
            className="hero-subtitle"
            style={{ fontFamily: CONFIG.typography.nameFont }}
          >
            Happy Birthday
          </h3>
          <h1 
            className="hero-title"
            style={{ 
              fontFamily: CONFIG.typography.subtitlefont,
            }}
          >
            {CONFIG.nickname}
          </h1>
        </div>

        <button
          ref={buttonRef}
          onClick={onNext}
          className="hero-next-button"
          aria-label="Start Story"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}
