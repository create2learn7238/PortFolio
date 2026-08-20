import { useState, useEffect, useCallback } from 'react';
import { playClickSound, playErrorSound } from '../../utils/audio';

const BOARD_SIZES = {
  beginner: { rows: 9, cols: 9, mines: 10 },
  intermediate: { rows: 12, cols: 12, mines: 20 },
};

function generateGrid(diff) {
  const { rows, cols, mines } = BOARD_SIZES[diff];
  let newGrid = Array(rows).fill(null).map(() =>
    Array(cols).fill(null).map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      count: 0,
    }))
  );

  let placedMines = 0;
  while (placedMines < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!newGrid[r][c].isMine) {
      newGrid[r][c].isMine = true;
      placedMines++;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (newGrid[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && newGrid[nr][nc].isMine) {
            count++;
          }
        }
      }
      newGrid[r][c].count = count;
    }
  }
  return newGrid;
}

export default function MinesweeperApp() {
  const [difficulty, setDifficulty] = useState('beginner');
  const [grid, setGrid] = useState(() => generateGrid('beginner'));
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [mineCount, setMineCount] = useState(BOARD_SIZES.beginner.mines);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isFlagMode, setIsFlagMode] = useState(false);

  const resetGame = useCallback((diff = difficulty) => {
    setGrid(generateGrid(diff));
    setGameOver(false);
    setGameWon(false);
    setMineCount(BOARD_SIZES[diff].mines);
    setTimer(0);
    setTimerActive(false);
  }, [difficulty]);

  const handleDifficultyChange = (diff) => {
    setDifficulty(diff);
    resetGame(diff);
  };

  const handleCellClick = (r, c) => {
    if (isFlagMode) {
      toggleFlag(r, c);
    } else {
      revealCell(r, c);
    }
  };

  useEffect(() => {
    let interval;
    if (timerActive && !gameOver && !gameWon) {
      interval = setInterval(() => {
        setTimer((t) => Math.min(t + 1, 999));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, gameOver, gameWon]);

  const revealCell = (r, c) => {
    if (gameOver || gameWon || grid[r][c].isRevealed || grid[r][c].isFlagged) return;

    playClickSound();
    if (!timerActive) setTimerActive(true);

    const { rows, cols } = BOARD_SIZES[difficulty];
    let newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));

    if (newGrid[r][c].isMine) {
      // Game Over
      playErrorSound();
      setGameOver(true);
      setTimerActive(false);
      // Reveal all mines
      newGrid.forEach((row) =>
        row.forEach((cell) => {
          if (cell.isMine) cell.isRevealed = true;
        })
      );
      setGrid(newGrid);
      return;
    }

    // Flood fill algorithm
    const queue = [[r, c]];
    newGrid[r][c].isRevealed = true;

    while (queue.length > 0) {
      const [currR, currC] = queue.shift();
      if (newGrid[currR][currC].count === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = currR + dr;
            const nc = currC + dc;
            if (
              nr >= 0 &&
              nr < rows &&
              nc >= 0 &&
              nc < cols &&
              !newGrid[nr][nc].isRevealed &&
              !newGrid[nr][nc].isFlagged
            ) {
              newGrid[nr][nc].isRevealed = true;
              if (newGrid[nr][nc].count === 0) {
                queue.push([nr, nc]);
              }
            }
          }
        }
      }
    }

    setGrid(newGrid);

    // Check Win
    let unrevealedNonMines = 0;
    newGrid.forEach((row) =>
      row.forEach((cell) => {
        if (!cell.isMine && !cell.isRevealed) unrevealedNonMines++;
      })
    );

    if (unrevealedNonMines === 0) {
      setGameWon(true);
      setTimerActive(false);
    }
  };

  const toggleFlag = (e, r, c) => {
    e.preventDefault();
    if (gameOver || gameWon || grid[r][c].isRevealed) return;

    playClickSound();
    let newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const target = newGrid[r][c];

    if (!target.isFlagged && mineCount > 0) {
      target.isFlagged = true;
      setMineCount((m) => m - 1);
    } else if (target.isFlagged) {
      target.isFlagged = false;
      setMineCount((m) => m + 1);
    }

    setGrid(newGrid);
  };

  const getNumberColor = (count) => {
    const colors = [
      '',
      'text-blue-600 font-bold',
      'text-green-600 font-bold',
      'text-red-600 font-bold',
      'text-purple-800 font-bold',
      'text-amber-800 font-bold',
      'text-teal-600 font-bold',
      'text-black font-bold',
      'text-gray-600 font-bold',
    ];
    return colors[count] || '';
  };

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] p-2 select-none border-2 border-white shadow-inner font-mono text-xs overflow-y-auto">
      {/* Menu bar */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-gray-400 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDifficultyChange('beginner')}
            className={`px-2 py-0.5 rounded cursor-pointer ${difficulty === 'beginner' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-300'}`}
          >
            9x9
          </button>
          <button
            onClick={() => handleDifficultyChange('intermediate')}
            className={`px-2 py-0.5 rounded cursor-pointer ${difficulty === 'intermediate' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-300'}`}
          >
            12x12
          </button>
        </div>

        {/* Flag mode button */}
        <button
          onClick={() => setIsFlagMode((prev) => !prev)}
          className={`px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer border ${
            isFlagMode ? 'bg-red-600 text-white font-bold border-red-700' : 'bg-gray-200 text-gray-800 border-gray-400 hover:bg-gray-300'
          }`}
          title="Toggle Flagging mode (helpful for mobile touchscreens)"
        >
          <span>🚩</span>
          <span>{isFlagMode ? 'Flag Mode ON' : 'Dig Mode'}</span>
        </button>
      </div>

      {/* Counter Header */}
      <div className="bg-[#c0c0c0] border-2 border-[#808080] border-r-white border-b-white p-2 mb-2 flex justify-between items-center">
        {/* Mine Counter */}
        <div className="bg-black text-red-600 font-bold text-lg px-2 border border-gray-500 min-w-[45px] text-center tracking-widest">
          {String(mineCount).padStart(3, '0')}
        </div>

        {/* Smiley Reset Button */}
        <button
          onClick={() => resetGame()}
          className="w-8 h-8 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] active:border-r-white active:border-b-white active:border-[#808080] flex items-center justify-center text-lg cursor-pointer"
        >
          {gameOver ? '😵' : gameWon ? '😎' : '🙂'}
        </button>

        {/* Timer */}
        <div className="bg-black text-red-600 font-bold text-lg px-2 border border-gray-500 min-w-[45px] text-center tracking-widest">
          {String(timer).padStart(3, '0')}
        </div>
      </div>

      {/* Grid Container */}
      <div className="flex-1 flex justify-center items-center overflow-auto p-1">
        <div
          className="border-2 border-[#808080] border-r-white border-b-white bg-[#808080] inline-block p-1"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${BOARD_SIZES[difficulty].cols}, minmax(0, 1fr))`,
            gap: '1px',
          }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                onContextMenu={(e) => toggleFlag(e, r, c)}
                className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer touch-action-manipulation ${
                  cell.isRevealed
                    ? 'bg-[#c0c0c0] border border-gray-400'
                    : 'bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] active:border-none'
                }`}
              >
                {cell.isRevealed ? (
                  cell.isMine ? (
                    '💣'
                  ) : cell.count > 0 ? (
                    <span className={getNumberColor(cell.count)}>{cell.count}</span>
                  ) : (
                    ''
                  )
                ) : cell.isFlagged ? (
                  '🚩'
                ) : (
                  ''
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
