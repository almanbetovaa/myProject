// modal

const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const modalCloseButton = document.querySelector('.modal_close')
let ModalShown = false

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}


const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

modalTrigger.onclick = () => {
    openModal()
}
 modalCloseButton.onclick = () =>{
    closeModal()
 }
 modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
 }
const handleScroll =() => {
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight
    if (scrolledToBottom && !ModalShown) {
        openModal()
        window.removeEventListener('scroll', handleScroll)
    }
}

window.addEventListener('scroll', handleScroll)

setTimeout(() =>{
    if (!ModalShown) {
        openModal()
        window.removeEventListener('scroll', handleScroll)
    }
}, 20000)


// bot
const form =  document.querySelector('form')
const token = '6964657692:AAHWdhVUOKJuHze6RAdqK1qolrm0LGFSe68'
const chatID = '@Aliya_lesson7'
const URL = `https://api.telegram.org/bot${token}/sendMessage`

form.onsubmit = async (event)=> {
    event.preventDefault()
    const result = event.target
    const data = Object.fromEntries(new FormData(result).entries())
    const {name, phone} = data
    const text = `Имя: ${name}\nНомер: ${phone}`
    await fetch(URL, {
        method:'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({chat_id : chatID, text})
    })
}
