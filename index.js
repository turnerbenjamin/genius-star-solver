import pieceDictionary from "./utils/pieceDictionary";
import initialiseSolver from "./utils/initialiseSolver";
import Dice from "./models/Dice";

const dice = new Dice();
const solver = initialiseSolver();

export default solver;
export { pieceDictionary, dice };
