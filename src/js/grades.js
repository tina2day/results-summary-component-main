function addGrades(results) {
        return results.map(el => {
            if (results.length === 0) {
                return null;
            }
        const newItem = {...el};
        if (el.score >= 80) {
            newItem.grade = 'excellent';
            
        }else if (el.score >= 70) {
            newItem.grade = 'good';
           
        } else if (el.score >= 60) {
            newItem.grade = 'normal';
           
        } else {
            newItem.grade = 'low';
            
        }
        return newItem;
    })
}
export {addGrades};