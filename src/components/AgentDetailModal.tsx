
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { agentData } from '@/data/agentFlows';
import ProcessTimeline from './ProcessTimeline';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface AgentDetailModalProps {
    type: 'mt' | 'crypto';
    onClose: () => void;
}

const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const contentVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0, y: 20 },
    visible: { 
        scale: 1, 
        opacity: 1, 
        y: 0,
        transition: {
            delay: 0.1,
            duration: 0.3,
            ease: "easeOut"
        }
    },
};

const AgentDetailModal: React.FC<AgentDetailModalProps> = ({ type, onClose }) => {
    const data = agentData[type];
    const buttonBg = type === 'mt' ? 'bg-gold hover:bg-gold/90' : 'bg-green hover:bg-green/90';
    const buttonTextColor = 'text-dark-charcoal';
    const navigate = useNavigate();

    const handleStart = () => {
        if (type === 'mt') {
            navigate('/agents?active=mt4mt5');
        } else if (type === 'crypto') {
            navigate('/agents?active=crypto');
        }
        onClose();
    };

    let logosToDisplay = data.logos;
    if (type === 'mt') {
        logosToDisplay = data.logos.filter(logo => !['Visa', 'Mastercard', 'Phantom'].includes(logo.alt));
        logosToDisplay.push(
            { src: '/uploads/2793e622-138a-4554-833b-e21e68dd92cf.png', alt: 'Visa & Mastercard' },
            { src: '/logos/usdt-official.svg', alt: 'USDT' }
        );
    }

    return (
        <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                variants={contentVariants}
                className={`bg-card rounded-2xl border ${type === 'mt' ? 'border-gold/20' : 'border-green/20'} p-8 w-full max-w-4xl relative shadow-lg shadow-black/50`}
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close modal"
                >
                    <X size={24} />
                </button>
                
                <div className="flex items-start gap-4 mb-6">
                    <h2 className="text-3xl font-bold text-white flex-grow" >
                        {data.title}
                    </h2>
                    <div className="flex items-center gap-2 flex-wrap justify-end flex-shrink-0">
                        {logosToDisplay.map(logo => {
                            if (logo.src.includes('placeholder')) {
                                return <div key={logo.alt} className="text-white text-sm bg-white/10 rounded px-2 py-1">{logo.alt}</div>;
                            }
                            
                            let className = 'object-contain';
                            if (logo.alt === 'MT4/MT5 Logo') {
                                className += ' w-24 h-auto';
                            } else if (logo.alt === 'Visa & Mastercard') {
                                className += ' h-8 w-auto';
                            } else {
                                className += ' w-8 h-8';
                            }

                            return (
                                <img 
                                    key={logo.alt}
                                    src={logo.src}
                                    alt={logo.alt}
                                    className={className}
                                />
                            );
                        })}
                    </div>
                </div>
                
                <p className="text-gray-300 mb-8 max-w-3xl">{data.description}</p>
                
                <ProcessTimeline timeline={data.timeline} theme={type === 'mt' ? 'gold' : 'green'} />
                
                <div className="mt-8 text-center">
                    <Button onClick={handleStart} className={`${buttonBg} ${buttonTextColor} font-bold px-8 py-3 text-lg`}>
                        Start with this Agent
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AgentDetailModal;
