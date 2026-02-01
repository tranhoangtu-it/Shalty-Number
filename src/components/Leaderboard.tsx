import React from 'react';
import { motion } from 'framer-motion';
import type { LeaderboardEntry } from '../hooks/useLeaderboard';

interface LeaderboardProps {
    entries: LeaderboardEntry[];
    onClose: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries, onClose }) => {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/95 backdrop-blur-md p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-md bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-2xl"
            >
                <h2 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6">
                    🏆 TOP 10 🏆
                </h2>

                {entries.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No scores yet. Be the first!</p>
                ) : (
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                        {entries.map((entry, index) => (
                            <motion.div
                                key={`${entry.name}-${entry.date}-${index}`}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className={`flex items-center justify-between p-3 rounded-lg ${index === 0 ? 'bg-yellow-500/20 border border-yellow-500/50' :
                                        index === 1 ? 'bg-gray-400/20 border border-gray-400/50' :
                                            index === 2 ? 'bg-orange-600/20 border border-orange-600/50' :
                                                'bg-gray-700/50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`text-2xl font-black w-8 ${index === 0 ? 'text-yellow-400' :
                                            index === 1 ? 'text-gray-300' :
                                                index === 2 ? 'text-orange-400' :
                                                    'text-gray-500'
                                        }`}>
                                        {index + 1}
                                    </span>
                                    <div>
                                        <p className="font-bold text-white truncate max-w-[120px]">{entry.name}</p>
                                        <p className="text-xs text-gray-400">Level {entry.level} • {entry.date}</p>
                                    </div>
                                </div>
                                <span className="text-xl font-bold text-green-400">{entry.score}</span>
                            </motion.div>
                        ))}
                    </div>
                )}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors"
                >
                    Close
                </motion.button>
            </motion.div>
        </div>
    );
};
