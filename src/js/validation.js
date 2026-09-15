import {findCategory} from "./statistics.js";
function prepareInput(name) {
    return name.trim();
}

function checkScore(number) {
    let errorMessage = '';
    if(number === ''){
        errorMessage += 'Количество баллов не может быть пустым';
    } else {
        const numberValue = Number(number);
        if(!Number.isInteger(numberValue)) {
            errorMessage += 'Число должно быть целым;';
        }  
        if (numberValue < 0) {
            errorMessage += 'Число должно быть больше или равно 0';
        }
        if (numberValue > 100) {
            errorMessage += 'Число должно быть меньше или равно 100';
        }
    }
    return errorMessage;
}

function checkName(name, results) {
    let errorMessage = '';
    if (name.length === 0) {
        errorMessage += 'Название категории не может быть пустым';
    } else if (findCategory(results, name) !== undefined) {
        errorMessage += 'Такая категория уже существует';
    }
    return errorMessage;
}

function checkPath(name) {
    let errorMessage = '';
    if (name.length === 0) {
        errorMessage += 'Путь до иконки не может быть пустым';
    } 
    return errorMessage;
}

function validateData(data, results) {
    const value = prepareInput(data.value);
    if (data.name === 'score') {
        const scoreError = checkScore(value);
        const scoreElement = document.querySelector('.popup__score');
        const scoreErrorText = document.querySelector('#score-error');
        if (scoreError.length > 0) {
            scoreErrorText.hidden = false;
            scoreErrorText.textContent = 'Ошибка: ' + scoreError;
            scoreElement.setCustomValidity('check');
        } else {
            scoreErrorText.hidden = true;
            scoreErrorText.textContent = '';
            scoreElement.setCustomValidity('');
        }
    } else if (data.name === 'category') {
        const categoryError = checkName(value.toLowerCase(), results);
        const categoryElement = document.querySelector('.popup__category');
        const categoryErrorText = document.querySelector('#category-error');
        if (categoryError.length > 0) {
            categoryErrorText.hidden = false;
            categoryErrorText.textContent = 'Ошибка: ' + categoryError;
            categoryElement.setCustomValidity('check');
        } else {
            categoryErrorText.hidden = true;
            categoryErrorText.textContent = '';
            categoryElement.setCustomValidity('');
        }
    } else {
        const iconError = checkPath(value);
        const iconElement = document.querySelector('.popup__icon');
        const iconErrorText = document.querySelector('#icon-error');
        if (iconError.length > 0) {
            iconErrorText.hidden = false;
            iconErrorText.textContent = 'Ошибка: ' + iconError;
            iconElement.setCustomValidity('check');
        } else {
            iconErrorText.hidden = true;
            iconErrorText.textContent = '';
            iconElement.setCustomValidity('');
        }
    }
}
export {validateData};