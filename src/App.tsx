import { useGameLogic, LEVELS } from './hooks/useGameLogic';
import { Grid } from './components/Grid';
import { HUD } from './components/HUD';
import { GameScreen } from './components/GameScreens';

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

    restartGame,
    isMaxLevel
  } = useGameLogic();

  // Simple particle/background effect could go here

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans select-none">

      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="z-10 w-full max-w-4xl flex flex-col items-center">

        {/* Header / Title (only show if not playing to save space, or keep small) */}
        {status !== 'playing' && status !== 'level_complete' && (
          <header className="mb-8 text-center">
            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 tracking-tight">
              SHALTY NUMBER
            </h1>
            <p className="text-gray-400 mt-2">Find the numbers in order. Fast.</p>
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
      {status === 'idle' && (
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
          onAction={startGame}
          color="blue"
          score={score}
        />
      )}

      {status === 'won' && (
        <GameScreen
          title="VICTORY!"
          subtitle="You became the Master of Shalty."
          actionText="PLAY AGAIN"
          onAction={restartGame}
          color="yellow"
          score={score}
        />
      )}

      {status === 'lost' && (
        <GameScreen
          title="GAME OVER"
          subtitle={`You ran out of time at Level ${level}.`}
          actionText="TRY AGAIN"
          onAction={restartGame}
          color="red"
          score={score}
        />
      )}

    </div>
  );
}

export default App;
