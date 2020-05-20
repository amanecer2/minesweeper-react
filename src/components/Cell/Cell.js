import React from 'react';
import styled from 'styled-components';

import Mine from './Mine'
import Empty from './Empty'
import Flag from './Flag'
import Revealed from './Revealed'

const Wrapper = styled.div`
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
            position: relative;
            padding: 0px;
            margin: 0px;
            text-align: center;
            vertical-align: middle;
            
            height: 30px;
            width: 30px;
            background-color: #C0C0C0;
            border: 1.5px solid;
            border-top-color: #ffffff;
            border-right-color: #7B7B7B;
            border-bottom-color: #7B7B7B;
            border-left-color: #ffffff;
        `;


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
        <Wrapper className={clazz} onClick={() => onCellHandler(cell)}>
                {Component}
        </Wrapper>
    )
};

export default Cell;