import { useState, useEffect } from 'react';

export interface LeaderboardEntry {
    name: string;
    score: number;
    level: number;
    date: string;
}

const LEADERBOARD_KEY = 'shalty_leaderboard';
const MAX_ENTRIES = 10;

export const useLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(LEADERBOARD_KEY);
        if (stored) {
            try {
                setLeaderboard(JSON.parse(stored));
            } catch {
                setLeaderboard([]);
            }
        }
    }, []);

    const addEntry = (name: string, score: number, level: number) => {
        const newEntry: LeaderboardEntry = {
            name: name.trim() || 'Anonymous',
            score,
            level,
            date: new Date().toLocaleDateString('vi-VN'),
        };

        const updated = [...leaderboard, newEntry]
            .sort((a, b) => b.score - a.score)
            .slice(0, MAX_ENTRIES);

        setLeaderboard(updated);
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));

        return updated.findIndex(e => e === newEntry) + 1; // Return rank (1-indexed)
    };

    const isHighScore = (score: number) => {
        if (leaderboard.length < MAX_ENTRIES) return true;
        return score > leaderboard[leaderboard.length - 1].score;
    };

    const clearLeaderboard = () => {
        setLeaderboard([]);
        localStorage.removeItem(LEADERBOARD_KEY);
    };

    return {
        leaderboard,
        addEntry,
        isHighScore,
        clearLeaderboard,
    };
};
