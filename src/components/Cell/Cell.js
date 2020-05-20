import React from 'react';

import Mine from './Mine'
import Empty from './Empty'
import Flag from './Flag'
import Revealed from './Revealed'

const Cell = ({cell, onCellHandler}) => {


    const Component =
        cell.revealed
            ? cell.isMine
                ? Mine({cell})
                : cell.flaged
                    ? Flag({cell})
                    : Revealed({cell})
        : cell.flaged
            ? Flag({cell})
            : Empty({cell});

    const clazz = `cell ${cell.revealed ? 'revealed' : ''}`;

    return (
        <div className={clazz} onClick={() => onCellHandler(cell)}>
            {Component}
        </div>
    )
};

export default Cell;