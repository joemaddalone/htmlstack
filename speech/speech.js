'use strict';

if (!window.webkitSpeechRecognition) {
    document.querySelector('h1').textContent = 'Bad browser, bad!';
} else {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = function (event) {
        var len = event.results.length - 1;
        var say = event.results[len][0].transcript;
        var t = document.querySelector('h1');
        t.textContent = say;
        t.style.color = say;
    };
    recognition.start();
}