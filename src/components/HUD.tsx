import React from 'react';
import { motion } from 'framer-motion';

interface HUDProps {
    level: number;
    timeLeft: number;
    score: number;
    nextExpected: number;
}

export const HUD: React.FC<HUDProps> = ({ level, timeLeft, score, nextExpected }) => {
    const isEmergency = timeLeft <= 10;

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-2xl flex items-center justify-between bg-gray-700/80 backdrop-blur-md p-4 rounded-xl shadow-lg mb-6 border border-gray-600/50"
        >
            <div className="flex flex-col items-center">
                <span className="text-gray-400 text-xs uppercase tracking-wider">Level</span>
                <span className="text-xl font-bold text-blue-400">{level}</span>
            </div>

            <div className="flex flex-col items-center px-4 md:px-8 border-l border-r border-gray-600">
                <span className="text-gray-400 text-xs uppercase tracking-wider">Find</span>
                <span className="text-4xl font-black text-white">{nextExpected}</span>
            </div>

            <div className="flex flex-col items-center">
                <span className="text-gray-400 text-xs uppercase tracking-wider">Time</span>
                <span className={`text-xl font-mono font-bold ${isEmergency ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
                    {timeLeft}s
                </span>
            </div>

            <div className="hidden sm:flex flex-col items-center ml-4">
                <span className="text-gray-400 text-xs uppercase tracking-wider">Score</span>
                <span className="text-xl font-bold text-yellow-400">{score}</span>
            </div>
        </motion.div>
    );
};

