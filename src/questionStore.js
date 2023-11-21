const fs = require('fs');
const path = require('path');


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
