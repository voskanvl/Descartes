import IMask from "imask"
import { ZodError, z } from "zod"

let initialData = {
    title: "Закажите звонок и получите консультацию по нужному для вас товару",
    caption:
        "Спасибо, данные вашего заказа будут переданы в отдел продаж. После чего ожидайте звонка!",
    textarea: { text: "Чем мы можем вам помочь?", cols: 30, rows: 8 },
    agreeCaption:
        "Даю согласие на обработку моих персональных данный в соответствии с политикой обработки персональных данных",
    submit: "Записаться",
    timeoutBeforeClose: 3000,
    success: `
                <p>Ваши данные были успешно отправлены.</p>
                <p>Сидите, суки, и ждите звонка ... в дверь</p>
                `,
    unsuccess: `
                <p>Ваши данные не были отправлены.</p>
                <p>Сидите, суки, мы сами к вам приедем ...</p>
                `,
    insteadOfTextarea: "",
}

function createElement(className: string, text: string, type: string = "div") {
    const element = document.createElement(type)
    element.classList.add(className)
    element.innerText = text

    return element
}

function createInput(
    placeholder: string,
    name: string,
    className: string = "feedback__input",
    type: string = "text",
) {
    const element = document.createElement("input")
    element.classList.add(className)
    element.name = name
    element.type = type
    element.placeholder = placeholder

    return element
}

export default function feedback({
    title,
    caption,
    insteadOfTextarea,
}: Partial<typeof initialData> = initialData): HTMLElement {
    initialData = {
        ...initialData,
        title: title || initialData.title,
        caption: caption || initialData.caption,
        insteadOfTextarea: insteadOfTextarea || initialData.insteadOfTextarea,
    }

    const element = document.createElement("form")
    element.classList.add("feedback__body")

    const titleEl = createElement("feedback__title", initialData.title),
        captionEl = createElement("feedback__caption", initialData.caption)

    element.append(titleEl)
    element.append(captionEl)

    const name = createInput("Имя", "name"),
        email = createInput("E-mail", "email"),
        phone = createInput("", "phone")

    IMask(phone, { mask: "+{7}(000)000-00-00", lazy: false })

    //--- TEXTAREA ---

    let textarea: HTMLTextAreaElement | HTMLHeadingElement = document.createElement("textarea")
    if (!insteadOfTextarea) {
        textarea.placeholder = initialData.textarea.text
        textarea.classList.add("feedback__input")
        textarea.cols = initialData.textarea.cols
        textarea.rows = initialData.textarea.rows
    } else {
        textarea = document.createElement("h3")
        textarea.innerHTML = initialData.insteadOfTextarea || ""
    }

    //---

    const agree = createElement("feedback__agree", ""),
        check = createInput("", "agree", "feedback__agree-check", "checkbox"),
        agreeCaption = createElement("feedback__agree-caption", initialData.agreeCaption)

    agree.append(check, agreeCaption)

    const submitEl = createInput("", "submit", "feedback__submit", "submit")
    submitEl.value = initialData.submit
    submitEl.disabled = true

    const errorElement = createElement("feedback__error", "")

    element.append(name, email, phone, textarea, agree, errorElement, submitEl)

    check.addEventListener("click", () => {
        submitEl.disabled = !check.checked
    })

    const schema = z.object({
        name: z.literal(true, { errorMap: () => ({ message: "Вы забыли указать имя" }) }),
        email: z.string().email("введите корректный email"),
    })

    submitEl.addEventListener("click", async (event: Event) => {
        event.preventDefault()

        try {
            schema.parse({
                name: !!name.value,
                email: email.value,
            })

            const res = await fetch("/mail.php", {
                method: "POST",
                body: new FormData(element),
            })

            if (res.ok) {
                element.innerHTML = initialData.success
                setTimeout(() => {
                    element.dispatchEvent(new CustomEvent("close"))
                }, initialData.timeoutBeforeClose)
            } else {
                element.innerHTML = initialData.unsuccess
                setTimeout(() => {
                    element.dispatchEvent(new CustomEvent("close"))
                }, initialData.timeoutBeforeClose)
            }
        } catch (error) {
            const fail = error as ZodError
            console.log(fail)
            errorElement.innerText = fail.errors.map(e => e.message).join(", ")
        }
    })

    return element
}
