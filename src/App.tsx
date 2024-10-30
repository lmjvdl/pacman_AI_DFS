import React, { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import Controls from "./components/Controls";
import { generateRandomMap } from "./utils/randomMapGenerator";
import { CellType, Position } from "./types";
import { dfsFindPath } from "./utils/agent";
import "./App.css";

const App: React.FC = () => {
  const [map, setMap] = useState<CellType[][]>(generateRandomMap(10, 10));
  const [startPosition, setStartPosition] = useState<Position>();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isPathFound, setIsPathFound] = useState<boolean | null>(null);
  const [agentPosition, setAgentPosition] = useState<Position>({ x: 1, y: 1 });
  const [foodPosition, setFoodPosition] = useState<Position>({ x: 8, y: 8 });
  const [path, setPath] = useState<Array<{ pos: Position; move: string }>>([]);
  const [movesList, setMovesList] = useState<
    Array<{ pos: Position; move: string }>
  >([]);

  useEffect(() => {
    if (isGameStarted && path.length > 0) {
      const interval = setInterval(() => {
        if (path.length > 0) {
          const nextMove = path.shift();
          if (nextMove) {
            setAgentPosition(nextMove.pos);
            setMovesList((prev) => [...prev, nextMove]);
          }
        } else {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isGameStarted, path]);

  const startGame = (
    rows: number,
    cols: number,
    agentPosition: Position,
    foodPosition: Position
  ) => {
    const newMap = generateRandomMap(rows, cols);
    setMap(newMap);
    setAgentPosition(agentPosition);
    setStartPosition(agentPosition);
    setFoodPosition(foodPosition);
    setFoodPosition(foodPosition);
    setIsGameStarted(true);
    setMovesList([]);
    console.log(foodPosition)
    console.log(agentPosition)
    const FoundPath = dfsFindPath(agentPosition, foodPosition, newMap);
    if (FoundPath) {
      setPath(FoundPath);
      setIsPathFound(true);
      console.log("Game started! Path found:", FoundPath);
    } else {
      setIsPathFound(false);
      console.log("No path found!");
    }
  };

  const handleUploadMap = (uploadedMap: string[][], agentPos: Position, foodPos: Position) => {
    setMap(uploadedMap as CellType[][]);
    startGame(uploadedMap.length, uploadedMap[0].length, agentPos, foodPos);
  };

  return (
    <div>
      <h1 className="head-content">Pac-Man AI Game</h1>
      <Controls onStart={startGame} onGenerateNewMap={() => {}} onUploadMap={handleUploadMap} map={map}/>
      
      {isPathFound === false && (
        <div className="result">
          No path found! Please try again.
        </div>
      )}

      
      <GameBoard
        map={map}
        agentPosition={agentPosition}
        foodPosition={foodPosition}
        movesList={movesList.map((m) => m.pos)}
      />
      

      {isGameStarted && path.length === 0 && isPathFound && (
        <div className="game-results">
          <h2 className="head-results">Game Results</h2>
          <span className="option-result">
            Starting Position:{" "}
            <span>
              ({startPosition?.x}, {startPosition?.y})
            </span>
          </span>
          <span className="option-result">
            Food Position:{" "}
            <span>
              ({foodPosition.x}, {foodPosition.y})
            </span>
          </span>
          <p className="option-result">
            <span>Number of Moves: {movesList.length}</span>
          </p>
          <p className="option-result">
            <span>
              Moves:{" "}
              {movesList
                .map((move) => `-->(${move.pos.x}, ${move.pos.y}) --> ${move.move}`)
                .join(" ")}
            </span>
          </p>
        </div>
      )}

    </div>
  );
};

export default App;
