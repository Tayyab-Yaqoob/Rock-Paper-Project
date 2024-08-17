document.body.addEventListener('keydown',(event) => {
    let key = event.key    
    if (key === 'r' || key === 'R') {
     gamePlay('Rock')   
    } else if (key === 'p' || key === 'P') {
        gamePlay('Paper')
    } else if (key === 's' || key === 'S') {
        gamePlay('Scissor')
    } else if (key === 'Delete') {
        resetButton()
    } else if (key === 'a' || key === 'A') {
        autoPlay()
    }
})

document.querySelector('.js-rockButton')
.addEventListener('click', () => {
    gamePlay('Rock')
})
document.querySelector('.js-PaperButton')
.addEventListener('click', () => {
    gamePlay('Paper')
})
document.querySelector('.js-scissorButton')
.addEventListener('click', () => {
    gamePlay('Scissor')
})

let setIntervalId
let isAutoPlay = false
document.querySelector('.js-autoPlay')
    .addEventListener('click', () => {
        autoPlay()
    })
function autoPlay() {
    let button = document.querySelector('.js-autoPlay')
    if (!isAutoPlay) {
        setIntervalId = setInterval(function() {
            let myMoves = computerMove()
            gamePlay(myMoves)
        } , 1000)
        isAutoPlay = true
        button.innerHTML = 'Stop Play'
    } else {
        clearInterval(setIntervalId)
        isAutoPlay = false
        button.innerHTML = 'Auto Play'
    }
}

let stats = JSON.parse(localStorage.getItem('stats'))

function gameStats() {
    document.querySelector('.js-gameStats').innerHTML=`Win: ${stats.win}, Lose: ${stats.lose}, Tie: ${stats.tie}`
}

if(!stats) {
    stats = {
        win: 0,
        lose: 0,
        tie: 0
    }
}
gameStats()


function computerMove() {
    let random = Math.random();
    let pickComputerMove = '';
    
    if (random >= 0 && random < 1/3) {
        pickComputerMove = 'Rock';
    } else if (random >= 1/3 && random < 2/3) {
        pickComputerMove = 'Paper';
    } else if (random >= 2/3 && random < 1) {
        pickComputerMove = 'Scissor';
    }
    
    return pickComputerMove;
}

function gamePlay(YourMove) {
    let result = '';
    let computerPick = computerMove(); 
    
    if (YourMove === 'Rock') {
        if (computerPick === 'Rock') {
            result = 'Tie.';
        } else if (computerPick === 'Paper') {
            result = 'You lose.';
        } else {
            result = 'You won.';
        }
    } else if (YourMove === 'Paper') {
        if (computerPick === 'Rock') {
            result = 'You won.';
        } else if (computerPick === 'Paper') {
            result = 'Tie.';
        } else {
            result = 'You lose.';
        }
    } else if (YourMove === 'Scissor') {
        if (computerPick === 'Rock') {
            result = 'You lose.';
        } else if (computerPick === 'Paper') {
            result = 'You won.';
        } else {
            result = 'Tie.';
        }
    }
    
    let resultElement = document.querySelector('.js-gameResult')
    let outPutElement = document.querySelector('.js-gameOutput')
    
    resultElement.innerHTML = `${result}`
    outPutElement.innerHTML = `You Pick <img class="move-icon" src="${YourMove}-emoji.png" alt="">
        Computer Pick <img class="move-icon" src="${computerPick}-emoji.png" alt="">.`
    
    if (result === 'You won.') {
        stats.win += 1
    } else if ( result === 'You lose.'){
        stats.lose += 1
    } else if ( result === 'Tie.'){
        stats.tie += 1
    }
    
    localStorage.setItem('stats',JSON.stringify(stats))
    gameStats()   
}

document.querySelector('.js-resetButton')
    .addEventListener('click', () => {
        resetButton()
    })
function resetButton() {
    stats.win = 0
    stats.lose = 0
    stats.tie = 0
    localStorage.removeItem('stats')
    gameStats()
}