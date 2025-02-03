document.getElementById("convert-btn").addEventListener("click", function () {
    const inputField = document.getElementById("number");
    const outputElement = document.getElementById("output");
    let number = inputField.value.trim();

    if (number === "") {
        outputElement.textContent = "Please enter a valid number";
        outputElement.style.color = "red";
        return;
    }

    number = parseInt(number, 10);

    if (number < 1) {
        outputElement.textContent = "Please enter a number greater than or equal to 1";
        outputElement.style.color = "red";
        return;
    }

    if (number >= 4000) {
        outputElement.textContent = "Please enter a number less than or equal to 3999";
        outputElement.style.color = "red";
        return;
    }

    outputElement.textContent = convertToRoman(number);
    outputElement.style.color = "green";
});

function convertToRoman(num) {
    const romanNumerals = [
        { value: 1000, numeral: "M" },
        { value: 900, numeral: "CM" },
        { value: 500, numeral: "D" },
        { value: 400, numeral: "CD" },
        { value: 100, numeral: "C" },
        { value: 90, numeral: "XC" },
        { value: 50, numeral: "L" },
        { value: 40, numeral: "XL" },
        { value: 10, numeral: "X" },
        { value: 9, numeral: "IX" },
        { value: 5, numeral: "V" },
        { value: 4, numeral: "IV" },
        { value: 1, numeral: "I" }
    ];

    let result = "";

    for (const { value, numeral } of romanNumerals) {
        while (num >= value) {
            result += numeral;
            num -= value;
        }
    }

    return result;
}