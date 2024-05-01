// const { update } = require("firebase/database");

const character = {
  playername: "",
  basicInfo: {
    name: "",
    race: "",
    class: "",
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
    skills: [],
    other: ""
  },
  weapons: {
    name1: "",
    name2: "",
    name3: "",
    atk1: "",
    atk2: "",
    atk3: "",
    damageType1: "",
    damageType2: "",
    damageType3: ""
  },
  equipment: "",
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
  updateCharacter();
});

document.getElementById("Strengthscore").addEventListener("input", function () {
  var score = parseInt(this.value);
  var modifier = Math.floor((score - 10) / 2);
  document.getElementById("Strengthmod").value = (modifier >= 0 ? "+" : "") + modifier;
  document.getElementById("Strength-save").value = (calcSkillMod("Strength-save", modifier) >= 0 ? "+" : "") + calcSkillMod("Strength-save", modifier); //use if proficiency bonus gets fixed
  document.getElementById("Athletics").value = (calcSkillMod("Athletics", modifier) >= 0 ? "+" : "") + calcSkillMod("Athletics", modifier); //use if proficiency bonus gets fixed
});

document.getElementById("Dexterityscore").addEventListener("input", function () {
  var score = parseInt(this.value);
  var modifier = Math.floor((score - 10) / 2);
  document.getElementById("Dexteritymod").value = (modifier >= 0 ? "+" : "") + modifier;
  document.getElementById("Dexterity-save").value = (calcSkillMod("Dexterity-save", modifier) >= 0 ? "+" : "") + calcSkillMod("Dexterity-save", modifier); //use if proficiency bonus gets fixed
  document.getElementById("Acrobatics").value = (calcSkillMod("Acrobatics", modifier) >= 0 ? "+" : "") + calcSkillMod("Acrobatics", modifier); //use if proficiency bonus gets fixed
  document.getElementById("Sleight of Hand").value = (calcSkillMod("Sleight of Hand", modifier) >= 0 ? "+" : "") + calcSkillMod("Sleight of Hand", modifier); //use if proficiency bonus gets fixed
  document.getElementById("Stealth").value = (calcSkillMod("Stealth", modifier) >= 0 ? "+" : "") + calcSkillMod("Stealth", modifier); //use if proficiency bonus gets fixed
});

document.getElementById("Constitutionscore").addEventListener("input", function () {
  var score = parseInt(this.value);
  var modifier = Math.floor((score - 10) / 2);
  document.getElementById("Constitutionmod").value = (modifier >= 0 ? "+" : "") + modifier;
  document.getElementById("Constitution-save").value = (calcSkillMod("Constitution-save", modifier) >= 0 ? "+" : "") + calcSkillMod("Constitution-save", modifier); //use if proficiency bonus gets fixed
});

document.getElementById("Wisdomscore").addEventListener("input", function () {
  var score = parseInt(this.value);
  var modifier = Math.floor((score - 10) / 2);
  document.getElementById("Wisdommod").value = (modifier >= 0 ? "+" : "") + modifier;
  document.getElementById("Wisdom-save").value = (calcSkillMod("Wisdom-save", modifier) >= 0 ? "+" : "") + calcSkillMod("Wisdom-save", modifier); //use if proficiency bonus gets fixed
  document.getElementById("Animal Handling").value = (calcSkillMod("Animal Handling", modifier) >= 0 ? "+" : "") + calcSkillMod("Animal Handling", modifier); //use if proficiency bonus gets fixed
  document.getElementById("Insight").value = (calcSkillMod("Insight", modifier) >= 0 ? "+" : "") + calcSkillMod("Insight", modifier); //use if proficiency bonus gets fixed
  document.getElementById("Medicine").value = (calcSkillMod("Medicine", modifier) >= 0 ? "+" : "") + calcSkillMod("Medicine", modifier); //use if proficiency bonus gets fixed
  document.getElementById("Perception").value = (calcSkillMod("Perception", modifier) >= 0 ? "+" : "") + calcSkillMod("Perception", modifier); //use if proficiency bonus gets fixed
  document.getElementById("Survival").value = (calcSkillMod("Survival", modifier) >= 0 ? "+" : "") + calcSkillMod("Survival", modifier); //use if proficiency bonus gets fixed
});

