// To reset storage
// localStorage.clear();

class NoteManager {
    static notes = []
    static noteObjects = []

    constructor() {
        this.target = document.getElementById('rowContainer')
        this.setupPage()
        this.updateTimeStamp()

        // ChatGPT was used as inspiration for this setup for setinterval.
        setInterval(() => {
            this.updateStorage();
        }, 2000)
    }


    updateStorage() {
        if (NoteManager.notes.length > 0) {
            NoteManager.noteObjects = []
            for (let i = 0; i < NoteManager.notes.length; i++) {
                let textElement = NoteManager.notes[i]
                NoteManager.noteObjects.push(new Note(textElement.id, textElement.value))
            }
            this.writeToStorage()
        }
        this.updateTimeStamp()
    }

    writeToStorage() {
        for (let i = 0; i < NoteManager.noteObjects.length; i++) {
            let noteObject = NoteManager.noteObjects[i]
            let jsonString = JSON.stringify(noteObject)
            localStorage.setItem(noteObject.id, jsonString)
        }
        // this.checkLocalStorage()
    }

    // Used for logging
    checkLocalStorage() {
        let testArray = []
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            testArray.push(localStorage.getItem(key))
        }
        console.log(testArray)
    }

    setupPage() {
        this.target.innerHTML = ''

        let keys = Object.keys(localStorage);
        keys.sort()

        for (let i = 0; i < localStorage.length; i++) {
            console.log(`Key found`)
            const key = keys[i]
            this.target.appendChild(this.setupRow(localStorage.getItem(key)))
        }
    }

    setupRow(jsonString) {
        let note = JSON.parse(jsonString)

        const editRowDiv = document.createElement('div')
        editRowDiv.classList.add('editRow')
        console.log(note)
        editRowDiv.id = "row" + NoteManager.extractId(note.id)

        const textArea = document.createElement('textarea')
        textArea.classList.add('blueInputBox')
        textArea.id = note.id
        textArea.value = note.text
        NoteManager.notes.push(textArea)

        const removeButton = document.createElement('button')
        removeButton.classList.add('removeButton')
        removeButton.textContent = removeText
        removeButton.id = "remove" + NoteManager.extractId(note.id)
        removeButton.onclick = removeButtonHandler

        editRowDiv.appendChild(textArea)
        editRowDiv.appendChild(removeButton)
        ButtonManager.idGenerator += 1

        return (editRowDiv)
    }

    static extractId(rawId) {
        // Regex was generated by ChatGPT
        const numbers = rawId.match(/\d+/g);
        let myId = 0

        if (numbers) {
            let myIdArray = numbers.map(match => parseInt(match, 10));


            for (const num of myIdArray) {
                myId = myId * 10 + num
            }

            return myId
        }
    }

    removeFromStorage(rowNum) {
        let keyForRemove = "text" + rowNum
        console.log("Test key " + keyForRemove)

        // Check if the item with the key exists before removing
        if (localStorage.getItem(keyForRemove) !== null) {
            localStorage.removeItem(keyForRemove);
            console.log("Item removed successfully");
        } else {
            console.log("Item not found in localStorage");
        }
    }

    updateTimeStamp() {
        // Get the <span> element by its ID
        const timestampSpan = document.getElementById('timestamp');

        // Create a new Date object to get the current timestamp
        const currentTimestamp = new Date();

        timestampSpan.textContent = "Stored at: " + currentTimestamp.toISOString()
    }
}

class Note {
    constructor(id, text) {
        this.id = id
        this.text = text
    }
}


class ButtonManager {
    static idGenerator = 0

    constructor() {
        this.target = document.getElementById('rowContainer')
    }
    addRow() {
        const editRowDiv = document.createElement('div')
        editRowDiv.classList.add('editRow')
        editRowDiv.id = "row" + ButtonManager.idGenerator

        const textArea = document.createElement('textarea')
        textArea.classList.add('blueInputBox')
        textArea.id = "text" + ButtonManager.idGenerator
        NoteManager.notes.push(textArea)

        const removeButton = document.createElement('button')
        removeButton.classList.add('removeButton')
        removeButton.textContent = removeText
        removeButton.id = "remove" + ButtonManager.idGenerator
        removeButton.onclick = removeButtonHandler

        this.target.appendChild(editRowDiv)
        editRowDiv.appendChild(textArea)
        editRowDiv.appendChild(removeButton)

        ButtonManager.idGenerator += 1
    }

    removeRow(rowNum) {
        let row = document.getElementById("row" + rowNum)
        let textKey = "text" + rowNum

        for (let i = 0; i < NoteManager.notes.length; i++) {
            console.log(NoteManager.notes[i].id)
            if (NoteManager.notes[i].id === textKey) {
                NoteManager.notes.splice(i, 1)
                console.log("html removed")
            }
        }

        for (let i = 0; i < NoteManager.noteObjects.length; i++) {
            if (NoteManager.noteObjects[i].id === textKey) {
                NoteManager.notes.splice(i, 1)
                console.log("object removed")
            }
        }

        // console.log("Objects")
        // console.log(NoteManager.noteObjects)
        // console.log("html")
        // console.log(NoteManager.notes)
        row.remove()
    }
}

// Function calls to run scripts

// LocalStorageManager
let noteManager = new NoteManager()

let manager = new ButtonManager()

function addButtonHandler() {
    manager.addRow()
}

function removeButtonHandler(event) {
    const buttonIdRaw = event.target.id
    manager.removeRow(NoteManager.extractId(buttonIdRaw))
    noteManager.removeFromStorage(NoteManager.extractId(buttonIdRaw))
}

// Set up initial text.
let indexLinkElement = document.getElementById('indexLink')
indexLinkElement.textContent = indexLink

let addButton = document.getElementById('addButton')
addButton.textContent = addText

let removeButtons = document.getElementsByClassName('removeButton')

for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].textContent = removeText
}