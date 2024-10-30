export type CellType = 'empty' | 'wall' | 'agent' | 'food';

export type ActionType = 'up' | 'down' | 'left' | 'right'; 

export interface Position {
    x: number;
    y: number;
}

export interface Percept {
    position: Position;
    cellType: CellType;
}