document.getElementById("Intelligencescore").addEventListener("input", function () {
  var score = parseInt(this.value);
  var modifier = Math.floor((score - 10) / 2);
  document.getElementById("Intelligencemod").value = (modifier >= 0 ? "+" : "") + modifier;
  document.getElementById("Intelligence-save").value = (calcSkillMod("Intelligence-save", modifier) >= 0 ? "+" : "") + calcSkillMod("Intelligence-save", modifier); //use if proficiency bonus gets fixed
  document.getElementById("Arcana").value = (calcSkillMod("Arcana", modifier) >= 0 ? "+" : "") + calcSkillMod("Arcana", modifier); //use if proficiency bonus gets fixed
  document.getElementById("History").value = (calcSkillMod("History", modifier) >= 0 ? "+" : "") + calcSkillMod("History", modifier); //use if proficiency bonus gets fixed
  document.getElementById("Investigation").value = (calcSkillMod("Investigation", modifier) >= 0 ? "+" : "") + calcSkillMod("Investigation", modifier); //use if proficiency bonus gets fixed
  document.getElementById("Nature").value = (calcSkillMod("Nature", modifier) >= 0 ? "+" : "") + calcSkillMod("Nature", modifier);//use if proficiency bonus gets fixed
  document.getElementById("Religion").value = (calcSkillMod("Religion", modifier) >= 0 ? "+" : "") + calcSkillMod("Religion", modifier); //use if proficiency bonus gets fixed
});

document.getElementById("Charismascore").addEventListener("input", function () {
  var score = parseInt(this.value);
  var modifier = Math.floor((score - 10) / 2);
  document.getElementById("Charismamod").value = (modifier >= 0 ? "+" : "") + modifier;
  document.getElementById("Charisma-save").value = (calcSkillMod("Charisma-save", modifier) >= 0 ? "+" : "") + calcSkillMod("Charisma-save", modifier); //use if proficiency bonus gets fixed
  document.getElementById("Deception").value = (calcSkillMod("Deception", modifier) >= 0 ? "+" : "") + calcSkillMod("Deception", modifier);//use if proficiency bonus gets fixed
  document.getElementById("Intimidation").value = (calcSkillMod("Intimidation", modifier) >= 0 ? "+" : "") + calcSkillMod("Intimidation", modifier); //use if proficiency bonus gets fixed
  document.getElementById("Performance").value = (calcSkillMod("Performance", modifier) >= 0 ? "+" : "") + calcSkillMod("Performance", modifier); //use if proficiency bonus gets fixed
  document.getElementById("Persuasion").value = (calcSkillMod("Persuasion", modifier) >= 0 ? "+" : "") + calcSkillMod("Persuasion", modifier); //use if proficiency bonus gets fixed
});

document.querySelectorAll('input[type=checkbox]').forEach(item => {
  item.addEventListener('change', event => {
    updateProficiencies();
  })
})

function updateWeapons() {
  character.weapons = {
    name1: document.getElementById("atkname1").value,
    name2: document.getElementById("atkname2").value,
    name3: document.getElementById("atkname3").value,
    atk1: document.getElementById("atkbonus1").value,
    atk2: document.getElementById("atkbonus2").value,
    atk3: document.getElementById("atkbonus3").value,
    damageType1: document.getElementById("atkdamage1").value,
    damageType2: document.getElementById("atkdamage2").value,
    damageType3: document.getElementById("atkdamage3").value,
  }
  console.log("updated weapons!");
}

function calcAbilityMod(score) {
  if (score < 1) {
    return 0;
  }
  return (Math.floor((score - 10) / 2));
}

function calcPassivePerception(perception) {
  return 10 + perception;
}

function updateCharacter() {
  character.playername = document.getElementById("playername").value;
  updateBasicInfo();

  updateAbilityScores();

  updateAbilityMods();

  updateProficiencies();

  updateInspiration();

  updateCombat();

  updateProficiencyBonus();

  updateSkills();

  updatePassiveWisdom();

  updateSaves();

  updateTraits();

  updateCurrency();

  updateWeapons();

  character.equipment = document.getElementById("equipmentBox").value;
  character.hitDice = document.getElementById("remaininghd").value;
  
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
    output += parseInt(character.proficiencyBonus);
  }
  return output;
}

