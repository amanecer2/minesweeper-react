import React from 'react';
import Cell from './Cell';

const Minesweeper = ({minesweeper, onCellHandler}) => {
    let height = 0;
    let width = 0;
    let divs = 0;
    const __minesweeper = minesweeper.map( row => {
        const divKey = `${divs}-${height}-${width}`;

        return (
            <div key={divKey} className='row'>{
                row.map( column => {
                    const id = `${height}-${width}`;
                    height++;
                    width++;
                    return (<Cell
                        onCellHandler={onCellHandler}
                        cell={column}
                        key={id}
                        className='cell'/>);
                })
            }</div>
        )
    });

    return (
        <div>{__minesweeper}</div>
    )
};

export default Minesweeper;
