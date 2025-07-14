"use strict";

// ELEMENT SELECTIONS

const addHabitBtn = document.querySelector(".add");
const closeModalBtn = document.querySelector(".close");
const createHabitBtn = document.querySelector(".createHabit");
const darkModeBtn = document.querySelector(".darkMode");
const progress = document.querySelector(".progress");
const habitList = document.querySelector(".habitList");
const modalWindow = document.querySelector(".modal");
const blurBackground = document.querySelector(".overlay");
const habitNameEl = document.querySelector("#habitName");
const dateText = document.querySelector(".date");
const errorText = document.querySelector(".error");

// VARIABLES

let habitName;
let habitCount;
let checkedHabits = 0;
const now = new Date();

// Display current date
dateText.textContent = now.toLocaleDateString();

// FUNCTIONS

// Toggles the modal window and overlay visibility.
const toggleModal = function () {
  modalWindow.classList.toggle("opacity-100");
  blurBackground.classList.toggle("hidden");
};

// Adds new habit
const addHabit = function () {
  if (habitNameEl.value) {
    // Hide error message if visible
    errorText.classList.add("collapse");

    // Get entered value and clear input field
    habitName = habitNameEl.value;
    habitNameEl.value = "";

    // Generate unique ID for the habit
    const id = Date.now();

    // Create the habit item HTML
    const newHabit = `
      <li class="habit flex justify-between relative w-full">
        <div class="ml-4 flex gap-2">
          <input
            type="checkbox"
            class="peer scale-150 mb-2.5 mr-1 accent-blue-500 dark:accent-indigo-800"
            id="${id}"
          />
          <label class="peer-checked:line-through" for="${id}">${habitName}</label>
        </div>
        <button
          class="fill-black dark:fill-white flex items-center justify-center hover:cursor-pointer mr-4 w-10 h-10"
        >
          <svg class="w-8 h-8" viewBox="0 0 1000 1000">
            <path
              d="M112 688 c-10 -10 16 -41 125 -150 l138 -138 -138 -138 c-109 -109
              -135 -140 -125 -150 10 -10 41 16 150 125 l138 138 138 -138 c109 -109 140
              -135 150 -125 10 10 -16 41 -125 150 l-138 138 138 138 c109 109 135 140 125
              150 -10 10 -41 -16 -150 -125 l-138 -138 -138 138 c-109 109 -140 135 -150
              125z"
            />
          </svg>
        </button>
      </li>`;

    // Add habit to the DOM
    habitList.insertAdjacentHTML("beforeend", newHabit);

    // Update habit count
    habitCount = habitList.childElementCount;
  } else {
    // Show error if input is empty
    errorText.classList.remove("collapse");
  }
};

// Calculates and updates the progress percentage
const calcProgress = function () {
  checkedHabits = habitList.querySelectorAll(
    'input[type="checkbox"]:checked'
  ).length;

  const percentage = habitCount
    ? Math.trunc((checkedHabits / habitCount) * 100)
    : 0;

  progress.textContent = `${percentage}% finished`;
};

// EVENTS

// Open modal
addHabitBtn.addEventListener("click", toggleModal);

// Close modal and clear input
closeModalBtn.addEventListener("click", function () {
  toggleModal();
  habitNameEl.value = "";
});

// Create new habit
createHabitBtn.addEventListener("click", addHabit);

// Update progress when a checkbox changes
habitList.addEventListener("change", (e) => {
  if (e.target.matches('input[type="checkbox"]')) {
    calcProgress();
  }
});

// Delete habit
habitList.addEventListener("click", (e) => {
  if (e.target.closest("button")) {
    e.target.closest(".habit").remove();
    habitCount = habitList.childElementCount;

    // Recalculate progress or reset if no habits left
    habitCount > 0 ? calcProgress() : (progress.textContent = "0% finished");
  }
});

// Toggle dark mode
darkModeBtn.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");
});
