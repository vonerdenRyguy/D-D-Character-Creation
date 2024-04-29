const character = {
  playername: "",
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
  inspiration: 0,
  combat: {
    armorClass: 0,
    initiative: 0,
    speed: 0,
    hitPoints: {
      maximum: 0,
      current: 0,
      temporary: 0
    },
    hitDice: "",
    deathSaves: {
      successes: 0,
      failures: 0
    }
  },
  proficiencyBonus: 2,
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
  characterTraits: {
    personality: "",
    ideals: "",
    bonds: "",
    flaws: ""
  },
  currency: {
    CP: 0,
    SP: 0,
    EP: 0,
    GP: 0,
    PP: 0
  },
  proficiencies: {
    languages: [],
    skills: [],
    other: []
  },
  weapons: [],
  equipement: [],
  spellcasting: {
    spellCastingAbility: "",
    spellAttackBonus: 0,
    spellSaveDC: 0,
    slots: {
      level1: [],
      level2: [],
      level3: [],
      level4: [],
      level5: [],
      level6: [],
      level7: [],
      level8: [],
      level9: []
    },
    spells: {
      cantrip: [],
      level1: [],
      level2: [],
      level3: [],
      level4: [],
      level5: [],
      level6: [],
      level7: [],
      level8: [],
      level9: []
    }
  }
};

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

// On page run, loads saved character from local storage
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const fromPage = urlParams.get('from');

  if (fromPage === 'index') {
    // Load character data when coming specifically from index.html
    loadCharacterFromTutorial();
    console.log("Loaded character from tutorial data.");
  } else {
    loadCharacterFromLocalStorage();
    console.log("Loaded character from local storage.");
  }
});

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

const weapon = {
  weaponName,
  atkBonus,
  dmgType
}

function calcAbilityMod(score){
  if (score < 1){
    return 0;
  }
  return (Math.floor((score - 10) / 2));
}

function calcSkillMod(skill, score){
  let out = 0;
  if (character.proficiencies.skills.includes(skill)){
    out += character.proficiencyBonus;
  }
  out += score;
  return out;
}

