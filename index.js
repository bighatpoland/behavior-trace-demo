import axios from "axios"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const CHATGPT_ENDPOINT = "https://api.openai.com/v1/chat/completions"

async function is_input_spam_1(input) {
    const req = {
        model : "gpt-4",
        messages : [
            { role : "system", content : "Your task is to determine if the user input is spam or not. It follows."},
            { role : "user", content : input },
            { role : "system", content : "Now, before providing your response, write a 1-2 sentence explanation of why it is or is not spam."},
        ]
    }    
let response = await axios.post(CHATGPT_ENDPOINT, req, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
    }
})

try {
    if (
        response &&
        response.data &&
        Array.isArray(response.data.choices) &&
        response.data.choices[0] &&
        response.data.choices[0].message &&
        typeof response.data.choices[0].message.content === "string"
    ) {
        return response.data.choices[0].message.content;
    } else {
        throw new Error("Unexpected API response structure");
    }
} catch (error) {
    console.error("Error processing API response:", error.message);
    return null;
}
}

let spam_input = "Buy my product! Buy it now!"

let behavior_trace = await is_input_spam_1(spam_input)

console.info({
    behavior_trace
})