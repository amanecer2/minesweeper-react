import React, {useState, useEffect} from 'react';

import styled from 'styled-components';

import './App.css';


import {
    createMinesweeper,
    addMines,
    addNearBy,
    checkIfWon,
    revealEmptyPlaces,
    throttle,
    revealAllMines
} from './lib/common';

import Input from './components/Input';
import FlagCount from './components/FlagCount';
import Minesweeper from './components/Minesweeper';
import Button from './components/Button';
import Modal from './components/Modal';
import CenterElement from './components/Center';

import {hasEnoughFlagsToToggle, isCellFlaggedOrOnShift, isCellMine} from "./lib/click-cell.utils";

const TEXT_YOU_LOSE = 'You lose this round!!';
const TEXT_NO_MORE_FLAGS = 'no more flags left to use';
const TEXT_YOU_WON = 'You won the game!';

const StyleButtonStart = styled.div`
    .start-game {
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }
`;

function App() {

    const [config, setConfig] = useState({
        width: 7,
        height: 7,
        mines: 5,
        flagsLeft: 5
    });

    const [minesweeper, setMinesweeper] = useState(createMinesweeper(config.height, config.width, config.mines));
    const [isShifted, setIsShifted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState('You lose!!');
    const [flagsLeft, setFlagsLeft] = useState(config.mines);

    // at boot, init the Minesweeper
    useEffect(() => {
        _setNewMinesweeper();
    }, []);

    // add listeners on init
    useEffect(() => {
        document.addEventListener('keydown', throttle(handleKeyPres, 100));
        document.addEventListener('keyup', throttle(handleKeyLeave, 100));
    }, []);

    // Listen to flags changing
    useEffect(() => {
        _checkIfWon();
    }, [flagsLeft]);

    const handleKeyPres = (e) => {
        setIsShifted(e.key === 'ShiftLeft' || e.key === 'Shift' || e.key === 'ShiftRight')
    };
    const handleKeyLeave = (e) => {
        setIsShifted(false);
    };

    const _setNewMinesweeper = () => {
        setFlagsLeft(config.mines);
        const newMinesweeper = createMinesweeper(config.height, config.width, config.mines);
        const minesweeperWithMines = addMines(newMinesweeper, config.height, config.width, config.mines);
        const minesweeperWithNearBy = addNearBy(minesweeperWithMines, config.height, config.width);
        setMinesweeper(minesweeperWithNearBy);
    };

    const _setConfig = (name, value) => {
        let options = {};
        if (name === 'mines') {
            options.flagsLeft = value
        }
        setConfig({...config, ...options, [name]: +value})
    };

    const _showModal = text => {
        setModalText(text);
        setShowModal(true)
    };

    const _checkIfWon = async () => {
        if (flagsLeft === 0 && await checkIfWon(minesweeper, config.mines, flagsLeft)) {
            _showModal(TEXT_YOU_WON);
        }
    };

    const _isShifted = async (clickedCell) => {
        const modifyFlagsLeftBy = clickedCell.flaged ? 1 : -1;

        // if we have enough flags than toggle
        if (hasEnoughFlagsToToggle(flagsLeft, config, clickedCell)) {
            setFlagsLeft(flagsLeft + modifyFlagsLeftBy);
            clickedCell.toggleFlag();
            await _checkIfWon();
        } else {
            // not enough flags and show popup
            _showModal(TEXT_NO_MORE_FLAGS)
        }
    };


    /**
     * Handle Cell click event
     * @param {Cell} cellEvent
     */
    const onCellHandler = async (cellEvent) => {
        const copyMinesweeper = [...minesweeper];
        const clickedCell = copyMinesweeper[cellEvent.height][cellEvent.width];

        // if the Cell is a mine and no flag is on
        if (isCellMine(clickedCell, isShifted)) {
            _showModal(TEXT_YOU_LOSE);
            const _copyMinesweeper = revealAllMines(minesweeper);
            setMinesweeper(_copyMinesweeper);
            return;
        }

        // if the Cell is flaged dont do nothing
        if (isCellFlaggedOrOnShift(clickedCell, isShifted)) {
            await _checkIfWon();
            return
        }

        // if shift is on
        if (isShifted) {
            await _isShifted(clickedCell);
        } else {
            // happy path.. shoe all 0 near by cells
            clickedCell.reveal();
            if (clickedCell.numberNearBy === 0) {
                const _copyMinesweeper = revealEmptyPlaces(copyMinesweeper, clickedCell.height, clickedCell.width);
                setMinesweeper(_copyMinesweeper);
                return;
            }
        }

        setMinesweeper(copyMinesweeper);
    };

    return (
        <div className="App">
            <div>
                <div className='p-2'>
                    <Input setInput={_setConfig} name={'width'} num={config.width}/>
                    <Input setInput={_setConfig} name={'height'} num={config.height}/>
                    <Input setInput={_setConfig} name={'mines'} num={config.mines}/>
                </div>

                <div className='p-2'>
                    <CenterElement>
                        <FlagCount flags={flagsLeft}/>
                    </CenterElement>

                    <CenterElement>
                        <StyleButtonStart>
                            <Button className={'start-game'} text='start new game' onClick={() => {
                                _setNewMinesweeper()
                            }}/>
                        </StyleButtonStart>
                    </CenterElement>
                </div>

            </div>

            <CenterElement>
                <Minesweeper
                    onCellHandler={onCellHandler}
                    minesweeper={minesweeper}
                />
            </CenterElement>
            <Modal
                show={showModal}
                onModal={() => setShowModal(false)}
                text={modalText}
            />
        </div>
    );
}

export default App;
