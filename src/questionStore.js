const fs = require('fs');
const path = require('path');

/**
 * Retrieves and parses questions from a data file.
 *
 * @returns {Array} An array of questions.
 * @throws {Error} If there's an error reading or parsing the data file.
 */
function getAllQuestions() {
    const dataFilePath = path.join(__dirname, '../data/questions.json');
    try {
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading sampleQuestions.json:', error.message);
        return [];
    }
}

module.exports = {
    getAllQuestions,
};