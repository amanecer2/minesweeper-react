
/**
 * @param {Cell} clickedCell
 * @param {boolean} isShifted
 * @returns {boolean}
 */
export const isCellMine = (clickedCell, isShifted) =>
    clickedCell.isMine && !isShifted && !clickedCell.flaged;

/**
 * @param {Cell} clickedCell
 * @param {boolean} isShifted
 * @returns {boolean}
 */
export const isCellFlaggedOrOnShift = (clickedCell, isShifted) => !isShifted && clickedCell.flaged;

/**
 *
 * @param {number} flagsLeft
 * @param {flagsLeft: number} config
 * @param {Cell} clickedCell
 * @returns {boolean}
 */
export const hasEnoughFlagsToToggle = (flagsLeft, config, clickedCell) => {
    const modifyFlagsLeftBy = clickedCell.flaged ? 1 : -1;

    return !(flagsLeft + modifyFlagsLeftBy < 0 || flagsLeft + modifyFlagsLeftBy > config.flagsLeft)
}