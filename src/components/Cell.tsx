import React from 'react';

interface CellProps {
    type: 'empty' | 'wall' | 'agent' | 'food';
    onPath: boolean;
}

const Cell: React.FC<CellProps> = ({ type, onPath }) => {
    const getClassName = () => {
        if (onPath) return 'cell on-path';
        switch (type) {
            case 'wall': return 'cell wall';
            case 'agent': return 'cell agent';
            case 'food': return 'cell food';
            default: return 'cell empty';
        }
    };

    return <div className={getClassName()}></div>;
};

export default Cell;