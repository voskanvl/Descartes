import MultyRange from "./multyRange";

function createMultiRange({
    inputMin,
    inputMax,
    root,
}: {
    inputMin: HTMLInputElement | null;
    inputMax: HTMLInputElement | null;
    root: HTMLElement | null;
}) {
    const initMin = (inputMin && +inputMin.value) || 0;
    const initMax = (inputMax && +inputMax.value) || 100;
    const width = initMax - initMin;

    const multyrange = root && new MultyRange(root);
    multyrange &&
        multyrange.subscribe((min, max) => {
            inputMin && (inputMin.value = String((initMin + (min / 100) * width) | 0));
            inputMax && (inputMax.value = String((initMin + (max / 100) * width) | 0));
        });
}

export default function initMultiRange() {
    const filterPrice = document.querySelector<HTMLDivElement>(".filter__price");
    const inputPriceMin = document.querySelector<HTMLInputElement>("input[name='price-min']");
    const inputPriceMax = document.querySelector<HTMLInputElement>("input[name='price-max']");
    createMultiRange({
        inputMin: inputPriceMin,
        inputMax: inputPriceMax,
        root: filterPrice,
    });

    const inputLengthMin = document.querySelector<HTMLInputElement>("input[name='length-min']");
    const inputLengthMax = document.querySelector<HTMLInputElement>("input[name='length-max']");
    const filterLength = document.querySelector<HTMLDivElement>(".filter__length");
    createMultiRange({
        inputMin: inputLengthMin,
        inputMax: inputLengthMax,
        root: filterLength,
    });
}
