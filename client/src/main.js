import "./index.scss";
import { initNavbar } from "./js/components/Navbar";
import { initRecipes } from "./js/components/Recipe";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initRecipes();
});
