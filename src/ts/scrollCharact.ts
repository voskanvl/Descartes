export default function scrollCharact(button: HTMLElement | null, list: HTMLElement | null) {
    if (!list) return;

    let interval: NodeJS.Timer | null = null;

    button &&
        button.addEventListener("mousedown", () => {
            interval = setInterval(() => {
                list && (list.scrollTop += 10);
            }, 100);
            if (list.scrollTop >= list.scrollHeight - list.clientHeight) {
                interval && clearInterval(interval);
                interval = null;
            }
        });
    button &&
        button.addEventListener("mouseup", () => {
            interval && clearInterval(interval);
        });
}
