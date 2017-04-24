if(!window.webkitSpeechRecognition){
    document.querySelector('h1').textContent = 'Bad browser, bad!';
}
else {
    let recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = event => {
        let len = event.results.length -1;
        let say = event.results[len][0].transcript;
        let t = document.querySelector('h1');
        t.textContent = say;
        t.style.color = say;
    }
    recognition.start();
}
