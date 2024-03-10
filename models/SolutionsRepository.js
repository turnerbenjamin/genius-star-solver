class SolutionsRepository {
  #solutionCount;
  #repository;
  #maxRepositoryLength;
  constructor() {
    this.#solutionCount = 0;
    this.#repository = [];
    this.#maxRepositoryLength = 1;
  }

  get maxRepositoryLength() {
    return this.#maxRepositoryLength;
  }

  set maxRepositoryLength(value) {
    if (!value) return;
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error(
        `Max repository length must be an integer greater than 0.`
      );
    }
    this.#maxRepositoryLength = value;
  }

  get length() {
    return this.#repository.length;
  }

  get solutionsFound() {
    return this.#solutionCount;
  }

  get solutions() {
    return this.#repository;
  }

  // *** ADD SOLUTION ***
  /**
   * Updates solutions count and stores solutions
   * until solutions repository max length has been reached
   */
  addSolution(solution) {
    this.#solutionCount++;
    if (this.#solutionCount > this.maxRepositoryLength) return;
    const solutionClone = { ...solution };
    this.#repository.push(solutionClone);
  }
}

export default SolutionsRepository;
