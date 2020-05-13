import React from 'react';

import { ReactComponent as BoomdedSvg } from '../assets/svg/bomb.svg';
import flag from '../assets/png/flag.jpg';
const style = {
    "height": "100%",
    "width": "100%",
};
const Empty = ({}) => {
    return (
        <div></div>
    )
}
const Flag = ({cell}) => {
    return (
        <img style={style} src={flag} alt="flag" />
    )
};

const Revealed = ({cell}) => {
    const display = cell.numberNearBy ? cell.numberNearBy : '';
    let clazz = '';
    switch (cell.numberNearBy) {
        case 0:
            break;
        case 1:
            clazz = 'blue';
            break;
        case 2:
            clazz = 'green'
            break;
        case 3 :
            clazz = 'red';
    }

    return (
        <span className={clazz}><b>{display}</b></span>
    )
};

const Boom = () => {
    const style = {
        "height": "100%",
        "width": "100%",
    };

    return (
        <div >
            <BoomdedSvg style={style}/>
        </div>

    )
};

const Cell = ({cell, onCellHandler}) => {


    const Component =
        cell.revealed
            ? cell.isMine
                ? Boom({cell})
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