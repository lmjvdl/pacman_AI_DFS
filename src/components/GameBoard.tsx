// GameBoard.tsx
import React from "react";
import { Position, CellType } from "../types";

interface GameBoardProps {
  rows: number;
  cols: number;
  agentPosition: Position;
  foodPosition: Position;
  testMode: "production" | "expansion";
  map: CellType[][];
  movesList: string[]; // اضافه کردن movesList به props
}

const GameBoard: React.FC<GameBoardProps> = ({
  rows,
  cols,
  agentPosition,
  foodPosition,
  testMode,
  map,
  movesList,
}) => {
  return (
    <div>
      <h3>Game Board</h3>
      <div>
        {map.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, colIndex) => (
              <span key={colIndex}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
      <div>
        <h4>Moves List</h4>
        <ul>
          {movesList.map((move, index) => (
            <li key={index}>{move}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameBoard;
