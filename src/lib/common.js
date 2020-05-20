import {Cell} from './modal';

import Workerize from './workerize';

const MINE_INTERFACE = {
    BOOM: 1,
    SAFE: 0
};

/**
 * Check if there is cell in the x y coordinate
 * @param {{Cell[][]}} minesweeper
 * @param {number} x
 * @param {number} y
 * @returns {*}
 */
export const isInMine = (minesweeper, x, y) => {
    return minesweeper[x] && minesweeper[x][y];
};

/**
 * Get near by mines to this cell
 * @param {{Cell[][]}}  minesweeper
 * @param {number} height
 * @param {number} width
 * @returns {number}
 */
export const getNearBy = (minesweeper, height, width) => {
    const NW = isInMine(minesweeper, height - 1, width - 1);
    const N = isInMine(minesweeper, height - 1, width);
    const NE = isInMine(minesweeper, height - 1, width + 1);

    const SW = isInMine(minesweeper, height + 1, width + 1);
    const S = isInMine(minesweeper, height + 1, width);
    const SE = isInMine(minesweeper, height + 1, width - 1);

    const W = isInMine(minesweeper, height, width - 1);
    const E = isInMine(minesweeper, height, width + 1);
    return [NW, N, NE, SW, S, SE, E, W]
        .filter(cell => cell)
        .reduce(
            (amount, currentCell) => {
                return amount + (currentCell.isMine ? 1 : 0)
            }, 0);

};

/**
 * Set mine on random place
 * @param {{Cell[][]}} minesweeper
 * @param {number} height
 * @param {number} width
 * @param {Set} setter
 */
export const setRandomMine = (minesweeper, height, width, setter) => {
    let flag = true;

    while (flag) {
        const randomHeight = Math.floor(Math.random() * height);
        const randomWidth = Math.floor(Math.random() * width);

        const random = randomWidth * randomHeight;

        if (!setter.has(random)) {

            setter.add(random);
            const cellWithMine = minesweeper[randomHeight][randomWidth];
            cellWithMine.isMine = MINE_INTERFACE.BOOM;
            cellWithMine.numberNearBy = 0;
            flag = false;
            return
        }
    }
};

/**
 * Set Mines to the array
 * @param {[cell][]} minesweeper
 * @param {number} height
 * @param {number} width
 * @param {number} mines
 * @returns {{Cell[][]}} minesweeper
 */
export const addMines = (minesweeper, height, width, mines) => {
    const minesSetters = new Set();

    for (let i = 0; i < mines; i++) {
        setRandomMine(minesweeper, height, width, minesSetters)
    }

    return minesweeper
};

/**
 * Set Near By mines to cells
 * @param {[cell][]} minesweeper
 * @param {number} height
 * @param {number} width
 * @returns {{Cell[][]}} minesweeper
 */
export const addNearBy = (minesweeper, height, width) => {

    for (let _height = 0; _height < height; _height++) {
        for (let _width = 0; _width < width; _width++) {
            if (!minesweeper.isMine) {
                minesweeper[_height][_width].numberNearBy = getNearBy(minesweeper, _height, _width);
            }
        }
    }
    return minesweeper;
};

/**
 * Create the Minesweeper init data
 * @param {number }height
 * @param {number }width
 * @returns {[cell][]}
 */
export const createMinesweeper = (height = 10, width = 10) => {
    const minesweeper = [];

    for (let i = 0; i < height; i++) {
        minesweeper.push([]);
        for (let j = 0; j < width; j++) {
            minesweeper[i][j] = new Cell(i, j, MINE_INTERFACE.SAFE)
        }
    }

    return minesweeper;
};


/**
 *
 * @param {Cell[][]}minesweeper
 * @param {number} height
 * @param {number} width
 * @param {Set} set
 * @returns {Cell}
 */
export const revealCellHelper = (minesweeper, height, width, set = new Set()) => {
    const _cell = isInMine(minesweeper, height, width);

    if (!_cell) return false;
    if (set.has(`${_cell.height}-${_cell.width}`)) return false;
    set.add(`${height}-${width}`);

    if (_cell.numberNearBy > 0) {
        const N = isInMine(minesweeper, height - 1, width);
        const W = isInMine(minesweeper, height + 1, width);
        const E = isInMine(minesweeper, height, width - 1,);
        const S = isInMine(minesweeper, height, width + 1);

        const shouldRevel = [N, W, E, S].filter(x => x).some(cell => {
            return !cell.isMine && cell.numberNearBy === 0
        });

        shouldRevel && !_cell.flaged && _cell.reveal();

        return false;
    }

    if (_cell.flaged) return false;

    _cell.reveal();

    return _cell;
};

