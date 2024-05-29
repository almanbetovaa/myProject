const cardContainer= document.getElementById('cardContainer')
const cards = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        data.forEach(cardData => {
            const card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `
                    <img src="https://static3.depositphotos.com/1004567/221/i/450/depositphotos_2212681-stock-illustration-travel.jpg" alt="JS image">
                    <h2>${cardData.title}</h2>
                    <p>${cardData.body}</p>
                `
            cardContainer.appendChild(card)
        })
    } catch (error) {
        console.log(error)
    }
}
cards()