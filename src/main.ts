import "./sass/style.sass";
import "@splidejs/splide/css";

import switchSubmenu from "./components/main-menu/main-menu";
import slides from "./slides";
import MultyRange from "./multyRange";

switchSubmenu();
const slidesInstance = slides();
const specificitySplide = slidesInstance.splides["specificity"];
const monitorElement = document.querySelector<HTMLElement>(".specificity__monitor")!;
specificitySplide &&
    specificitySplide.on("move", index => {
        monitorElement.innerText = `${index + 1}/${specificitySplide.length}`;
    });

const searchElement = document.querySelector<HTMLElement>(".header__search")!;
const inputSearchElement = document.querySelector<HTMLElement>("#search-input")!;
const headerRight = document.querySelector<HTMLElement>(".header__right")!;

searchElement.addEventListener("mouseenter", () => {
    if (innerWidth > 1246) return;
    // headerRight.style.width = "40vw";
    inputSearchElement.style.width = "min(40vw, 240px)";
    inputSearchElement.style.paddingLeft = "22px";
    inputSearchElement.style.opacity = "1";
});
searchElement.addEventListener("mouseleave", () => {
    if (innerWidth > 1246) return;
    headerRight.style.width = "";
    inputSearchElement.style.width = "";
    inputSearchElement.style.opacity = "0";
    inputSearchElement.style.paddingLeft = "";
});

const filterPrice = document.querySelector<HTMLDivElement>(".filter__price");
const mr = filterPrice && new MultyRange(filterPrice);

const filterLength = document.querySelector<HTMLDivElement>(".filter__length");
const mr1 = filterLength && new MultyRange(filterLength);
