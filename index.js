const grid = document.querySelector('.grid')

const startBtn = document.getElementById('start')
const scoreElement = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

function createGrid() {
  //create elements
  //create 100 of these elements
  //add styling to these elements
  //put the element into our grid
  //push it into a new squares array

  for (let i = 0; i < width*width; i++) {
    const square = document.createElement('div')
    

    square.classList.add('square')

    grid.appendChild(square)

    squares.push(square)
  }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame(){
  //remove the Snake
  currentSnake.forEach(index => squares[index].classList.remove('snake'))
  //remove the apple
  squares[appleIndex].classList.remove('apple')
  clearInterval(timerId)
  currentSnake = [2,1,0]
  //re add new score to browser
  score = 0
  scoreElement.textContent = score
  intervalTime = 1000
  direction = 1
  generateApple()
  //new snake
  timerId = setInterval(move, intervalTime)
}



function move() {
  if(
      (currentSnake[0] + width >= width*width && direction === width) ||//if snake has hit bottom
      (currentSnake[0] % width === width-1 && direction === 1) ||//if snake has hit right wall
      (currentSnake[0] % width === 0 && direction === -1) ||//if snake has hit left wall
      (currentSnake[0] - width < 0 && direction === -width) ||//if snake has hit top wall
      squares[currentSnake[0] + direction].classList.contains('snake')
    )
  return clearInterval(timerId)




  //remove last element from our currentSnake array
  const tail = currentSnake.pop()
  //remove styling from last element
  squares[tail].classList.remove('snake')
  //add square in direction we are heading
  currentSnake.unshift(currentSnake[0] + direction) //currentSnake[currentSnake.length] + 1

  // deal with snake head getting the apple
  if (squares[currentSnake[0]].classList.contains('apple')) {
    //remove the class of apple
    squares[currentSnake[0]].classList.remove('apple')
    //grow our snake by adding class of snake of it
    squares[tail].classList.add('snake')
    //grow our snake  array
    currentSnake.push(tail)
    //generate a new apple
    generateApple()
    //add one to the score
    score++
    scoreElement.textContent = score
    //speed up our snake
    clearInterval(timerId)
    intervalTime = intervalTime * speed
    timerId = setInterval(move, intervalTime)
  }



  //add styling so we can see it
  squares[currentSnake[0]].classList.add('snake') // squares[next].classList.add('snake')

}

//const timerId = setInterval(function, time)
//clearInterval(timerId)


function generateApple() {
  do {
    // generate a random number
    appleIndex = Math.ceil(Math.random() * 100)

  } while (squares[appleIndex].classList.contains('snake'))
  squares[appleIndex].classList.add('apple')
}
generateApple()

// 38 is for the up arrow,
// 40 is the down arrow
// 37 is for the left arrow
// 39 is right arrow
function control(e){
  if (e.keyCode === 39) {
    direction = 1
  } else if (e.keyCode === 37){
    direction = -1
  } else if (e.keyCode === 38){
    direction = -width
  } else if(e.keyCode === 40) {
    direction = +width
  }
}

document.addEventListener('keydown', control)
startBtn.addEventListener('click', startGame)
