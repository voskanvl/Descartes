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
import { ZodError, z } from "zod"

// switchSubmenu()
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

const maskedPhone =
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

//--- in Page Form ---
const schema = z.object({
    name: z.literal(true, { errorMap: () => ({ message: "Вы забыли указать имя" }) }),
    phone: z.string().min(11, { message: "Номер должен содержать не менее 10 символов" }),
})

const formOnPage = document.querySelector<HTMLFormElement>(".feedback-form__form")
const nameEl = formOnPage?.querySelector<HTMLInputElement>("input[name='name']")
// const phoneEl = formOnPage?.querySelector<HTMLInputElement>("input[name='phone']")
const submitEl = formOnPage?.querySelector<HTMLTextAreaElement>(".button-el")
const errorEl = formOnPage?.querySelector<HTMLElement>(".feedback__error")
const agreeEl = formOnPage?.querySelector<HTMLInputElement>(".feedback__agree-check")

submitEl && agreeEl && submitEl.setAttribute("disabled", !agreeEl.checked + "")

agreeEl &&
    agreeEl.addEventListener("click", () => {
        console.log(agreeEl.value)
        submitEl && submitEl.setAttribute("disabled", !agreeEl.checked + "")
    })

submitEl &&
    submitEl.addEventListener("click", async () => {
        if (!formOnPage) return
        const formData = new FormData(formOnPage)

        try {
            if (!agreeEl?.checked) {
                throw new Error(
                    "Без согласия на обработку персональных данных мы не можем принять запрос",
                )
            }

            schema.parse({
                name: !!nameEl?.value,
                phone: maskedPhone?.unmaskedValue,
            })

            const res = await fetch("/mail.php", {
                method: "POST",
                body: formData,
            })

            if (res.ok) {
                formOnPage.innerHTML = "Все четенько. Дыши носом, мы те брякнем"
            } else {
                throw new Error(
                    "Ошибка отправки данных. Попробуйте отправить вторично или обновить страницу",
                )
            }
        } catch (error) {
            if ("message" in (error as { message: string }) && !(error instanceof ZodError)) {
                errorEl && (errorEl.innerText = (error as { message: string })?.message || "")
                return
            }
            const fail = error as ZodError
            errorEl && (errorEl.innerText = fail.errors.map(e => e.message).join(", "))
        }
    })

//---
