const before = `{"state":[[[{"active":true,"letter":"A","wordStart":[true,true],"acrossWordNumber":1,"downWordNumber":1,"squareNumber":0}]],[[{"direction":"across","number":1,"clue":"1","answer":"A","firstLetterSquareNumber":0}],[{"direction":"down","number":1,"clue":"Z","answer":"A","firstLetterSquareNumber":0}]]]}`;

const after = `{"state":[[[{"active":true,"letter":"A","wordStart":[true,true],"acrossWordNumber":1,"downWordNumber":1,"squareNumber":0}]],[[{"direction":"across","number":1,"clue":"1","answer":"A","firstLetterSquareNumber":0}],[{"direction":"down","number":1,"clue":"Z","answer":"A","firstLetterSquareNumber":0}]]]}`;

console.log(before === after);