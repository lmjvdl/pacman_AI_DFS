import { Position, Percept, ActionType } from '../types';

export function Environment(action: ActionType, position: Position, map: string[][]): Percept {
    const newPosition = getNewPosition(action, position);
    const cellType = map[newPosition.x][newPosition.y];

    return {
        position: newPosition,
        cellType: cellType as 'empty' | 'wall' | 'agent' | 'food' 
    };
}

export function getNewPosition(action: ActionType, position: Position): Position {
    switch (action) {
        case 'up': return { x: position.x, y: position.y - 1 };
        case 'down': return { x: position.x, y: position.y + 1 };
        case 'left': return { x: position.x - 1, y: position.y };
        case 'right': return { x: position.x + 1, y: position.y };
        default: return position;
    }
}
