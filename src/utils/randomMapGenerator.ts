import { CellType } from '../types';

export function generateRandomMap(rows: number, cols: number): CellType[][] {
    const map: CellType[][] = [];
    for (let i = -1; i <= rows; i++) {
        const row: CellType[] = [];
        for (let j = -1; j <= cols; j++) {
            // قرار دادن دیوار در دور نقشه
            if (i === -1 || i === rows || j === -1 || j === cols) {
                row.push('wall');
            } else {
                row.push(Math.random() < 0.2 ? 'wall' : 'empty');
            }
        }
        map.push(row);
    }
    return map;
}