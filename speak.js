const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speechBtn = document.querySelector("#speach");


const speachRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new speachRecognition();

recognition.continuous = true;

startBtn.addEventListener("click", () => {
    recognition.start();
})

stopBtn.addEventListener("click", () => {
    recognition.stop();
})

   // sr start
        recognition.onstart = function() {
            console.log("active");
        }

   // sr end
        recognition.onend = function() {
            console.log("deactive");
        }


//Speach
function read(message){
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    window.speechSynthesis.speak(speech)
    console.log("speacking");
}
speechBtn.addEventListener("click", () => {
    let messages = data.choices[0].message.content;
    read(messages);
    console.log(messages)
})