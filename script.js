const X_class = 'x'
const O_class = 'o'
const cellElements = document.querySelectorAll('[data-cell]')
const main_Div = document.getElementById('main-Div')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winning_arrays = [
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let OTurn
restartButton.addEventListener('click',StartGame)
StartGame()

function StartGame() {
    circleTurn = false
    cellElements.forEach(cell => {
      cell.classList.remove(X_class)
      cell.classList.remove(O_class)
      cell.removeEventListener('click', handleClick)
      cell.addEventListener('click', handleClick, { once: true })
    })
    getHoverBack()
    winningMessageElement.classList.remove('show')
  }

function handleClick(e){
    const cell = e.target
    const currentClass = OTurn ? O_class : X_class
    placeMark(cell,currentClass)
    if (checkWin(currentClass)){
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        swapTurns()
        getHoverBack()
    }
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}
function swapTurns(){
    OTurn = !OTurn
}
function getHoverBack(){
    main_Div.classList.remove(X_class)
    main_Div.classList.remove(O_class)
    if (OTurn){
        main_Div.classList.add(O_class)
    }
    else{
        main_Div.classList.add(X_class)
    }
}
function checkWin(currentClass) {
    return winning_arrays.some(combination => {
      return combination.every(index => {
        return cellElements[index].classList.contains(currentClass)
      })
    })
  }
  function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = 'Draw!'
    } else {
      winningMessageTextElement.innerText = `${OTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
  }
function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_class) || cell.classList.contains(O_class)
    })
  }