function getStatistics(results) {
    if (results.length === 0) {
                return null;
    }
    const average = Math.round(results.reduce((sum, el) => {return sum + el.score;}, 0)/results.length);
    const best = results.reduce((max, el) => {return max.score > el.score?max:el});
    const worst = results.reduce((min, el) => {return min.score < el.score?min:el});
    return {average: average, best: best, worst: worst};
}
function getPassedCategories(results, minScore) {
    return results.filter(el => {return el.score >= minScore;}).map(el => {return el.category});
}

function findCategory(results, categoryName) {
    const category = categoryName.toLowerCase().trim();
    return results.find(el => {
        return category === el.category.toLowerCase();
    });
}

function createSummary(results) {
    const statistic = getStatistics(results);
    if (statistic === null) {
                return 'No results available.';
            }
    const {average, best, worst} = statistic;
    return `Your average score is ${average}. Your strongest category is ${best.category}, and your weakest category is ${worst.category}.`;
}

function capitalize(str) {
    return str.at(0).toUpperCase() + str.slice(1);
}
export {getStatistics, getPassedCategories, findCategory, capitalize};