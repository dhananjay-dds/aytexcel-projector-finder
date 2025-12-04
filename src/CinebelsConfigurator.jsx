import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { STEPS, getRecommendation } from './data/recommendations';
import StepWizard from './components/StepWizard';
import ResultPage from './components/ResultPage';
import LeadForm from './components/LeadForm';

function CinebelsConfigurator() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selections, setSelections] = useState({
    usage: null,
    room: null,
    budget: null
  });
  const [roomSize, setRoomSize] = useState('Small');
  const [showResult, setShowResult] = useState(false);
  const [isExpertFormOpen, setIsExpertFormOpen] = useState(false);

  const handleSelection = (stepId, value) => {
    setSelections(prev => ({ ...prev, [stepId]: value }));

    // Move to next step after a brief delay for visual feedback
    setTimeout(() => {
      if (currentStepIndex < STEPS.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        setShowResult(true);
      }
    }, 400);
  };

  const handleRestart = () => {
    setSelections({ usage: null, room: null, budget: null });
    setRoomSize('Small');
    setCurrentStepIndex(0);
    setShowResult(false);
  };

  const handleExpertClick = () => {
    setIsExpertFormOpen(true);
  };

  const currentStep = STEPS[currentStepIndex];
  const recommendation = showResult ? getRecommendation(selections) : null;

  return (
    <div className="min-h-screen bg-dark-900 text-white flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-dark-800 via-dark-900 to-black opacity-80 pointer-events-none" />

      <div className="z-10 w-full max-w-4xl">
        <header className="mb-12 text-center">
          <img src="/assets/cinebels-logo.png" alt="Cinebels" className="h-12 mx-auto mb-4" />
          <p className="text-gray-400 text-sm tracking-[0.2em] uppercase">Home Audio Configurator</p>
        </header>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <StepWizard
              key="wizard"
              step={currentStep}
              currentStepIndex={currentStepIndex}
              totalSteps={STEPS.length}
              onSelect={(value) => handleSelection(currentStep.id, value)}
              selectedValue={selections[currentStep.id]}
              onExpertClick={handleExpertClick}
              roomSize={roomSize}
              setRoomSize={setRoomSize}
            />
          ) : (
            <ResultPage
              key="result"
              recommendation={recommendation}
              onRestart={handleRestart}
              roomSize={roomSize}
              selections={selections}
            />
          )}
        </AnimatePresence>
      </div>

      <LeadForm
        isOpen={isExpertFormOpen}
        onClose={() => setIsExpertFormOpen(false)}
        product="Expert Consultation"
        selections={selections}
        roomSize={roomSize}
      />
    </div>
  );
}

export default CinebelsConfigurator;
