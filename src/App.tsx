/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import StartSection from './sections/StartSection';
import HeroSection from './sections/HeroSection';
import StorySection from './sections/StorySection';
import FinaleSection from './sections/FinaleSection';
import AudioPlayer from './components/AudioPlayer';

type Section = 'start' | 'hero' | 'story' | 'finale';

export default function App() {
  const [section, setSection] = useState<Section>('start');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStart = () => {
    setIsPlaying(true);
    setSection('hero');
  };

  const handleHeroNext = () => {
    setSection('story');
  };

  const handleStoryComplete = () => {
    setSection('finale');
  };

  const handleBack = () => {
    if (section === 'hero') setSection('start');
    if (section === 'story') setSection('hero');
    if (section === 'finale') setSection('story');
  };

  return (
    <main className="app-container">
      <AudioPlayer isPlaying={isPlaying} />
      
      <AnimatePresence mode="wait">
        {section === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="full-screen-section"
          >
            <StartSection onStart={handleStart} />
          </motion.div>
        )}

        {section === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="full-screen-section"
          >
            <HeroSection onNext={handleHeroNext} onBack={handleBack} />
          </motion.div>
        )}

        {section === 'story' && (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="full-screen-section"
          >
            <StorySection onComplete={handleStoryComplete} onBack={handleBack} />
          </motion.div>
        )}

        {section === 'finale' && (
          <motion.div
            key="finale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="full-screen-section"
          >
            <FinaleSection onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

