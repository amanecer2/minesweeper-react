import React from 'react';
import styled from 'styled-components';

const StyledRevealed = styled.span`
    font-family: "Press Start";
    background-color: #C0C0C0;
    font-size: larger;
    text-align: center;
    border: 0.5px solid lightgray;
        height: inherit;
    width: inherit;
    
    &.red {
        color: red;
    }
    &.blue {
      color: blue;
    }
    &.green {
      color: green;
    }
`;


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
            clazz = 'green';
            break;
        case 3 :
            clazz = 'red';
    }

    return (
        <StyledRevealed className={clazz}><b>{display}</b></StyledRevealed>
    )
};

export default Revealed;
