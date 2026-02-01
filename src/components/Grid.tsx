import React from 'react';
import { motion } from 'framer-motion';
import type { NumberCell } from '../hooks/useGameLogic';

interface GridProps {
    numbers: NumberCell[];
    rows: number;
    cols: number;
    onCellClick: (id: number) => void;
}

export const Grid: React.FC<GridProps> = ({ numbers, cols, onCellClick }) => {
    return (
        <div
            className="grid gap-2 sm:gap-4 p-4 bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl max-w-full border border-gray-700/50"
            style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`
            }}
        >
            {numbers.map((cell, index) => (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.02, type: "spring", stiffness: 300, damping: 20 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    key={cell.id}
                    onClick={() => onCellClick(cell.id)}
                    disabled={cell.status === 'found'}
                    className={`
            aspect-square flex items-center justify-center
            text-2xl sm:text-4xl font-bold rounded-md transition-all duration-100 transform active:scale-95
            ${cell.status === 'found'
                            ? 'bg-green-600 text-transparent opacity-50 cursor-default scale-95'
                            : 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg'}
          `}
                >
                    {cell.status !== 'found' && cell.value}
                </motion.button>
            ))}
        </div>
    );
};
