import { OptionSlide, SlideClass } from "./classSlides";
export default function slides() {
    const catalog: OptionSlide = {
        elementName: "#catalog",
        elementElement: document.querySelector("#catalog")! as HTMLElement,
        options: {
            type: "loop",
            arrows: false,
            perPage: 2,
            pagination: false,
        },
        controls: {
            left: document.querySelector<HTMLElement>(
                ".catalog__slider .slider-controls__button.slider-controls__button--left",
            )!,
            right: document.querySelector<HTMLElement>(
                ".catalog__slider .slider-controls__button.slider-controls__button--right",
            )!,
        },
    };

    return new SlideClass({
        catalog,
    });
}
