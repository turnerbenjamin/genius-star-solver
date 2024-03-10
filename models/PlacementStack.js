import StackItem from "./StackItem";

class PlacementStack {
  #stack;
  #stackLength;

  constructor() {
    this.#stack = [];
    this.#stackLength = 0;
  }

  get length() {
    return this.#stackLength;
  }

  // *** PUSH PIECE PLACEMENT ***
  /**
   *Push placement to stack
   * @param {Piece} piece - The piece being added
   * @param {object} placement - The placement being added
   * @param {object} placement.cells - Array of cell numbers covered by the placement
   *
   * returns stack item
   */
  pushPiecePlacement(piece, placement) {
    //Place piece on stack
    const newStackItem = new StackItem(piece, placement);
    this.#stack.push(newStackItem);
    this.#stackLength++;
    return newStackItem;
  }

  //Pop Piece
  /**
   * Pops and returns last StackItem on the placement stack
   */
  popPiecePlacement() {
    this.#stackLength--;
    return this.#stack.pop();
  }
}

export default PlacementStack;
