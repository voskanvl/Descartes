import MultyRange from "./multyRange";

export default function initMultiRange() {
    const filterPrice = document.querySelector<HTMLDivElement>(".filter__price");
    const inputPriceMin = document.querySelector<HTMLInputElement>("input[name='price-min']");
    const inputPriceMax = document.querySelector<HTMLInputElement>("input[name='price-max']");

    filterPrice && new MultyRange(filterPrice).connectInputs(inputPriceMin, inputPriceMax);

    const inputLengthMin = document.querySelector<HTMLInputElement>("input[name='length-min']");
    const inputLengthMax = document.querySelector<HTMLInputElement>("input[name='length-max']");
    const filterLength = document.querySelector<HTMLDivElement>(".filter__length");

    filterLength && new MultyRange(filterLength).connectInputs(inputLengthMin, inputLengthMax);
}
