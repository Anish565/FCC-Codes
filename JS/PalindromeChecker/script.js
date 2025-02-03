document.getElementById("check-btn").addEventListener("click", function () {
    const inputField = document.getElementById("text-input");
    const resultElement = document.getElementById("result");
    let text = inputField.value.trim();

    if (!text) {
        alert("Please input a value");
        return;
    }

    // Preserve the original input for display
    const originalText = text;

    // Normalize the text: remove non-alphanumeric characters & convert to lowercase
    const cleanedText = text.toLowerCase().replace(/[^a-z0-9]/g, "");

    // Check if the cleaned text is a palindrome
    const isPalindrome = cleanedText === cleanedText.split("").reverse().join("");

    // Display the result
    if (isPalindrome) {
        resultElement.textContent = `${originalText} is a palindrome`;
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = `${originalText} is not a palindrome`;
        resultElement.style.color = "red";
    }
});