function updateCharacter(){
  character = {
    playername: document.getElementById(""),
    basicInfo: {
      name: document.getElementById(""),
      race: document.getElementById(""),
      class: document.getElementById(""),
      level: document.getElementById(""),
      background: document.getElementById(""),
      alignment: document.getElementById(""),
      experiencePoints: document.getElementById("")
    },
    abilityScores: {
      strength: document.getElementById(""),
      dexterity: document.getElementById(""),
      constitution: document.getElementById(""),
      intelligence: document.getElementById(""),
      wisdom: document.getElementById(""),
      charisma: document.getElementById("")
    },
    abilityMods: {
      strength: calcAbilityMod(document.getElementById("")),
      dexterity: calcAbilityMod(document.getElementById("")),
      constitution: calcAbilityMod(document.getElementById("")),
      intelligence: calcAbilityMod(document.getElementById("")),
      wisdom: calcAbilityMod(document.getElementById("")),
      charisma: calcAbilityMod(document.getElementById(""))
    },
    passiveWisdom: document.getElementById(""),
    inspiration: document.getElementById(""),
    combat: {
      armorClass: document.getElementById(""),
      initiative: document.getElementById(""),
      speed: document.getElementById(""),
      hitPoints: {
        maximum: document.getElementById(""),
        current: document.getElementById(""),
        temporary: document.getElementById("")
      },
      hitDice: document.getElementById(""),
      deathSaves: {
        successes: document.getElementById(""),
        failures: document.getElementById("")
      }
    },
    proficiencyBonus: document.getElementById(""),
    skills: {
      acrobatics: calcSkillMod(acrobatics, dexterity),
      animalHandling: calcSkillMod(animalHandling, score),
      arcana: calcSkillMod(arcana, score),
      athletics: calcSkillMod(athletics, score),
      deception: calcSkillMod(deception, score),
      history: calcSkillMod(history, score),
      insight: calcSkillMod(insight, score),
      intimidation: calcSkillMod(intimidation, score),
      investigation: calcSkillMod(investigation, score),
      medicine: calcSkillMod(medicine, score),
      nature: calcSkillMod(nature, score),
      perception: calcSkillMod(perception, score),
      performance: calcSkillMod(performance, score),
      persuasion: calcSkillMod(persuasion, score),
      religion: calcSkillMod(religion, score),
      sleightOfHand: calcSkillMod(sleightOfHand, score),
      stealth: calcSkillMod(stealth, score),
      survival: calcSkillMod(survival, score)
    },
    characterTraits: {
      personality: document.getElementById(""),
      ideals: document.getElementById(""),
      bonds: document.getElementById(""),
      flaws: document.getElementById("")
    },
    currency: {
      CP: document.getElementById(""),
      SP: document.getElementById(""),
      EP: document.getElementById(""),
      GP: document.getElementById(""),
      PP: document.getElementById("")
    },
    proficiencies: {
      languages: [],
      skills: [],
      other: []
    },
    weapons: [],
    equipement: [],
    spellcasting: {
      spellCastingAbility: "",
      spellAttackBonus: 0,
      spellSaveDC: 0,
      slots: {
        level1: [],
        level2: [],
        level3: [],
        level4: [],
        level5: [],
        level6: [],
        level7: [],
        level8: [],
        level9: []
      },
      spells: {
        cantrip: [],
        level1: [],
        level2: [],
        level3: [],
        level4: [],
        level5: [],
        level6: [],
        level7: [],
        level8: [],
        level9: []
      }
    }
}

function saveCharacter() {
  // Top Box of information
  character.basicInfo.name = document.getElementById("charname").value;
  character.basicInfo.race = document.getElementById("race").value;
  character.basicInfo.alignment = document.getElementById("alignment").value;
  character.basicInfo.class = document.getElementById("classlevel").value;
  character.basicInfo.experiencePoints = document.getElementById("experiencepoints").value;
  character.basicInfo.background = document.getElementById("background").value;
  character.playername = document.getElementById("playername").value;

  // Ability scores box
  character.abilityScores.strength = document.getElementById("Strengthscore").value;
  character.abilityScores.dexterity = document.getElementById("Dexterityscore").value;
  character.abilityScores.constitution = document.getElementById("Constitutionscore").value;
  character.abilityScores.wisdom = document.getElementById("Wisdomscore").value;
  character.abilityScores.intelligence = document.getElementById("Intelligencescore").value;
  character.abilityScores.charisma = document.getElementById("Charismascore").value;

  // character.passiveWisdom <- set by formula?
  saveCharacterToLocalStorage();
}

function saveCharacterToLocalStorage() {
  localStorage.setItem('savedCharacter', JSON.stringify(character));
  console.log("Character saved to local data!");
}

// When loading the character data from the tutorial, we only
// fill the applicable information we recieved from the prompts.
// We then calculate other applicable values.
function loadCharacterFromTutorial() {
  const responses = JSON.parse(localStorage.getItem('userResponses'));
  character.basicInfo.name = responses[0];
  character.basicInfo.race = responses[1];
  character.basicInfo.class = responses[2];
  character.basicInfo.alignment = responses[3];

  document.getElementById("charname").value = character.basicInfo.name;
  document.getElementById("race").value = character.basicInfo.race;
  document.getElementById("alignment").value = character.basicInfo.alignment;
  document.getElementById("classlevel").value = character.basicInfo.class;
  document.getElementById("experiencepoints").value = character.basicInfo.experiencePoints;
  document.getElementById("playername").value = character.playername;
  
  // updateCharacter();  Call this once this method is completed fully
}

function loadCharacterFromLocalStorage() {
  const character = JSON.parse(localStorage.getItem('savedCharacter'));

  // Load basic info
  document.getElementById("charname").value = character.basicInfo.name;
  document.getElementById("race").value = character.basicInfo.race;
  document.getElementById("alignment").value = character.basicInfo.alignment;
  document.getElementById("classlevel").value = character.basicInfo.class;
  document.getElementById("experiencepoints").value = character.basicInfo.experiencePoints;
  document.getElementById("background").value = character.basicInfo.background;
  document.getElementById("playername").value = character.playername;

  // Load ability scores
  document.getElementById("Strengthscore").value = character.abilityScores.strength;
  document.getElementById("Dexterityscore").value = character.abilityScores.dexterity;
  document.getElementById("Constitutionscore").value = character.abilityScores.constitution;    document.getElementById("Wisdomscore").value = character.abilityScores.wisdom;
  document.getElementById("Intelligencescore").value = character.abilityScores.intelligence;
  document.getElementById("Charismascore").value = character.abilityScores.charisma;
  
  
  logCharData();
}

function logCharData() {
  console.log("Name: " + character.basicInfo.name);
  console.log("Race: " + character.basicInfo.race);
  console.log("Alignment: " + character.basicInfo.alignment);
  console.log("Class: " + character.basicInfo.class);
  console.log("Experience Points: " + character.basicInfo.experiencePoints);
  console.log("Playername: " + character.playername);
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
      element.style.background = "url('../assets/d4_sheet_vertical.png')";
      break;
    case 'd6Count':
      element.style.background = "url('../assets/d6_sheet_vertical.png')";
      break;
    case 'd8Count':
      element.style.background = "url('../assets/d8_sheet_vertical.png')";
      break;
    case 'd10Count':
      element.style.background = "url('../assets/d10_sheet_vertical.png')";
      break;
    case 'd12Count':
      element.style.background = "url('../assets/d12_sheet_vertical.png')";
      break;
    case 'd20Count':
      element.style.background = "url('../assets/d20_sheet_vertical.png')";
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