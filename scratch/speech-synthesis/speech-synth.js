document.querySelector('button').addEventListener('click', () => {
    let val = document.querySelector('textarea').value || `whoa, you didn't enter anything`
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(val))
})
