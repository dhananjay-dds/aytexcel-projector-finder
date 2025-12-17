import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const StepCard = ({ option, isSelected, onClick }) => {
    const Icon = option.icon;

    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={clsx(
                "relative group flex flex-col items-center justify-center p-8 rounded-xl transition-all duration-300 w-full h-full min-h-[220px]",
                isSelected
                    ? "bg-blue-50 border-2 border-blue-600 shadow-xl" // Keep 2px for selected to pop
                    : "bg-white border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-md hover:-translate-y-1" // 1px for unselected + shadow-sm
            )}
        >
            <div className={clsx(
                "p-4 rounded-full mb-6 transition-colors duration-300 flex items-center justify-center",
                isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600"
            )}>
                <Icon size={48} strokeWidth={1.5} /> {/* Increased to 48 (w-12) */}
            </div>

            <h3 className={clsx(
                "text-lg font-bold mb-3 text-center transition-colors duration-300",
                isSelected ? "text-blue-900" : "text-gray-800 group-hover:text-blue-700"
            )}>
                {option.label}
            </h3>

            {option.description && (
                <p className={clsx(
                    "text-sm text-center leading-relaxed max-w-[90%]",
                    isSelected ? "text-blue-800" : "text-gray-500 group-hover:text-gray-700"
                )}>
                    {option.description}
                </p>
            )}
        </motion.button>
    );
};

export default StepCard;
