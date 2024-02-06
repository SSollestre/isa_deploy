class StorageReader {
    constructor() {
        this.updateDisplay()

        // ChatGPT was used as inspiration for this setup for setinterval.
        setInterval(() => {
            this.updateDisplay();
        }, 2000)
    }

    updateDisplay() {
        let container = document.getElementById('readContainer')
        container.innerHTML = ''

        let keys = Object.keys(localStorage);
        keys.sort()

        for (let i = 0; i < localStorage.length; i++) {
            const key = keys[i]
            console.log(localStorage.getItem(key))
            container.appendChild(this.createDisplayDiv(localStorage.getItem(key)))
        }

        this.updateTimeStamp()

    }

    createDisplayDiv(jsonString) {
        let note = JSON.parse(jsonString)

        const box = document.createElement('div')
        box.classList.add('blueDisplayBox')

        const boxText = document.createElement('span')
        boxText.textContent = note.text
        boxText.id = note.id

        box.appendChild(boxText)
        return (box)
    }

    updateTimeStamp() {
        // Get the <span> element by its ID
        const timestampSpan = document.getElementById('timestamp');

        // Create a new Date object to get the current timestamp
        const currentTimestamp = new Date();

        timestampSpan.textContent = "Updated at: " + currentTimestamp.toISOString()
    }
}

// Setup 2 second interval events
let reader = new StorageReader()

// Set up initial text.
let indexLinkElement = document.getElementById('indexLink')
indexLinkElement.textContent = indexLink