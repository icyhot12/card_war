let deckId
let remainingCards
let computerScore = 0
let meScore = 0

let newDeckBtn = document.getElementById("new-deck")
let drawCardsBtn = document.getElementById("draw-cards")
let remainingInfo = document.getElementById("remaining")
let computerScoreInfo = document.getElementById("computer-score")
let meScoreInfo = document.getElementById("me-score")

let cardValues = [
    { value: "2", generalValue: "2" },
    { value: "3", generalValue: "3" },
    { value: "4", generalValue: "4" },
    { value: "5", generalValue: "5" },
    { value: "6", generalValue: "6" },
    { value: "7", generalValue: "7" },
    { value: "8", generalValue: "8" },
    { value: "9", generalValue: "9" },
    { value: "10", generalValue: "10" },
    { value: "JACK", generalValue: "11" },
    { value: "QUEEN", generalValue: "12" },
    { value: "KING", generalValue: "13" },
    { value: "ACE", generalValue: "14" }
]

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            handleRemaining(data.remaining)
        })
}

newDeckBtn.addEventListener("click", handleClick)

drawCardsBtn.addEventListener("click", () => {
    if (!deckId) {
        alert("Take new deck first!")
    } else if (deckId && remainingCards > 0) {
        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
            .then(res => res.json())
            .then(data => {
                handleRemaining(data.remaining)
                if (data.remaining === 0) {
                    drawCardsBtn.innerHTML = "Start new game"
                }
                data.cards.map((card, index) => {
                    document.getElementById(`image${index}`).innerHTML = `<img src=${card.image} class="w-[120px] h-[167px]"/>`
                })
                return data.cards
            })
            .then(cards => {
                let computerCard = getGeneralValue(cards[0].value)
                let playerCard = getGeneralValue(cards[1].value)

                if (computerCard > playerCard) {
                    computerScore++
                } else if (computerCard < playerCard) {
                    meScore++
                } else {
                    computerScore++
                    meScore++
                }

                computerScoreInfo.innerHTML = `Computer: ${computerScore}`
                meScoreInfo.innerHTML = `Me: ${meScore}`

            })
    }
})

function getGeneralValue(localValue) {
    let tempValue
    cardValues.map((card, index) => {
        if (card.value === localValue) {
            tempValue = parseInt(cardValues[index].generalValue)
        }
    })
    return tempValue
}

function handleRemaining(remainingNumber) {
    remainingCards = remainingNumber
    remainingInfo.innerHTML = `<p class="text-white text-lg" id="remaining">Remaining cards: ${remainingCards}</p>`
}

/* 
TODO:
1) add reset new game logic
*/