# D&D-Character-Creation

[![GitHub last commit](https://img.shields.io/github/last-commit/vonerdenRyguy/D-D-Character-Creation?label=updated)](https://github.com/vonerdenRyguy/D-D-Character-Creation/commits)

# Visit the Live Deployment
[Character Creation Tool](https://vonerdenryguy.github.io/D-D-Character-Creation/src/welcomePage.html)

# Table of Contents

- [D&D Character Object Documentation](#dd-character-object-documentation)
  - [Structure](#structure)
    - [Player Name](#playername)
    - [Basic Information](#basicinfo)
    - [Ability Scores](#abilityscores)
    - [Ability Modifiers](#abilitymods)
    - [Passive Wisdom](#passivewisdom)
    - [Inspiration](#inspiration)
    - [Combat](#combat)
    - [Proficiency Bonus](#proficiencybonus)
    - [Skills](#skills)
    - [Saves](#saves)
    - [Character Traits](#charactertraits)
    - [Currency](#currency)
    - [Proficiencies](#proficiencies)
    - [Weapons](#weapons)
    - [Equipment](#equipement)
    - [Spellcasting](#spellcasting)
  - [Example Usage](#example-usage)
- [Notes](#notes)


# Objectives:
As a cumulative assignment for CSE 201, this project hopes to:
1. Apply the learned contents of the course into a small real-life project, which allows the students to explore and experience tackling industry-based working environments.
2. Provide students the opportunity to work in groups and learn industry-based communication skills.

# D&D Character Object Documentation

This documentation describes the structure of the `character` object used to represent a Dungeons and Dragons character in digital form. The object includes various properties that hold character details, abilities, equipment, and more.

## Structure

The `character` object is structured as follows:

### `playername`
- **Type:** `String`
- **Description:** The name of the player controlling the character.

### `basicInfo`
- **Type:** `Object`
- **Description:** Contains basic information about the character.
  - `name`: Character's name.
  - `race`: Character's race (e.g., Elf, Dwarf).
  - `class`: Character's class (e.g., Wizard, Fighter).
  - `level`: Character's current level.
  - `background`: Character's background story.
  - `alignment`: Character's ethical and moral perspective.
  - `experiencePoints`: Current total of experience points.

### `abilityScores`
- **Type:** `Object`
- **Description:** Character's ability scores.
  - `strength`: Score for physical power.
  - `dexterity`: Score for agility.
  - `constitution`: Score for endurance.
  - `intelligence`: Score for reasoning and memory.
  - `wisdom`: Score for perception and insight.
  - `charisma`: Score for force of personality.

### `abilityMods`
- **Type:** `Object`
- **Description:** Ability modifiers derived from ability scores.
  - `strength`: Modifier for Strength.
  - `dexterity`: Modifier for Dexterity.
  - `constitution`: Modifier for Constitution.
  - `intelligence`: Modifier for Intelligence.
  - `wisdom`: Modifier for Wisdom.
  - `charisma`: Modifier for Charisma.

### `passiveWisdom`
- **Type:** `Integer`
- **Description:** Passive Wisdom (Perception) score.

### `inspiration`
- **Type:** `Integer`
- **Description:** Inspiration points.

### `combat`
- **Type:** `Object`
- **Description:** Combat related stats.
  - `armorClass`: Defense capability score.
  - `initiative`: Modifier for turn order in combat.
  - `speed`: Movement speed.
  - `hitPoints`: Object holding health points data.
    - `maximum`: Maximum health points.
    - `current`: Current health points.
    - `temporary`: Temporary health points.
  - `hitDice`: Type of dice used for health points.
  - `deathSaves`: Record of passed and failed death saves.
    - `successes`: Number of successful saves.
    - `failures`: Number of failures.

### `proficiencyBonus`
- **Type:** `Integer`
- **Description:** Bonus applied to proficient skills and abilities.

### `skills`
- **Type:** `Object`
- **Description:** Skill proficiency scores.
  - List each skill (e.g., `acrobatics`, `animalHandling`, etc.) with an integer value representing the proficiency level.

### `saves`
- **Type:** `Object`
- **Description:** Saving throw modifiers.
  - `strengthSave`: Modifier for Strength saves.
  - `dexteritySave`: Modifier for Dexterity saves.
  - `constitutionSave`: Modifier for Constitution saves.
  - `intelligenceSave`: Modifier for Intelligence saves.
  - `wisdomSave`: Modifier for Wisdom saves.
  - `charismaSave`: Modifier for Charisma saves.

### `characterTraits`
- **Type:** `Object`
- **Description:** Descriptive traits of the character.
  - `personality`: Personality traits.
  - `ideals`: Core beliefs and ideals.
  - `bonds`: Emotional bonds and connections.
  - `flaws`: Character flaws and weaknesses.

### `currency`
- **Type:** `Object`
- **Description:** Financial resources in different denominations.
  - `CP`: Copper Pieces.
  - `SP`: Silver Pieces.
  - `EP`: Electrum Pieces.
  - `GP`: Gold Pieces.
  - `PP`: Platinum Pieces.

### `proficiencies`
- **Type:** `Object`
- **Description:** Lists of proficiencies.
  - `languages`: Array of known languages.
  - `skills`: Array of proficient skills.
  - `other`: Array of other proficiencies.

### `weapons`
- **Type:** `Array`
- **Description:** List of weapons.

### `equipment`
- **Type:** `Array`
- **Description:** List of equipment items.

### `spellcasting`
- **Type:** `Object`
- **Description:** Spellcasting abilities and spells known.
  - `spellCastingAbility`: Primary ability for spellcasting.
  - `spellAttackBonus`: Attack bonus for spells.
  - `spellSaveDC`: Difficulty Class for saving throws against spells.
  - `slots`: Object with arrays representing available spell slots for each spell level.
  - `spells`: Object with arrays of spells known for each spell level.

## Example Usage

```javascript
const myCharacter = {
  playername: "John Doe",
  basicInfo: {
    name: "Eldrin",
    race: "Elf",
    class: "Wizard",
    level: 5,
    background: "Sage",
    alignment: "Chaotic Good",
    experiencePoints: 6500
  },
  // Add other properties as shown above
};
```

This structure serves as a digital character sheet for tracking a character's progression through a D&D campaign, designed to be comprehensive and easily accessible.

## Notes
- .gitignore solely exists to prevent .DS_Store from appearing, a hidden config file generated by MacOS.
