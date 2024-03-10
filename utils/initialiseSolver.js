import piecePlacementsByCell from "../cashedPlacements/piecePlacementsByCell";
import CornerCellAnalysis from "../models/CornerCellAnalysis";
import Dice from "../models/Dice";
import PlacementStack from "../models/PlacementStack";
import Placements from "../models/Placements";
import SolutionsRepository from "../models/SolutionsRepository";
import Solver from "../models/Solver";
import getSet from "./getSet";
import pieceDictionary from "./pieceDictionary";

export default function initialiseSolver() {
  //INITIALISE SOLVER DEPENDENCIES
  const placements = new Placements(piecePlacementsByCell);
  const placementStack = new PlacementStack();
  const solutionsRepository = new SolutionsRepository();
  const dice = new Dice();
  const cornerCellAnalysis = new CornerCellAnalysis();

  return new Solver(
    pieceDictionary,
    getSet,
    dice,
    solutionsRepository,
    placementStack,
    placements,
    cornerCellAnalysis
  );
}
