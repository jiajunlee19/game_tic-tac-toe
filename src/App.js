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

  const [board, setBoard] = useState(Array(9).fill(null));

  function handleSquareClick(squareIndex) {
    const currentBoard = board.slice();
    currentBoard[squareIndex] = 'X';
    setBoard(currentBoard);
  };

  // Assign boardHTML with row of 3 square, then loop 3x into 3x3 matrix
  let boardHtml = [];
  for (let j=0; j<9; j+=3) {

    let rowHtml = [];  
    for (let i=j; i<j+3; i++) {
      rowHtml.push( <Square square={board[i]} onSquareClick={ () => handleSquareClick(i) } /> );
    };

    boardHtml.push( <div className='board-row'>{rowHtml}</div> );
  };

  return boardHtml;

};

export default Board;
