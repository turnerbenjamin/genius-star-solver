import getRandomElement from "../utils/getRandomElement";

export default class Dice {
  #excludedValues;
  #valueToDiceMap;
  #diceToValueMap;

  constructor() {
    this.#excludedValues = [3, 6, 14, 35, 43, 46];
    this.#diceToValueMap = {
      1: [1, 5, 15, 34, 44, 48],
      2: [10, 27, 31],
      3: [18, 22, 39],
      4: [19, 20, 21, 28, 29, 30],
      5: [12, 13, 23, 24, 32, 33, 41, 42],
      6: [2, 4, 7, 8, 9, 11, 16, 17],
      7: [25, 26, 36, 37, 38, 40, 45, 47],
    };
    this.#valueToDiceMap = {};
    for (let i = 1; i <= 7; i++) {
      const dieValues = this.#diceToValueMap[i];
      dieValues.forEach((value) => {
        this.#valueToDiceMap[value] = i;
      });
    }
  }

  /**
   * Checks whether value is included on any of the
   * genius star dice
   *
   * @param {number} value
   * @returns bool
   */
  isValueOnDice(value) {
    this.valuesNotOnDice();
    return this.#valueToDiceMap[value] !== undefined;
  }

  /**
   * Returns an array containing values from 1-48 not
   * included on any genius star die
   *
   * @returns [numbers]
   */
  get valuesNotOnDice() {
    return this.#excludedValues;
  }

  /**
   * Returns a dictionary of genius star dice
   * with an array of values on each die
   *
   * @returns [object] Dictionary of dice
   */
  get dice() {
    return this.#diceToValueMap;
  }

  /**
   * For keys 1-7, returns an array of values
   * stored on the relevant die
   *
   * @param {number} key 1-7
   * @returns [number] || undefined
   */
  getDieByKey(key) {
    return this.#diceToValueMap[key];
  }

  /**
   * Returns the die key for a given value or undefined
   * if the value is not on any of the genius star die
   *
   * @param {number} value
   * @returns number || undefined
   */
  getDieKeyByValue(value) {
    return this.#valueToDiceMap[value];
  }

  /**
   * Returns an array of values representing a
   * random roll of each of the 7 genius star dice
   *
   * @returns [number]
   */
  get randomRoll() {
    const roll = [];
    for (let i = 1; i <= 7; i++) {
      const die = this.#diceToValueMap[i];
      roll.push(getRandomElement(die));
    }
    return roll;
  }

  /**
   * For an array of numbers, checks whether they
   * constitute a valid roll of the genius star dice
   *
   * @param {[number]} roll
   * @returns bool
   */
  isValidRoll(roll) {
    const diceCount = 7;
    const isArray = Array.isArray(roll);
    if (!isArray || roll.length !== diceCount) return false;

    const diceProfile = {};
    let diceRolledCount = 0;
    roll.forEach((value) => {
      if (!Number.isInteger(value)) return;

      const dieKey = this.getDieKeyByValue(value);
      if (diceProfile[dieKey] !== undefined) return false;

      diceProfile[dieKey] = true;
      diceRolledCount++;
    });
    return diceRolledCount === diceCount;
  }
}
