import React from 'react';
import Cell from './Cell';
import { Position, CellType } from '../types';

interface GameBoardProps {
    map: CellType[][];
    agentPosition: Position;
    foodPosition: Position;
    movesList: Position[];
}

const GameBoard: React.FC<GameBoardProps> = ({ map, agentPosition, foodPosition, movesList }) => {
    return (
        <div className="game-board">
            {map.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => {
                        let cellType = cell;
                        const onPath = movesList.some(move => move.x === rowIndex && move.y === colIndex);
                        if (rowIndex === agentPosition.x && colIndex === agentPosition.y) {
                            cellType = 'agent';
                        }
                        
                        if (rowIndex === foodPosition.x && colIndex === foodPosition.y) {
                            cellType = 'food';
                        }
                        return <Cell key={colIndex} type={cellType} onPath={onPath} />;
                    })}
                </div>
            ))}
        </div>
    );
};

export default GameBoard;