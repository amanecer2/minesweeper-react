import React, {useState, useEffect} from 'react';
import './App.css';

import {
    createMinesweeper,
    addMines,
    addNearBy,
    checkIfWon,
    revealEmptyPlaces,
    throttle,
    revealAllBooms
} from './lib/common';

import Input from './components/Input';
import FlagCount from './components/FlagCount';
import Minesweeper from './components/Minesweeper';
import Button from './components/Button';
import Modal from './components/Modal';
import CenterElement from './components/Center';


const TEXT_YOU_LOSE = 'You lose this round!!';
const TEXT_NO_MORE_FLAGS = 'no more flags left to use';
const TEXT_YOU_WON = 'You won the game!';

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
        setNewMinesweeper();
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

    const setNewMinesweeper = () => {
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

    const _checkIfWon = () => {
        if (flagsLeft === 0 && checkIfWon(minesweeper, config.mines, flagsLeft)) {
            setModalText(TEXT_YOU_WON)
            setShowModal(true)
        }
    }

    /**
     * Handle cell click event
     * @param {Cell} cellEvent
     */
    const onCellHandler = (cellEvent) => {
        const copyMinesweeper = [...minesweeper];
        const clickedCell = copyMinesweeper[cellEvent.height][cellEvent.width];

        // if the cell is a mine and no flag is on
        if (clickedCell.isMine && !isShifted && !clickedCell.flaged) {
            setModalText(TEXT_YOU_LOSE)
            setShowModal(true);
            revealAllBooms(minesweeper)
            return;
        }

        // if the cell is flaged dont do nothing
        if (!isShifted && clickedCell.flaged) {
            _checkIfWon();
            return
        }
        ;


        // if shift is on
        if (isShifted) {
            const modifyBy = clickedCell.flaged ? 1 : -1;

            // if we have enough flags than toggle
            if (!(flagsLeft + modifyBy < 0 || flagsLeft + modifyBy > config.flagsLeft)) {
                setFlagsLeft(flagsLeft + modifyBy)
                clickedCell.toggleFlag();
                _checkIfWon()
            } else {
                // not enough flags and show popup
                setModalText(TEXT_NO_MORE_FLAGS);
                setShowModal(true)
            }
        } else {
            // happy path.. shoe all 0 near by cells
            clickedCell.reveal();
            if (clickedCell.numberNearBy === 0) {
                revealEmptyPlaces(copyMinesweeper, clickedCell.height, clickedCell.width);
            }
        }

        setMinesweeper(copyMinesweeper)
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
                        <Button className={'start-game'} text='start new game' onClick={() => {
                            setNewMinesweeper()
                        }}/>
                    </CenterElement>
                </div>

            </div>

            <Minesweeper
                onCellHandler={onCellHandler}
                minesweeper={minesweeper}
            />
            <Modal
                show={showModal}
                onModal={() => setShowModal(false)}
                text={modalText}
            />
        </div>
    );
}

export default App;
