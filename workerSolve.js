import initialiseSolver from "./utils/initialiseSolver";

const solver = initialiseSolver();

self.onmessage = ({ data: args }) => {
  const { blockers, options } = args;
  const solves = solver.solve(blockers, options);
  postMessage(solves);
};
