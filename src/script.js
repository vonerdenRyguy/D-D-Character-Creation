// On page run, loads saved character from local storage
document.addEventListener('DOMContentLoaded', function() {
  loadCharacter();  // Load character data from local storage
});

const character = {
  basicInfo: {
    name: "",
    race: "",
    class: "",
    level: 0,
    background: "",
    alignment: "",
    experiencePoints: 0
  },
  abilityScores: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  },
  abilityMods: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  },
  passiveWisdom: 0,
  combat: {
    armorClass: 0,
    initiative: 0,
    speed: 0,
    hitPointMaximum: 0,
    currentHitPoints: 0,
    temporaryHitPoints: 0,
    hitDice: "",
    deathSaves: {
      successes: 0,
      failures: 0
    }
  },
  skills: {
    acrobatics: 0,
    animalHandling: 0,
    arcana: 0,
    athletics: 0,
    deception: 0,
    history: 0,
    insight: 0,
    intimidation: 0,
    investigation: 0,
    medicine: 0,
    nature: 0,
    perception: 0,
    performance: 0,
    persuasion: 0,
    religion: 0,
    sleightOfHand: 0,
    stealth: 0,
    survival: 0
  }
};

function saveCharacter() {
  localStorage.setItem('savedCharacter', JSON.stringify(character));
  console.log("Character saved!")
}

function loadCharacter() {
  const responses = JSON.parse(localStorage.getItem('userResponses'));
  character.name = responses[0];
  character.race = responses[1];
  character.alignment = responses[2];

  document.getElementById("charname").value = character.name;
  document.getElementById("race").value = character.race;
  document.getElementById("alignment").value = character.alignment;
  
  logCharData();
}

function logCharData() {
  console.log(character.name);
  console.log(character.race);
  console.log(character.alignment);
}

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
  wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
  wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
  wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
  wrapper.classList.remove('active-popup');
});

function createCharacter(event) {
  event.preventDefault();

  const form = document.getElementById("characterInfoForm");
  const formData = new FormData(form);

  // Log each form field value
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  // Character objects contain all the information about a single character
  const character = {
    // To access this information, reference through the encapsulated properties
    // Example: character.basicInfo.name or character.combat.deathSaves.failures
    // Currently, none of these properties are being set to the form data
    basicInfo: {
      name: "",
      race: "",
      class: "",
      level: 0,
      background: "",
      alignment: "",
      experiencePoints: 0
    },
    abilityScores: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
    },
    abilityMods: {
      strength: calcAbilityMod(abilityScores.strength),
      dexterity: calcAbilityMod(abilityScores.dexterity),
      constitution: calcAbilityMod(abilityScores.constitution),
      intelligence: calcAbilityMod(abilityScores.intelligence),
      wisdom: calcAbilityMod(abilityScores.wisdom),
      charisma: calcAbilityMod(abilityScores.charisma)
    },
    passiveWisdom: 0,
    combat: {
      armorClass: 0,
      initiative: 0,
      speed: 0,
      hitPointMaximum: 0,
      currentHitPoints: 0,
      temporaryHitPoints: 0,
      hitDice: "",
      deathSaves: {
        successes: 0,
        failures: 0
      }
    },
    skills: {
      acrobatics: 0,
      animalHandling: 0,
      arcana: 0,
      athletics: 0,
      deception: 0,
      history: 0,
      insight: 0,
      intimidation: 0,
      investigation: 0,
      medicine: 0,
      nature: 0,
      perception: 0,
      performance: 0,
      persuasion: 0,
      religion: 0,
      sleightOfHand: 0,
      stealth: 0,
      survival: 0
    },
    proficiencies: {
      armor: [],
      weapons: [],
      tools: [],
      languages: [],
      other: []
    },
    characterAppearance: {
      age: "",
      height: "",
      weight: "",
      eyes: "",
      skin: "",
      hair: ""
    }
  };  // End of character object definition
  
}
function calcAbilityMod(score){
  if (score < 1){
    return 0;
  }
  return (Math.floor((score - 10) / 2));
}

