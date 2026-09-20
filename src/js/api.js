async function loadResults(url, isError) {
    try {
        const response = await fetch(url);
        if(response.ok) {
            const result = await response.json();
            if(isError){
                throw new Error(`Ваш запрос тестовая ошибка хихихи`);
            }
            return result;
            
     } else {
        throw new Error(`Ваш запрос завершился с кодом ${response.status}`);
    }
    }  catch(err) {
        console.log(err.message);
        throw err;
    }
    
}
export async function startLoading(fieldsets, loadTextElement, buttonReverse, errTextElement, isError) {
    try {
        const result = await loadResults('./src/data/results.json', isError);
        await new Promise(resolve => setTimeout(resolve, 10000));
        loadTextElement.classList.remove("is-active");
        buttonReverse.hidden = true;
        loadTextElement.hidden = true;
        fieldsets[1].hidden = true;
        fieldsets[0].hidden = false;
        
        return result;
    } catch (err) {
        console.log(err);
        await new Promise(resolve => setTimeout(resolve, 10000));
        loadTextElement.classList.remove("is-active");
        loadTextElement.hidden = true;
        buttonReverse.hidden = false;
        errTextElement.hidden = false;
        errTextElement.textContent = `Ошибка: ${err.message}`;
        buttonReverse.disabled = false;
        return null;
    }
}