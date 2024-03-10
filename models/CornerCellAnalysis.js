class CornerCellAnalysis {
  #corners;
  #cornerToRelatedCellMap;
  #relatedCells;
  constructor() {
    this.#cornerToRelatedCellMap = {
      1: 3,
      15: 14,
      44: 43,
      48: 46,
      34: 35,
      5: 6,
    };
    this.#corners = [1, 15, 44, 48, 34, 5];
    this.#relatedCells = {
      3: true,
      14: true,
      43: true,
      46: true,
      35: true,
      6: true,
    };
  }

  /**
   * Checks whether a cell is linked to a corner cell
   * @returns {bool}
   */
  cellBlocksCorner(cellNumber) {
    return this.#relatedCells[cellNumber];
  }

  /**
   * Checks for blocked corner cells. There is only
   * one single cell piece so two or more blocked
   * corner cells will be invalid
   *
   * @param {object} solution - current solution
   * @returns {bool}
   */
  areCornersValid(solution) {
    let blockedCornerCount = 0;
    for (const corner of this.#corners) {
      if (!solution[corner] && solution[this.#cornerToRelatedCellMap[corner]]) {
        blockedCornerCount++;
      }
      if (blockedCornerCount >= 2) break;
    }
    return blockedCornerCount >= 2;
  }
}

export default CornerCellAnalysis;
