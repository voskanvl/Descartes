import "./sass/style.sass";
import "@splidejs/splide/css";

import switchSubmenu from "./components/main-menu/main-menu";
import slides from "./slides";

switchSubmenu();
slides();

const searchElement = document.querySelector<HTMLElement>(".header__search")!;
const inputSearchElement = document.querySelector<HTMLElement>("#search-input")!;
const headerRight = document.querySelector<HTMLElement>(".header__right")!;

searchElement.addEventListener("mouseenter", () => {
    if (innerWidth > 1246) return;
    // headerRight.style.width = "40vw";
    inputSearchElement.style.width = "240px";
    inputSearchElement.style.opacity = "1";
});
searchElement.addEventListener("mouseleave", () => {
    if (innerWidth > 1246) return;
    headerRight.style.width = "";
    inputSearchElement.style.width = "";
    inputSearchElement.style.opacity = "0";
});
