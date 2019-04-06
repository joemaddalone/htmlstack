(() => {
    let voices;
    const speech = window.speechSynthesis
    const voiceList = document.getElementById('voices')
    speech.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
        voices = speech.getVoices();
        voices.forEach((v, index) => {
            const o = document.createElement('option');
            o.value = index;
            o.innerText = `${v.name} (${v.lang})`;
            voiceList.appendChild(o);
        })
    };
    document.querySelector('button').addEventListener('click', () => {
        let val = document.getElementById('text').innerText || `whoa, you didn't enter anything`
        const say = new SpeechSynthesisUtterance(val);
        say.voice = voices[+voiceList.selectedOptions[0].value];
        speech.speak(say);
    })
})();