const spamWords = ["spam", "buy now", "click here", "free", "limited time offer"];
const resultDiv = document.getElementById("result");
const inputField = document.getElementById("messageInput");
const checkButton = document.getElementById("checkButton");

checkButton.addEventListener("click", () => {
    const userInput = inputField.value.toLowerCase();
    const isSpam = spamWords.some(word => userInput.includes(word));
    
    if (isSpam) {
        resultDiv.textContent = "This message is likely spam.";
        resultDiv.style.color = "red";
    } else {
        resultDiv.textContent = "This message is not spam.";
        resultDiv.style.color = "green";
    }
});