/**
 * Reveal all empty places near the clicked cell
 * @param {{Cell[][]}} minesweeper
 * @param {number} height
 * @param {number} width
 * @param {Set} set
 * @returns {Set}
 */
export const revealEmptyPlaces = (minesweeper, height, width, set = new Set()) => {

   const res = revealCellHelper(minesweeper, height, width, set);

   if (!res) return false;

    const getSiblingPositions = (cell) => [[cell.height - 1, cell.width], [cell.height + 1, cell.width], [cell.height, cell.width - 1], [cell.height, cell.width + 1]];

    const _helper = _poss => _poss.map( p => {
        return revealCellHelper(minesweeper, ...p, set)
    });

    const queue = _helper(getSiblingPositions(res));


    while (queue.length) {
        const _current = queue.pop();
        if (_current !== false) {
            const _cel = _helper(getSiblingPositions(_current));
            _cel.filter(x => x)
                .forEach( x => queue.push(x))

        }

    }

    return minesweeper;

};


/**
 * DFS getting stack over flow when 200 * 200 and more
 * @deprecated() DFS not efficient
 * @param minesweeper
 * @param height
 * @param width
 * @param set
 * @returns {boolean}
 */
export const revealEmptyPlaces2 = (minesweeper, height, width, set = new Set()) => {

    const _cell = isInMine(minesweeper, height, width);

    if (!_cell) return false;
    if (set.has(`${_cell.height}-${_cell.width}`)) return false;

    if (_cell.numberNearBy > 0) {
        const N = isInMine(minesweeper, height - 1, width);
        const W = isInMine(minesweeper, height + 1, width);
        const E = isInMine(minesweeper, height, width - 1,);
        const S = isInMine(minesweeper, height, width + 1);

        const shouldRevel = [N, W, E, S].filter(x => x).some(cell => {
            return !cell.isMine && cell.numberNearBy === 0
        });

        shouldRevel && !_cell.flaged && _cell.reveal();

        return false;
    }

    if (_cell.flaged) return false;


    set.add(`${_cell.height}-${_cell.width}`);

    _cell.reveal();

    revealEmptyPlaces(minesweeper, height - 1, width, set);
    revealEmptyPlaces(minesweeper, height + 1, width, set);
    revealEmptyPlaces(minesweeper, height, width - 1, set);
    revealEmptyPlaces(minesweeper, height, width + 1, set);
    const queue = [isInMine(minesweeper, height - 1, width)]
    while (queue.length) {
        const _current = queue.pop();

    }

    console.log(set)

}

/**
 * Reveal all mines in the minesweeper
 * @param {Cell[][]} minesweeper
 */
export const revealAllBooms = (minesweeper) => {
    for (let i = 0; i < minesweeper.length; i++) {
        for (let j = 0; j < minesweeper[1].length; j++) {
            const cell = minesweeper[i][j];
            if (cell.isMine) {
                cell.reveal();
            }
        }
    }
    return minesweeper;
};

/**
 * Reveal all mines in the minesweeper
 * @param {Cell[][]} minesweeper
 * @param {number} numbersOfMines
 */
export const checkIfWon = async (minesweeper, numbersOfMines, flagsLeft) => {
    function _checkIfWon(minesweeper, numbersOfMines, flagsLeft) {
        const cells = minesweeper.length * minesweeper[0].length;
        let _cellsWithoutMines = 0;
        for (let i = 0; i < minesweeper[0].length; i++) {
            for (let j = 0; j < minesweeper[0].length; j++) {
                const cell = minesweeper[i][j];
                if (!cell.isMine && cell.revealed && !cell.flaged) {
                    _cellsWithoutMines++;
                }
            }
        }
        return cells - numbersOfMines - flagsLeft === _cellsWithoutMines
    }

    let worker = Workerize(`
    export ${_checkIfWon.toString()}
	
`);
    return await worker._checkIfWon(minesweeper, numbersOfMines, flagsLeft)
};

export const throttle = (func, limit) => {
    let inThrottle
    return function () {
        const args = arguments
        const context = this
        if (!inThrottle) {
            func.apply(context, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
        }
    }
};
