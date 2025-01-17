
const LETTER_POOL = {
    A: 9,
    B: 2,
    C: 2,
    D: 4,
    E: 12,
    F: 2,
    G: 3,
    H: 2,
    I: 9,
    J: 1,
    K: 1,
    L: 4,
    M: 2,
    N: 6,
    O: 8,
    P: 2,
    Q: 1,
    R: 6,
    S: 4,
    T: 6,
    U: 4,
    V: 2,
    W: 2,
    X: 1,
    Y: 2,
    Z: 1,
  };
const SCORE_CHART={
    A: 1, 
    E: 1, 
    I: 1, 
    O: 1, 
    U: 1, 
    L: 1, 
    N: 1, 
    R: 1, 
    S: 1, 
    T: 1,
    D: 2,
    G: 2,
    B: 3,
    C: 3,
    M: 3,
    P: 3,
    F: 4, 
    H: 4,
    V: 4, 
    W: 4, 
    Y: 4,
    K: 5,
    J: 8,
    X: 8,
    Q: 10,
    Z: 10,
};

class Adagrams{
  
    static drawLetters () {
    // Implement this method for wave 1
    const letterMap = {...LETTER_POOL};
    let drawn = new Array();
    // use a list of possible letters outside the for loop to avoid creating this list mutiple times
    let letterBank = Object.keys(LETTER_POOL);

    for(let i = 0; i<10; i++){
        let randomLetterIndex= Math.floor(Math.random()*letterBank.length);
        let randomLetter = letterBank[randomLetterIndex];
        drawn.push(randomLetter);
        letterMap[randomLetter] -= 1;
        if(letterMap[randomLetter] === 0){
            let letterIndex = letterBank.indexOf(randomLetter);
            letterBank.splice(letterIndex, 1);
        }
    }
    return drawn;
  }

  
  static usesAvailableLetters (input, lettersInHand) {
    // Implement this method for wave 2
    let letterMap = {};
  
    for(let i = 0; i< lettersInHand.length; i++){
      let curHandLetter = lettersInHand[i];
      letterMap[curHandLetter] = (letterMap[curHandLetter]||0)+ 1;
    } 
  
    for(let i = 0; i<input.length; i++){
      let curInputLetter = input[i];
      if(!lettersInHand.includes(curInputLetter) || letterMap[curInputLetter]===0)
          return false;
      letterMap[curInputLetter]--;
    }
  
    return true;
  }


  static scoreWord (word) {
    // Implement this method for wave 3
    if(word.length === 0){
      return 0;
    }
  
    let point = 0;
    word = word.toUpperCase();
    for(let i = 0; i<word.length; i++){
        let curLetter = word[i];
        point += SCORE_CHART[curLetter];
    }
  
    if(word.length >= 7)
        point += 8; 
  
    return point;
  }


  static highestScoreFrom (words) {
    // Implement this method for wave 4
    let maxScore = 0;
    let winnerWord = new String();
    let result = {}
  
    for(let word of words){
        let curScore = Adagrams.scoreWord(word)
        if(curScore > maxScore){
          maxScore = curScore;
          winnerWord = word;
        }
        else if(curScore == maxScore){
            if(winnerWord.length == 10)
                continue;
            else if(word.length == 10)
                winnerWord = word
            else if(word.length< winnerWord.length)
                winnerWord = word
            else if(word.length == winnerWord.length)
                continue;
          }
      }
    
    result ={word: winnerWord, score: maxScore};
    return result
  }

}

export default Adagrams


