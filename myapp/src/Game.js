import React, { useState, useEffect } from 'react';

const Game = () => {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [targetPosition, setTargetPosition] = useState({
    x: Math.floor(Math.random() * window.innerWidth),
    y: Math.floor(Math.random() * window.innerHeight),
  });
  const [obstacles, setObstacles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setObstacles((prevObstacles) => [
        ...prevObstacles,
        {
          x: Math.floor(Math.random() * window.innerWidth),
          y: Math.floor(Math.random() * window.innerHeight),
        },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (!gameStarted) {
      setGameStarted(true);
    } else {
      const distance = Math.sqrt(
        Math.pow(targetPosition.x - event.clientX, 2) +
        Math.pow(targetPosition.y - event.clientY, 2)
      );
      if (distance < 50) {
        setScore(score + 1);
        setTargetPosition({
          x: Math.floor(Math.random() * window.innerWidth),
          y: Math.floor(Math.random() * window.innerHeight),
        });
      } else {
        for (const obstacle of obstacles) {
          const obstacleDistance = Math.sqrt(
            Math.pow(obstacle.x - event.clientX, 2) +
            Math.pow(obstacle.y - event.clientY, 2)
          );
          if (obstacleDistance < 50) {
            setLives(lives - 1);
            if (lives === 1) {
              setGameOver(true);
            }
          }
        }
      }
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
      }}
      onClick={handleClick}
    >
      {!gameStarted ? (
        <h1>Click to start the game</h1>
      ) : gameOver ? (
        <h1>Game Over! Your score: {score}</h1>
      ) : (
        <>
          <div
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: 'red',
              borderRadius: '50%',
              position: 'absolute',
              left: targetPosition.x - 25,
              top: targetPosition.y - 25,
            }}
          />
          {obstacles.map((obstacle, index) => (
            <div
              key={index}
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: 'black',
                borderRadius: '50%',
                position: 'absolute',
                left: obstacle.x - 15,
                top: obstacle.y - 15,
              }}
            />
          ))}
          <h1>Score: {score}</h1>
          <h1>Lives: {lives}</h1>
        </>
      )}
    </div>
  );
};

export default Game;
