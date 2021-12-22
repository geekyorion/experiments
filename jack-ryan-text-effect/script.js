let textEle, btnEle, textWrapper;
const animationTime = 3000;     // in CSS

const syncTimeout = (time = 500) => {
    const endTime = new Date().getTime() + time;
    while (new Date().getTime() < endTime) { };
}

const generateRandom = (limit = 10, start = 0, precision = 1000) => {
    return start + ~~(Math.random() * precision) % limit;
}

const prepareRandomNumbers = (text) => {
    const bufferRandomNumbers = 10;
    const minimumRandomNumbers = 100;
    const randomNumberArray = new Array(text.length)
        .fill(0)
        .map((_, index) => new Array(minimumRandomNumbers + index * bufferRandomNumbers).fill(0).map(_$ => generateRandom()));
    for (let index in randomNumberArray) {
        randomNumberArray[index].push(text[index]);
    }
    return randomNumberArray;
}

const createElement = (id) => {
    const element = document.createElement('span');
    element.setAttribute('id', id);
    return element;
}

const startAnimation = () => {
    const textContent = textEle.textContent;
    textEle.innerHTML = null;

    const elements = [];
    for (let index in textContent) {
        const element = createElement(`pos-${index}`);
        textEle.appendChild(element);
        elements.push(element);
    }

    const randomNumberArray = prepareRandomNumbers(textContent);
    const textLength = textContent.length;

    let count = randomNumberArray[textLength - 1].length * textLength;

    const setText = (element, text) => {
        element.innerText = text;
        syncTimeout(~~(animationTime / count));
    };

    textWrapper.classList.add('start-animation');
    while (randomNumberArray[textLength - 1].length !== 0) {
        for (let index in elements) {
            const char = randomNumberArray[index].shift() || textContent[index];
            setTimeout(() => {
                setText(elements[index], char);
            });
        }
    }
};

window.onload = () => {
    textEle = document.getElementById('main-text');
    // textEle.style.width = `${textEle.offsetWidth + 50}px`;
    btnEle = document.getElementById('start-btn');
    textWrapper = document.getElementById('text-wrapper');

    btnEle.addEventListener('click', () => {
        btnEle.disabled = true;
        startAnimation();

        setTimeout(() => {
            btnEle.disabled = false;
            textWrapper.classList.remove('start-animation');
        }, animationTime);
    });
}
