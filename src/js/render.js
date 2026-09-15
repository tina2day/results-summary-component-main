import { getStatistics } from "./statistics.js";
function makeClass(str) {
    const classArray = str.split(' ');
    let resultString = '';
    classArray.forEach((word, index) => {
        if(index !== 0) {
            resultString += '-' + word;
        } else {
            resultString += word;
        }
    });
    return resultString;
}

function createResultElement(result) {
    const {category, score, icon} = result;

    const analysisElement = document.createElement('div');
    const imageElement = document.createElement('img');
    const analysisCategoryElement = document.createElement('h3');
    const analysisScoreElement = document.createElement('p');
    const analysisMaxScoreElement = document.createElement('span');

    analysisElement.classList.add("analysis__item");
    analysisElement.classList.add(`analysis__item_${makeClass(category.toLowerCase())}`);
    imageElement.classList.add("analysis__icon");
    analysisCategoryElement.classList.add("analysis__category");
    analysisScoreElement.classList.add("analysis__score");

    analysisCategoryElement.textContent = category;
    analysisScoreElement.textContent = score;
    imageElement.src = icon;
    imageElement.alt = `Иконка категории ${category}`;
    analysisMaxScoreElement.textContent = ' / 100';

    analysisElement.append(imageElement);
    analysisElement.append(analysisCategoryElement);
    analysisElement.append(analysisScoreElement);
    analysisScoreElement.append(analysisMaxScoreElement);
    return analysisElement;
}

function renderResults(results, container) {
    container.replaceChildren();
    if (results.length === 0) {
        const messageElement = document.createElement('p');
        messageElement.textContent = 'No results available.';
        container.append(messageElement);
        return;
    }
    const elements = results.map((el) => {
        const result = createResultElement(el);
        return result;
    });
    container.append(...elements);
}

function renderAverageScore(results, scoreElement) {
    const statistic = getStatistics(results);
    scoreElement.textContent = statistic !== null?statistic.average:0;
}
export {createResultElement, renderResults, renderAverageScore};