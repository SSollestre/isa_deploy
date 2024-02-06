class Button {
    constructor(id, color) {
        this.id = id
        this.color = color
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function removeElementById(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        element.parentNode.removeChild(element);
    }
}

function getUserInput() {
    const userInput = document.getElementById('userInput').value;
    if (userInput >= 3 && userInput <= 7) {
        removeElementById("setup")
        const myDiv = document.createElement('div');
        myDiv.id = 'buttonsContainer';
        document.body.appendChild(myDiv);
        createButtons(userInput)
    }
    else {
        alert(errorMessage);
    }
}

function createButtons(n) {

    const buttonsContainer = document.getElementById('buttonsContainer');
    for (let i = 1; i <= n; i++) {
        const template = new Button(i, getRandomColor())

        const button = document.createElement('button');

        console.log(template.id)

        button.style.backgroundColor = template.color
        // Create a span element and set its text content
        const span = document.createElement('span');
        span.innerHTML = template.id;
        span.id = `button${i}`;
        button.appendChild(span)
        button.classList.add("gameButton")
        buttonsContainer.appendChild(button);
    }

    setTimeout(() => {
        scrambleButtons(buttonsContainer, n);
    }, n * 1000);
}

function scrambleButtons(container, n) {
    let remainingScrambles = n;

    function moveButtons() {
        const buttons = container.querySelectorAll('.gameButton');
        const gameDimensions = container.getBoundingClientRect();

        buttons.forEach(button => {
            const styles = getComputedStyle(button);
            const totalButtonWidth = Math.floor((button.offsetWidth + parseFloat(styles.marginLeft) + parseFloat(styles.marginRight)) * 2.5);
            const totalButtonHeight = Math.floor((button.offsetHeight + parseFloat(styles.marginTop) + parseFloat(styles.marginBottom)) * 2);

            const windowWidth = gameDimensions.width - totalButtonWidth * 1.2;
            const windowHeight = gameDimensions.height - totalButtonHeight * 1.2;

            const newX = Math.floor(Math.random() * windowWidth);
            const newY = Math.floor(Math.random() * windowHeight);
            button.style.transform = `translate(${newX}px, ${newY}px)`;
        });

        remainingScrambles--;

        if (remainingScrambles > 0) {
            setTimeout(moveButtons, 2000);
        } else {
            // After the last scramble, allow the user to click and test their memory
            enableButtonClicks(buttons);
        }
    }

    let expectedOrder = Array.from({ length: n }, (_, i) => i + 1);

    function endGame(win) {
        const buttons = container.querySelectorAll('.gameButton');
        if (win) {
            alert(victoryMessage)
        } else {
            alert(defeatMessage)
            let currentButton = 1;
            buttons.forEach(button => {
                button.removeEventListener("click", handleButtonClick);
                const buttonNum = document.getElementById(`button${currentButton}`)
                buttonNum.style.visibility = 'visible'
                currentButton++;
            })
        }
    }

    // Handle button click
    function handleButtonClick(event) {
        const clickedButton = event.target;

        const spanElement = clickedButton.querySelector('span');
        const spanId = spanElement.id

        const buttonNum = parseInt(spanElement.innerHTML);
        if (buttonNum == expectedOrder[0]) {
            const span = document.getElementById(spanId)
            span.style.visibility = 'visible'

            // Remove the first element and shift all remaining elements back one position
            expectedOrder = expectedOrder.slice(1)

            console.log(expectedOrder)
            // Remove the click event listener to prevent further clicks
            clickedButton.removeEventListener("click", handleButtonClick);
            if (expectedOrder.length == 0) {
                setTimeout(() => endGame(true), 100)
            }
        } else {
            endGame(false)
        }
    }

    // Enable button clicks for testing memory
    function enableButtonClicks(buttons) {
        let currentButton = 1;
        buttons.forEach(button => {
            const buttonNum = document.getElementById(`button${currentButton}`)
            buttonNum.style.visibility = 'hidden'
            button.addEventListener("click", handleButtonClick);
            currentButton++;
        });
    }

    setTimeout(moveButtons, 1000);
}

// Set up initial text.
let instructions = document.getElementById('instructions')
instructions.textContent = instructionsText

let go = document.getElementById('go')
go.textContent = goText