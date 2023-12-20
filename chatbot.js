 
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatBotToggler = document.querySelector(".chatbot-toggler");
const chatBotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY ="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";
const inputInitHeight = chatInput.scrollHeight;
const createChatLi =(message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === 'outgoing' ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL ="https://api.openai.com/v1/chat/completions";
    
    //define message ansd property for API rquest
    const messageElement = incomingChatLi.querySelector("p");
    const requestOption = {
        method: "POST",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
          })
    }

    // send post api and get response
    fetch(API_URL, requestOption).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
        //----------------------------------------------try line--------------------------------------------//
        var messages = data.choices[0].message.content;
        read(messages);
        console.log(messages);
        //----------------------------------------------try line--------------------------------------------//
        // console.log(messageElement.textContent);
    }).catch((error) => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! something went wrong. Please try again.";
    }).finally(() =>  chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
     userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    //Append User message to the chat box
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    setTimeout(()=> {
        // Display "thinking..." message while waiting for response 
        const incomingChatLi = createChatLi("Thinking......", "incoming");
       chatbox.appendChild(incomingChatLi);
       chatbox.scrollTo(0, chatbox.scrollHeight);
       generateResponse(incomingChatLi);
    },600);
}

chatInput.addEventListener("input", () =>{
    //Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener('keydown', (e) =>{
    //if Enter key is pressed vwithout shift key and the window 
    // width is greter than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
chatBotCloseBtn.addEventListener('click',() => document.body.classList.remove("show-chatbot"));
chatBotToggler.addEventListener('click',() => document.body.classList.toggle("show-chatbot"));



// --------------------------------------------trying-----------------------------------------

//Speach
// const speechBtn = document.querySelector("#speach");

function read(message){
    const speech = new SpeechSynthesisUtterance()
    const allVoic = speechSynthesis.getVoices()
    speech.voice = allVoic[3];
    console.log(allVoic[2])
    speech.text = message;
    speech.volume = 1;
    window.speechSynthesis.speak(speech)
    console.log("speacking");
}

// speechBtn.addEventListener("click", () => {
//     // let messages = data.choices[0].message.content;
//     read(messages);
//     console.log(messages)
// })