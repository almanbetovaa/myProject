const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick =() => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = '&#9745;'
        phoneResult.style.color = 'green'
        phoneResult.style.fontSize = '28px'
    } else{
        phoneResult.innerHTML = '&#9746;'
        phoneResult.style.color = 'red'
        phoneResult.style.fontSize = '28px'
    }
}

// Tab slider
const tabContentBlocks = document.querySelectorAll('.tab_content_block')

const tabContentItems = document.querySelectorAll('.tab_content_item')
const tabParent = document.querySelector('.tab_content_items')
let currentIndex = 0;
let intervalId

const hideTabContent = () => {
    tabContentBlocks.forEach( (item) => {
        item.style.display = 'none'
    })
    tabContentItems.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    } )
}
const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    tabContentItems[index].classList.add('tab_content_item_active')
}
const startSlider = () => {
    intervalId = setInterval(() => {
        hideTabContent()
        currentIndex = (currentIndex + 1) % tabContentItems.length
        showTabContent(currentIndex)
    }, 3000)
};

const stopSlider = () => {
    clearInterval(intervalId);
}
hideTabContent()
showTabContent()
startSlider()

tabParent.onclick = (event)=> {
    if (event.target.classList.contains('tab_content_item')){
        tabContentItems.forEach((item, index) => {
            if (event.target === item){
                currentIndex = index
                hideTabContent()
                showTabContent(index)
                stopSlider()
                startSlider()
            }
        })
    }
}

//converter

const usd = document.querySelector('#usd')
const som = document.querySelector('#som')
const eur= document.querySelector('#eur')
const converter = (element, targetElement, targetElement2) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json')
            const data = await response.json()

            if (element.id === 'som') {
                targetElement.value = (element.value / data.usd).toFixed(2)
                targetElement2.value = (element.value / data.eur).toFixed(2)
            }
            if (element.id === 'usd') {
                targetElement.value = (element.value * data.usd).toFixed(2)
                targetElement2.value = (element.value * (data.usd / data.eur)).toFixed(2)
            }
            if (element.id === 'eur') {
                targetElement.value = (element.value * data.eur).toFixed(2)
                targetElement2.value = (element.value * (data.eur / data.usd)).toFixed(2)
            }
            element.value === '' && (targetElement.value = targetElement2.value = '')
        }catch (error){
            console.log(error)
        }
    }
}


converter(som, usd, eur)
converter(usd, som, eur)
converter(eur, som, usd)



//DRY - do not repeat yourself
//KISS - keep it simple stupid


//card switcher

const card = document.querySelector('.card')
const next = document.querySelector('#btn-next')
const prev = document.querySelector('#btn-prev')
let cardId = 1
const loadCardData = async(id) =>{
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        const data = await response.json()
        card.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ?'green' : 'red'}">${data.completed}</p>
            <span>${data.id}</span>
        `
    } catch (error) {
        console.log(error)
    }
}
const setCardId = (id) => id< 1? 200 : id >200 ? 1 :id

loadCardData(cardId)

window.onload = async ()=>{
    await loadCardData(cardId)
}
next.onclick = async () => {
    cardId = setCardId(++cardId)
    await loadCardData(cardId)
}
prev.onclick = async () => {
    cardId = setCardId(--cardId)
    await loadCardData(cardId)
}


//WEATHER
const citySearchInput = document.querySelector('.cityName')
const cityName = document.querySelector('.city')
const cityTemp = document.querySelector('.temp')

const BASE_URL = `http://api.openweathermap.org/data/2.5/weather`
const APP_ID = 'e417df62e04d3b1b111abeab19cea714'
const citySearch = () => {
    citySearchInput.oninput = async (event) => {
        try {
            const response = await fetch(`${BASE_URL}?q=${event.target.value}&appid=${APP_ID}`)
            const data = await response.json()
            cityName.innerHTML = data.name || 'City is not defined'
            cityTemp.innerHTML = data.main?.temp ? Math.round(data.main?.temp - 273) + '&deg;C' : '...'
        }catch (error){
            console.log(error)

        }
    }
}
citySearch()

//optional chaining - ?.

const countries = [
    { name: 'Франция', image: 'https://secretmag.ru/thumb/1200x0/filters:quality(75):no_upscale()/imgs/2022/04/19/05/5368562/c0ba19aa1ada0ba8860b974bcf8d0375d0f1799f.jpg', hint: 'Страна в Европе, известная своими музеями и культурным наследием' },
    { name: 'Япония', image: 'https://www.his-russia.ru/uploads/destination/japan_1416972705/0af1ff207349e159d0bfb7a5735e6075b8f1593d.jpeg', hint: 'Островное государство в Восточной Азии, известное своей уникальной культурой и технологиями' },
    { name: 'Бразилия', image: 'https://bigcities.org/wp-content/uploads/2020/09/Rio-de-ZHaneyro.jpg', hint: 'Крупнейшая страна Южной Америки, известная своими тропическими лесами и пляжами' },
    { name: 'Австралия', image: 'https://cdn.nur.kz/images/1120x630/4cbdd36c9c59cca2.jpeg', hint: 'Континент и страна, расположенная в Южном полушарии, известная своим уникальным флорой и фауной' },
    { name: 'Канада', image: 'https://putidorogi-nn.ru/images/stories/severnaya_amerika/kanada/kanada_7.jpg', hint: 'Крупнейшее по площади государство в Северной Америке, известное своими красивыми природными пейзажами' }
]
const selectRandomCountry = () =>{
    return countries[Math.floor(Math.random() * countries.length)]
}
const startNewRound = () => {
    const countryData = selectRandomCountry()
    startNewRound.answer = countryData.name
    document.getElementById('country-image').src = countryData.image
    document.getElementById('guess-input').value = ''
    document.getElementById('hint').textContent = ''
    startNewRound.guessed = false
}
const checkGuess = () =>{
    const guessedCountry = document.getElementById('guess-input').value.trim()
    const actualCountry = startNewRound.answer
    if (guessedCountry.toLowerCase() === actualCountry.toLowerCase()) {
        document.getElementById('hint').textContent = 'Верно!'
        const score = parseInt(document.getElementById('score-value').textContent)
        document.getElementById('score-value').textContent = score + 1
        startNewRound.guessed = true
        setTimeout(startNewRound, 1000)
    } else {
        document.getElementById('hint').textContent = 'Попробуйте еще раз! Подсказка: ' + getCurrCountryHint()
    }
}
const getCurrCountryHint= () => {
    const currentCountry = startNewRound.answer
    const countryData = countries.find(country => country.name ===currentCountry)
    return countryData.hint;
}

window.onload = startNewRound