//everything below is dice rolling
function openDiceRollPanel(event){
  event.preventDefault();

  //show the popup
  document.getElementById('popup').style.display = 'block';

  //hide openPopup button
  document.getElementById('openPopup').style.display = 'none';
  
  //close the dice rolling popup
  document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
    
    //show openPopup button
    document.getElementById('openPopup').style.display = 'initial';

    //reset the values for dice counts
    document.getElementById("d4Count").value = 0;
    document.getElementById("d6Count").value = 0;
    document.getElementById("d8Count").value = 0;
    document.getElementById("d10Count").value = 0;
    document.getElementById("d12Count").value = 0;
    document.getElementById("d20Count").value = 0;
  
    //hide the dice images and roll total
    clearDice();
  });
}

function animateDice(element, die){
  //set background image to the correct sprite sheet for animation
  switch (die) {
    case 'd4Count':
      element.style.background = "url('d4_sheet_vertical.png')";
      break;
    case 'd6Count':
      element.style.background = "url('d6_sheet_vertical.png')";
      break;
    case 'd8Count':
      element.style.background = "url('d8_sheet_vertical.png')";
      break;
    case 'd10Count':
      element.style.background = "url('d10_sheet_vertical.png')";
      break;
    case 'd12Count':
      element.style.background = "url('d12_sheet_vertical.png')";
      break;
    case 'd20Count':
      element.style.background = "url('d20_sheet_vertical.png')";
      break;
  }
  
  //show element to trigger animation sequence
  //setTimeout() causes renderer to function right for some reason, breaks without it.
  setTimeout(function(){element.style.display = "inline-block";},0)
}

function clearDice(){
  //create array holding each die div
  const diceDivs = [
    'die1', 'die2', 'die3', 'die4', 'die5', 'die6'
  ].map(id => document.getElementById(id));

  //hide each one and reset text overlay
  for (let i = 0; i < diceDivs.length; i++){
    diceDivs[i].style.display = "none";
    diceDivs[i].innerHTML = "";
  }

  //reset total tag
  document.getElementById("total").innerHTML = "Total: ";
}

function rollDice(event){
  event.preventDefault();

  //declare varibles
  let total = 0;
  let count = 0;
  const results = [];

  //create array of die elements
  const diceDivs = [
    'die1', 'die2', 'die3', 'die4', 'die5', 'die6'
  ].map(id => document.getElementById(id));

  //array of all the counts needed
  const diceCountElements = [
    'd4Count', 'd6Count', 'd8Count', 'd10Count', 'd12Count', 'd20Count'
  ]
  
  //array of the value from each dice count element to know how many of each dice to roll;
  const diceCounts = [
    diceCountElements[0], diceCountElements[1], diceCountElements[2], diceCountElements[3], diceCountElements[4], diceCountElements[5]
  ].map(id => document.getElementById(id).value);

  //clear the dice and total
  clearDice();

  //event listener to display number on dice and total after dice finish rolling animation
  for (let i = 0; i < diceDivs.length; i++){
    diceDivs[i].addEventListener('animationend', () => {
      diceDivs[i].innerHTML = results[i];
      document.getElementById("total").innerHTML = "Total: " + total;
    });
  }

  //roll values for each die
  for (let k = 0; k < diceCounts.length; k++){ //for each type of dice
    for (let i = 0; i < diceCounts[k]; i++){ //roll the amount of times determined by diceCounts
      animateDice(diceDivs[count], diceCountElements[k]);

      //get random value for roll
      let roll;
      if (k == 5){ //if on d20
        roll  = Math.ceil(Math.random()*20);
      } else {
        roll  = Math.ceil(Math.random()*((k+1)*2 +2)); //d4,d6,d8,d10,d12
      }

      // add roll to the total, store value in an array for later use
      total += roll;
      results.push(roll);

      //move to the next die;
      count++;
    }
  }
  
}