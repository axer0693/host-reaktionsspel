function getPTime (P: string, receivedString: string) {
    if (P == "P1") {
        basic.showString("P1")
        temp = receivedString.split(":")
        timeP1 = parseFloat(temp[1])
    } else if (P == "P2") {
        basic.showString("P2")
        temp = receivedString.split(":")
        timeP2 = parseFloat(temp[1])
    }
}
radio.onReceivedNumber(function (receivedNumber) {
    if (idP1 == 0) {
        idP1 = receivedNumber
        radio.sendNumber(idP1)
    } else if (idP2 == 0) {
        idP2 = receivedNumber
        radio.sendNumber(idP2)
    }
})
input.onButtonPressed(Button.A, function () {
    if (idP1 != 0 && idP2 != 0 && gameInProgress == false) {
        gameInProgress = true
        radio.sendString("game start")
    } else if (idP1 != 0 && idP2 != 0) {
        radio.sendString("" + (list._pickRandom()))
    } else {
        basic.showString("...")
    }
})
input.onButtonPressed(Button.AB, function () {
    if (gameInProgress == true) {
        gameInProgress = false
        // tie
        if (scorep1 > scorep2) {
            radio.sendString("" + idP1 + ":win")
        } else if (scorep2 > scorep1) {
            radio.sendString("" + idP2 + ":win")
        } else {
            radio.sendString("Tie")
        }
    }
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
    if (receivedString.includes(convertToText(idP1)) && timeP1 == 0) {
        getPTime("P1", receivedString)
    } else if (receivedString.includes(convertToText(idP2)) && timeP2 == 0) {
        getPTime("P2", receivedString)
    }
    if (timeP1 != 0 && timeP2 != 0) {
        if (timeP1 > timeP2) {
            scorep1 += 1
            sendWhoScored(idP1)
            basic.showString("P1")
        } else if (timeP2 > timeP1) {
            scorep2 += 1
            sendWhoScored(idP2)
            basic.showString("P2")
        } else {
            scorep1 += 1
            scorep2 += 1
            basic.showString("Samma tid")
        }
        timeP1 = 0
        timeP2 = 0
    }
})
input.onButtonPressed(Button.B, function () {
    if (idP1 != 0 && idP2 != 0) {
        basic.showString("" + scorep1 + ":" + scorep2)
    } else {
        basic.showString("...")
    }
})
function sendWhoScored (pId: number) {
    radio.sendString("" + convertToText(pId) + ":" + "scored")
}
let gameInProgress = false
let timeP2 = 0
let timeP1 = 0
let temp: string[] = []
let scorep2 = 0
let scorep1 = 0
let idP2 = 0
let idP1 = 0
let list: string[] = []
let instruktion = "hej"
list = [
"A",
"B",
"AB",
"Left",
"Right",
"Up",
"Down",
"Shake"
]
radio.setGroup(95)
idP1 = 0
idP2 = 0
scorep1 = 0
scorep2 = 0
temp = []
timeP1 = 0
timeP2 = 0
gameInProgress = false
