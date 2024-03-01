// Javascript will be used to provide the interactive elements of our site.

function createCharacter(event) {
  event.preventDefault();

  const form = document.getElementById("characterInfoForm");
  const formData = new FormData(form);

  console.log(formData.get("charName"));
  console.log(formData.get("charRace"));
  console.log(formData.get("charClass"));
  console.log(formData.get("charLevel"));
  console.log(formData.get("charDescription"));
  console.log(formData.get("charAlignment"));
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