# Matches Game
Two people are playing a game. From the pile of 25 matches, each player takes either 1, 2 or 3 matches on each turn. The game is over once all matches are taken. Whoever has the even amount of matches wins.

## Getting Started
To run the game locally, follow these steps:

1. Install the dependencies by running npm install.
2. Start the development server by running npm run dev.

## How to Play
- Choose the number of matches in the pile by adjusting the N parameter. The formula for calculating the number of matches is 2n + 1.
- Choose the maximum number of matches allowed to be taken on each turn by adjusting the M parameter.
- Start the game by clicking either the "Start Game (User First)" button or the "Start Game (AI First)" button.
- If the player starts first, they can select the number of matches to take from the pile by clicking on the corresponding buttons.
- If the AI starts first, it will automatically take its turn.
- The game continues until there are no matches left in the pile.
- The player who takes the last match loses the game.
- After the game ends, you can start a new game or check the game history.

## Game History
The game history keeps track of previous games played. It includes the winner (either "You" or "AI"), the value of N (number of matches), and the value of M (maximum matches allowed to be taken).
To view the game history, click the "Check Game History" button. To close the game history, click the "Close Game History" button.
