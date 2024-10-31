import React, { useState } from "react";
import { Position, CellType } from "../types";

interface ControlsProps {
  onStart: (
    rows: number,
    cols: number,
    agentPos: Position,
    foodPos: Position,
    testMode: 'production' | 'expansion'
  ) => void;
  onGenerateNewMap: () => void;
  map: CellType[][] | null;
  onUploadMap: (
    mapData: CellType[][],
    agentPos: Position,
    foodPos: Position,
    testMode: 'production' | 'expansion'
  ) => void;
}

const Controls: React.FC<ControlsProps> = ({
  onStart,
  onGenerateNewMap,
  map,
  onUploadMap
}) => {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [agentX, setAgentX] = useState(1);
  const [agentY, setAgentY] = useState(1);
  const [foodX, setFoodX] = useState(8);
  const [foodY, setFoodY] = useState(8);
  const [testMode, setTestMode] = useState<'production' | 'expansion'>('production');

  const handleUploadMap = () => {
    if (map) {
      const agentPosition: Position = { x: agentX, y: agentY };
      const foodPosition: Position = { x: foodX, y: foodY };
      onUploadMap(map, agentPosition, foodPosition, testMode);
    }
  };

  return (
    <div className="controls">
      <h2>Controls</h2>
      <button onClick={() => onStart(rows, cols, { x: agentX, y: agentY }, { x: foodX, y: foodY }, testMode)}>
        Start Game
      </button>
      <button onClick={onGenerateNewMap}>Generate New Map</button>
      <button onClick={handleUploadMap} disabled={!map}>
        Upload Map
      </button>
      {/* تنظیمات برای تعیین سطرها، ستون‌ها، موقعیت‌ها، و حالت تست */}
      <div>
        <label>Rows: </label>
        <input type="number" value={rows} onChange={(e) => setRows(Number(e.target.value))} />
        <label>Cols: </label>
        <input type="number" value={cols} onChange={(e) => setCols(Number(e.target.value))} />
      </div>
      <div>
        <label>Agent X: </label>
        <input type="number" value={agentX} onChange={(e) => setAgentX(Number(e.target.value))} />
        <label>Agent Y: </label>
        <input type="number" value={agentY} onChange={(e) => setAgentY(Number(e.target.value))} />
      </div>
      <div>
        <label>Food X: </label>
        <input type="number" value={foodX} onChange={(e) => setFoodX(Number(e.target.value))} />
        <label>Food Y: </label>
        <input type="number" value={foodY} onChange={(e) => setFoodY(Number(e.target.value))} />
      </div>
      <div>
        <label>Test Mode: </label>
        <select value={testMode} onChange={(e) => setTestMode(e.target.value as 'production' | 'expansion')}>
          <option value="production">Production</option>
          <option value="expansion">Expansion</option>
        </select>
      </div>
    </div>
  );
};

export default Controls;
