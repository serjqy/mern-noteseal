import { fetchRecipes } from "../api/recipeAPI";

const recipeList = document.querySelector(".recipe__list");
const mealSelect = document.getElementById("mealType");
const difficultySelect = document.getElementById("difficulty");
const searchInput = document.querySelector(".recipeSearch");

const modal = document.getElementById("recipe-modal");

let recipes = [];

export async function initRecipes() {
  recipes = await fetchRecipes();
  renderRecipes(recipes);
  initFilters();
}

// Render Recipes
function renderRecipes(data) {
  recipeList.innerHTML = "";

  data.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe__card";

    card.dataset.meal = recipe.mealType[0].toLowerCase();
    card.dataset.difficulty = recipe.difficulty.toLowerCase();

    card.innerHTML = `
            <div class="img-wrapper"><img src="${recipe.image}" alt="${recipe.name}" class="recipe__card-image"/></div>
              <div class="recipe__card-content">
                <h2 class="recipe__card-title">${recipe.name}</h2>
                <h3 class="recipe__card-cuisine">Cuisine: ${recipe.cuisine}</h3>
                <ul class="recipe__card-info">
                  <li class="icon-wrapper"><i class="fa-solid fa-user"></i> Servings: <span>${recipe.servings}</span></li>
                  <li class="icon-wrapper"><i class="fa-solid fa-alarm-clock"></i> Prep: <span>${recipe.prepTimeMinutes} min</span></li>
                  <li class="icon-wrapper"><i class="fa-solid fa-fire-burner"></i> Cook: <span>${recipe.prepTimeMinutes} min</span></li>
                  
                </ul>
                <button class="btn btn-primary" id="recipeBtn" data-id="${recipe.id}">View Recipe</button>
              </div>
    `;

    recipeList.appendChild(card);
  });
}

// Recipe Modal
recipeList.addEventListener("click", (e) => {
  const btn = e.target.closest("#recipeBtn");
  if (!btn) return;

  const recipeId = Number(btn.dataset.id);
  const recipe = recipes.find((r) => r.id === recipeId);

  openModal(recipe);
});

function openModal(recipe) {
  const modalWrapper = document.querySelector(".modal__wrapper");

  modalWrapper.innerHTML = "";

  const modalContent = document.createElement("div");
  modalContent.className = "modal__card";

  modalContent.innerHTML = `
  <div class="img-wrapper"><img src="${recipe.image}" alt="${recipe.name}" class="modal__card-image"/></div>
  <div class="modal__card-content">
    <div class="modal__card-wrapper">
        <h2 class="modal__card-title">${recipe.name}</h2>
      <h3 class="modal__card-cuisine">Cuisine: ${recipe.cuisine}</h3>
    </div>
    <ul class="modal__card-info">
      <li class="icon-wrapper"><i class="fa-solid fa-user"></i> Servings: <span>${recipe.servings}</span></li>
      <li class="icon-wrapper"><i class="fa-solid fa-alarm-clock"></i> Prep: <span>${recipe.prepTimeMinutes} min</span></li>
      <li class="icon-wrapper"><i class="fa-solid fa-fire-burner"></i> Cook: <span>${recipe.prepTimeMinutes} min</span></li>
      <li class="icon-wrapper"><i class="fa-solid fa-hand-fist"></i> Diffuculty: <span>${recipe.difficulty}</span></li> 
      <li class="icon-wrapper"><i class="fa-solid fa-utensils"></i> Calories: <span>${recipe.caloriesPerServing} Ccal</span></li> 
      <li class="icon-wrapper"><i class="fa-solid fa-star"></i> Rating: <span>${recipe.rating}</span></li> 
      <li class="icon-wrapper"><i class="fa-solid fa-comments"></i> Reviews: <span>${recipe.reviewCount}</span></li> 
      <li class="icon-wrapper"><i class="fa-solid fa-font-awesome"></i> Meal Type: <span>${recipe.mealType}</span></li> 
    </ul>
    <p class="modal__card-ingridients">Ingridients: ${recipe.ingredients}</p>
    <p class="modal__card-instructions">Instructions: ${recipe.instructions}</p>

    <button class="btn btn-primary" id="recipeModalClose" type="button">Close</button>
    </div>
    `;

  modalWrapper.appendChild(modalContent);
  modal.classList.add("active");
}

modal.addEventListener("click", (e) => {
  if (e.target.closest("#recipeModalClose")) {
    modal.classList.remove("active");
  }
});

// Filter Recipes
function filterRecipes() {
  const meal = mealSelect.value;
  const difficulty = difficultySelect.value;
  const query = searchInput.value.toLowerCase();

  const filtered = recipes.filter((recipe) => {
    const matchMeal =
      meal === "all" ||
      recipe.mealType.map((m) => m.toLowerCase()).includes(meal);

    const matchDifficulty =
      difficulty === "all" || recipe.difficulty.toLowerCase() === difficulty;

    const matchSearch = recipe.name.toLowerCase().includes(query);

    return matchMeal && matchDifficulty && matchSearch;
  });

  renderRecipes(filtered);
}
// Listen Filter Recipes
function initFilters() {
  mealSelect.addEventListener("change", filterRecipes);
  difficultySelect.addEventListener("change", filterRecipes);
  searchInput.addEventListener("input", filterRecipes);
}
