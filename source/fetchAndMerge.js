'use strict';

/**
 * Функция, которая принимает массив URL-адресов, загружает данные с этих адресов, 
 * и возвращает объединенный объект, содержащий все уникальные ключи из загруженных данных.
 * При одном неуспещном запросе функция возвращает пустой объект.
 * @param {Array<string>} urls - массив URL-адресов
 * 
 * @example
 * // returns {"age": [25, 22],
 *             "id": [1, 2],
 *             "name": ["Олег", "Мария"],
 *             "surname": ["Петров", "Иванова"],
 *             "status": ["Дуров, верни стену!"]}
 *   
 * const urls = [
 *       'https://vk.example.com/vkid',
 *       'https://mailru.example.com/mailid',
 *   ];
 * await fetchAndMergeData(urls)
 * 
 * @returns {Promise<Object>}
 */
const fetchAndMergeData = async (urls) => {
    if (!Array.isArray(urls) || !urls.every(url => typeof url === "string")) {
        return {};
    }

    const result = {};

    try {
        const responses = await Promise.all(
            urls.map(url => fetch(url))
        );

        if (responses.some(response => !response.ok)) {
            return {};
        }

        const jsonResponses = await Promise.all(
            responses.map(response => response.json())
        );

        jsonResponses.forEach(jsonResponse => {
            Object.entries(jsonResponse).forEach(([key, value]) => {
                if (!Object.hasOwn(result, key)) {
                    result[key] = new Set();
                }

                result[key].add(value);
            });
        });
    } catch (error) {
        return {};
    }

    Object.entries(result).forEach(([key, values]) => {
        result[key] = Array.from(values);
    });

    return result;
}
