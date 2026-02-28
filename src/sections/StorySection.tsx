import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { CONFIG } from '../constants';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import './StorySection.css';

interface StorySectionProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function StorySection({ onComplete, onBack }: StorySectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const currentCard = CONFIG.storyCards[currentIndex];

  useGSAP(() => {
    if (!currentCard) return;

    // Animate content in when index changes
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    setIsAnimating(true);

    tl.fromTo(imageRef.current, 
      { opacity: 0, scale: 1.1, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' }
    )
    .fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.8'
    );

  }, { scope: containerRef, dependencies: [currentIndex] });

  const handleNext = () => {
    if (isAnimating) return;

    if (currentIndex < CONFIG.storyCards.length - 1) {
      setIsAnimating(true);
      // Animate out
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          setCurrentIndex(prev => prev + 1);
          // Reset for animate in (handled by useGSAP)
          gsap.set(contentRef.current, { opacity: 1, y: 0 });
          // isAnimating will be set to false by useGSAP after animate in
        }
      });
    } else {
      onComplete();
    }
  };

  const handleBackClick = () => {
    if (isAnimating) return;

    if (currentIndex > 0) {
      setIsAnimating(true);
      // Animate out reverse
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        onComplete: () => {
          setCurrentIndex(prev => prev - 1);
          gsap.set(contentRef.current, { opacity: 1, y: 0 });
        }
      });
    } else {
      onBack();
    }
  };

  if (!currentCard) return null;

  return (
    <div 
      ref={containerRef}
      className="story-section"
    >
      <button onClick={handleBackClick} className="back-button" aria-label="Go Back">
        <ArrowLeft size={24} />
      </button>

      {/* Blurred Background for Atmosphere */}
      <div 
        className="story-bg-blur"
        style={{ backgroundImage: `url(${currentCard.image})` }}
      />

      <div 
        ref={contentRef}
        className="story-container"
      >
        {/* Image Card */}
        <div className="story-image-card">
          <img 
            ref={imageRef}
            src={currentCard.image} 
            alt="Memory" 
            className="story-image"
          />
        </div>

        {/* Text Content */}
        <div className="story-content">
          <p 
            ref={textRef}
            className="story-text"
            style={{ fontFamily: CONFIG.typography.bodyFont }}
          >
            "{currentCard.text}"
          </p>

          <button
            onClick={handleNext}
            className="story-next-button"
            style={{ 
              backgroundColor: CONFIG.colors.secondary,
              fontFamily: CONFIG.typography.bodyFont
            }}
          >
            {currentIndex === CONFIG.storyCards.length - 1 ? "Make a Wish" : "Next"} <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
