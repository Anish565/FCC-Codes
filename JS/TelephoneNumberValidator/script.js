document.getElementById("check-btn").addEventListener("click", function () {
    const inputField = document.getElementById("user-input");
    const resultsDiv = document.getElementById("results-div");
    let phoneNumber = inputField.value.trim();

    if (phoneNumber === "") {
        alert("Please provide a phone number");
        return;
    }

    const isValid = validatePhoneNumber(phoneNumber);

    if (isValid) {
        resultsDiv.textContent = `Valid US number: ${phoneNumber}`;
        resultsDiv.style.color = "green";
    } else {
        resultsDiv.textContent = `Invalid US number: ${phoneNumber}`;
        resultsDiv.style.color = "red";
    }
});

document.getElementById("clear-btn").addEventListener("click", function () {
    document.getElementById("user-input").value = "";
    document.getElementById("results-div").textContent = "";
});

// Function to validate US phone numbers
function validatePhoneNumber(phone) {
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
    return regex.test(phone);
}