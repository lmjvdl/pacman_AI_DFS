import { Position } from '../types';
import { getNewPosition } from './environment';

export function dfsFindPath(start: Position, goal: Position, map: string[][]): Array<{ pos: Position; move: string }> | null {
    const stack: Array<{ pos: Position; path: Array<{ pos: Position; move: string }> }> = [{ pos: start, path: [{ pos: start, move: 'start' }] }];
    const visited: Set<string> = new Set();

    const isGoalReached = (pos: Position) => pos.x === goal.x && pos.y === goal.y;
    const serialize = (pos: Position) => `${pos.x},${pos.y}`;

    while (stack.length > 0) {
        const { pos: current, path } = stack.pop()!;

        // Check if we have reached the goal
        if (isGoalReached(current)) return path;

        // Mark current position as visited
        visited.add(serialize(current));

        // Define possible moves and their new positions
        const moves = [
            { direction: 'up', newPos: getNewPosition('up', current) },
            { direction: 'down', newPos: getNewPosition('down', current) },
            { direction: 'left', newPos: getNewPosition('left', current) },
            { direction: 'right', newPos: getNewPosition('right', current) },
        ];

        // Iterate over possible moves
        for (const { direction, newPos } of moves) {
            // Check bounds and if the new position is valid
            const isWithinBounds = newPos.x >= 0 && newPos.x < map.length && newPos.y >= 0 && newPos.y < map[0].length;
            const isVisited = visited.has(serialize(newPos)); // Check if already visited

            // Push valid new positions to the stack
            if (isWithinBounds && map[newPos.x][newPos.y] !== 'wall' && !isVisited) {
                stack.push({ pos: newPos, path: [...path, { pos: newPos, move: direction }] });
            }
        }

        // Optional: Unmark current position if you want to allow backtracking
        // visited.delete(serialize(current));
    }
    return null;
}
