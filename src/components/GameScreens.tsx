import React from 'react';
import { motion } from 'framer-motion';

interface ScreenProps {
    onAction: () => void;
    title: string;
    subtitle?: string;
    actionText: string;
    color?: string;
    score?: number;
}

export const GameScreen: React.FC<ScreenProps> = ({ onAction, title, subtitle, actionText, color = 'indigo', score }) => {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm p-6">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="flex flex-col items-center text-center max-w-md w-full"
            >
                <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-lg">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
                        {subtitle}
                    </p>
                )}
                {score !== undefined && (
                    <div className="bg-gray-800 px-6 py-3 rounded-lg mb-8 border border-gray-700">
                        <span className="text-gray-400 mr-2">Score:</span>
                        <span className="text-2xl font-bold text-yellow-500">{score}</span>
                    </div>
                )}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onAction}
                    className={`
            px-8 py-4 bg-${color}-600 hover:bg-${color}-500 
            text-white font-bold text-xl rounded-full 
            shadow-[0_0_20px_rgba(79,70,229,0.5)] 
            transition-colors duration-200
          `}
                >
                    {actionText}
                </motion.button>
            </motion.div>
        </div >
    );
};
