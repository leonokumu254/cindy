import { CONFIG } from '../constants';
import './StartSection.css';

interface StartSectionProps {
  onStart: () => void;
}

export default function StartSection({ onStart }: StartSectionProps) {
  return (
    <div 
      className="start-section"
      style={{ 
        backgroundColor: CONFIG.colors.deepNight,
      }}
    >
      <div className="overlay" />
      
      <div className="start-content">
        <h1 
          className="start-title"
          style={{ 
            fontFamily: CONFIG.typography.nameFont,
          }}
        >
          For My love ❤️
        </h1>
        
        <button
          onClick={onStart}
          className="start-button"
          style={{ 
            backgroundColor: CONFIG.colors.accent,
            fontFamily: CONFIG.typography.bodyFont,
          }}
        >
          Click to open
        </button>
      </div>
    </div>
  );
}
