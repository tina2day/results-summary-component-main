import { results } from "./data.js";
import { validateData } from "./validation.js";
import { renderResults, renderAverageScore }  from "./render.js";
import { getStatistics, capitalize } from "./statistics.js";

const page = document.querySelector('.page');
const popup = document.querySelector('.popup');
const categoryInputElement = popup.querySelector('.popup__category');
const scoreInputElement = popup.querySelector('.popup__score');
const iconInputElement = popup.querySelector('.popup__icon');
const buttonAdd = popup.querySelector('.popup__button-add');
const summaryList = document.querySelector('#analysis');
const averageScore = document.querySelector('#average-score');
const buttonContinue = document.querySelector('.summary__button');
let statistic = getStatistics(results);
let averageScoreValue = statistic === null? 0: statistic.average;
let resultsNew = [];
let isFiltred = false;

popup.showModal();
renderResults(results, summaryList);
renderAverageScore(results, averageScore);
buttonContinue.addEventListener('click', () => {
    
    if (isFiltred === false) {
        const passedCategoriesResults = resultsNew.filter((el) => {return el.score >= averageScoreValue});
        renderResults(passedCategoriesResults, summaryList);
        buttonContinue.textContent = 'Show all';
        isFiltred = true;
    } else {
        renderResults(resultsNew, summaryList);
        buttonContinue.textContent = 'Continue';
        isFiltred = false;
    }
});
categoryInputElement.addEventListener('input', (e) => {
    validateData({
        name: 'category', 
        value: `${e.target.value}`,
    }, results);
    buttonAdd.disabled = !document.forms.popup.checkValidity();
});

scoreInputElement.addEventListener('input', (e) => {
    validateData({
        name: 'score', 
        value: `${e.target.value}`,
    }, results);
    buttonAdd.disabled = !document.forms.popup.checkValidity();
});

iconInputElement.addEventListener('input', (e) => {
    validateData({
        name: 'icon', 
        value: `${e.target.value}`,
    }, results);
    buttonAdd.disabled = !document.forms.popup.checkValidity();
});

popup.addEventListener('cancel', (e) => {
    e.preventDefault();
    console.log('мяу');
});

popup.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
  }
});

popup.addEventListener('submit', (e) => {
    e.preventDefault();
    validateData({
        name: 'category', 
        value: `${categoryInputElement.value}`,
    }, results);
    validateData({
        name: 'score', 
        value: `${scoreInputElement.value}`,
    }, results);
    validateData({
        name: 'icon', 
        value: `${iconInputElement.value}`,
    }, results);
    if(document.forms.popup.checkValidity()) {
        const category = capitalize(categoryInputElement.value.trim());
        const score = Number(scoreInputElement.value);
        const icon = iconInputElement.value.trim();
        resultsNew = [...results, {category, score, icon}];
        statistic = getStatistics(resultsNew);
        averageScoreValue = statistic === null? 0: statistic.average;
        renderResults(resultsNew, summaryList);
        renderAverageScore(resultsNew, averageScore);
        categoryInputElement.value = '';
        scoreInputElement.value = '';
        iconInputElement.value = '';
        popup.close();
        page.hidden = false;
    } else {
        alert('Проверьте введённые данные');
    }
    
});