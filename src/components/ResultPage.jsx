import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCcw } from 'lucide-react';
import LeadForm from './LeadForm';

const ResultPage = ({ recommendation, onRestart, roomSize, selections }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formInterest, setFormInterest] = useState('');

    if (!recommendation) return null;

    // Price Logic
    const multiplier = roomSize === 'Large' ? 1.5 : roomSize === 'Medium' ? 1.2 : 1;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(Math.round(price * multiplier));
    };

    const minPrice = formatPrice(recommendation.basePrice.min);
    const maxPrice = formatPrice(recommendation.basePrice.max);
    const priceRangeDisplay = `${minPrice} - ${maxPrice}`;

    const handleSpecificModelClick = () => {
        setFormInterest("Specific Model Inquiry");
        setIsFormOpen(true);
    };

    const handleGetProposalClick = () => {
        setFormInterest(recommendation.name);
        setIsFormOpen(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl mx-auto"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Image Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    <img
                        src={recommendation.image}
                        alt={recommendation.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-6 left-6 z-20">
                        <span className="inline-block px-3 py-1 bg-orange-400 text-black text-xs font-bold uppercase tracking-wider rounded-sm mb-2">
                            Perfect Match
                        </span>
                    </div>
                </motion.div>

                {/* Content Section */}
                <div className="text-left">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl md:text-5xl font-serif text-white mb-4 leading-tight"
                    >
                        {recommendation.name}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-400 text-lg mb-8"
                    >
                        {recommendation.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8 p-6 bg-dark-800/50 border border-dark-700 rounded-xl"
                    >
                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Estimated Cost ({roomSize} Room)</p>
                        <div className="text-2xl md:text-3xl text-orange-400 font-light">
                            {priceRangeDisplay}
                        </div>
                        <p className="text-gray-400 text-xs mt-2 italic">
                            *Includes Professional Installation & Calibration
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleGetProposalClick}
                                className="flex-1 bg-orange-400 text-black px-8 py-4 rounded-lg font-medium hover:bg-orange-500 transition-colors flex items-center justify-center gap-2 group"
                            >
                                Get Detailed Proposal
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={onRestart}
                                className="px-8 py-4 rounded-lg border border-dark-700 text-gray-400 hover:text-white hover:border-white transition-colors flex items-center justify-center gap-2"
                            >
                                <RefreshCcw size={20} />
                                Start Over
                            </button>
                        </div>

                        <button
                            onClick={handleSpecificModelClick}
                            className="text-gray-400 text-xs hover:text-orange-400 transition-colors text-center sm:text-left underline underline-offset-4"
                        >
                            Looking for a specific model? (e.g., Klipschorn, La Scala)
                        </button>
                    </motion.div>
                </div>
            </div>

            <LeadForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                product={formInterest}
                selections={selections}
                roomSize={roomSize}
                recommendation={recommendation}
            />
        </motion.div>
    );
};

export default ResultPage;
