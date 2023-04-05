export default function gallery() {
    const thumbnails = document.querySelectorAll<HTMLElement>(".gallery__thumbnail");
    const main = document.querySelector<HTMLImageElement>(".gallery__main > img");
    if (!main) throw Error("there isn't .gallery__main > img");

    const thumbnailsClear = () => {
        thumbnails && thumbnails.forEach(thumbnail => thumbnail.removeAttribute("active"));
    };

    const changeMain = (src: string) => {
        const handletransitoinEnd = () => {
            main.src = src;
            main.parentElement!.removeAttribute("hide");
            main.parentElement!.removeEventListener("transitionend", handletransitoinEnd);
        };
        main.parentElement!.addEventListener("transitionend", handletransitoinEnd);
        main.parentElement!.setAttribute("hide", "hide");
        // main.parentElement!.style.opacity = "1";
    };

    thumbnails &&
        thumbnails.forEach(thumbnail =>
            thumbnail.addEventListener("click", () => {
                thumbnailsClear();
                const src = (thumbnail.children[0] as HTMLImageElement).src;
                thumbnail.setAttribute("active", "active");
                changeMain(src);
            }),
        );
}
