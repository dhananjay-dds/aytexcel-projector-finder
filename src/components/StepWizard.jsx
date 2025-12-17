import React from 'react';
import { motion } from 'framer-motion';
import StepCard from './StepCard';

const StepWizard = ({ step, currentStepIndex, totalSteps, onSelect, selectedValue, onExpertClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
        >
            {/* Progress Indicator */}
            <div className="flex justify-center mb-8 gap-2">
                {Array.from({ length: totalSteps }).map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-300 ${idx <= currentStepIndex ? 'w-8 bg-aytexcel-blue' : 'w-2 bg-gray-300'
                            }`}
                    />
                ))}
            </div>

            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-light text-aytexcel-text mb-2">{step.question}</h2>
                <p className="text-gray-400 text-sm">Select the option that best fits your needs</p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
                {step.options.map((option) => (
                    <div key={option.id} className="w-full md:w-80">
                        <StepCard
                            option={option}
                            isSelected={selectedValue === option.id}
                            onClick={() => option.id === 'expert' ? onExpertClick() : onSelect(option.id)}
                        />
                    </div>
                ))}
            </div>

            {/* Step 2: Room Size Toggle - REMOVED for Projector Tool */}
        </motion.div>
    );
};

export default StepWizard;
