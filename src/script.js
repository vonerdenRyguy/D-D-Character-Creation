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
});
}

function rollDice(event){

  event.preventDefault();

  d4 = document.getElementById("d4Count").value;
  d6 = document.getElementById("d6Count").value;
  d8 = document.getElementById("d8Count").value;
  d10 = document.getElementById("d10Count").value;
  d12 = document.getElementById("d12Count").value;
  d20 = document.getElementById("d20Count").value;

let final = 0;
const results = [];
let count = 0;

  for (let i = 0; i < d4; i++){
    let roll = Math.ceil(Math.random()*4);
    final += roll;
    results.push(roll);
    count++;
    console.log("test" + count);
  }
  for (let i = 0; i < d6; i++){
    let roll = Math.ceil(Math.random()*6);
    final += roll;
    results.push(roll);
    count++;
  }
  for (let i = 0; i < d8; i++){
    let roll = Math.ceil(Math.random()*8);
    final += roll;
    results.push(roll);
    count++;
  }
  for (let i = 0; i < d10; i++){
    let roll = Math.ceil(Math.random()*10);
    final += roll;
    results.push(roll);
    count++;
  }
  for (let i = 0; i < d12; i++){
    let roll = Math.ceil(Math.random()*12);
    final += roll;
    results.push(roll);
    count++;
  }
  for (let i = 0; i < d20; i++){
    let roll = Math.ceil(Math.random()*20);
    final += roll;
    results.push(roll);
    count++;
  }
  
  document.getElementById("total").innerHTML = "Total: " + final;
}