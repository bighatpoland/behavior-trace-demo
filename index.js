import axios from "axios"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const CHATGPT_ENDPOINT = "https://api.openai.com/v1/chat/completions"

async function is_input_spam_1()