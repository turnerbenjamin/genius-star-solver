import pieceDictionary from "./utils/pieceDictionary";
import getWorker from "./workerSolve.js?worker";
import initialiseSolver from "./utils/initialiseSolver";
import Dice from "./models/Dice";

const dice = new Dice();
const solver = initialiseSolver();

function runSolve(blockers, options) {
  return new Promise((resolve, reject) => {
    const worker = getWorker();
    worker.postMessage({ blockers, options });
    worker.onmessage = resolve;
    worker.onerror = reject;
  });
}

// *** ASYNC ***
/**
 * Given a set of blockers determined by a dice roll, returns a solution count and an array of solutions.
 *
 * @param {number[]} roll - A set of 7 integers between 1-48
 * @param {bool} options.isBonus - Whether bonus set should be used
 * @param {number} options.solutionsRepositoryMaxLength - Max solutions to return
 * @param {number} options.solutionLimit - Max solutions to track
 * @returns {object}
 */
async function asyncSolve(roll, options) {
  const { data: res } = await runSolve(roll, options);
  return res;
}

export default solver;
export { pieceDictionary, asyncSolve, dice };
