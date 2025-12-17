import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Gamepad2, Popcorn, Sun, Moon, Cloud, Ruler } from 'lucide-react';
import StepWizard from './components/StepWizard';
import ResultPage from './components/ResultPage';
import LeadForm from './components/LeadForm';
import { useProjectorRecommendation } from './hooks/useProjectorRecommendation';

const STEPS = [
  {
    id: 'useCase',
    question: "How will you use your projector?",
    options: [
      { id: 'movies', label: "Movies & Sports", icon: Popcorn, description: "Optimized for high contrast, color accuracy, and cinematic motion." },
      { id: 'gaming', label: "Gaming", icon: Gamepad2, description: "Prioritizes ultra-low latency (<20ms) for fast-paced competitive gaming." },
    ]
  },
  {
    id: 'roomLight',
    question: "What is your room's lighting condition?",
    options: [
      { id: 'dark', label: "Dark Room", icon: Moon, description: "Controlled lighting / Basement. Best for contrast." },
      { id: 'dim', label: "Dim / Moderate", icon: Cloud, description: "Some ambient light present. Standard living room." },
      { id: 'bright', label: "Bright Room", icon: Sun, description: "Living room with windows / daytime viewing." },
    ]
  },
  {
    id: 'distance',
    question: "How far is the projector from the screen?",
    options: [
      { id: 0.5, label: "Close (< 1m)", icon: Ruler, description: "Best for TV replacements sitting directly on a cabinet (UST)." },
      { id: 2.5, label: "Standard (2-3m)", icon: Ruler, description: "The classic setup. Projector sits on a coffee table or ceiling mount." },
      { id: 4, label: "Far (3-5m)", icon: Ruler, description: "For dedicated cinema rooms with a projector on a rear shelf." },
      { id: 6, label: "Very Far (5m+)", icon: Ruler, description: "Large dedicated room requiring long-throw lens." },
    ]
  }
];

function CinebelsConfigurator() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selections, setSelections] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isExpertFormOpen, setIsExpertFormOpen] = useState(false);

  // Get recommendations based on current selections
  // Note: We use the hook even if selections aren't complete yet, it just returns empty or partials.
  // We only really care about the result when showResult is true.
  const recommendations = useProjectorRecommendation(
    selections.roomLight,
    selections.distance,
    selections.useCase
  );

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
    setSelections({});
    setCurrentStepIndex(0);
    setShowResult(false);
  };

  const handleExpertClick = () => {
    setIsExpertFormOpen(true);
  };

  const currentStep = STEPS[currentStepIndex];
  // Select the top recommendation
  const topRecommendation = showResult && recommendations.length > 0 ? recommendations[0] : null;

  return (
    <div className="min-h-screen bg-aytexcel-bg text-aytexcel-text flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <div className="z-10 w-full max-w-4xl">
        <header className="mb-8 text-center">
          <img
            src="/images/logo-1.png"
            alt="Aytexcel"
            className="h-10 mx-auto mb-3"
          />
          <p className="text-gray-500 text-sm tracking-[0.2em] uppercase">Projector Finder</p>
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
            />
          ) : (
            <ResultPage
              key="result"
              recommendation={topRecommendation}
              onRestart={handleRestart}
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
      />
    </div>
  );
}

export default CinebelsConfigurator;
