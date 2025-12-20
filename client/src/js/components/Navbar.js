export const initNavbar = () => {
  const btnMenu = document.getElementById("btnMenu");

  const navList = document.querySelector(".nav__list");
  const navLinks = document.querySelectorAll(".nav__link");

  btnMenu.addEventListener("click", () => {
    navList.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("active");
    });
  });

  const currPath = window.location.pathname;

  navLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname;

    if (currPath === linkPath) {
      link.classList.add("active");
    }
  });
};
