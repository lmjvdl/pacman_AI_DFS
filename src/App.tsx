// App.tsx
import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import Controls from "./components/Controls";
import { Position, CellType } from "./types";

const App: React.FC = () => {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [agentPosition, setAgentPosition] = useState<Position>({ x: 1, y: 1 });
  const [foodPosition, setFoodPosition] = useState<Position>({ x: 8, y: 8 });
  const [testMode, setTestMode] = useState<"production" | "expansion">("production");
  const [map, setMap] = useState<CellType[][]>([]);
  const [movesList, setMovesList] = useState<string[]>([]); // تعریف movesList به عنوان state

  const handleStart = (
    newRows: number,
    newCols: number,
    newAgentPosition: Position,
    newFoodPosition: Position,
    newTestMode: "production" | "expansion"
  ) => {
    setRows(newRows);
    setCols(newCols);
    setAgentPosition(newAgentPosition);
    setFoodPosition(newFoodPosition);
    setTestMode(newTestMode);
  };

  const handleUploadMap = (
    mapData: CellType[][],
    newAgentPosition: Position,
    newFoodPosition: Position,
    newTestMode: "production" | "expansion"
  ) => {
    setMap(mapData);
    setAgentPosition(newAgentPosition);
    setFoodPosition(newFoodPosition);
    setTestMode(newTestMode);
  };

  return (
    <div className="App">
      <h1>Game App</h1>
      <Controls
        onStart={handleStart}
        onGenerateNewMap={() => setMap([])}
        map={map}
        onUploadMap={handleUploadMap}
      />
      <GameBoard
        rows={rows}
        cols={cols}
        agentPosition={agentPosition}
        foodPosition={foodPosition}
        testMode={testMode}
        map={map}
        movesList={movesList} // ارسال movesList به GameBoard
      />
    </div>
  );
};

export default App;
