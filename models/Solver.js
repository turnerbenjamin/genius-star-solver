import CornerCellAnalysis from "./CornerCellAnalysis";

export default class Solver {
  #pieceDictionary;
  #getSet;
  #solution;
  #placementStack;
  #solvedCellCount;
  #set;
  #isBonus;
  #dice;
  #solutionsRepository;
  #solutionLimit;
  #placements;
  #cornerCellAnalysis;

  constructor(
    pieceDictionary,
    getSet,
    dice,
    solutionsRepository,
    placementStack,
    placements,
    cornerCellAnalysis
  ) {
    //STORE DEPENDENCIES
    this.#pieceDictionary = pieceDictionary;
    this.#getSet = getSet;
    this.#dice = dice;
    this.#solutionsRepository = solutionsRepository;
    this.#placementStack = placementStack;
    this.#placements = placements;
    this.#cornerCellAnalysis = cornerCellAnalysis;
  }

  // *** SOLVE ***
  /**
   * Given a set of blockers determined by a dice roll, returns a solution count and an array of solutions.
   *
   * @param {number[]} roll - A set of 7 integers between 1-48
   * @param {bool} options.isBonus - Whether bonus set should be used
   * @param {number} options.solutionsRepositoryMaxLength - Max solutions to return
   * @param {number} options.solutionLimit - Max solutions to track
   * @returns {object}
   */

  solve(roll, options) {
    try {
      const t1 = performance.now();

      //GET SET
      this.#isBonus = options?.isBonus === true || false;
      this.#set = this.#getSet(this.#isBonus);

      //Set max solution repository lenth
      this.#solutionsRepository.maxRepositoryLength =
        options?.solutionsRepositoryMaxLength || 1;
      //Set solutions to find limit
      this.solutionLimit = options?.solutionLimit;
      //Validate roll and Initialise Solution
      this.#validateRoll(roll);
      this.#initialiseSolution(roll);

      //Get Solutions
      this.#getSolutions();

      const t2 = performance.now();
      return {
        solutions: this.#solutionsRepository.solutions,
        solutionsFound: this.#solutionsRepository.solutionsFound,
        solutionsSaved: this.#solutionsRepository.length,
        timeMs: t2 - t1,
        options,
      };
    } catch (error) {
      return { error };
    }
  }

  // *** INITIALISE SOLUTION ***
  /**
   * Initialises a solution object with blocked cells
   * and sorts the set based on piece length and no of valid positions
   *
   * @param {[number]} blockedCells - Array of cell numbers in which to place a blocker
   */
  #initialiseSolution(blockedCells) {
    this.#solution = {};
    this.#solvedCellCount = 0;

