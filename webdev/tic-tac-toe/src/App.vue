<template>
  <div class="min-h-screen pt-8 font-mono text-center">

    <h1 class="mb-8 text-6xl font-bold uppercase ">Tic-Tac-Toe</h1>

    <h3 class="mb-4 text-2xl">Player {{ player }} turn</h3>

    <div class="flex flex-col items-center mb-8">
      <div v-for="(row, x) in board" :key="x" class="flex">
        <Cell v-for="(cell, y) in row" :key="y" @click="move(x, y)" :cell="cell" />
      </div>
    </div>


    <div class="text-center">
      <div v-if="winner" class="mb-8 text-4xl font-bold animate-bounce">
        <h2 v-if="winner !== 'D'" :class="`${winner === 'X' ? 'text-red-500' : 'text-blue-700'}`"> ! Player '{{ winner
        }}' wins !
        </h2>
        <h2 v-if="winner === 'D'" class="text-yellow-600"> ! It's a DRAW ! </h2>
      </div>

      <button @click="ResetGame"
        class="px-4 py-2 font-bold uppercase bg-gray-300 rounded duration-400 hover:bg-gray-600">
        Reset
      </button>
    </div>
  </div>

</template>



<script setup lang="ts">
import { ref, computed } from 'vue';
import Cell from './Cell.vue';

const player = ref("X")
const board = ref([])

let tmpBoard = localStorage.getItem('TicTacBoard')
if (tmpBoard !== null) board.value = JSON.parse(tmpBoard)
else board.value = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]


// For each row there's a valid win set, each number represents an index on the game board, like this:
//  0 | 1 | 2
// -----------
//  3 | 4 | 5     -> [0,1,2] means the player has played on the 0,1,2 indexes of the board game
// -----------  
//  6 | 7 | 8
const possibleWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]


// Returns the Winner Player if there's one
const CalculateWinner = (flatBoard: string[]) => {

  let cellsUsed = 0
  for (let i in flatBoard) {
    if (flatBoard[i] !== "") cellsUsed++
  }
  if (cellsUsed === flatBoard.length) return "D"

  for (let i = 0; i < possibleWins.length; i++) {
    const [a, b, c] = possibleWins[i];
    if (flatBoard[a] && flatBoard[a] === flatBoard[b] && flatBoard[a] === flatBoard[c]) {
      return flatBoard[a];
    }
  }
  return null;
};

// Checks if there's a Winner everytime the board changes
// Transforms the board information into a single array of strings
// EX: [[a,b,c],[d,e,f]].flat() = [a,b,c,d,e,f] 
const winner = computed(() => CalculateWinner(board.value.flat()));


// If there's not a winner already and the chosen position is valid, the board is updated
const move = (x: number, y: number) => {
  if (winner.value || board.value[x][y] !== "") return;
  board.value[x][y] = player.value;
  player.value = player.value === "X" ? "O" : "X";
  localStorage.setItem('TicTacBoard', JSON.stringify(board.value))
};


// Resets the game
const ResetGame = () => {
  board.value = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  player.value = "X";
  localStorage.removeItem('TicTacBoard')
};

</script>
