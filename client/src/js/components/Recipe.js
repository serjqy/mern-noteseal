import { fetchRecipes } from "../api/recipeAPI";

const recipeList = document.querySelector(".recipe__list");
const mealSelect = document.getElementById("mealType");
const difficultySelect = document.getElementById("difficulty");
const searchInput = document.querySelector(".recipeSearch");

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
                  <li class="icon-wrapper"><i class="fa-solid fa-alarm-clock"></i> Prep: <span>${recipe.prepTimeMinutes}</span></li>
                  <li class="icon-wrapper"><i class="fa-solid fa-fire-burner"></i> Cook: <span>${recipe.prepTimeMinutes}</span></li>
                  
                </ul>
                <button class="btn btn-primary" id="recipeBtn" data-id="${recipe.id}">View Recipe</button>
              </div>
    `;

    recipeList.appendChild(card);
  });
}

// Recipe Modal
function openModal(recipe) {
    
}

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
