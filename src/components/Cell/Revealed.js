import React from 'react';

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

export default Revealed;
