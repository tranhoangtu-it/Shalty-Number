import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface NameInputProps {
    score: number;
    onSubmit: (name: string) => void;
    onSkip: () => void;
}

export const NameInput: React.FC<NameInputProps> = ({ score, onSubmit, onSkip }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(name);
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/95 backdrop-blur-md p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-sm bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-2xl"
            >
                <h2 className="text-2xl font-black text-center text-white mb-2">
                    🎉 New High Score! 🎉
                </h2>
                <p className="text-4xl font-black text-center text-green-400 mb-6">{score}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Enter your name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name..."
                            maxLength={15}
                            autoFocus
                            className="w-full px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        />
                    </div>

                    <div className="flex gap-3">
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onSkip}
                            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold rounded-lg transition-colors"
                        >
                            Skip
                        </motion.button>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors"
                        >
                            Save
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};
