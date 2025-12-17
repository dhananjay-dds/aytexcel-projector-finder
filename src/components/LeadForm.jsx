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
New Lead from Aytexcel Configurator:

User Details:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

System Interest: ${formData.interest}

Configuration Details:
Usage: ${selections?.useCase ? selections.useCase.toUpperCase() : 'N/A'}
Room Context: ${selections?.roomLight ? selections.roomLight.toUpperCase() : 'N/A'}
Recommended Tier: ${selections?.budget ? selections.budget.toUpperCase() : 'N/A'}

Recommendation:
System: ${recommendation?.name || 'N/A'}
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
                    subject: "New Aytexcel Lead - Configurator",
                    message: message,
                    from_name: "Aytexcel Configurator"
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
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white border border-gray-100 rounded-xl p-8 max-w-md w-full relative shadow-2xl"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {status === 'success' ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received</h3>
                            <p className="text-gray-600 mb-6">
                                Our expert will contact you shortly with your personalized proposal.
                            </p>
                            <button
                                onClick={onClose}
                                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                            >
                                CLOSE
                            </button>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Request Proposal</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Get a detailed quote for <span className="font-semibold text-blue-600">{product}</span>.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type="hidden" name="interest" value={formData.interest} />

                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-gray-300"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Phone</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                            <span className="text-gray-400 font-medium pr-2 border-r border-gray-200">+91</span>
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            pattern="[0-9]{10}"
                                            maxLength="10"
                                            className="w-full bg-white border border-gray-300 rounded-md pl-14 pr-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-gray-300"
                                            placeholder="98765 43210"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-gray-300"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md mt-2 hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