    //Declare callback function to be called on each cell covered
    //by the piece placed
    const forEachCoveredCellNum = (coveredCellNum) => {
      this.#solution[coveredCellNum] = this.#pieceDictionary.blocker;
      this.#solvedCellCount++;
    };
    const { positionsRemovedByPieceType } = this.#placements.addBlockers(
      blockedCells,
      forEachCoveredCellNum
    );

    this.#updatePieceValidPositions(positionsRemovedByPieceType);
    this.#set.sort((a, b) => a.priority - b.priority);
  }

  // *** GET SOLUTIONS ***
  /**
   * Find and store all solutions
   */
  #getSolutions() {
    //Step through each option
    let pieceIndex = 0;
    let doContinue = true;
    while (doContinue) {
      //Get next placement
      const currentPiece = this.#set[pieceIndex];

      const nextPlacement = currentPiece.nextPlacement;

      pieceIndex = this.#piecePlacementControl(currentPiece, nextPlacement);

      //If all pieces checked finish loop;
      if (pieceIndex < 0) break;
      if (this.#solutionsRepository.solutionsFound >= this.#solutionLimit)
        doContinue = false;
    }
  }

  // *** PIECE PLACEMENT CONTROL ***
  /**
   * Places a piece and returns the index of the next piece to try.
   *
   * If the placement is undefined, it is assumed that the piece has no more
   * valid positions - the index will decrease by 1. If -1 is returned all options
   * have been tried
   *
   * Else the index will advance by 0 if there is a solve or 1 if no solve is found
   *
   * @param {Piece} piece - The piece to add
   * @param {object} [placement] - The placement to add (may be undefined)
   * @returns {number} - Index of next piece to try
   */
  #piecePlacementControl(piece, placement) {
    //If no placement - pop last piece and return next index;
    if (!placement) {
      //store next i
      if (!this.#placementStack.length) return -1;
      this.#popPiece();
      const nexti = this.#placementStack.length;
      return nexti;
    }

    //Place the piece;
    const isInvalidPlacement = this.#pushPiece(piece, placement);
    const isSolved = this.#solvedCellCount === 48;
    //Test for solve or invaid placement
    if (isSolved || isInvalidPlacement) {
      if (isSolved) this.#solutionsRepository.addSolution(this.#solution);
      this.#popPiece();
      const nexti = this.#placementStack.length;
      return nexti;
    }

    const nextIndex = this.#placementStack.length;

    return nextIndex;
  }

  // *** PUSH PIECE ***
  /**
   *
   * @param {Piece} piece - The piece being added
   * @param {object} placement - The placement being added
   * @param {object} placement.cells - Array of cell numbers covered by the placement
   */
  #pushPiece(piece, placement) {
    //Add placement to the stack

    const currentStackItem = this.#placementStack.pushPiecePlacement(
      piece,
      placement
    );
    piece.isSolved = true;

    //Declare callback function to be called on each cell covered
    //by the piece placed
    let cornersAffected = false;
    const forEachCoveredCellNum = (coveredCellNum) => {
      this.#solution[coveredCellNum] = piece.type;
      this.#solvedCellCount++;
      cornersAffected =
        this.#cornerCellAnalysis.cellBlocksCorner(coveredCellNum);
    };

    //Call set placement - This invalidates linked placements and calls a callback
    //fn on each covered cell
    const { invalidities, positionsRemovedByPieceType } =
      this.#placements.setPlacement(placement, forEachCoveredCellNum);

    //Store invalidated positions in stack item
    //This allows them to be restored if a stack item is popped
    currentStackItem.invaliditiesAdded = invalidities;

    //Update valid piece position count for all affected pieces
    let isInvalidPlacement = this.#updatePieceValidPositions(
      positionsRemovedByPieceType
    );

    if (!isInvalidPlacement && cornersAffected) {
      isInvalidPlacement = this.#cornerCellAnalysis.areCornersValid(
        this.#solution
      );
    }

    return isInvalidPlacement;
  }

  // *** POP PIECE ***
  /**
   * Pops last placement from the stack and updates trackers
   */
  #popPiece() {
    //Pop and destructure last stack item
    const {
      placement: placementToRemove,
      invaliditiesAdded: invaliditiesToRemove,
      piece: pieceToUnset,
    } = this.#placementStack.popPiecePlacement();

    //Update piece
    pieceToUnset.isSolved = false;

    //Declare callback function to be called on each cell covered
    //by the piece placed
    const forEachUncoveredCellNum = (coveredCellNum) => {
      this.#solution[coveredCellNum] = undefined;
      this.#solvedCellCount--;
    };

    //Update invalidated positions
    const positionsAddedByPieceType = this.#placements.removePlacement(
      placementToRemove,
      invaliditiesToRemove,
      forEachUncoveredCellNum
    );
    //update pieces
    this.#updatePieceValidPositions(positionsAddedByPieceType);
  }

  // *** UPDATE PIECE VALID POSITIONS
  /**
   * Applys an adjustment to each valid piece in the set by type
   *
   * @param {object} validPositionAdjustmentByPieceType - Dict with piece types as keys and adjustments to valid positions as values
   */
  #updatePieceValidPositions(validPositionAdjustmentByPieceType) {
    //Update pieces
    let isInvalidPlacement = false;
    this.#set.forEach((piece) => {
      if (validPositionAdjustmentByPieceType[piece.type]) {
        piece.validPlacementCount +=
          validPositionAdjustmentByPieceType[piece.type];
        if (!piece.isSolved && piece.validPlacementCount === 0)
          isInvalidPlacement = true;
      }
    });
    return isInvalidPlacement;
  }

  /**
   * For an array of numbers, checks whether they
   * constitute a valid roll of the genius star dice
   *
   * @param {[number]} roll
   * @returns bool
   */
  #validateRoll(roll) {
    const isValid = this.#dice.isValidRoll(roll);
    if (!isValid)
      throw new Error(
        "Invalid argument for roll: Pass an array of numbers representing a valid roll of the genius star dice."
      );
  }

  /**
   * @param {number} value
   */
  set solutionLimit(value) {
    if (!value) {
      this.#solutionLimit = 1;
      return;
    }
    if (Number.isInteger(value) && value > 0) {
      this.#solutionLimit = value;
      return;
    }
    throw new Error(
      `Invalid solution limit (${value}): Pass an integer greater than 0.`
    );
  }
}
