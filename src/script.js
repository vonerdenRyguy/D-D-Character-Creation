// Javascript will be used to provide the interactive elements of our site.

function createCharacter(event) {
  event.preventDefault();

  const form = document.getElementById("characterInfoForm");
  const formData = new FormData(form);

  // Log each form field value
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
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
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
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
        failures: 0,
      },
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
      survival: 0,
    },
    proficiencies: {
      armor: [],
      weapons: [],
      tools: [],
      languages: [],
      other: [],
    },
    characterAppearance: {
      age: "",
      height: "",
      weight: "",
      eyes: "",
      skin: "",
      hair: "",
    },
    // Potential inclusion of spells, features and traits, proficiencies, etc.
  };
  // End of character object definition
}