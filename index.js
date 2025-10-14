import axios from "axios"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const CHATGPT_ENDPOINT = "https://api.openai.com/v1/chat/completions"

async function is_input_spam_1(input) {
    const req = {
        model : "gpt-5",
        messages : [
            { role : "system", content : "Your task is determine if the user input is spam or not. It follows."},
            { role : "user", content : input },
            { role : "system", content : "Now, before providing your response, write a 1-2 sentence explanationof why it is or it is not a spam."},
        ]
    }    
let response = await axios.post(CHATGPT_ENDPOINT, req, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
    }
})

return response.data.choices[0].message.content 
}

let spam_input = "Buy my product! Buy it now!"

let behavior_trace = await is_input_spam_1(spam_input)

console.info({
    behavior_trace
})