import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { CONFIG } from '../constants';
import ParticleCanvas from '../components/ParticleCanvas';
import { ArrowLeft } from 'lucide-react';
import './FinaleSection.css';

interface FinaleSectionProps {
  onBack: () => void;
}

export default function FinaleSection({ onBack }: FinaleSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wishRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(wishRef.current, {
      scale: 0,
      opacity: 0,
      rotation: -15,
      duration: 1.2,
      ease: 'elastic.out(1, 0.3)',
    })
    .to(wishRef.current, {
      scale: 1.1,
      rotation: 2,
      textShadow: `0 0 30px ${CONFIG.colors.highlight}, 0 0 60px ${CONFIG.colors.accent}`,
      repeat: -1,
      yoyo: true,
      duration: 0.4,
      ease: 'power1.inOut'
    });

  }, { scope: containerRef });

  const handleSurprise = () => {
    // Vigorous shake effect
    gsap.fromTo(containerRef.current,
      { x: -10, rotation: -1 },
      { x: 10, rotation: 1, duration: 0.05, repeat: 10, yoyo: true, clearProps: 'x,rotation' }
    );
    
    // Flash effect on the wish
    gsap.to(wishRef.current, {
      scale: 1.3,
      textShadow: `0 0 50px #fff, 0 0 100px ${CONFIG.colors.highlight}`,
      duration: 0.1,
      yoyo: true,
      repeat: 3
    });
  };

  return (
    <div 
      ref={containerRef}
      className="finale-section"
      onClick={handleSurprise}
      style={{ 
        background: `radial-gradient(circle at center, ${CONFIG.colors.deepNight}, #000000)`,
        cursor: 'pointer'
      }}
    >
      <button onClick={onBack} className="back-button" aria-label="Go Back">
        <ArrowLeft size={24} />
      </button>

      <ParticleCanvas />

      <div className="finale-content">
        <h1 
          ref={wishRef}
          className="finale-title"
          style={{ 
            fontFamily: CONFIG.typography.wishFont,
            color: CONFIG.colors.secondary
          }}
        >
          {CONFIG.finalWish}
        </h1>
        
        <p 
          className="finale-subtitle"
          style={{ fontFamily: CONFIG.typography.bodyFont }}
        >
          Made with love by Collo
        </p>
      </div>
    </div>
  );
}
