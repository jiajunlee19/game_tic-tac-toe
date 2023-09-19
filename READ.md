# Tic-Tac-Toe Game

# Features
1. Apply mark when a player clicks on any unmarked square in the 3x3 square matrix board
2. For each round, alternate between 'X' and 'O' to represent two players' mark
3. Indicates when a player has won the game 
4. Indicates the game is tied when the board is full but there's no winner
5. Stores a game’s history as a game progresses
6. Show current move and allows players to timetravel to previous moves based on the game's history

# Ideas
1. For the current move only, show “You are at move #…” instead of a button.
2. Rewrite Board to use two loops to make the squares instead of hardcoding them.
3. Add a toggle button that lets you sort the moves in either ascending or descending order.
4. When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
5. Display the location for each move in the format (row, col) in the move history list.