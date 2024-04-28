// On page run, loads saved character from local storage
document.addEventListener('DOMContentLoaded', function() {
  loadCharacter();  // Load character data from local storage

  document.getElementById('characterForm').addEventListener('submit', function(event) {
      event.preventDefault();  // Prevent the form from submitting normally
      saveCharacter();  // Save character to local storage
  });
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