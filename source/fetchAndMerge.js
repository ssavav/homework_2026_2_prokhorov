/**
 * Функция, которая принимает массив URL-адресов, загружает данные с этих адресов, 
 * и возвращает объединенный объект, содержащий все уникальные ключи из загруженных данных
 * @param {Array<string>} urls - массив URL-адресов
 * 
 * @example
 * // returns {"age": [25, 22],
            "id": [1, 2],
            "name": ["Олег", "Мария"],
            "surname": ["Петров", "Иванова"],
            "status": ["Дуров, верни стену!"]}

 *   const urls = [
 *       'https://vk.example.com/vkid',
 *       'https://mailru.example.com/mailid',
 *   ];
    await fetchAndMergeData(urls)
 * 
 * @returns {Promise<Object>}
 */

async function fetchAndMergeData(urls) {
    const result = {};
    for (let i = 0; i < urls.length; i++) {
        try {
            const response = await fetch(urls[i]);
            
            if (response.ok) {
                const jsonResponse = await response.json()
                for (const key in jsonResponse) {
                    if (!(key in result)) {
                        result[key] = [];
                    }
                    result[key].push(jsonResponse[key])
                }
            } else {
                return {};
            }
        } catch (error) {
            return {};
        }

    }

    return result;
    
}
