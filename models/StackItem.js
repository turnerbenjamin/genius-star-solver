export default class StackItem {
  constructor(piece, placement) {
    this.piece = piece;
    this.placement = placement;
    this.invaliditiesAdded = [];
  }
}
