import { useState } from 'react';
import { useGameLogic, LEVELS } from './hooks/useGameLogic';
import { useLeaderboard } from './hooks/useLeaderboard';
import { Grid } from './components/Grid';
import { HUD } from './components/HUD';
import { GameScreen } from './components/GameScreens';
import { Leaderboard } from './components/Leaderboard';
import { NameInput } from './components/NameInput';

function App() {
  const {
    status,
    level,
    numbers,
    nextExpected,
    timeLeft,
    score,
    startGame,
    handleCellClick,
    nextLevel,
    restartGame,
    isMaxLevel
  } = useGameLogic();

  const { leaderboard, addEntry, isHighScore } = useLeaderboard();

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [pendingScore, setPendingScore] = useState({ score: 0, level: 0 });

  // Check for high score when game ends
  const handleGameEnd = (finalScore: number, finalLevel: number) => {
    if (isHighScore(finalScore)) {
      setPendingScore({ score: finalScore, level: finalLevel });
      setShowNameInput(true);
    }
  };

  // Handle name submission
  const handleNameSubmit = (name: string) => {
    addEntry(name, pendingScore.score, pendingScore.level);
    setShowNameInput(false);
    setShowLeaderboard(true);
  };

  // Handle skip name input
  const handleSkipName = () => {
    addEntry('Anonymous', pendingScore.score, pendingScore.level);
    setShowNameInput(false);
  };

  // Wrapped restart that checks for high score
  const handleRestart = () => {
    if (status === 'won' || status === 'lost') {
      handleGameEnd(score, level);
    } else {
      restartGame();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans select-none">

      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="z-10 w-full max-w-4xl flex flex-col items-center">

        {/* Header / Title */}
        {status !== 'playing' && status !== 'level_complete' && (
          <header className="mb-8 text-center">
            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 tracking-tight">
              SHALTY NUMBER
            </h1>
            <p className="text-gray-400 mt-2">Find the numbers in order. Fast.</p>

            {/* Leaderboard Button */}
            <button
              onClick={() => setShowLeaderboard(true)}
              className="mt-4 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 rounded-lg text-yellow-400 font-bold transition-colors"
            >
              🏆 Leaderboard
            </button>
          </header>
        )}

        {/* Game Area */}
        {status === 'playing' && (
          <>
            <HUD level={level} timeLeft={timeLeft} score={score} nextExpected={nextExpected} />
            <Grid
              numbers={numbers}
              rows={LEVELS.find(l => l.level === level)?.rows || 3}
              cols={LEVELS.find(l => l.level === level)?.cols || 3}
              onCellClick={handleCellClick}
            />
          </>
        )}
      </div>

      {/* Screen Overlays */}
      {status === 'idle' && !showLeaderboard && !showNameInput && (
        <GameScreen
          title="READY?"
          subtitle="Find all numbers from small to large."
          actionText="START GAME"
          onAction={startGame}
          color="green"
        />
      )}

      {status === 'level_complete' && (
        <GameScreen
          title="LEVEL CLEARED!"
          subtitle={isMaxLevel ? "Wait, checking final status..." : "Great job! Ready for the next challenge?"}
          actionText={isMaxLevel ? "FINISH" : "NEXT LEVEL"}
          onAction={nextLevel}
          color="blue"
          score={score}
        />
      )}

      {status === 'won' && !showNameInput && !showLeaderboard && (
        <GameScreen
          title="VICTORY!"
          subtitle="You became the Master of Shalty."
          actionText="SAVE SCORE"
          onAction={handleRestart}
          color="yellow"
          score={score}
        />
      )}

      {status === 'lost' && !showNameInput && !showLeaderboard && (
        <GameScreen
          title="GAME OVER"
          subtitle={`You ran out of time at Level ${level}.`}
          actionText="SAVE SCORE"
          onAction={handleRestart}
          color="red"
          score={score}
        />
      )}

      {/* Name Input Overlay */}
      {showNameInput && (
        <NameInput
          score={pendingScore.score}
          onSubmit={handleNameSubmit}
          onSkip={handleSkipName}
        />
      )}

      {/* Leaderboard Overlay */}
      {showLeaderboard && (
        <Leaderboard
          entries={leaderboard}
          onClose={() => {
            setShowLeaderboard(false);
            if (status === 'won' || status === 'lost') {
              restartGame();
            }
          }}
        />
      )}

    </div>
  );
}

export default App;
