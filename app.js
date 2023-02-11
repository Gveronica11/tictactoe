//actors
//board
let gameState = {};  

//player= X, O


//events
//startGame
const startGame = () => {
    gameState.board  =[ 
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];

    gameState.winner = null;
    gameState.currentPlayer = 'X';
    gameState.turnCount = 0; 
}

//display board
const renderBoard = () => {
    const board = document.querySelector('#board');
       emptyElement(board);
    for(let i = 0; i < gameState.board.length; ++i){
        const row= gameState.board[i];
    for(let j = 0; j < row.length; j++){
        let column = row[j];
        const cellElem=document.createElement('div');
        cellElem.classList.add('cell');
        cellElem.innerHTML= gameState.board[i][j];  
        cellElem.dataset.coordinates=`${i},{j}`;
        board.appendChild(cellElem);
    }
  }
};

const renderForm= () => {
    const button = document.querySelector('#startGame')
     button.classList.add('hidden');
};
   
//display active player
const renderPlayer = () => {
    const player= document.querySelector('#player-turn');
    let text = ' ';
    if(gameState.winner){
        text = `<span class= "player"> ${gameState.currentPlayer} has won!</span>`
    } else if (gameState.turnCount >= 9) {
        text = `<span class="player"> It's a draw!</span>`
    }
    else {
        text = `It's currently <span class="player"> player ${gameState.currentPlayer}</span>'s turn`
    }


player.innerHTML= text;

if(gameState.winner || gameState.turnCount >= 9) {
    const playButton = document.createElement('button');
    playButton.innerHTML= `<button class= 'restart'> Play Again </button>`;
    player.appendChild(playButton);
}
};

const takeTurn = (coordinates) => {
    const [xCoord, yCoord] = coordinates;
    gameState.board[xCoord][yCoord] = gameState.currentPlayer;
    gameState.turnCount ++;
    changeTurn();
    renderPlayer();
};


const checkBoard = () => { 
    const combinations = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2],
        [0, 0], [1, 0], [2, 0],
        [0, 1], [1, 1], [2, 1],
        [0, 2], [1, 2], [2, 2],
        [0, 0], [1, 1], [2, 2],
        [0, 2], [1, 1], [2, 0],
    ];

    let winner = null;
    combinations.find((combination) => {
        const players = {X: 0, O: 0};
        // combination.find((coordinates) => {
        //     const [y, x] = coordinates;
        //     const mark = gameState.board[y][x];
        //     if(mark) {
        //         players[mark]++;
        //     }
        // })  
           const [y, x] = combination;
            const mark = gameState.board[y][x];
            if(mark) {
                players[mark]++;
            }

        for(const player in players) {
            console.log('player', player);
            console.log('player score', players[player]);
            if(players[player] === 3) {
                winner = player;
                return true;
            }
        }
    });
    return winner; 

};


const emptyElement = (nodeToEmpty) => {
    while (nodeToEmpty.firstChild) {
        nodeToEmpty.removeChild(nodeToEmpty.firstChild);
    }
};

const changeTurn = () => {
    gameState.winner = checkBoard();
     if(!gameState.winner) gameState.currentPlayer = gameState.currentPlayer === 'X'? 'O' : 'X';

}; 

//wire up events for keypress, etc.
function addListeners() {
    const board = document.querySelector('#board');
    board.addEventListener('click', function({target}) {
        if(target.className !== 'cell') return;

        const cellElem = target;
        const [y, x] = cellElem.dataset.coordinates.split(',');
        if(gameState.board[y][x] || gameState.winner) return;
        takeTurn([y, x]);
        renderBoard();
    });

    const player = document.querySelector('#player-turn');
    player.addEventListener('click', function({target}){
        if(target.className !== 'restart') return;
        console.log('Restarting Game');
        const players = document.querySelector('#players');

        startGame();
        renderBoard();
        renderPlayer();        
    });
}

const newGame = () => {
    startGame();
    renderBoard();
    renderPlayer();
    addListeners();
    renderForm();
};