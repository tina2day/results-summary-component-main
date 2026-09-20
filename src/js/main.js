import { startLoading } from "./api.js";
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
const popupFieldset = popup.querySelectorAll(".popup__fieldset");
const loadTextElement = popup.querySelector(".popup__error-load");
const buttonReverse = popup.querySelector(".popup__button-try");
const errorTextElement = popup.querySelector(".popup__error-text");

let results = null;
let statistic = [];
let averageScoreValue = 0;
let isFiltred = false;
let currentId = 5;
function countResult(results) {
    if (results !== null) {
        statistic = getStatistics(results);
        averageScoreValue = statistic === null? 0: statistic.average;
        isFiltred = false;

        renderResults(results, summaryList);
        renderAverageScore(results, averageScore);
    }
}

popup.addEventListener('cancel', (e) => {
        e.preventDefault();
        console.log('мяу');
    });

    popup.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        e.preventDefault();
    }
    });

popup.showModal();
summaryList.addEventListener('click', (e) => {
    if(e.target.closest('.analysis__button-delete') !== null) {
        const id = Number(e.target.closest('.analysis__button-delete').dataset.id);
        results = results.filter((result) => {
            if(id === result.id) {
                return false;
            }
            return true;
        });
        statistic = getStatistics(results);
        averageScoreValue = statistic === null? 0: statistic.average;
        renderAverageScore(results, averageScore);
        if(results.length === 0) {
            isFiltred = false;
            renderResults(results, summaryList);
        } else {
            if (isFiltred === true) {
            const passedCategoriesResults = results.filter((el) => {return el.score >= averageScoreValue});
            renderResults(passedCategoriesResults, summaryList);
        } else {
            renderResults(results, summaryList);
        }
        }
    }
});
buttonReverse.addEventListener('click', async() => {
    buttonReverse.disabled = true;
    buttonReverse.hidden = true;
    errorTextElement.hidden = true;
    loadTextElement.hidden = false;
    loadTextElement.classList.add('is-active');
    results = await startLoading(popupFieldset, loadTextElement, buttonReverse, errorTextElement, false);
    countResult(results);
});
results = await startLoading(popupFieldset, loadTextElement, buttonReverse, errorTextElement, true);
countResult(results);
buttonContinue.addEventListener('click', () => {
    
    if (isFiltred === false) {
        const passedCategoriesResults = results.filter((el) => {return el.score >= averageScoreValue});
        renderResults(passedCategoriesResults, summaryList);
        buttonContinue.textContent = 'Show all';
        isFiltred = true;
    } else {
        renderResults(results, summaryList);
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
            results = [...results, {id: currentId, category, score, icon}];
            statistic = getStatistics(results);
            averageScoreValue = statistic === null? 0: statistic.average;
            renderResults(results, summaryList);
            renderAverageScore(results, averageScore);
            categoryInputElement.value = '';
            scoreInputElement.value = '';
            iconInputElement.value = '';
            popup.close();
            page.hidden = false;
            currentId += 1;
            buttonContinue.disabled = false;
        } else {
            alert('Проверьте введённые данные');
        }
        
    });