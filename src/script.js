// Javascript will be used to provide the interactive elements of our site.

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
    wealth: {
      platinum: 0,
      gold: 0,
      silver: 0,
      copper: 0,
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
  function calcAbilityMod(score){
    if (score < 1){
      return 0;
    }
    return (Math.floor((score - 10) / 2));
  }
  
}


//everything below is related to dice rolling.
function openDiceRollPanel(event){

  event.preventDefault();

  
document.getElementById('popup').style.display = 'block';

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
    
    document.getElementById("d4Count").value = 0;
    document.getElementById("d6Count").value = 0;
    document.getElementById("d8Count").value = 0;
    document.getElementById("d10Count").value = 0;
    document.getElementById("d12Count").value = 0;
    document.getElementById("d20Count").value = 0;

    clearDice();
});
}

function animateDice(element, die){
  switch (die) {
    case 'd4':
      element.style.background = "url('d4_sheet_vertical.png')";
      break;
    case 'd6':
      element.style.background = "url('d6_sheet_vertical.png')";
      break;
    case 'd8':
      element.style.background = "url('d8_sheet_vertical.png')";
      break;
    case 'd10':
      element.style.background = "url('d10_sheet_vertical.png')";
      break;
    case 'd12':
      element.style.background = "url('d12_sheet_vertical.png')";
      break;
    case 'd20':
      element.style.background = "url('d20_sheet_vertical.png')";
      break;
  }
  
  
  setTimeout(function(){element.style.display = "inline-block";},0)
}

function clearDice(){
  
  const dice = [
    'die1', 'die2', 'die3', 'die4', 'die5', 'die6'
  ].map(id => document.getElementById(id));

  for (let i = 0; i < dice.length; i++){
    dice[i].style.display = "none";
    dice[i].innerHTML = "";
  }

  document.getElementById("total").innerHTML = "Total: ";
}

function rollDice(event){

  event.preventDefault();

  let total = 0;
  const results = [];
  
  const dice = [
    'die1', 'die2', 'die3', 'die4', 'die5', 'die6'
  ].map(id => document.getElementById(id));
  
  let count = 0;

  d4 = document.getElementById("d4Count").value;
  d6 = document.getElementById("d6Count").value;
  d8 = document.getElementById("d8Count").value;
  d10 = document.getElementById("d10Count").value;
  d12 = document.getElementById("d12Count").value;
  d20 = document.getElementById("d20Count").value;

  clearDice();

//event listener to display number after dice finish rolling animation
dice[count].addEventListener('animationend', () => {
  for (let j = 0; j < count; j++){
    dice[j].innerHTML = results[j];
    document.getElementById("total").innerHTML = "Total: " + total;
  }
});

  for (let i = 0; i < d4; i++){
    
    animateDice(dice[count], "d4");

    var roll = Math.ceil(Math.random()*4);
    total += roll;
    results.push(roll);

    
    count++;
  }
  for (let i = 0; i < d6; i++){
    animateDice(dice[count], "d6");

    let roll = Math.ceil(Math.random()*6);
    total += roll;
    results.push(roll);
    count++;
  }
  for (let i = 0; i < d8; i++){
    animateDice(dice[count], "d8");

    let roll = Math.ceil(Math.random()*8);
    total += roll;
    results.push(roll);
    count++;
  }
  for (let i = 0; i < d10; i++){
    animateDice(dice[count], "d10");

    let roll = Math.ceil(Math.random()*10);
    total += roll;
    results.push(roll);
    count++;
  }
  for (let i = 0; i < d12; i++){
    animateDice(dice[count], "d12");

    let roll = Math.ceil(Math.random()*12);
    total += roll;
    results.push(roll);
    count++;
  }
  for (let i = 0; i < d20; i++){
    animateDice(dice[count], "d20");
    
    let roll = Math.ceil(Math.random()*20);
    total += roll;
    results.push(roll);
    count++;
  }
  
  
}