import React, { useEffect, useState } from "react";
import { Position } from "../types";

interface ControlsProps {
  onStart: (
    rows: number,
    cols: number,
    agentPosition: Position,
    foodPosition: Position
  ) => void;
  onGenerateNewMap: () => void;
  map: string[][];
  onUploadMap: (
    mapData: string[][],
    agentPos: Position,
    foodPos: Position
  ) => void;
}

const Controls: React.FC<ControlsProps> = ({
  onStart,
  onGenerateNewMap,
  map,
  onUploadMap,
}) => {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [agentRow, setAgentRow] = useState(1);
  const [agentCol, setAgentCol] = useState(1);
  const [foodRow, setFoodRow] = useState(8);
  const [foodCol, setFoodCol] = useState(8);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadMode, setUploadMode] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const lines = (reader.result as string).trim().split("\n");

          const [rows, cols] = lines[0].split(",").map(Number);
          const [agentRow, agentCol] = lines[1].split(",").map(Number);

          const mapLines = lines.slice(2);
          const mapData = mapLines.map((line) => line.split(""));

          const agentPosition = { x: agentCol, y: agentRow };

          const foodPosition = findFoodPosition(mapData);

          if (foodPosition) {
            onUploadMap(mapData, agentPosition, foodPosition);
          } else {
            console.error("Food position not found on the map.");
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const handleStart = () => {
    const agentPosition = { x: agentRow + 1, y: agentCol + 1 };
    const foodPosition = { x: foodRow, y: foodCol };

    if (
      agentPosition.x === foodPosition.x &&
      agentPosition.y === foodPosition.y
    ) {
      setErrorMessage("Agent and Food positions must be different!");
      return;
    }

    if (
      agentPosition.x < 0 ||
      agentPosition.x >= rows + 2 ||
      agentPosition.y < 0 ||
      agentPosition.y >= cols + 2 ||
      foodPosition.x < 0 ||
      foodPosition.x >= rows + 2 ||
      foodPosition.y < 0 ||
      foodPosition.y >= cols + 2
    ) {
      setErrorMessage("Positions of Agent or Food must be within map bounds!");
      return;
    }

    setErrorMessage(null);
    onStart(rows, cols, agentPosition, foodPosition);
  };

  const handleMode = () => {
    setUploadMode((prevMode) => !prevMode);
  };

  const titleButton = uploadMode ? "Start random game" : "Upload test file";

  return (
    <div className="controls">
      {uploadMode ? (
        <input
          id="attachment"
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
        />
      ) : (
        <>
          <h2>Set Map Size</h2>
          <div className="form-group input-group">
            <div className="input-container">
              <input
                type="number"
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
                min={2}
                className="input-field"
              />
              <label>Number of Rows</label>
            </div>
            <div className="input-container">
              <input
                type="number"
                value={cols}
                onChange={(e) => setCols(Number(e.target.value))}
                min={2}
                className="input-field"
              />
              <label>Number of Columns</label>
            </div>
          </div>

          <h2>Set Agent and Food Position</h2>
          <div className="input-group">
            <div className="input-container">
              <input
                type="number"
                value={agentRow}
                onChange={(e) => setAgentRow(Number(e.target.value))}
                min={0}
                className="input-field"
              />
              <label>Agent Row</label>
            </div>
            <div className="input-container">
              <input
                type="number"
                value={agentCol}
                onChange={(e) => setAgentCol(Number(e.target.value))}
                min={0}
                className="input-field"
              />
              <label>Agent Column</label>
            </div>
            <div className="input-container">
              <input
                type="number"
                value={foodRow}
                onChange={(e) => setFoodRow(Number(e.target.value))}
                min={0}
                className="input-field"
              />
              <label>Food Row</label>
            </div>
            <div className="input-container">
              <input
                type="number"
                value={foodCol}
                onChange={(e) => setFoodCol(Number(e.target.value))}
                min={0}
                className="input-field"
              />
              <label>Food Column</label>
            </div>
          </div>
          <div className="buttons">
            <button onClick={handleStart}>Start new game</button>
            <button className="generate-button" onClick={onGenerateNewMap}>
              Generate New Map
            </button>
            <button onClick={handleMode}>{titleButton}</button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      )}
    </div>
  );
};
export default Controls;

const findFoodPosition = (mapData: string[][]): { x: number; y: number } => {
  for (let y = 0; y < mapData.length; y++) {
    for (let x = 0; x < mapData[y].length; x++) {
      if (mapData[y][x] === "f") {
        return { x, y };
      }
    }
  }
  return { x: -1, y: -1 };
};
