radio.onReceivedNumber(function (receivedNumber) {
    if (idP1 == 0) {
        idP1 = receivedNumber
    } else if (idP2 == 0) {
        idP2 = receivedNumber
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
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
    if (receivedString.includes(convertToText(idP1)) && timeP1 == 0) {
        basic.showString("P1")
        temp = receivedString.split(":")
        timeP1 = parseFloat(temp[1])
    } else if (receivedString.includes(convertToText(idP2)) && timeP2 == 0) {
        basic.showString("P2")
        temp = receivedString.split(":")
        timeP2 = parseFloat(temp[1])
    }
    if (timeP1 != 0 && timeP2 != 0) {
        if (timeP1 > timeP2) {
            scorep1 += 1
            basic.showString("P1")
        } else if (timeP2 > timeP1) {
            scorep2 += 1
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
