let burger = document.querySelector(".burger");
let nav = document.querySelector(".nav-container");
let navItems = document.querySelectorAll(".nav-items");

const navbarAnimation = () => {
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    burger.classList.toggle("toggle");
  });

  navItems.forEach(navItems => {
    navItems.addEventListener("click", () => {
      nav.classList.remove("nav-active");
      burger.classList.remove("toggle");
    });
  });
};

navbarAnimation();
