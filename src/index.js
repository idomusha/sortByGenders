const DEFAULT_GENDERS = ["pegasus", "unicorn", "pegacorn"];

const horses = [
  { id: 1, gender: "pegasus" },
  { id: 2, gender: "unicorn" },
  { id: 3, gender: "pegacorn" }
];

const getPriorities = priority => {
  switch (priority) {
    case "pegasus":
    default:
      return {
        pegasus: 1,
        unicorn: 2,
        pegacorn: 3
      };
    case "unicorn":
      return {
        pegasus: 2,
        unicorn: 1,
        pegacorn: 3
      };
    case "pegacorn":
      return {
        pegasus: 2,
        unicorn: 3,
        pegacorn: 1
      };
  }
};

const compareGenders = (priority, property) => {
  return function innerSort(a, b) {
    if (typeof property === "string") {
      if (
        !Object.prototype.hasOwnProperty.call(a, property) ||
        !Object.prototype.hasOwnProperty.call(b, property)
      ) {
        return 0;
      }
      a = a[property];
      b = b[property];
    }

    let comparison = 0;

    if (getPriorities(priority)[a] > getPriorities(priority)[b]) {
      comparison = 1;
    } else if (getPriorities(priority)[a] < getPriorities(priority)[b]) {
      comparison = -1;
    }

    return comparison;
  };
};

/**
 * gets genders from an array or a string
 *
 * @param {(Object[]|string)} genders
 */
const getGenders = (genders = DEFAULT_GENDERS) => {
  return Array.isArray(genders) ? genders : [genders];
};

/**
 * sort genders from a gender priority
 *
 * @param {(Object[]|string)} genders
 * @param {string} priority
 */
const sortGenders = (genders = DEFAULT_GENDERS, priority = "pegasus") => {
  const displayedGenders = getGenders(genders);

  console.log(displayedGenders.sort(compareGenders(priority)));
  return displayedGenders.sort(compareGenders(priority));
};

/**
 * filters horses by specific gender(s) from a list of horses and genders
 *
 * @param {Object[]} horses
 * @param {(Object[]|string)} genders
 */
const filterByGender = (horses = [], genders = DEFAULT_GENDERS) => {
  const displayedGenders = getGenders(genders);
  console.log(horses);
  console.log(horses.filter(horse => displayedGenders.includes(horse.gender)));
  return horses.filter(horse => displayedGenders.includes(horse.gender));
};

/**
 * sorts horses by specific gender(s) from a list of horses, genders and a gender priority
 *
 * @param {Object[]} horses
 * @param {string} priority
 */
const sortByGender = (
  horses = [],
  priority = "pegasus",
  property = "gender"
) => {
  console.log(
    horses
      .sort(compareGenders(priority, property))
      .map(horse => `${horse.id}: ${horse.gender}`)
  );

  return horses.sort(compareGenders(priority, property));
};

/**
 * filters and sorts horses by specific gender(s) from a list of horses, genders and a gender priority
 *
 * @param {Object[]} horses
 * @param {(Object[]|string)} genders
 * @param {string} priority
 */
const filterAndSortByGender = (
  horses = [],
  genders = DEFAULT_GENDERS,
  priority = "female"
) => {
  const displayedGenders = getGenders(genders);
  const filteredHorses =
    displayedGenders.length < DEFAULT_GENDERS.length
      ? filterByGender(horses, displayedGenders)
      : horses;
  return sortByGender(filteredHorses, priority);
};

// If all 3 of the options are checked and Unicorn or Pegasus is selected to show first,
// Pegacorn will always be the last one in order.

// If all 3 of the options are checked and Pegacorn is selected to show first,
// then show Pegasus in second place.

filterAndSortByGender(horses, ["pegasus", "unicorn", "pegacorn"], "pegacorn");
sortGenders(["pegasus", "unicorn", "pegacorn"], "pegacorn");

export { sortGenders, filterByGender, sortByGender, filterAndSortByGender };
