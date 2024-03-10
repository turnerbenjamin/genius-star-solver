import pieceDictionary from "./pieceDictionary";
import piecePlacementsByPiece from "../cashedPlacements/piecePlacementsByPiece";
import Piece from "../models/Piece";

export default (isBonus = true) => {
  const set = [];

  if (isBonus)
    set.push(
      new Piece(
        "bonus",
        pieceDictionary.bonus,
        piecePlacementsByPiece.bonusPiece,
        6
      )
    );

  set.push(
    new Piece("red", pieceDictionary.red, piecePlacementsByPiece.red, 5)
  );
  set.push(
    new Piece(
      "darkGreen",
      pieceDictionary.darkGreen,
      piecePlacementsByPiece.darkGreen,
      5
    )
  );
  set.push(
    new Piece(
      "lightGreen",
      pieceDictionary.lightGreen,
      piecePlacementsByPiece.lightGreen,
      5
    )
  );
  set.push(
    new Piece("brown", pieceDictionary.brown, piecePlacementsByPiece.brown, 5)
  );

  set.push(
    new Piece(
      "purple",
      pieceDictionary.purple,
      piecePlacementsByPiece.purple,
      4
    )
  );
  set.push(
    new Piece("pink", pieceDictionary.pink, piecePlacementsByPiece.pink, 4)
  );
  set.push(
    new Piece(
      "orange",
      pieceDictionary.orange,
      piecePlacementsByPiece.orange,
      4
    )
  );

  if (!isBonus) {
    const lightBlue1 = new Piece(
      "lightBlue1",
      pieceDictionary.lightBlue,
      piecePlacementsByPiece.lightBlue,
      3
    );
    set.push(lightBlue1);
    set.push(
      new Piece(
        "lightBlue2",
        pieceDictionary.lightBlue,
        piecePlacementsByPiece.lightBlue,
        3,
        lightBlue1
      )
    );
  }

  set.push(
    new Piece(
      "yellow",
      pieceDictionary.yellow,
      piecePlacementsByPiece.yellow,
      2
    )
  );
  set.push(
    new Piece(
      "darkBlue",
      pieceDictionary.darkBlue,
      piecePlacementsByPiece.darkBlue,
      1
    )
  );

  return set;
};
