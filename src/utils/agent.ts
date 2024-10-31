import { Position } from '../types';
import { getNewPosition } from './environment';

export function dfsFindPathStepByStep(
    start: Position,
    goal: Position,
    map: string[][],
    onStep: (path: Array<{ pos: Position; move: string }>) => void
  ): void {
    const stack: Array<{ pos: Position; path: Array<{ pos: Position; move: string }> }> = [
      { pos: start, path: [{ pos: start, move: 'start' }] }
    ];
    const visited: Set<string> = new Set();
  
    const isGoalReached = (pos: Position) => pos.x === goal.x && pos.y === goal.y;
    const serialize = (pos: Position) => `${pos.x},${pos.y}`;
  
    const step = () => {
      if (stack.length === 0) return;
  
      const { pos: current, path } = stack.pop()!;
      if (isGoalReached(current)) return path;
  
      visited.add(serialize(current));
  
      const moves = [
        { direction: 'up', newPos: getNewPosition('up', current) },
        { direction: 'down', newPos: getNewPosition('down', current) },
        { direction: 'left', newPos: getNewPosition('left', current) },
        { direction: 'right', newPos: getNewPosition('right', current) },
      ];
  
      for (const { direction, newPos } of moves) {
        const isWithinBounds =
          newPos.x >= 0 && newPos.x < map.length && newPos.y >= 0 && newPos.y < map[0].length;
        const isVisited = visited.has(serialize(newPos));
  
        if (isWithinBounds && map[newPos.x][newPos.y] !== 'wall' && !isVisited) {
          stack.push({ pos: newPos, path: [...path, { pos: newPos, move: direction }] });
          onStep([...path, { pos: newPos, move: direction }]); // نمایش گسترش به کاربر
        }
      }
    };
  
    const interval = setInterval(step, 500); // تغییر 500 به میلی‌ثانیه برای گسترش مرحله‌ای
  }
  
