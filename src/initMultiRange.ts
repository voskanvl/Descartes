import MultyRange from "./multyRange";

export default function initMultiRange() {
    const filterPrice = document.querySelector<HTMLDivElement>(".filter__price");
    const inputPriceMin = document.querySelector<HTMLInputElement>("input[name='price-min']");
    const inputPriceMax = document.querySelector<HTMLInputElement>("input[name='price-max']");

    const priceMF =
        filterPrice && new MultyRange(filterPrice).connectInputs(inputPriceMin, inputPriceMax);

    const inputLengthMin = document.querySelector<HTMLInputElement>("input[name='length-min']");
    const inputLengthMax = document.querySelector<HTMLInputElement>("input[name='length-max']");
    const filterLength = document.querySelector<HTMLDivElement>(".filter__length");

    const lengthMF =
        filterLength && new MultyRange(filterLength).connectInputs(inputLengthMin, inputLengthMax);

    inputPriceMin &&
        inputPriceMin.addEventListener("input", event => {
            priceMF && (priceMF.valueMin = +(event.target as HTMLInputElement).value);
        });
    inputPriceMax &&
        inputPriceMax.addEventListener("input", event => {
            priceMF && (priceMF.valueMax = +(event.target as HTMLInputElement).value);
        });

    inputLengthMin &&
        inputLengthMin.addEventListener("input", event => {
            lengthMF && (lengthMF.valueMin = +(event.target as HTMLInputElement).value);
        });
    inputLengthMax &&
        inputLengthMax.addEventListener("input", event => {
            lengthMF && (lengthMF.valueMax = +(event.target as HTMLInputElement).value);
        });
}
