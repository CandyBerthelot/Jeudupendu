//declaration des variables
const elements = {

    answer: null,
    choices: null
};


let image = document.querySelector('img');
let word = '';
let wordMapping = [];

let choiceMapping = [];
let scoreCount = 0;
let maxScore = 9;
let count = 0;
let choiceTab = []


const init = () => {
    // console.log('>>init');

    elements.answer = document.getElementById("reponse");
    elements.answer.querySelector('ul').classList.add('reponse');
    elements.choices = document.getElementById("choix");
    elements.choices.querySelector('ul').classList.add('choix');

    // pick random word dans words
    choiceTab = pickChoice();
    word = pickword();

    console.log('word', word);
    // fonction pour le separer en lettre => tableau wordMapping
    //renvoie lettre visible= false

    wordMapping = getWordMapping(word);
    // console.log('wordMapping', wordMapping);


    //afficher le mot avec des tiret
    displayWord(wordMapping);

    //fonction generer lettre alphabet => tableau lettre
    choiceMapping = getChoiceMapping(choiceTab);
    console.log('choiceMapping', choiceMapping);


    // //afficher les lettres
    displayChoice(choiceMapping);
    // compter le score
    displayScore();

    //listener
    //clic sur lettre
    elements.choices.addEventListener('click', ({ target }) => {
        // evt.target =>{target}
        if (target.matches('li')) {
            checkLetter(target.innerHTML);
        }
    })

}
//controle de la lettre
const checkLetter = (letter) => {
    let isLetterInWord = false;
    let isAllLetterFound = false;
    console.log(letter);
    wordMapping.forEach((letterMapping) => {
        console.log("letterMapping", letterMapping.letter);
        if (letterMapping.letter === letter) {
            letterMapping.isVisible = true;
            isLetterInWord = true;
            count++;
        }
        if (count == wordMapping.length) {
            return isAllLetterFound = true;
        }
        console.log("count", count);
    });
    choiceMapping.forEach((letterMapping) => {
        if (letterMapping.letter === letter) {
            letterMapping.isChosen = true;
        }

    });
    displayChoice(choiceMapping);
    if (isLetterInWord) {
        displayWord(wordMapping);

    } else {
        scoreCount++;
        displayScore();
    }
    if (isAllLetterFound) {
        winGame();
        console.log("gagné");

    }

    if (scoreCount === maxScore) {
        console.log("perdu");
        endGame();
    }
    // console.log('isletterinword', isLetterInWord);
};
//winGame: toutes les lettre trouvées
const winGame = () => {
    image.setAttribute('src', `./images/11.png`);
    // console.log(elements.choices);
    elements.choices.querySelector('ul').classList.add('disabled');
};
//endGame: scorecount=score max (9)
const endGame = () => {

    wordMapping.forEach(w => w.isVisible = true);
    elements.answer.querySelector('ul').classList.add('text-danger');
    displayWord(wordMapping);
    elements.choices.querySelector('ul').classList.add('disabled');
    displayChoice(choiceMapping);

};
//restart
const restartGame = () => {
    elements.choices.querySelector('ul').classList.remove('disabled');
    elements.answer.querySelector('ul').classList.remove('text-danger');
    word = pickword();
    scoreCount = 0;
    maxScore = 9;
    count = 0;
    wordMapping = getWordMapping(word);
    choiceMapping = getChoiceMapping(choiceTab);
    displayWord(wordMapping);
    displayChoice(choiceMapping);
    console.log("choicesm", choiceMapping);
    displayScore();
};


window.addEventListener('load', () => {
    init();

});

document.getElementById('restartBtn').addEventListener('click', function () {
    restartGame();
});
