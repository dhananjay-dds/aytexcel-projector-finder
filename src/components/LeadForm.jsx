import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

const LeadForm = ({ isOpen, onClose, product, selections, roomSize, recommendation }) => {
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        interest: ''
    });

    useEffect(() => {
        if (isOpen && product) {
            setFormData(prev => ({ ...prev, interest: product }));
            setStatus('idle');
        }
    }, [isOpen, product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        // Construct the detailed message
        const message = `
New Lead from Cinebels Configurator:

User Details:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

System Interest: ${formData.interest}

Configuration Details:
Usage: ${selections?.usage ? selections.usage.toUpperCase() : 'N/A'}
Room Context: ${selections?.room ? selections.room.toUpperCase() : 'N/A'}
Room Size: ${roomSize || 'N/A'}
Recommended Tier: ${selections?.budget ? selections.budget.toUpperCase() : 'N/A'}

Recommendation:
System: ${recommendation?.name || 'N/A'}
Base Price Range: ${recommendation?.basePrice ? `₹${recommendation.basePrice.min} - ₹${recommendation.basePrice.max}` : 'N/A'}
        `.trim();

        // Web3Forms Submission
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "bd48e8a6-7c5d-4056-87eb-1836be0ed597",
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    subject: "New Cinebels Lead - Configurator",
                    message: message,
                    from_name: "Cinebels Configurator"
                }),
            });

            const result = await response.json();
            if (result.success) {
                setStatus('success');
            } else {
                console.error("Submission failed", result);
                setStatus('error');
            }
        } catch (error) {
            console.error("Form submission error", error);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            // Only allow numbers
            if (/^\d*$/.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-dark-800 border border-dark-700 rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    {status === 'success' ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check size={32} />
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-2">Request Received</h3>
                            <p className="text-gray-400">
                                Our audio expert will contact you shortly with your personalized proposal.
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-8 text-orange-400 hover:text-orange-500 text-sm uppercase tracking-wider"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-2xl font-serif text-orange-400 mb-2">Request Proposal</h3>
                            <p className="text-gray-400 text-sm mb-6">
                                Get a detailed quote for <span className="text-white">{product}</span>.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type="hidden" name="interest" value={formData.interest} />

                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-400 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Phone</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                            <span className="text-gray-400 border-r border-dark-700 pr-3">+91</span>
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            pattern="[0-9]{10}"
                                            maxLength="10"
                                            className="w-full bg-dark-900 border border-dark-700 rounded-lg pl-16 pr-4 py-3 text-white focus:outline-none focus:border-orange-400 transition-colors"
                                            placeholder="98765 43210"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-400 transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full bg-orange-400 text-black font-medium py-4 rounded-lg mt-4 hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Get Detailed Proposal'
                                    )}
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-500 text-xs text-center mt-2">
                                        Something went wrong. Please try again.
                                    </p>
                                )}
                            </form>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LeadForm;