function updateProficiencies() {
  const skillNames = [
    "Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception",
    "History", "Insight", "Intimidation", "Investigation", "Medicine",
    "Nature", "Perception", "Performance", "Persuasion", "Religion",
    "Sleight of Hand", "Stealth", "Survival", "Strength-save",
    "Dexterity-save", "Constitution-save", "Intelligence-save", 
    "Wisdom-save", "Charisma-save"
  ];
  character.proficiencies.skills = [];  // Clear and reinitialize the array
  skillNames.forEach(skill => {
    const checkBox = document.getElementById(`${skill}-prof`);
    if (checkBox && checkBox.checked) {
      character.proficiencies.skills.push(skill);
    }
  });
  character.proficiencies.other = document.getElementById("otherprofs").value;
  console.log("Updated Skills:", character.proficiencies.skills); // Debugging line
}

function updateCurrency() {
  character.currency = {
    CP: parseInt(document.getElementById("cp").value),
    SP: parseInt(document.getElementById("sp").value),
    EP: parseInt(document.getElementById("ep").value),
    GP: parseInt(document.getElementById("gp").value),
    PP: parseInt(document.getElementById("pp").value)
  };
}

function updateTraits() {
  character.characterTraits = {
    personality: document.getElementById("personality").value,
    ideals: document.getElementById("ideals").value,
    bonds: document.getElementById("bonds").value,
    flaws: document.getElementById("flaws").value
  };
}

function updatePassiveWisdom() {
  character.passiveWisdom = calcPassivePerception(character.perception);
}

function updateProficiencyBonus() {
  character.proficiencyBonus = document.getElementById("proficiencybonus").value;
}
function updateInspiration() {
  character.inspiration = document.getElementById("inspiration").value;
}

function updateSaves() {
  character.saves = {
    strengthSave: calcSkillMod("Strength-save", character.abilityMods.strength),
    dexteritySave: calcSkillMod("Dexterity-save", character.abilityMods.dexterity),
    constitutionSave: calcSkillMod("Constitution-save", character.abilityMods.constitution),
    intelligenceSave: calcSkillMod("Intelligence-save", character.abilityMods.intelligence),
    wisdomSave: calcSkillMod("Wisdom-save", character.abilityMods.wisdom),
    charismaSave: calcSkillMod("Charisma-save", character.abilityMods.charisma),
  };
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
    class: document.getElementById("classlevel").value,
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
    acrobatics: calcSkillMod("Acrobatics", character.abilityMods.dexterity),
    animalHandling: calcSkillMod("Animal Handling", character.abilityMods.wisdom),
    arcana: calcSkillMod("Arcana", character.abilityMods.intelligence),
    athletics: calcSkillMod("Athletics", character.abilityMods.strength),
    deception: calcSkillMod("Deception", character.abilityMods.charisma),
    history: calcSkillMod("History", character.abilityMods.intelligence),
    insight: calcSkillMod("Insight", character.abilityMods.wisdom),
    intimidation: calcSkillMod("Intimidation", character.abilityMods.charisma),
    investigation: calcSkillMod("Investigation", character.abilityMods.intelligence),
    medicine: calcSkillMod("Medicine", character.abilityMods.wisdom),
    nature: calcSkillMod("Nature", character.abilityMods.intelligence),
    perception: calcSkillMod("Perception", character.abilityMods.wisdom),
    performance: calcSkillMod("Performance", character.abilityMods.charisma),
    persuasion: calcSkillMod("Persuasion", character.abilityMods.charisma),
    religion: calcSkillMod("Religion", character.abilityMods.intelligence),
    sleightOfHand: calcSkillMod("Sleight of Hand", character.abilityMods.dexterity),
    stealth: calcSkillMod("Stealth", character.abilityMods.dexterity),
    survival: calcSkillMod("Survival", character.abilityMods.wisdom),
  };
  console.log('Updated skills:', character.skills);
}

