class Placements {
  #piecePlacementsByCell;

  constructor(piecePlacementsByCell) {
    this.#piecePlacementsByCell = piecePlacementsByCell;
  }

  /**
   * For each cell number, invalidate positions related to that cell.
   *
   * @param {[number]} cellnums Cell numbers covered
   * @param {function} callbackFn Call back function to call on each cell num
   * @returns An object with an array of positions invalidated and a dictionary of
   *          valid position adjustments required by piece type
   */
  #invalidatePlacementsByCells(cellnums, callbackFn) {
    //Invalidities Added
    const invalidities = [];
    const positionsRemovedByPieceType = {};

    for (const coveredCellNumber of cellnums) {
      if (callbackFn) callbackFn(coveredCellNumber);

      const incompatiblePiecePlacements =
        this.#piecePlacementsByCell[coveredCellNumber];
      for (const incompatiblePiecePlacement of incompatiblePiecePlacements) {
        if (incompatiblePiecePlacement.isInvalid) continue;
        invalidities.push(incompatiblePiecePlacement);

        incompatiblePiecePlacement.isInvalid = true;
        positionsRemovedByPieceType[incompatiblePiecePlacement.piece] =
          (positionsRemovedByPieceType[incompatiblePiecePlacement.piece] || 0) -
          1;
      }
    }

    return { invalidities, positionsRemovedByPieceType };
  }

  /**
   * Invalidate positions related to cells covered by blockers
   *
   * @param {[numbers]} blockedCells - Cells covered by blockers
   * @param {function} callbackFn - Call back fn to call on each cell
   * @returns An object with an array of positions invalidated and a dictionary of
   *          valid position adjustments required by piece type
   */
  addBlockers(blockedCells, callbackFn) {
    return this.#invalidatePlacementsByCells(blockedCells, callbackFn);
  }

  /**
   * Invalidate positions related to cells covered by the placement
   *
   * @param {object} placement - Placement to add
   * @param {function} callbackFn - Call back fn to call on each cell
   * @returns An object with an array of positions invalidated and a dictionary of
   *          valid position adjustments required by piece type
   */
  setPlacement(placement, callbackFn) {
    return this.#invalidatePlacementsByCells(placement.cells, callbackFn);
  }

  /**
   *
   * @param {placement} placement - The placement to remove
   * @param {[placement]} invalidities - Invalidities to reverse
   * @param {function} callbackFn - Called on each uncovered cell
   * @returns A dictionary of valid position adjustments required by
   *           piece type
   */
  removePlacement(placement, invalidities, callbackFn) {
    placement.isInvalid = false;
    const { cells: uncoveredCells } = placement;

    //If callback function - Call on each uncovered cell
    if (callbackFn) {
      for (const uncoveredCell of uncoveredCells) {
        callbackFn(uncoveredCell);
      }
    }

    const positionsAddedByPieceType = {};
    for (const positionToValidate of invalidities) {
      positionToValidate.isInvalid = false;
      positionsAddedByPieceType[positionToValidate.piece] =
        (positionsAddedByPieceType[positionToValidate.piece] || 0) + 1;
    }
    return positionsAddedByPieceType;
  }
}

export default Placements;
