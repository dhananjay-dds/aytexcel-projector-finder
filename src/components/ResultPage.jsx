import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCcw, CheckCircle, Package } from 'lucide-react';
import LeadForm from './LeadForm';

const ResultPage = ({ recommendation, onRestart, selections }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formInterest, setFormInterest] = useState('');

    if (!recommendation) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl text-gray-500">No specific match found for these tough criteria.</h3>
                <button
                    onClick={onRestart}
                    className="mt-4 text-aytexcel-blue underline"
                >
                    Try different settings
                </button>
            </div>
        );
    }

    const { name, price, originalPrice, description, image, features, bundle, recommendedAddOn, lumens, type } = recommendation;

    // Format Price
    const formatPrice = (p) => new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(p);

    const handleGetProposalClick = () => {
        setFormInterest(bundle ? `${name} + Bundle` : name);
        setIsFormOpen(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-6xl mx-auto"
        >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                {/* Left Column: Product Image */}
                <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 relative">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-auto object-contain max-h-[500px]"
                    />
                    <div className="absolute top-6 right-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-lg">
                            <CheckCircle size={16} /> Best Match
                        </span>
                    </div>
                </div>

                {/* Right Column: Content */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3"
                        >
                            {name}
                        </motion.h2>

                        {/* Computed Description */}
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            {description || `Experience ${lumens} Lumens of brightness with this premium ${type} projector.`}
                        </p>

                        {/* Features Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {features && features.map((feature, idx) => (
                                <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold uppercase tracking-wide rounded-md">
                                    {feature}
                                </span>
                            ))}
                            {type && (
                                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold uppercase tracking-wide rounded-md">
                                    {type} Type
                                </span>
                            )}
                        </div>

                        {/* Bundle / Add-on Section */}
                        {(bundle || recommendedAddOn) && (
                            <div className="mb-8 p-5 bg-blue-50 border border-blue-100 rounded-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/5 rounded-bl-full pointer-events-none" />
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600">
                                        <Package size={24} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">
                                            {bundle ? 'Included Bundle' : 'Recommended Add-on'}
                                        </h4>
                                        {bundle ? (
                                            <div className="text-sm text-gray-700">
                                                <p className="font-medium text-blue-700 mb-1">{bundle.name}</p>
                                                {bundle.components && (
                                                    <ul className="text-gray-500 text-xs space-y-1">
                                                        {bundle.components.map((c, i) => <li key={i} className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full" /> {c}</li>)}
                                                    </ul>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-700 font-medium">
                                                {recommendedAddOn}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pricing and Action - Bottom of Right Column */}
                    <div className="mt-8 border-t border-gray-100 pt-8">
                        <div className="flex flex-col items-end gap-1 mb-6">
                            <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
                                Estimated Total Price
                            </span>
                            <div className="flex items-baseline gap-3">
                                {originalPrice && (
                                    <span className="text-lg text-gray-400 line-through decoration-gray-300">
                                        {formatPrice(originalPrice)}
                                    </span>
                                )}
                                <span className="text-4xl md:text-5xl font-extrabold text-blue-600">
                                    {formatPrice(bundle ? bundle.discountedPrice || price : price)}
                                </span>
                            </div>
                            <span className="text-xs text-gray-400 mt-1">Includes all taxes & delivery</span>
                        </div>

                        <div className="flex gap-4 w-full">
                            <button
                                onClick={onRestart}
                                className="px-6 py-4 rounded-xl border border-gray-200 text-gray-500 font-medium hover:text-gray-800 hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <RefreshCcw size={18} />
                            </button>
                            <button
                                onClick={handleGetProposalClick}
                                className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
                            >
                                Check Availability
                                <ArrowRight size={20} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <LeadForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                product={formInterest}
                selections={selections}
                recommendation={recommendation}
            />
        </motion.div>
    );
};

export default ResultPage;
