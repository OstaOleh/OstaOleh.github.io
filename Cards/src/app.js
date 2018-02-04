const Model = (function () {
    let arrCard = [],
        cardCount = 18,
        activeCards = cardCount / 2,
        removeCards = 13 - activeCards,
        points = 0;

    const calcCard = function () {
        const randNum = [0, 'A', 2, 3, 4, 5, 6, 7, 8, 9, 'J', 'Q', 'K'];
        const randState = ['C', 'D', 'H', 'S', 'C', 'D', 'H', 'S', 'C', 'D', 'H', 'S'];
        const arr = [];
        let finallArr = [];
        randNum.sort(compareRandom);
        randNum.splice(activeCards, removeCards);
        randState.sort(compareRandom);
        randState.splice(activeCards, removeCards);

        randNum.map((num, i) => {
            arr.push(num + randState[i])
            return arr
        });

        finallArr = arr.concat(arr);
        finallArr.sort(compareRandom);


        return {
            finallArr
        };
    };

    const compareRandom = function (a, b) {
        return Math.random() - 0.5;
    };

    const calcPoints = function (cards, state) {
        if (state) {
            points += (cardCount - cards) * 42
        } else {
            if (cards === 1) {
                cards = 0;
            }
            points -= cards * 42
        }
        return points;

    };
    const resetPoints = function () {
        points = 0;
    };
    const checkPairs = function (card, cards) {

        if (arrCard.length == 3) {
            if (arrCard[0] === arrCard[2]) {
                const code = arrCard[0];
                arrCard = [];
                return {
                    code,
                    status: true
                };
            } else {
                arrCard = [];
                return {
                    code: null,
                    status: false
                }
            }
        } else {
            arrCard.push(card);
        }
    };

    const checkCards = function (cardsNumber, todoo) {
        const cardsNum = cardsNumber;
        const todo = todoo;

        const points = calcPoints(cardsNum, todo)
        if (cardsNum === cardCount) {
            cardCount = 0;
            return {
                points,
                status: true
            }
        } else {
            return {
                points,
                status: false
            }
        }
    };

    return {
        calcCard,
        checkPairs,
        checkCards,
        resetPoints
    };

})();

