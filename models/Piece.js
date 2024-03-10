export default class Piece {
  #type;
  #placements;
  #placementIndexMap;
  #placementIndex;
  #cellCount;
  #pieceToStayAheadOf;

  constructor(id, type, placements, cellCount, pieceToStayAheadOf) {
    this.id = id;
    this.#type = type;
    this.#placements = placements;
    this.#pieceToStayAheadOf = pieceToStayAheadOf;
    this.#placementIndexMap = {};
    placements.forEach((placement, i) => {
      this.#placementIndexMap[placement.id] = i;
    });
    this.#placementIndex = -1;
    this.#cellCount = cellCount;
    this.validPlacementCount = placements.length;
  }

  get placementIndex() {
    return this.#placementIndex;
  }

  resetPlacementIndex() {
    this.#placementIndex = -1;
  }

  get length() {
    return this.#cellCount;
  }

  get priority() {
    //Lower values will be firt in the queue
    if (this.#pieceToStayAheadOf) return this.#pieceToStayAheadOf.priority + 1;
    return this.validPlacementCount.length / this.#cellCount;
  }

  get nextPlacement() {
    let nextPlacement;

    //Handle situation where there is more than one piece of a given type
    //Here one piece should always be one step ahead of the other
    if (
      this.#pieceToStayAheadOf &&
      this.#placementIndex < this.#pieceToStayAheadOf.placementIndex
    ) {
      this.#placementIndex = this.#pieceToStayAheadOf.placementIndex;
    }

    for (let i = this.#placementIndex + 1; i < this.#placements.length; i++) {
      const currentPlacement = this.#placements[i];
      if (currentPlacement && !currentPlacement.isInvalid) {
        nextPlacement = currentPlacement;
        this.#placementIndex = i;
        break;
      }
    }
    if (!nextPlacement) this.#placementIndex = -1;
    return nextPlacement;
  }

  //Getters
  get type() {
    return this.#type;
  }
}
