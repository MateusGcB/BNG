let participants = [];
let calledNumbers = [];
let currentNumber = null;
let isBingoStarted = false;
let intervalId = null;

function addParticipant() {
    const participantInput = document.getElementById("participant");
    const participantName = participantInput.value.trim();

    if (participantName !== "") {
        participants.push(participantName);
        participantInput.value = "";
        participantInput.focus();
    }
}

function generateCards() {
    const cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = "";

    participants.forEach(participant => {
        const card = document.createElement("div");
        card.classList.add("card");

        const name = document.createElement("h3");
        name.classList.add("name");
        name.textContent = participant;

        const numbers = generateRandomNumbers(25, 1, 99);

        const numbersList = document.createElement("ul");
        numbersList.classList.add("numbers-list");
        numbers.forEach(number => {
            const listItem = document.createElement("li");
            listItem.textContent = number;
            numbersList.appendChild(listItem);
        });

        card.appendChild(name);
        card.appendChild(numbersList);
        cardsContainer.appendChild(card);
    });
}

function generateRandomNumbers(count, min, max) {
    const numbers = [];
    const uniqueNumbers = new Set();

    while (uniqueNumbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        uniqueNumbers.add(randomNumber);
    }

    uniqueNumbers.forEach(number => {
        numbers.push(number);
    });

    return numbers;
}

function startBingo() {
    if (!isBingoStarted) {
        isBingoStarted = true;
        intervalId = setInterval(drawNumber, 800); // Sorteia um número a cada 2 segundos
    }
}

function stopBingo() {
    if (isBingoStarted) {
        isBingoStarted = false;
        clearInterval(intervalId);
    }
}

function drawNumber() {
    const min = 1;
    const max = 99;

    if (calledNumbers.length === max - min + 1) {
        stopBingo();
        alert("Todos os números já foram sorteados!");
        return;
    }

    let randomNumber;

    do {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (calledNumbers.includes(randomNumber));

    calledNumbers.push(randomNumber);
    currentNumber = randomNumber;

    markNumber(currentNumber);
    checkBingo();
    displayCalledNumbers();
}

function markNumber(number) {
    const numberElements = document.querySelectorAll('.numbers-list li');
    numberElements.forEach(element => {
        if (element.textContent === number.toString()) {
            element.classList.add('selected');
        }
    });
}

function checkBingo() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const numbersList = card.querySelector('.numbers-list');
        if (!numbersList.querySelector('li:not(.selected)')) {
            const name = card.querySelector('.name').textContent;
            stopBingo();
            alert(`Bingo! ${name} venceu!`);
        }
    });
}

function displayCalledNumbers() {
    const calledNumbersContainer = document.getElementById("called-numbers");
    calledNumbersContainer.textContent = calledNumbers.join(", ");
}