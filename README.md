<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/turnerbenjamin/genius-star-solver">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Genius Star Solver</h3>

  <p align="center">
    A simple solver for Genius Star puzzles
    <br />
    <br />
    <a href="https://github.com/turnerbenjamin/genius-star-solver">View Demo</a>
    ·
    <a href="https://github.com/turnerbenjamin/genius-star-solver/issues">Report Bug</a>
    ·
    <a href="https://github.com/turnerbenjamin/genius-star-solver/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#quick-start">Quick Start</a></li>
        <li><a href="#solve-report">Solve Report</a></li>
        <li><a href="#dice">Dice</a></li>
        <li><a href="#options">Options</a></li>
        <li><a href="#async">Async</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<p>The Genius Star is a puzzle by <a href="https://www.happypuzzle.co.uk/family-puzzles-and-games/family-puzzles-games-to-enjoy/the-genius-star">The Happy Puzzle Company.</a></p>
<p>This project is a simple solver for the Genius Star with the sole purpose of providing a fun personal challenge.</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Installation

```console
$ npm install turnerbenjamin@genius-star-solver
```

### Usage

#### Quick start

The default export is a solver object with a single public method, solve. You can call this
with an array of 7 integers representing a roll of the dice.

```js
import solver from "genius-star-solver";
```

```js
const roll = [9, 10, 28, 33, 34, 39, 47];
const solveReport = solver.solve(roll);
```

#### Solve Report

The solve method returns an object with several properties about the solve, e.g the number
of solutions found.

The solutions property is an array of solutions, e.g:

```json
[
  {
    "1": "pink",
    "2": "bonus"
  }
]
```

Each solution is a dictionary. The key being the cell number and the value a piece type.
A dictionary of piece types may be imported as a named import:

```js
import { pieceDictionary } from "genius-star-solver";
```

#### Dice

The roll, passed to solve, must reflect a valid roll of the 7 dice provided by the genius
star puzzle.
A dice object may be imported as a named import:

```js
import { dice } from "genius-star-solver";
```

```js
const isRollValid = dice.isValidRoll(roll);
```

```js
const roll = dice.randomRoll();
```

#### Options

You may pass an options object as a second argument to the solve method:

| key                          |  Type  | Default | Description                                            |
| :--------------------------- | :----: | :-----: | :----------------------------------------------------- |
| isBonus                      |  bool  |  false  | Whether the bonus set should be used                   |
| solutionLimit                | number |    1    | Limit the number of solutions the solver will look for |
| solutionsRepositoryMaxLength | number |    1    | Limit the number of solutions stored and returned      |

#### Async

The solve method is expensive, particularly when the solution limit is set to a high value.
You may import asyncSolve as a named import.

asyncSolve uses a web worker to run solve asynchronously and returns a promise.

```js
asyncSolve(roll, options).then((solveReport) => {
  console.log(solveReport);
});
```

The demo, a Vite & React app, uses this function, however, I am not sure whether it will work in other environments.

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/turnerbenjamin/genius-star-solver](https://github.com/turnerbenjamin/genius-star-solver)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/turnerbenjamin/genius-star-solver.svg?style=for-the-badge
[contributors-url]: https://github.com/turnerbenjamin/genius-star-solver/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/turnerbenjamin/genius-star-solver.svg?style=for-the-badge
[forks-url]: https://github.com/turnerbenjamin/genius-star-solver/network/members
[stars-shield]: https://img.shields.io/github/stars/turnerbenjamin/genius-star-solver.svg?style=for-the-badge
[stars-url]: https://github.com/turnerbenjamin/genius-star-solver/stargazers
[issues-shield]: https://img.shields.io/github/issues/turnerbenjamin/genius-star-solver.svg?style=for-the-badge
[issues-url]: https://github.com/turnerbenjamin/genius-star-solver/issues
[license-shield]: https://img.shields.io/github/license/turnerbenjamin/genius-star-solver.svg?style=for-the-badge
[license-url]: https://github.com/turnerbenjamin/genius-star-solver/blob/master/LICENSE
