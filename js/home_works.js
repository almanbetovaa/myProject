const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const regExp = /^[A-Za-z]{3,}@[A-Za-z0-9.]+\.[A-Za-z]{2,}$/

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
let running = false

const counter = () =>{
    document.getElementById('seconds').textContent = timer
}

const startCounter = () =>{
    if (!running) {
        running = true
        interval = setInterval(() =>{
            timer++
            counter()
        }, 1000)
    }
}

const stopCounter = () =>{
    clearInterval(interval)
    running = false
}
const resetCounter = () =>{
    clearInterval(interval)
    timer = 0
    counter()
    running = false
}

start.addEventListener("click", startCounter)
stop.addEventListener("click", stopCounter)
reset.addEventListener("click", resetCounter)


//game
let attempts = 5;

const checkGuess = () => {
    if (attempts === 0) {
        document.getElementById('result').innerHTML = 'Игра окончена. Вы использовали все попытки' +  '&#9785;'
        return;
    }

    const randomNumber = Math.floor(Math.random() * 100) + 1
    const userGuess = parseInt(document.getElementById('guess').value)
    const resultDisplay = document.getElementById('result')

    if (userGuess === randomNumber) {
        resultDisplay.innerHTML = 'Поздравляем! Вы угадали правильное число! Свяжитесь с нами для получения своего выигрыша !';
    } else if (userGuess < randomNumber) {
        resultDisplay.innerHTML = 'Попробуйте число побольше'
    } else {
        resultDisplay.innerHTML = 'Попробуйте число поменьше'
    }
    resultDisplay.classList.add('blink')
    setTimeout(() => {
        resultDisplay.classList.remove('blink')
    }, 2000)

    attempts--
    document.getElementById('attempts').innerHTML = attempts
}

document.getElementById('checkButton').addEventListener('click', checkGuess)












