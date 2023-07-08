import React, { useState, useEffect } from "react";

const Game = () => {
  const [matches, setMatches] = useState(0);
  const [message, setMessage] = useState("");
  const [playerTurn, setPlayerTurn] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);

  const [n, setN] = useState(12);
  const [m, setM] = useState(3);

  const [loading, setLoading] = useState(false);
  const [showGameHistory, setShowGameHistory] = useState(false);

  useEffect(() => {
    if (matches === 0 && message !== "") {
      const newHistory = [...gameHistory, { winner: message, n, m }];
      setGameHistory(newHistory);
    }
  }, [matches, message]);

  useEffect(() => {
    if (!playerTurn && loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [playerTurn, loading]);

  useEffect(() => {
    if (!playerTurn && !loading && matches > 0) {
      handleAITurn();
    }
  }, [playerTurn, loading]);

  const handleMatchSelection = (num) => {
    if (matches - num < 0) {
      setMessage("Invalid move! Try again.");
    } else {
      setMatches(matches - num);
      setPlayerTurn(false);
      if (matches - num === 0) {
        setMessage(playerTurn ? "You win! 🎉" : "AI wins! 😢");
      } else {
        setMessage("");
        setLoading(true);
      }
    }
  };

  const handleAITurn = () => {
    const aiMatches = matches % (m + 1);
    const num =
      aiMatches === 0 ? getRandomInt(1, Math.min(m, matches)) : aiMatches;
    setMatches(matches - num);
    setPlayerTurn(true);
    if (matches - num === 0) {
      setMessage(playerTurn ? "You win! 🎉" : "AI wins! 😢");
    } else {
      setMessage("");
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const startGame = (isPlayerStart) => {
    const totalMatches = 2 * n + 1;
    setMatches(totalMatches);
    setMessage("");
    setPlayerTurn(isPlayerStart);
    setGameStarted(true);
    setShowGameHistory(false);
  };

  const startNewGame = () => {
    const totalMatches = 2 * n + 1;
    setMatches(totalMatches);
    setMessage("");
    setPlayerTurn(true);
    setGameStarted(false);
    setShowGameHistory(false);
  };

  const toggleGameHistory = () => {
    setShowGameHistory(!showGameHistory);
  };

  const renderMenu = () => {
    if (gameStarted && matches === 0) {
      return (
        <div className="game-status">
          <p>Game finished 🏁</p>
        </div>
      );
    } else if (gameStarted) {
      return (
        <div className="game-status">
          <p>Game in progress...</p>
        </div>
      );
    } else {
      return (
        <div className="menu">
          <label
            className="menu-label"
            title="The number of matches in a pile is found by the formula 2n+1"
          >
            N:
            <input
              type="number"
              className="parametrs"
              min="1"
              value={n}
              onChange={(e) => setN(parseInt(e.target.value))}
            />
          </label>
          <label
            className="menu-label"
            title="The number of matches allowed to take on each turn is from 1 to m"
          >
            M:
            <input
              type="number"
              className="parametrs"
              min="1"
              value={m}
              onChange={(e) => setM(parseInt(e.target.value))}
            />
          </label>
          <button onClick={() => startGame(true)}>
            Start Game (User First)
          </button>
          <button onClick={() => startGame(false)}>
            Start Game (AI First)
          </button>
          {!gameStarted && gameHistory.length > 0 && (
            <button onClick={toggleGameHistory}>
              {showGameHistory ? "Close Game History" : "Check Game History"}
            </button>
          )}
        </div>
      );
    }
  };

  const GameHistory = () => {
    return (
      <div>
        <h2>Game History</h2>
        {gameHistory.map((game, index) => (
          <div key={index}>
            <p>Game {index + 1}</p>
            <p>Winner: {game.winner}</p>
            <p>n: {game.n}</p>
            <p>m: {game.m}</p>
            <hr />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Matches Game</h1>
      {renderMenu()}
      {gameStarted && (
        <div className="game-content">
          <p className="matches-left">Matches left: {matches}</p>
          {message !== "" && <p className="game-message">{message}</p>}
          {playerTurn && matches > 0 && (
            <div className="button-container">
              {[...Array(Math.min(m, matches)).keys()].map((num) => (
                <button
                  key={num}
                  onClick={() => handleMatchSelection(num + 1)}
                  disabled={loading}
                  className="match-button"
                >
                  Take {num + 1}
                </button>
              ))}
            </div>
          )}
          {!playerTurn && matches > 0 && (
            <div>
              {loading ? (
                <p className="ai-turn">
                  <div className="loader-container">
                    <div className="loader"></div>
                  </div>
                </p>
              ) : (
                <p className="ai-turn">AI's turn...</p>
              )}
            </div>
          )}
          {matches === 0 && (
            <div>
              <button onClick={startNewGame} className="new-game-button">
                Start a New Game
              </button>
            </div>
          )}
        </div>
      )}
      {showGameHistory && <GameHistory />}
    </div>
  );
};

export default Game;
