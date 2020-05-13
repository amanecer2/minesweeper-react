export class Cell {
    constructor(height, width, isMine, numberNearBy) {
        this.width = width;
        this.height = height;
        this.isMine = isMine;
        this.numberNearBy = numberNearBy;
        this.revealed = false;
        this.flaged = false;
    }


}

Cell.prototype.reveal = function() {
    this.revealed = true
};

Cell.prototype.toggleFlag = function() {
    this.flaged = !this.flaged
};
