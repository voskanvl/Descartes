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
            breakpoints: {
                560: {
                    perPage: 1,
                },
            },
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

    const partners: OptionSlide = {
        elementName: "#partners",
        elementElement: document.querySelector("#partners")! as HTMLElement,
        options: {
            type: "loop",
            arrows: false,
            perPage: 6,
            perMove: 1,
            pagination: false,
            breakpoints: {
                1880: {
                    perPage: 5,
                },
                1440: {
                    perPage: 4,
                },
                1130: {
                    perPage: 3,
                },
                842: {
                    perPage: 2,
                },
                560: {
                    perPage: 1,
                    focus: "center",
                },
            },
        },
        controls: {
            left: document.querySelector<HTMLElement>(".partners__slider-button--left")!,
            right: document.querySelector<HTMLElement>(".partners__slider-button--right")!,
        },
    };
    const specificity: OptionSlide = {
        elementName: "#specificity",
        elementElement: document.querySelector("#specificity")! as HTMLElement,
        options: {
            type: "loop",
            arrows: false,
            perPage: 1,
            perMove: 1,
            pagination: false,
        },
        controls: {
            left: document.querySelector<HTMLElement>(".specificity__control--left")!,
            right: document.querySelector<HTMLElement>(".specificity__control--right")!,
        },
    };

    const news: OptionSlide = {
        elementName: "#news",
        elementElement: document.querySelector<HTMLElement>("#news")!,
        options: {
            type: "loop",
            arrows: false,
            perPage: 1,
            perMove: 1,
            pagination: false,
        },
        controls: {
            left: document.querySelector<HTMLElement>(
                ".slider-controls__button--left.about-news__button",
            )!,
            right: document.querySelector<HTMLElement>(
                ".slider-controls__button--right.about-news__button",
            )!,
        },
    };

    const newsSmall: OptionSlide = {
        elementName: "#news-small",
        elementElement: document.querySelector<HTMLElement>("#news-small")!,
        options: {
            type: "loop",
            arrows: false,
            perPage: 1,
            perMove: 1,
            pagination: false,
        },
        controls: {
            left: document.querySelector<HTMLElement>(
                ".slider-controls__button--left.about-news__button",
            )!,
            right: document.querySelector<HTMLElement>(
                ".slider-controls__button--right.about-news__button",
            )!,
        },
    };
    const popular: OptionSlide = {
        elementName: "#popular",
        elementElement: document.querySelector<HTMLElement>("#popular")!,
        options: {
            type: "loop",
            arrows: false,
            perPage: 3,
            perMove: 1,
            pagination: false,
            breakpoints: {
                768: {
                    perPage: 2,
                },
                500: {
                    perPage: 1,
                },
            },
        },
        controls: {
            left: document.querySelector<HTMLElement>(
                ".slider-controls__button--left.popular__slider-buttons",
            )!,
            right: document.querySelector<HTMLElement>(
                ".slider-controls__button--right.popular__slider-buttons",
            )!,
        },
    };
    const good: OptionSlide = {
        elementName: "#good",
        elementElement: document.querySelector<HTMLElement>("#good")!,
        options: {
            type: "loop",
            arrows: false,
            perPage: 1,
            perMove: 1,
            pagination: false,
        },
        controls: {
            left: document.querySelector<HTMLElement>(
                ".slider-controls__button--left.good-main-mobile__arrow",
            )!,
            right: document.querySelector<HTMLElement>(
                ".slider-controls__button--right.good-main-mobile__arrow",
            )!,
        },
    };

    return new SlideClass({
        catalog,
        partners,
        specificity,
        news,
        newsSmall,
        popular,
        good,
    });
}
