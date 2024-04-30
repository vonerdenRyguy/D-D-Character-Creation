// const { update } = require("firebase/database");

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
  saves: {
    strengthSave: 0,
    dexteritySave: 0,
    constitutionSave: 0,
    intelligenceSave: 0,
    wisdomSave: 0,
    charismaSave: 0,
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

// On page run, loads saved character from local storage
document.addEventListener('DOMContentLoaded', function () {
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

document.getElementById("Strengthscore").addEventListener("input", function() {
  var score = parseInt(this.value);
  var modifier = Math.floor((score - 10) / 2);
  document.getElementById("Strengthmod").value = (modifier >= 0 ? "+" : "") + modifier;
});

document.getElementById("Dexterityscore").addEventListener("input", function() {
  var score = parseInt(this.value);
  var modifier = Math.floor((score - 10) / 2);
  document.getElementById("Dexteritymod").value = (modifier >= 0 ? "+" : "") + modifier;
});

document.getElementById("Constitutionscore").addEventListener("input", function() {
  var score = parseInt(this.value);
  var modifier = Math.floor((score - 10) / 2);
  document.getElementById("Constitutionmod").value = (modifier >= 0 ? "+" : "") + modifier;
});

document.getElementById("Wisdomscore").addEventListener("input", function() {
  var score = parseInt(this.value);
  var modifier = Math.floor((score - 10) / 2);
  document.getElementById("Wisdommod").value = (modifier >= 0 ? "+" : "") + modifier;
});

document.getElementById("Intelligencescore").addEventListener("input", function() {
  var score = parseInt(this.value);
  var modifier = Math.floor((score - 10) / 2);
  document.getElementById("Intelligencemod").value = (modifier >= 0 ? "+" : "") + modifier;
});

document.getElementById("Charismascore").addEventListener("input", function() {
  var score = parseInt(this.value);
  var modifier = Math.floor((score - 10) / 2);
  document.getElementById("Charismamod").value = (modifier >= 0 ? "+" : "") + modifier;
});

registerLink.addEventListener('click', () => {
  wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
  wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
  wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
  wrapper.classList.remove('active-popup');
});

class Weapon {
  constructor(name, type, damage) {
    this.name = name;
    this.type = type;
    this.damage = damage;
  }
}

function parseWeapons() {
  let weapons = [];
  const weaponRows = document.querySelectorAll('.attacksandspellcasting tbody tr');

  weaponRows.forEach((row, index) => {
    const name = document.getElementById(`atkname${index + 1}`).value;
    const attackBonus = document.getElementById(`atkbonus${index + 1}`).value;
    const damageType = document.getElementById(`atkdamage${index + 1}`).value;

    if (name || attackBonus || damageType) {  // This check ensures that empty rows are not added
      weapons.push({
        name: name,
        attackBonus: attackBonus,
        damageType: damageType
      });
    }
  });

  return weapons;
}

function calcAbilityMod(score) {
  if (score < 1) {
    return 0;
  }
  return (Math.floor((score - 10) / 2));
}

function calcSkillMod(skill, score) {
  let out = 0;
  if (character.proficiencies.skills.includes(skill)) {
    out += character.proficiencyBonus;
  }
  out += score;
  return out;
}

function calcPassivePerception(perception) {
  return 10 + perception;
}

function updateCharacter() {
  character.playername = document.getElementById("playername").value;
  updateBasicInfo();

  updateAbilityScores();

  updateAbilityMods();

  updateProficiencies();  // only applies to skills rn

  character.inspiration = document.getElementById("inspiration").value;

  updateCombat();

  character.proficiencyBonus = document.getElementById("proficiencybonus").value;

  updateSkills();

  character.passiveWisdom = calcPassivePerception(character.perception);
  character.saves = {
    strengthSave: parseInt(document.getElementById("Strength-save").value),
    dexteritySave: parseInt(document.getElementById("Dexterity-save").value),
    constitutionSave: parseInt(document.getElementById("Constitution-save").value),
    intelligenceSave: parseInt(document.getElementById("Intelligence-save").value),
    wisdomSave: parseInt(document.getElementById("Wisdom-save").value),
    charismaSave: parseInt(document.getElementById("Charisma-save").value)
  };
  character.characterTraits = {
    personality: document.getElementById("personality").value,
    ideals: document.getElementById("ideals").value,
    bonds: document.getElementById("bonds").value,
    flaws: document.getElementById("flaws").value
  };
  character.currency = {
    CP: parseInt(document.getElementById("cp").value),
    SP: parseInt(document.getElementById("sp").value),
    EP: parseInt(document.getElementById("ep").value),
    GP: parseInt(document.getElementById("gp").value),
    PP: parseInt(document.getElementById("pp").value)
  };

  character.proficiencies = {
    languages: [],
    other: []
  };
  character.weapons = parseWeapons();
  character.equipment = [];
  character.spellcasting = {
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
  };
  saveCharacterToLocalStorage();
  loadCharacterFromLocalStorage();
}

function calcSkillMod(skill, abilityMod) {
  console.log(`Calculating skill modifier for ${skill}`);
  let output = abilityMod;
  if (character.proficiencies.skills.includes(skill)) {
    output += character.proficiencyBonus;
  }
  return output;
}

function updateProficiencies() {
  const skillNames = [
    "Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception",
    "History", "Insight", "Intimidation", "Investigation", "Medicine",
    "Nature", "Perception", "Performance", "Persuasion", "Religion",
    "Sleight of Hand", "Stealth", "Survival"
  ];
  character.proficiencies.skills = [];  // Clear and reinitialize the array
  skillNames.forEach(skill => {
    const checkBox = document.getElementById(`${skill}-prof`);
    if (checkBox && checkBox.checked) {
      character.proficiencies.skills.push(skill);
    }
  });
  console.log("Updated Skills:", character.proficiencies.skills); // Debugging line
}


function updateAbilityMods() {
  character.abilityMods.strength = calcAbilityMod(parseInt(document.getElementById("Strengthscore").value));
  character.abilityMods.dexterity = calcAbilityMod(parseInt(document.getElementById("Dexterityscore").value));
  character.abilityMods.constitution = calcAbilityMod(parseInt(document.getElementById("Constitutionscore").value));
  character.abilityMods.intelligence = calcAbilityMod(parseInt(document.getElementById("Intelligencescore").value));
  character.abilityMods.wisdom = calcAbilityMod(parseInt(document.getElementById("Wisdomscore").value));
  character.abilityMods.charisma = calcAbilityMod(parseInt(document.getElementById("Charismascore").value));

  console.log("Strength Modifier:", character.abilityMods.strength);
  console.log("Dexterity Modifier:", character.abilityMods.dexterity);
  console.log("Constitution Modifier:", character.abilityMods.constitution);
  console.log("Intelligence Modifier:", character.abilityMods.intelligence);
  console.log("Wisdom Modifier:", character.abilityMods.wisdom);
  console.log("Charisma Modifier:", character.abilityMods.charisma);
}

function updateBasicInfo() {
  character.basicInfo = {
    name: document.getElementById("charname").value,
    race: document.getElementById("race").value,
    class: document.getElementById("classlevel").value.split(" ")[0],
    level: parseInt(document.getElementById("classlevel").value.split(" ")[1]),
    background: document.getElementById("background").value,
    alignment: document.getElementById("alignment").value,
    experiencePoints: parseInt(document.getElementById("experiencepoints").value)
  };
}

function updateAbilityScores() {
  character.abilityScores = {
    strength: parseInt(document.getElementById("Strengthscore").value),
    dexterity: parseInt(document.getElementById("Dexterityscore").value),
    constitution: parseInt(document.getElementById("Constitutionscore").value),
    intelligence: parseInt(document.getElementById("Intelligencescore").value),
    wisdom: parseInt(document.getElementById("Wisdomscore").value),
    charisma: parseInt(document.getElementById("Charismascore").value)
  };
}

function updateCombat() {
  character.combat = {
    armorClass: parseInt(document.getElementById("ac").value),
    initiative: parseInt(document.getElementById("initiative").value),
    speed: parseInt(document.getElementById("speed").value),
    hitPoints: {
      maximum: parseInt(document.getElementById("maxhp").value),
      current: parseInt(document.getElementById("currenthp").value),
      temporary: parseInt(document.getElementById("temphp").value)
    },
    hitDice: document.getElementById("totalhd").value,
    deathSaves: {
      successes: 0,
      failures: 0
    }
  };
}

function updateSkills() {
  console.log('Updating skills...');
  character.skills = {
    acrobatics: calcSkillMod(character.proficiencyBonus, character.abilityMods.dexterity),
    animalHandling: calcSkillMod(character.proficiencyBonus, character.abilityMods.wisdom),
    arcana: calcSkillMod(character.proficiencyBonus, character.abilityMods.intelligence),
    athletics: calcSkillMod(character.proficiencyBonus, character.abilityMods.strength),
    deception: calcSkillMod(character.proficiencyBonus, character.abilityMods.charisma),
    history: calcSkillMod(character.proficiencyBonus, character.abilityMods.intelligence),
    insight: calcSkillMod(character.proficiencyBonus, character.abilityMods.wisdom),
    intimidation: calcSkillMod(character.proficiencyBonus, character.abilityMods.charisma),
    investigation: calcSkillMod(character.proficiencyBonus, character.abilityMods.intelligence),
    medicine: calcSkillMod(character.proficiencyBonus, character.abilityMods.wisdom),
    nature: calcSkillMod(character.proficiencyBonus, character.abilityMods.intelligence),
    perception: calcSkillMod(character.proficiencyBonus, character.abilityMods.wisdom),
    performance: calcSkillMod(character.proficiencyBonus, character.abilityMods.charisma),
    persuasion: calcSkillMod(character.proficiencyBonus, character.abilityMods.charisma),
    religion: calcSkillMod(character.proficiencyBonus, character.abilityMods.intelligence),
    sleightOfHand: calcSkillMod(character.proficiencyBonus, character.abilityMods.dexterity),
    stealth: calcSkillMod(character.proficiencyBonus, character.abilityMods.dexterity),
    survival: calcSkillMod(character.proficiencyBonus, character.abilityMods.wisdom)
  };
  console.log('Updated skills:', character.skills);
}

function saveCharacter() {
  // Top Box of information
  character.basicInfo.name = document.getElementById("charname").value;
  character.basicInfo.race = document.getElementById("race").value;
  character.basicInfo.alignment = document.getElementById("alignment").value;
  character.basicInfo.class = document.getElementById("classlevel").value.split(" ")[0];
  character.basicInfo.level = parseInt(document.getElementById("classlevel").value.split(" ")[1] || 0);
  character.basicInfo.experiencePoints = parseInt(document.getElementById("experiencepoints").value);
  character.basicInfo.background = document.getElementById("background").value;
  character.playername = document.getElementById("playername").value;

  // Ability scores box
  character.abilityScores.strength = parseInt(document.getElementById("Strengthscore").value);
  character.abilityScores.dexterity = parseInt(document.getElementById("Dexterityscore").value);
  character.abilityScores.constitution = parseInt(document.getElementById("Constitutionscore").value);
  character.abilityScores.wisdom = parseInt(document.getElementById("Wisdomscore").value);
  character.abilityScores.intelligence = parseInt(document.getElementById("Intelligencescore").value);
  character.abilityScores.charisma = parseInt(document.getElementById("Charismascore").value);

  // Ability modifiers
  character.abilityMods.strength = parseInt(document.getElementById("Strengthmod").value) || 0;
  character.abilityMods.dexterity = parseInt(document.getElementById("Dexteritymod").value) || 0;
  character.abilityMods.constitution = parseInt(document.getElementById("Constitutionmod").value) || 0;
  character.abilityMods.intelligence = parseInt(document.getElementById("Intelligencemod").value) || 0;
  character.abilityMods.wisdom = parseInt(document.getElementById("Wisdommod").value) || 0;
  character.abilityMods.charisma = parseInt(document.getElementById("Charismamod").value) || 0;

  // Combat stats
  character.combat.armorClass = parseInt(document.getElementById("ac").value);
  character.combat.initiative = parseInt(document.getElementById("initiative").value);
  character.combat.speed = parseInt(document.getElementById("speed").value);
  character.combat.hitPoints.maximum = parseInt(document.getElementById("maxhp").value);
  character.combat.hitPoints.current = parseInt(document.getElementById("currenthp").value);
  character.combat.hitPoints.temporary = parseInt(document.getElementById("temphp").value);

  // Passive Wisdom
  character.passiveWisdom = parseInt(document.getElementById("passiveperception").value);

  // Inspiration
  character.inspiration = parseInt(document.getElementById("inspiration").value);

  // Character traits
  character.characterTraits.personality = document.getElementById("personality").value;
  character.characterTraits.ideals = document.getElementById("ideals").value;
  character.characterTraits.bonds = document.getElementById("bonds").value;
  character.characterTraits.flaws = document.getElementById("flaws").value;

  // Currency
  character.currency.CP = parseInt(document.getElementById("cp").value);
  character.currency.SP = parseInt(document.getElementById("sp").value);
  character.currency.EP = parseInt(document.getElementById("ep").value);
  character.currency.GP = parseInt(document.getElementById("gp").value);
  character.currency.PP = parseInt(document.getElementById("pp").value);

  // character.passiveWisdom <- set by formula?
  updateCharacter();
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
  const characterData = localStorage.getItem('savedCharacter');
  if (characterData) {
    const character = JSON.parse(localStorage.getItem('savedCharacter'));

    // Load basic info
    document.getElementById("charname").value = character.basicInfo.name;
    document.getElementById("race").value = character.basicInfo.race;
    document.getElementById("alignment").value = character.basicInfo.alignment;
    document.getElementById("classlevel").value = `${character.basicInfo.class} ${character.basicInfo.level}`;  // Look at this again and decide if we want to deal with emoji issues or just use class + level as string.
    document.getElementById("experiencepoints").value = character.basicInfo.experiencePoints;
    document.getElementById("background").value = character.basicInfo.background;
    document.getElementById("playername").value = character.playername;

    // Load ability scores
    document.getElementById("Strengthscore").value = character.abilityScores.strength;
    document.getElementById("Dexterityscore").value = character.abilityScores.dexterity;
    document.getElementById("Constitutionscore").value = character.abilityScores.constitution; document.getElementById("Wisdomscore").value = character.abilityScores.wisdom;
    document.getElementById("Intelligencescore").value = character.abilityScores.intelligence;
    document.getElementById("Charismascore").value = character.abilityScores.charisma;

    displayAbilityModifiers();

    // Load combat stats
    document.getElementById("ac").value = character.combat.armorClass;
    document.getElementById("initiative").value = character.combat.initiative;
    document.getElementById("speed").value = character.combat.speed;
    document.getElementById("maxhp").value = character.combat.hitPoints.maximum;
    document.getElementById("currenthp").value = character.combat.hitPoints.current;
    document.getElementById("temphp").value = character.combat.hitPoints.temporary;

    // Load passive Wisdom
    document.getElementById("passiveperception").value = character.passiveWisdom;

    // Load inspiration
    document.getElementById("inspiration").value = character.inspiration;

    // Load skills
    document.getElementById("Acrobatics").value = character.skills.acrobatics;
    document.getElementById("Animal Handling").value = character.skills.animalHandling;
    document.getElementById("Arcana").value = character.skills.arcana;
    document.getElementById("Athletics").value = character.skills.athletics;
    document.getElementById("Deception").value = character.skills.deception;
    document.getElementById("History").value = character.skills.history;
    document.getElementById("Insight").value = character.skills.insight;
    document.getElementById("Intimidation").value = character.skills.intimidation;
    document.getElementById("Investigation").value = character.skills.investigation;
    document.getElementById("Medicine").value = character.skills.medicine;
    document.getElementById("Nature").value = character.skills.nature;
    document.getElementById("Perception").value = character.skills.perception;
    document.getElementById("Performance").value = character.skills.performance;
    document.getElementById("Persuasion").value = character.skills.persuasion;
    document.getElementById("Religion").value = character.skills.religion;
    document.getElementById("Sleight of Hand").value = character.skills.sleightOfHand;
    document.getElementById("Stealth").value = character.skills.stealth;
    document.getElementById("Survival").value = character.skills.survival;

    // Load character traits
    document.getElementById("personality").value = character.characterTraits.personality;
    document.getElementById("ideals").value = character.characterTraits.ideals;
    document.getElementById("bonds").value = character.characterTraits.bonds;
    document.getElementById("flaws").value = character.characterTraits.flaws;

    // Load currency
    document.getElementById("cp").value = character.currency.CP;
    document.getElementById("sp").value = character.currency.SP;
    document.getElementById("ep").value = character.currency.EP;
    document.getElementById("gp").value = character.currency.GP;
    document.getElementById("pp").value = character.currency.PP;
  }
  // updateCharacter();  remove comment once implemented
  logCharData();
}

function displayAbilityModifiers() {
  // Update the HTML input fields with the ability modifier values from the character object
  document.getElementById("Strengthmod").value = formatModifier(character.abilityMods.strength);
  document.getElementById("Dexteritymod").value = formatModifier(character.abilityMods.dexterity);
  document.getElementById("Constitutionmod").value = formatModifier(character.abilityMods.constitution);
  document.getElementById("Intelligencemod").value = formatModifier(character.abilityMods.intelligence);
  document.getElementById("Wisdommod").value = formatModifier(character.abilityMods.wisdom);
  document.getElementById("Charismamod").value = formatModifier(character.abilityMods.charisma);
}

// Helper function to format the modifier for display (adding a '+' sign for positive numbers)
function formatModifier(modifier) {
  return (modifier >= 0 ? "+" : "") + modifier;
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
function openDiceRollPanel(event) {
  event.preventDefault();

  //show the popup
  document.getElementById('popup').style.display = 'block';

  //hide openPopup button
  document.getElementById('openPopup').style.display = 'none';

  //close the dice rolling popup
  document.getElementById('closePopup').addEventListener('click', function () {
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

function animateDice(element, die) {
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
  setTimeout(function () { element.style.display = "inline-block"; }, 0)
}

function clearDice() {
  //create array holding each die div
  const diceDivs = [
    'die1', 'die2', 'die3', 'die4', 'die5', 'die6'
  ].map(id => document.getElementById(id));

  //hide each one and reset text overlay
  for (let i = 0; i < diceDivs.length; i++) {
    diceDivs[i].style.display = "none";
    diceDivs[i].innerHTML = "";
  }

  //reset total tag
  document.getElementById("total").innerHTML = "Total: ";
}

function rollDice(event) {
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
  for (let i = 0; i < diceDivs.length; i++) {
    diceDivs[i].addEventListener('animationend', () => {
      diceDivs[i].innerHTML = results[i];
      document.getElementById("total").innerHTML = "Total: " + total;
    });
  }

  //roll values for each die
  for (let k = 0; k < diceCounts.length; k++) { //for each type of dice
    for (let i = 0; i < diceCounts[k]; i++) { //roll the amount of times determined by diceCounts
      animateDice(diceDivs[count], diceCountElements[k]);

      //get random value for roll
      let roll;
      if (k == 5) { //if on d20
        roll = Math.ceil(Math.random() * 20);
      } else {
        roll = Math.ceil(Math.random() * ((k + 1) * 2 + 2)); //d4,d6,d8,d10,d12
      }

      // add roll to the total, store value in an array for later use
      total += roll;
      results.push(roll);

      //move to the next die;
      count++;
    }
  }
}
