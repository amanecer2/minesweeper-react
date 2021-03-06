
import React from 'react';
import Cell from './Cell/Cell';
import {Grid} from 'react-virtualized';

function getWidth(minesweeper) {
    return minesweeper[0].length * 30 > window.innerWidth ? window.innerWidth : minesweeper[0].length * 30;
}
function getHeight(minesweeper) {
    return minesweeper[0].length * 30 > 500 ? 500 : minesweeper[0].length * 30;
}
const Minesweeper = ({minesweeper, onCellHandler}) => {

    function cellRenderer({columnIndex, key, rowIndex, style}) {
        return (

            <div key={key} style={style}>
                <Cell
                    onCellHandler={onCellHandler}
                    cell={minesweeper[rowIndex][columnIndex]}
                    className='cell'/>
                </div>
        );
    }


    return (
        <Grid
            cellRenderer={cellRenderer}
            columnCount={minesweeper[0].length}
            columnWidth={30}
            height={getHeight(minesweeper)}
            rowCount={minesweeper.length}
            rowHeight={30}
            width={getWidth(minesweeper)}
        />
    )
};

export default Minesweeper;


/*
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
                        Cell={column}
                        key={id}
                        className='Cell'/>);
                })
            }</div>
        )
    });

    return (
        <div>{__minesweeper}</div>
    )
};

*/