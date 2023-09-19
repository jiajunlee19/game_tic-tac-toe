import { useState } from 'react';
import './App.css';

function Square( {square, onSquareClick} ) {

  return (
    <button className="square" onClick={onSquareClick}>
      {square}
    </button>
  );

}

function Board() {

  //Define board state = array of 9: [null, null, ...null]
  const [board, setBoard] = useState(Array(9).fill(null));

  //Game always start with player X, even-round is always Player X and odd-round is always Player O
  const [isXNext, setIsXNext] = useState(true);

  function handleSquareClick(squareIndex) {

    //break if square is already marked or there's a winner or board is fully marked
    if (board[squareIndex] || calculateWinner(board) || checkIsBoardFull(board)) {
      return;
    }

    const currentBoard = board.slice();
    
    if (isXNext) {
      currentBoard[squareIndex] = 'X';
    }
    else {
      currentBoard[squareIndex] = 'O';
    }
    setBoard(currentBoard);
    setIsXNext(!isXNext);
  };

  //return True if board is fullly marked, game ties/no winner
  function checkIsBoardFull (board) {
    board.forEach((square) => {
      if (square) {
        return false;
      }
      return true;
    });
  };

  //return Winner if winning condition met
  function calculateWinner(board) {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i=0; i<winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i]
      if (board[a] && (board[a] === board[b]) && (board[a] === board[c])) {
        return board[a];
      }
    };
    return null;
  };

  // Show game status
  function getGameStatus(board, isXNext) {
    const winner = calculateWinner(board);
    const isBoardFull = checkIsBoardFull(board);
    let status = '';
    if (winner) {
      return 'Winner: ' + winner;
    }
    else if (!winner && isBoardFull) {
      return 'Tie, no winner!';
    }
    else {
      return 'Next Player: ' + (isXNext ? 'X': 'O');
    }
  };

  // Assign boardHTML with row of 3 square, then loop 3x into 3x3 matrix
  let boardHtml = [<div key='status' className='status'>{getGameStatus(board, isXNext)}</div>];
  for (let j=0; j<9; j+=3) {

    let rowHtml = [];  
    for (let i=j; i<j+3; i++) {
      rowHtml.push( <Square key={i} square={board[i]} onSquareClick={ () => handleSquareClick(i) } /> );
    };

    boardHtml.push( <div key={j} className='board-row'>{rowHtml}</div> );
  };

  return boardHtml;

};

function Game() {

  // Define history = max 9 moves => list of 9x board arrays [ [null, ...null], ..., [null, ...null]  ]
  const [history, setHistory] = useState([Array(9).fill(null)]);

  //Define currentBoard as last move
  const currentBoard = history[history.length - 1];

  console.log(currentBoard);

};

export default Board;
