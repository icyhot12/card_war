let deckId

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
        })
}

document.getElementById("new-deck").addEventListener("click", handleClick)

document.getElementById("draw-cards").addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("deck1").innerHTML =
                `<img src=${data.cards[0].image} class="w-[150px] h-[210px]"/>`
            document.getElementById("deck2").innerHTML =
                `<img src=${data.cards[1].image} class="w-[150px] h-[210px]"/>`
        })
})

/*

2) score
3) computer: score
4) me: score

*/