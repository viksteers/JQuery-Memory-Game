// -1 means no guess has been made

let guessFirst = -1;

let guessSecond = -1;

// Cards to be matched

let cards = [

    {

        entity: "&spades;",

        color: "green"

    },

    {

        entity: "&clubs;",

        color: "blue"

    },

    {

        entity: "&hearts;",

        color: "red"

    },

    {

        entity: "&diams;",

        color: "purple"

    },

    {

        entity: "&starf;",

        color: "orange"

    },

    {

        entity: "&malt;",

        color: "gold"

    },

];

// Create the match for each card

cards = cards.concat(cards);

let $cardDivs = [];

$(function () {

    // Add divs for each card

    let $game = $("#cardGrid");

    // Modification 1

    $game.hide()

    for (let i = 0; i < cards.length; i++) {

        let $card = $("<div></div>");

        $card.click(function () { clickCard(i); });

        $game.append($card);

        $cardDivs.push($card);

    }

    newGame();

    $("#newGameBtn").click(newGame);

});

function clickCard(index) {

    // Only accept click on non-visible card

    if (!$cardDivs[index].hasClass("card-visible")) {

        if (guessFirst == -1) {

            // Flip card

            showCard(index);

            guessFirst = index;

        }

        else if (guessSecond == -1) {

            showCard(index);

            guessSecond = index;

            // Check for a match

            if (cards[guessFirst].entity == cards[guessSecond].entity) {

                showMatch(guessFirst, guessSecond);

                guessFirst = -1;

                guessSecond = -1;

            }

            else {

                setTimeout(function () {

                    hideCard(guessFirst);

                    hideCard(guessSecond);

                    guessFirst = -1;

                    guessSecond = -1;

                }, 1000);

            }

        }

    }

}

function showCard(index) {

    // TODO: Animate showing the card

    // Modification 2

    $cardDivs[index].slideUp(200, function () {

        $cardDivs[index].html(cards[index].entity)

            .css("color", cards[index].color)

            .addClass("card-visible");

    });

    $cardDivs[index].slideDown(200)

}

function hideCard(index) {

    // TODO: Animate hiding the card

    //Modification 3

    $cardDivs[index].slideUp(200, function () {

        $cardDivs[index].html("")

            .removeClass("card-visible");

    });

    $cardDivs[index].slideDown(200);

}

function showMatch(cardIndex1, cardIndex2) {

    // TODO: Animate $cardDivs[cardIndex1] and $cardDivs[cardIndex2] card symbols' font size

    //Modification 4

    setTimeout(function () { }, 500);

    $cardDivs[cardIndex1].animate({ fontSize: "100px" }, { duration: 200 });

    $cardDivs[cardIndex2].animate({ fontSize: "100px" }, { duration: 200 });

    $cardDivs[cardIndex1].animate({ fontSize: "70px" }, { duration: 200 });

    $cardDivs[cardIndex2].animate({ fontSize: "70px" }, { duration: 200 });

}

function newGame() {

    // TODO: Animate fading in and out the cards

    // Modification 5

    $("#cardGrid").fadeOut("normal", function () {

        // Randomize the cards array by swapping card values 20 times

        for (let i = 0; i < 20; i++) {

            let cardIndex1 = getRandomNumber(0, cards.length - 1);

            let cardIndex2 = getRandomNumber(0, cards.length - 1);

            let temp = cards[cardIndex1];

            cards[cardIndex1] = cards[cardIndex2];

            cards[cardIndex2] = temp;

        }

        // Hide all cards

        for (let i = 0; i < $cardDivs.length; i++) {

            $cardDivs[i].html("").removeClass("card-visible");

        }

    });

    $("#cardGrid").fadeIn("normal");

    // Nothing selected yet

    guessFirst = -1;

    guessSecond = -1;

}

// Return a random number between min and max (inclusive).

function getRandomNumber(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}