function saveCharacter() {
  // Top Box of information
  character.basicInfo.name = document.getElementById("charname").value;
  character.basicInfo.race = document.getElementById("race").value;
  character.basicInfo.alignment = document.getElementById("alignment").value;
  character.basicInfo.class = document.getElementById("classlevel");
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
  
  // Hit dice
  character.hitDice = document.getElementById("remaininghd").value;

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

  character.abilityScores.strength = responses[4];
  character.abilityScores.dexterity = responses[5];
  character.abilityScores.constitution = responses[6];
  character.abilityScores.intelligence = responses[7];
  character.abilityScores.wisdom = responses[8];
  character.abilityScores.charisma = responses[9];

  document.getElementById("charname").value = character.basicInfo.name;
  document.getElementById("race").value = character.basicInfo.race;
  document.getElementById("alignment").value = character.basicInfo.alignment;
  document.getElementById("classlevel").value = character.basicInfo.class;
  document.getElementById("experiencepoints").value = character.basicInfo.experiencePoints;
  document.getElementById("playername").value = character.playername;

  document.getElementById("Strengthscore").value = character.abilityScores.strength;
  document.getElementById("Dexterityscore").value = character.abilityScores.dexterity;
  document.getElementById("Constitutionscore").value = character.abilityScores.constitution;
  document.getElementById("Intelligencescore").value = character.abilityScores.intelligence;
  document.getElementById("Wisdomscore").value = character.abilityScores.wisdom;
  document.getElementById("Charismascore").value = character.abilityScores.charisma;

  document.getElementById("proficiencybonus").value = character.proficiencyBonus;

  updateCharacter();  //Call this once this method is completed fully
}

function loadCharacterFromLocalStorage() {
  const characterData = localStorage.getItem('savedCharacter');
  if (characterData) {
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
    document.getElementById("Constitutionscore").value = character.abilityScores.constitution; 
    document.getElementById("Wisdomscore").value = character.abilityScores.wisdom;
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

    // Load equipment Box
    document.getElementById("equipmentBox").value = character.equipment;

    // Load hit dice
    document.getElementById("remaininghd").value = character.hitDice;

    // Load weapons
    document.getElementById("atkname1").value = character.weapons.name1;
    document.getElementById("atkname2").value = character.weapons.name2;
    document.getElementById("atkname3").value = character.weapons.name3;
    document.getElementById("atkbonus1").value = character.weapons.atk1;
    document.getElementById("atkbonus2").value = character.weapons.atk2;
    document.getElementById("atkbonus3").value = character.weapons.atk3;
    document.getElementById("atkdamage1").value = character.weapons.damageType1;
    document.getElementById("atkdamage2").value = character.weapons.damageType2;
    document.getElementById("atkdamage3").value = character.weapons.damageType3;

    // Load Proficency Bonus
    console.log(character.proficiencyBonus);
    document.getElementById("proficiencybonus").value = character.proficiencyBonus//(character.proficiencyBonus >= 0 ? "+" : "") + character.proficiencyBonus;

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

    // Load Saving Throws
    document.getElementById("Strength-save").value = character.saves.strengthSave;
    document.getElementById("Dexterity-save").value = character.saves.dexteritySave;
    document.getElementById("Constitution-save").value = character.saves.constitutionSave;
    document.getElementById("Wisdom-save").value = character.saves.wisdomSave;
    document.getElementById("Intelligence-save").value = character.saves.intelligenceSave;
    document.getElementById("Charisma-save").value = character.saves.charismaSave;

    // Load character traits
    document.getElementById("personality").value = character.characterTraits.personality;
    document.getElementById("ideals").value = character.characterTraits.ideals;
    document.getElementById("bonds").value = character.characterTraits.bonds;
    document.getElementById("flaws").value = character.characterTraits.flaws;

    // Load proficiencies
    document.getElementById("otherprofs").value = character.proficiencies.other;

    // Load currency
    document.getElementById("cp").value = character.currency.CP;
    document.getElementById("sp").value = character.currency.SP;
    document.getElementById("ep").value = character.currency.EP;
    document.getElementById("gp").value = character.currency.GP;
    document.getElementById("pp").value = character.currency.PP;
  }
  //updateCharacter();  //remove comment once implemented
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
  event.stopPropagation();

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

function printDocument() {
  window.print();
}