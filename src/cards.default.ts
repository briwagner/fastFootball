// OFFENSE  
let rush5 = {playType: "rush", side: "offense", yards: 5, imgsrc: "rush.jpg"};
let rush10 = {playType: "rush", side: "offense", yards: 10, imgsrc: "rush.jpg"};
let rush15 = {playType: "rush", side: "offense", yards: 15, imgsrc: "rush.jpg"};
let rush30 = {playType: "rush", side: "offense", yards: 30, imgsrc: "rush.jpg"};
let pass5 = {playType: "pass", side: "offense", yards: 5, imgsrc: "pass.jpg"};
let pass10 = {playType: "pass", side: "offense", yards: 10, imgsrc: "pass.jpg"};
let pass15 = {playType: "pass", side: "offense", yards: 15, imgsrc: "pass.jpg"};
let pass30 = {playType: "pass", side: "offense", yards: 30, imgsrc: "pass.jpg"};
let punt40 = {playType: "punt", side: "offense", yards: 40, imgsrc: "punt.jpg"};
let kick40 = {playType: "kick", side: "offense", yards: 40, imgsrc: "kick.jpg"};
let bombPass = {playType: "bomb", side: "offense", yards: 100, imgsrc: "pass.jpg"};

// DEFENSE
let tackle0 = {playType: "rush", side: "defense", yards: 0, imgsrc: "tackle.jpg"};
let tackle5 = {playType: "rush", side: "defense", yards: 5, imgsrc: "tackle.jpg"};
let tackle10 = {playType: "rush", side: "defense", yards: 10, imgsrc: "tackle.jpg"};
let fumble = {playType: "rush", side: "defense", yards: 0, imgsrc: "fumble.jpg", turnover: true};
let interception = {playType: "pass", side: "defense", yards: 0, imgsrc: "interception.jpg", turnover: true};
let bombBlock = {playType: "bomb", side: "defense", yards: 0, imgsrc: "passblock.jpg"};
let kickBlock = {playType: "kick", side: "defense", yards: 0, imgsrc: "kickblock.jpg", turnover: true};
let puntBlock = {playType: "punt", side: "defense", yards: 0, imgsrc: "puntblock.jpg"}; 
let incompletePass = {playType: "pass", side: "defense", yards: 0, imgsrc: "passblock.jpg"};

let deckOffense = [
  rush5, rush5, rush5, rush5, 
  rush10, rush10, 
  rush15, rush15, 
  rush30, 
  pass5, pass5, pass5, pass5,
  pass10, pass10, 
  pass15, pass15,
  bombPass, 
  punt40, punt40, 
  kick40, kick40
];

 let deckDefense = [
  tackle0, tackle0, tackle0, tackle0, tackle0, tackle0, tackle0, 
  tackle5, tackle5, tackle5, tackle5,
  tackle10, tackle10, 
  fumble, 
  interception,
  bombBlock, 
  kickBlock, 
  puntBlock, 
  incompletePass, incompletePass, incompletePass, incompletePass, incompletePass, incompletePass 
];  

export { deckOffense, deckDefense};