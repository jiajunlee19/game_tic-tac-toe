import { useState } from 'react';
import './App.css';

function Square( {squareClass, square, onSquareClick} ) {

  return (
    <button className={squareClass} onClick={onSquareClick}>
      {square}
    </button>
  );

}

function Board( {board, isXNext, onPlay} ) {

  //Define board state = array of 9: [null, null, ...null]
  // const [board, setBoard] = useState(Array(9).fill(null));

  //Game always start with player X, even-round is always Player X and odd-round is always Player O
  // const [isXNext, setIsXNext] = useState(true);

  function handleSquareClick(squareIndex) {

    //break if square is already marked or there's a winner or board is fully marked
    if (board[squareIndex] || calculateWinner(board)[0] || checkIsBoardFull(board)) {
      return;
    }

    const nextBoard = board.slice();
    
    if (isXNext) {
      nextBoard[squareIndex] = 'X';
    }
    else {
      nextBoard[squareIndex] = 'O';
    }
    // setBoard(currentBoard);
    // setIsXNext(!isXNext);
    onPlay(nextBoard, squareIndex);
  };

  //return True if board is fullly marked, game ties/no winner
  function checkIsBoardFull (board) {
    for (let i = 0; i < board.length-1; i++) {
      if (!board[i]) {
        //if any square is null, then not full (false)
        return false;
      }
    }
    return true;
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
        return [board[a], winningConditions[i]];
      }
    };
    return [null, []];
  };

  // Show game status
  function getGameStatus(board, isXNext) {
    const winner = calculateWinner(board)[0];
    const isBoardFull = checkIsBoardFull(board);
    console.log(isBoardFull)
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

      //color winning square if any
      let squareClass = 'square';
      if (calculateWinner(board)[0]) {
        const [a, b, c] = calculateWinner(board)[1]
        if (i === a || i === b || i === c) {
          squareClass = 'square-win';
        }
      }

      rowHtml.push( <Square key={i} squareClass={squareClass} square={board[i]} onSquareClick={ () => handleSquareClick(i) } /> );
    };

    boardHtml.push( <div key={j} className='board-row'>{rowHtml}</div> );
  };

  return boardHtml;

};

function Game() {

  // Define history = max 9 moves => list of 9x board arrays [ [null, ...null], ..., [X, ...O]  ]
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // Define current move#, default 0 to  max 8
  const [currentMove, setCurrentMove] = useState(0);

  //Define currentBoard based on current move#
  const currentBoard = history[currentMove];

  //Game always start with player X, even-move# is always Player X and odd-move# is always Player O
  const isXNext = currentMove % 2 === 0 ? true: false

  //Define setMoveHistory like [Player X -> position 0, ...]
  const [moveHistory, setMoveHistory] = useState([]);

  function handlePlay(nextBoard, squareIndex) {
    // setBoard(nextBoard);
    //slice to the current history and add current move as next history
    const nextHistory = [...history.slice(0, currentMove + 1), nextBoard];
    setHistory(nextHistory);

    // setIsXNext(!isXNext);
    setCurrentMove(nextHistory.length - 1);

    setMoveHistory([...moveHistory.slice(0, currentMove + 1), `Player ${nextBoard[squareIndex]} --> position ${squareIndex}`]);
  };

  function handleMoveClick(moveIndex) {
    const nextHistory = history.slice(0, moveIndex + 1);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);
  };

  function getMoveHistory(history, currentMove) {

    let moves = [];
    history.forEach((move, moveIndex) => {

      let moveDescription = '';

      if (moveIndex === 0) {
        moveDescription = 
          <button onClick={() => handleMoveClick(moveIndex)}>
            Go to game start
          </button>;
      }
      else if (moveIndex === currentMove) {
        moveDescription = 
          <div>
            {'Current move #' + moveIndex + ': ' + moveHistory[moveIndex-1]}
          </div>
      }
      else {
        moveDescription = 
          <button onClick={() => handleMoveClick(moveIndex)}>
            {'Go to move #' + moveIndex + ': ' + moveHistory[moveIndex-1]}
          </button>
      }
      
      moves.push(
        <li key={moveIndex}>
          {moveDescription}
        </li>
      );

    });

    return moves;

  };

  return (
    <div className="game">
      <div className="game-board">
        <Board board={currentBoard} isXNext={isXNext} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{getMoveHistory(history, currentMove)}</ol>
      </div>
    </div>
  );

};

export default Game;
