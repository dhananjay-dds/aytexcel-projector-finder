import React from 'react';
import { motion } from 'framer-motion';
import StepCard from './StepCard';

const StepWizard = ({ step, currentStepIndex, totalSteps, onSelect, selectedValue, onExpertClick, roomSize, setRoomSize }) => {
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
                        className={`h-1 rounded-full transition-all duration-300 ${idx <= currentStepIndex ? 'w-8 bg-orange-400' : 'w-2 bg-dark-700'
                            }`}
                    />
                ))}
            </div>

            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-2">{step.question}</h2>
                <p className="text-gray-400 text-sm">Select the option that best fits your needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {step.options.map((option) => (
                    <StepCard
                        key={option.id}
                        option={option}
                        isSelected={selectedValue === option.id}
                        onClick={() => option.id === 'expert' ? onExpertClick() : onSelect(option.id)}
                    />
                ))}
            </div>

            {/* Step 2: Room Size Toggle */}
            {step.id === 'room' && (
                <div className="mt-12 flex justify-center">
                    <div className="bg-dark-800 p-1 rounded-lg flex gap-1 border border-dark-700">
                        {[
                            { value: 'Small', label: 'Small', sub: 'Up to 150 sq. ft.' },
                            { value: 'Medium', label: 'Medium', sub: '150 - 300 sq. ft.' },
                            { value: 'Large', label: 'Large', sub: '300+ sq. ft.' }
                        ].map((sizeOption) => (
                            <button
                                key={sizeOption.value}
                                onClick={() => setRoomSize(sizeOption.value)}
                                className={`px-6 py-3 rounded-md transition-all duration-300 flex flex-col items-center min-w-[140px] ${roomSize === sizeOption.value
                                    ? 'bg-orange-400 text-black shadow-lg'
                                    : 'text-gray-400 hover:text-white hover:bg-dark-700'
                                    }`}
                            >
                                <span className="text-sm font-bold uppercase tracking-wider mb-1">{sizeOption.label}</span>
                                <span className={`text-[10px] ${roomSize === sizeOption.value ? 'text-black/70' : 'text-gray-500'}`}>
                                    {sizeOption.sub}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default StepWizard;
