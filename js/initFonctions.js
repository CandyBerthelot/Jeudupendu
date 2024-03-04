// fonctions utilisées dans init()

// pick a word dans dico
const pickword = () => {
    let wordRandom;
    let random = Math.floor(Math.random() * words.length);
    return wordRandom = words[random];
}
// decouper le mot, definir les propriétés des lettres
const getWordMapping = () => {
    const wordArr = word.split('');
    console.log(wordArr);
    const wordMap = wordArr.map((letter) => {
        if (letter === " ") {
            count++
            return {
                letter,
                isVisible: true,
            };
        } else {
            return {
                letter,
                isVisible: false
            };
        }
    });
    return wordMap;
};

// recuperer les lettres à choisir
const pickChoice = () => {
    let choiceArr = [];
    let tabAccent = ["à", "â", "è", "é", "ê", "î", "ï", "ô", "û", "ü"];
    for (let i = 97; i <= 122; i++) {
        let letter = String.fromCharCode(i)
        choiceArr.push(letter);
    };
    for (let i = 0; i <= tabAccent.length - 1; i++) {

        choiceArr.push(tabAccent[i]);
    };

    return choiceArr;
};

// definir les propriétés des lettres
const getChoiceMapping = (choiceArr) => {
    const choiceMap = choiceArr.map((letter) => {
        return {
            letter,
            isChosen: false
        }
    });
    return choiceMap;
}
// affichage du mot 
const displayWord = (wordMapping) => {
    const wordHtml = wordMapping.map((letterMapping) => {
        if (letterMapping.isVisible && letterMapping.letter === " ") {
            return `<p>&emsp;</p>`
        } else if (letterMapping.isVisible) {
            return `<li>${letterMapping.letter}</li>`
        } else {
            return `<li>_</li>`
        }
    });
    // console.log("wordHtml ", wordHtml);

    elements.answer.querySelector('ul').innerHTML = wordHtml.join("");

};
// affichage des lettres
const displayChoice = (choiceMapping) => {
    const choiceHtml = choiceMapping.map((letterMapping) => {
        if (letterMapping.isChosen === false) {
            return `<li>${letterMapping.letter}</li>`;
        } else {
            return `<li class="disabled">${letterMapping.letter}</li>`;
        }
    });
    elements.choices.querySelector('ul').innerHTML = choiceHtml.join("");
    // console.log(choiceHtml);

}
// affichage des images
const displayScore = () => {

    image.setAttribute('src', `./images/${scoreCount + 1}.png`)
    console.log(`${scoreCount} / ${maxScore}`);

}