const Ui = (function () {

    const gameSelectors = {
        newGame: '.new-game',
        game: '.game',
        endGame: '.end-game',
        startGame: '.btn[data-tid="NewGame-startGame"]',
        playAgain: '.btn[data-tid="EndGame-retryGame"]',
        startNew: '.start-new-game',
        cardsContainer: '.cards__wrapp',
        score: '.scre-num',
        totalScore: '.total-score--num',
        flipCardSound: '#flip-card',

        face: '.face',
        cards: '.card',
        flipped: '.flipped',

    };


    const startGame = function (item) {
        document.querySelector(gameSelectors.newGame).style.display = "none";
        document.querySelector(gameSelectors.game).classList.add('active')
        makeCards(item);
    };

    const endGame = function (item) {
        document.querySelector(gameSelectors.game).classList.remove('active')
        document.querySelector(gameSelectors.game).style.display = "none";

        document.querySelector(gameSelectors.endGame).style.display = "flex";
    };

    const startNewGame = function (e) {
        document.querySelector(gameSelectors.endGame).style.display = "none";
        document.querySelector(gameSelectors.newGame).style.display = "flex";
        resetScore();
    };

    const playSound = function () {
        // document.querySelector(gameSelectors.flipCardSound).play();
    };
    const resetScore = function () {
        document.querySelector(gameSelectors.score).textContent = 0;

    };
    const remakeGame = function (item) {
        makeCards(item);
        resetScore();
    };

    const makeCards = function (arr) {
        let html = '';
        arr.finallArr.forEach((card, i) => {
            html += `
                <div class="card">
                    <img class="card--item face" src="Cards/${card}.png" alt=""  data-tid="Card" data-card="${card}">
                    <img class="card--item short" src="Cards/short.jpg" alt=""  data-tid="Card-flipped">
                 </div>`;
            document.querySelector(gameSelectors.cardsContainer).innerHTML = html;
        })
    };

    const setActive = function () {
        document.querySelectorAll(gameSelectors.cards).forEach(card => {
            card.classList.add('active');
        })
    };

    const removeActive = function () {
        document.querySelectorAll(gameSelectors.cards).forEach(card => {
            card.classList.remove('active');
        })
    };

    const rotateCards = function () {
        setTimeout(() => {
            removeActive();
        }, 5000); // 5000);
    };

    const changeCards = function (state) {
        return new Promise((resolve, reject) => {
            playSound();
            if (state.status === true) {

                document.querySelectorAll('.face').forEach((card, arr) => {
                    if (card.dataset.card == state.code) {
                        setTimeout(() => {
                            const classNameList = card.parentElement.classList
                            classNameList.add('true');
                            classNameList.remove('flipped');
                            card.remove();
                            resolve({
                                cardsCount: document.querySelectorAll('.true').length + 1,
                                status: true
                            })
                        }, 1000);

                    }
                })
            } else {
                document.querySelectorAll(gameSelectors.face).forEach(card => {
                    setTimeout(() => {
                        const classNameList = card.parentElement.classList
                        classNameList.remove('active');
                        classNameList.remove('flipped');
                        resolve({
                            cardsCount: document.querySelectorAll('.true').length + 1,
                            status: false
                        })
                    }, 1000);

                })
            };
        })

    };

    const reuiScore = function (score) {
        document.querySelector(gameSelectors.score).textContent = score
        document.querySelector(gameSelectors.totalScore).textContent = score
    };

    const addFlipp = function (trg) {
        trg.parentElement.classList.add('flipped')
    };

    const removeFlipped = function () {
        document.querySelectorAll(gameSelectors.flipped).forEach(card => {
            card.classList.remove('flipped');
        })
    };

    return {
        gameSelectors,
        startGame,
        rotateCards,
        setActive,
        changeCards,
        endGame,
        startNewGame,
        reuiScore,
        resetScore,
        addFlipp,
        removeFlipped
    };

})();

const App = (function (model, ui) {

    const listenStartGame = function () {
        document.querySelector(ui.gameSelectors.startGame).addEventListener('click', function () {

            playGame();
        });

        document.querySelector(ui.gameSelectors.startNew).addEventListener('click', function () {
            playGame();
            model.resetPoints();
            ui.resetScore();
        });
    };

    const playGame = function () {
        const cardArr = model.calcCard();
        ui.startGame(cardArr);
        ui.setActive();
        ui.rotateCards();
    };


    const listenCardClcik = function () {
        document.querySelector(ui.gameSelectors.cardsContainer).addEventListener('click', function (e) {

            const trg = e.target;

            if (trg.classList.contains('short')) {
                ui.addFlipp(trg)
                if (trg.parentElement.classList.contains('active')) {
                    return
                } else if (document.querySelectorAll(ui.gameSelectors.flipped).length >= 3) {
                    ui.removeFlipped();
                    return
                } else {
                    trg.parentElement.classList.add('active');
                    model.checkPairs(trg.previousElementSibling.dataset.card);

                    const state = model.checkPairs();

                    ui.changeCards(state)
                        .then(res => {
                            const points = model.checkCards(res.cardsCount, res.status);
                            ui.reuiScore(points.points);
                            return points.status
                        })
                        .then(isEnd => {
                            if (isEnd) {
                                console.log('U win');
                                ui.endGame();
                            };
                        })
                }
            };
        })
    };

    const playGameAgain = function () {
        document.querySelector(ui.gameSelectors.playAgain).addEventListener('click', function () {
            location.reload()
        })
    };

    return {
        init: function () {
            listenStartGame();

            listenCardClcik();

            playGameAgain();
        }
    }
})(Model, Ui);

App.init();
