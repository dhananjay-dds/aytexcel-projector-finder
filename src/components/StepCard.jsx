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
                "relative group flex flex-col items-center justify-center p-8 rounded-xl border transition-all duration-300 w-full h-full min-h-[200px]",
                isSelected
                    ? "bg-dark-800 border-orange-400 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                    : "bg-dark-800/50 border-dark-700 hover:border-orange-400/50 hover:bg-dark-800"
            )}
        >
            <div className={clsx(
                "p-4 rounded-full mb-6 transition-colors duration-300",
                isSelected ? "bg-orange-400 text-black" : "bg-dark-700 text-orange-400 group-hover:bg-orange-400 group-hover:text-black"
            )}>
                <Icon size={32} strokeWidth={1.5} />
            </div>

            <h3 className={clsx(
                "text-lg font-medium mb-2 transition-colors duration-300",
                isSelected ? "text-orange-400" : "text-white group-hover:text-orange-400"
            )}>
                {option.label}
            </h3>

            {option.sub && (
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                    {option.sub}
                </span>
            )}
        </motion.button>
    );
};

export default StepCard;
