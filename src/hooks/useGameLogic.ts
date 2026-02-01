import { useState, useEffect, useCallback, useRef } from 'react';

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost' | 'level_complete';

export interface NumberCell {
    id: number;
    value: number;
    status: 'default' | 'found' | 'error';
}

export interface LevelConfig {
    level: number;
    rows: number;
    cols: number;
    timeLimit: number; // in seconds
}

export const LEVELS: LevelConfig[] = [
    { level: 1, rows: 3, cols: 3, timeLimit: 40 },
    { level: 2, rows: 4, cols: 4, timeLimit: 40 },
    { level: 3, rows: 5, cols: 5, timeLimit: 40 },
    { level: 4, rows: 6, cols: 6, timeLimit: 50 }, // Increased time for larger grids
    { level: 5, rows: 7, cols: 7, timeLimit: 60 },
];

export const useGameLogic = () => {
    const [status, setStatus] = useState<GameStatus>('idle');
    const [levelIndex, setLevelIndex] = useState(0);
    const [numbers, setNumbers] = useState<NumberCell[]>([]);
    const [nextExpected, setNextExpected] = useState(1);
    const [timeLeft, setTimeLeft] = useState(0);
    const [score, setScore] = useState(0);

    const timerRef = useRef<number | null>(null);

    const currentLevelConfig = LEVELS[levelIndex];

    const generateNumbers = useCallback((rows: number, cols: number) => {
        const total = rows * cols;
        const nums = Array.from({ length: total }, (_, i) => i + 1);

        // Fisher-Yates shuffle
        for (let i = nums.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }

        return nums.map((val, idx) => ({
            id: idx,
            value: val,
            status: 'default',
        } as NumberCell));
    }, []);

    const startGame = useCallback(() => {
        const config = LEVELS[levelIndex];
        setNumbers(generateNumbers(config.rows, config.cols));
        setNextExpected(1);
        setTimeLeft(config.timeLimit);
        setStatus('playing');
    }, [levelIndex, generateNumbers]);

    const nextLevel = useCallback(() => {
        if (levelIndex < LEVELS.length - 1) {
            setLevelIndex(prev => prev + 1);
            // Don't auto-start next level, let user click "Next Level"
            setStatus('level_complete');
        } else {
            setStatus('won');
        }
    }, [levelIndex]);

    const restartGame = useCallback(() => {
        setLevelIndex(0);
        setScore(0);
        // State effect will trigger start game if we handle it there, but here we can just reset and let user click start
        setStatus('idle');
    }, []);

    const handleCellClick = useCallback((id: number) => {
        if (status !== 'playing') return;

        setNumbers(prev => {
            const cell = prev.find(n => n.id === id);
            if (!cell || cell.status === 'found') return prev;

            if (cell.value === nextExpected) {
                // Correct
                const newNext = nextExpected + 1;
                setNextExpected(newNext);
                setScore(s => s + 10 * (levelIndex + 1)); // Score multiplier

                // Check if level complete
                if (newNext > prev.length) {
                    // Level Done
                    // We'll handle status change in useEffect or here? 
                    // Better here to avoid race conditions visually
                    setTimeout(() => nextLevel(), 500); // Slight delay for visual satisfaction
                }

                return prev.map(n => n.id === id ? { ...n, status: 'found' } : n);
            } else {
                // Incorrect - maybe flash red?
                // For now simple verify
                return prev; // No penalty implemented yet, just visual feedback logic could go here
            }
        });
    }, [status, nextExpected, nextLevel, levelIndex]);

    // Timer Logic
    useEffect(() => {
        if (status === 'playing' && timeLeft > 0) {
            timerRef.current = window.setInterval(() => {
                setTimeLeft(t => {
                    if (t <= 1) {
                        setStatus('lost');
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [status, timeLeft]);

    return {
        status,
        level: currentLevelConfig.level,
        numbers,
        nextExpected,
        timeLeft,
        score,
        startGame,
        handleCellClick,
        nextLevel, // To be called manually if we pause at level complete
        restartGame,
        isMaxLevel: levelIndex === LEVELS.length - 1
    };
};
