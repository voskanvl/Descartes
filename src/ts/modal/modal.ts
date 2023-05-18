type ModalOptionType = {
    blockScroll: boolean
}

export default function modal(
    el: HTMLElement,
    { blockScroll }: ModalOptionType = { blockScroll: true },
) {
    if (blockScroll) {
        document.body.style.height = "100vh"
        document.body.style.overflowY = "hidden"
    }
    const modalEl = document.createElement("div")
    const closeEl = document.createElement("div")

    modalEl.classList.add("modal")
    closeEl.classList.add("modal__close")

    el.append(closeEl)
    modalEl.append(el)
    document.body.append(modalEl)

    const close = () => {
        document.body.style.height = ""
        document.body.style.overflowY = ""
        modalEl.remove()
    }

    closeEl.addEventListener("click", close)

    el.addEventListener("close", close)

    type modalOut = HTMLDivElement & { mount: (el?: HTMLElement) => HTMLElement }
    ;(modalEl as modalOut).mount = (el = document.body) => {
        el.append(modalEl)
        return modalEl
    }

    return modalEl as modalOut
}
