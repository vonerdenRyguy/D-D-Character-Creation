// Javascript will be used to provide the interactive elements of our site.

function createCharacter(event) {
  event.preventDefault();

  const form = document.getElementById("characterInfoForm");
  const formData = new FormData(form);

  // Log each form field value
  for (let [key, value] of formData.entries()) {
    // ${var} is a template literal, which allows us to insert variables into a string
    console.log(`${key}: ${value}`);
  }
}

// character object all data a single character contains
const character = {
  // basicInfo created as a way to encapsulate similar instance variables
  // to access these, reference as character.basicInfo.name
  basicInfo: {
    name: "",
    race: "",
    class: "",
    level: 0,
    background: "",
    alignment: "",
    experiencePoints: 0,
  },
  abilityScores: {
    strength: "",
    dexterity: "",
    constitution: "",
    intelligence: "",
    wisdom: "",
    charisma: "",
  },
  combat: {
    armorClass: "",
    initiative: "",
    speed: "",
    hitPointMaximum: "",
    currentHitPoints: "",
    temporaryHitPoints: "",
    hitDice: "",
    deathSaves: "",
  }
  // Still more properties are needed; refer to readme
};