const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const regExp = /^[A-Za-z0-9.]+@gmail\.com$/

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)){
        gmailResult.innerHTML = 'true'
        gmailResult.style.color = 'green'
        gmailInput.style.borderColor = 'green'
        gmailInput.style.boxShadow = '0 0 10px green'
    }
    else {
        gmailResult.innerHTML = 'false'
        gmailResult.style.color = 'red'
        gmailInput.style.borderColor = 'red'
        gmailInput.style.boxShadow = '0 0 10px red'
    }
}

const parent = document.querySelector('.parent_block')
const child = document.querySelector('.airplane')

let positionX = 0
let positionY = 0

const maxWidth = parent.offsetWidth - child.offsetWidth
const maxHeight = parent.offsetHeight - child.offsetHeight

const moveBlock = () => {
    if (positionX < maxWidth && positionY === 0) {
        positionX++
        child.style.left = `${positionX}px`
        requestAnimationFrame(moveBlock)
    } else if (positionX >= maxWidth && positionY < maxHeight) {
        positionY++
        child.style.top = `${positionY}px`
        requestAnimationFrame(moveBlock)
    } else if (positionY >= maxHeight && positionX > 0) {
        positionX--
        child.style.left = `${positionX}px`
        requestAnimationFrame(moveBlock)
    } else if (positionY > 0 && positionX === 0) {
        positionY--
        child.style.top = `${positionY}px`
        requestAnimationFrame(moveBlock)
    }
}
moveBlock()


const start = document.querySelector('#start')
const stop = document.querySelector('#stop')
const reset = document.querySelector('#reset')

let timer = 0
let interval = null

function counter (){
    document.getElementById("seconds").textContent= timer
}
function startCounter (){
    clearInterval(interval)
    interval= setInterval(()=> {
        timer++
        counter()
    }, 1000)
}

function stopCounter (){
    clearInterval(interval)
}
function resetCounter (){
    clearInterval(interval)
    timer = 0
    counter()
}
start.addEventListener("click", startCounter)
stop.addEventListener("click", stopCounter)
reset.addEventListener("click", resetCounter)

const checkGuess =() =>{
    const randomNumber = Math.floor(Math.random() * 100) + 1
    const userGuess = parseInt(document.getElementById('guess').value)
    if (userGuess === randomNumber) {
        document.getElementById('result').innerHTML = 'Поздравляем! Вы угадали правильное число!'
    } else if (userGuess < randomNumber) {
        document.getElementById('result').innerHTML = 'Попробуйте число побольше'
    } else {
        document.getElementById('result').innerHTML = 'Попробуйте число поменьше'
    }
}









