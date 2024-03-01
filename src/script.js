// Javascript will be used to provide the interactive elements of our site.
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