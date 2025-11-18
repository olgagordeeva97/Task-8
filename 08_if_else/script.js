const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');
const minInput = document.getElementById('minInput');
const maxInput = document.getElementById('maxInput');
const startButton = document.getElementById('startGame');

function numberToWords(num) {
    const ones = ['ноль','один','два','три','четыре','пять','шесть','семь','восемь','девять'];
    const teens = ['десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать'];
    const tens = ['','','двадцать','тридцать','сорок','пятьдесят','шестьдесят','семьдесят','восемьдесят','девяносто'];
    if (num < 0) return 'минус ' + numberToWords(Math.abs(num));
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) {
        let r = tens[Math.floor(num / 10)];
        if (num % 10 !== 0) r += " " + ones[num % 10];
        return r;
    }
    return String(num);
}

function getQuestionPhrase(answerText) {
    const phrases = [
        `Да это легко! Ты загадал ${answerText}?`,
        `Наверное, это число ${answerText}?`,
        `Похоже, что это ${answerText}?`
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
}

function getSuccessPhrase() {
    const phrases = [
        "Красота! Я угадал!",
        "Вот это да! Число найдено!",
        "Я знал, что сумею!"
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
}

let minValue;
let maxValue;
let answerNumber;
let orderNumber;
let gameRun = false;

startButton.addEventListener("click", () => {
    minValue = parseInt(minInput.value) || 0;
    maxValue = parseInt(maxInput.value) || 100;
    minValue = minValue < -999 ? -999 : minValue > 999 ? 999 : minValue;
    maxValue = maxValue < -999 ? -999 : maxValue > 999 ? 999 : maxValue;
    orderNumber = 1;
    gameRun = true;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    let textVersion = numberToWords(answerNumber);
    if (textVersion.length >= 20) textVersion = answerNumber;
    orderNumberField.innerText = orderNumber;
    answerField.innerText = getQuestionPhrase(textVersion);
    document.getElementById("gameBlock").classList.remove("collapse");
});

document.getElementById('btnOver').addEventListener('click', function () {
    if (!gameRun) return;
    if (minValue >= maxValue) {
        answerField.innerText = `Похоже, что-то не так...`;
        gameRun = false;
        return;
    }
    minValue = answerNumber + 1;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber++;
    let textVersion = numberToWords(answerNumber);
    if (textVersion.length >= 20) textVersion = answerNumber;
    orderNumberField.innerText = orderNumber;
    answerField.innerText = getQuestionPhrase(textVersion);
});

document.getElementById('btnLess').addEventListener('click', function () {
    if (!gameRun) return;
    if (minValue >= maxValue) {
        answerField.innerText = `Хм... ошибка в диапазоне`;
        gameRun = false;
        return;
    }
    maxValue = answerNumber - 1;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber++;
    let textVersion = numberToWords(answerNumber);
    if (textVersion.length >= 20) textVersion = answerNumber;
    orderNumberField.innerText = orderNumber;
    answerField.innerText = getQuestionPhrase(textVersion);
});

document.getElementById('btnEqual').addEventListener('click', function () {
    if (!gameRun) return;
    answerField.innerText = getSuccessPhrase();
    gameRun = false;
});

document.getElementById('btnRetry').addEventListener('click', function () {
    document.getElementById("gameBlock").classList.add("collapse");
    gameRun = false;
});
