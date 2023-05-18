import "./sass/style.sass"
import "@splidejs/splide/css"

import switchSubmenu from "./components/main-menu/main-menu"
import slides from "./slides"

import initMultiRange from "./initMultiRange"
import gallery from "./ts/gallery"
// import scrollCharact from "./ts/scrollCharact";

import IMask from "imask"
import modal from "./ts/modal/modal"
import feedback from "./ts/modal/feedback"

switchSubmenu()
const slidesInstance = slides()
const specificitySplide = slidesInstance.splides["specificity"]
const monitorElement = document.querySelector<HTMLElement>(".specificity__monitor")!
specificitySplide &&
    specificitySplide.on("move", index => {
        monitorElement.innerText = `${index + 1}/${specificitySplide.length}`
    })

const searchElement = document.querySelector<HTMLElement>(".header__search")!
const inputSearchElement = document.querySelector<HTMLElement>("#search-input")!
const headerRight = document.querySelector<HTMLElement>(".header__right")!

searchElement.addEventListener("mouseenter", () => {
    if (innerWidth > 1246) return
    // headerRight.style.width = "40vw";
    inputSearchElement.style.width = "min(40vw, 240px)"
    inputSearchElement.style.paddingLeft = "22px"
    inputSearchElement.style.opacity = "1"
})
searchElement.addEventListener("mouseleave", () => {
    if (innerWidth > 1246) return
    headerRight.style.width = ""
    inputSearchElement.style.width = ""
    inputSearchElement.style.opacity = "0"
    inputSearchElement.style.paddingLeft = ""
})

initMultiRange()

const filterControl = document.querySelector<HTMLElement>(".product-list__filter--control")
const filter = document.querySelector<HTMLElement>(".product-list__filter")
filterControl &&
    filterControl.addEventListener("click", () => {
        if (innerWidth > 1024) return
        filter && filter.toggleAttribute("active")
    })

gallery()

const phoneInput = document.querySelector<HTMLInputElement>("input[type='tel']")

phoneInput &&
    IMask(phoneInput, {
        mask: "+{7}(000)000-00-00",
        lazy: false,
    })

//--- MODAL ---
const headerButton = document.querySelector<HTMLElement>(".header__right .button-el  ")
const footerButton = document.querySelector<HTMLElement>(
    ".footer .button-el.button-el--transparent",
)
const orderButton = document.querySelector<HTMLElement>(".good-main .button-el.button-el--gray")

const modalTriggers: HTMLElement[] = []

headerButton && modalTriggers.push(headerButton)
footerButton && modalTriggers.push(footerButton)

modalTriggers.forEach(e =>
    e.addEventListener("click", () => {
        modal(feedback()).mount()
    }),
)

orderButton &&
    orderButton.addEventListener("click", () => {
        const productName = document.querySelector<HTMLElement>(".good-main-desctop-up__title")
        modal(
            feedback({
                title: "ОФОРМЛЕНИЕ ЗАКАЗА",
                insteadOfTextarea: productName?.innerHTML,
            }),
        ).mount()
    })
