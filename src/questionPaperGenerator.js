/**
 * Generates a random set of questions based on difficulty level and distribution.
 *
 * @param {Array} questions - The array of available questions.
 * @param {string} difficultyLevel - The difficulty level for the questions (e.g., 'Easy', 'Medium', 'Hard').
 * @param {Object} difficultyDistribution - The distribution of difficulty levels.
 * @param {number} totalMarks - The total marks for the question paper.
 * @returns {Array} An array of randomly selected questions based on the specified difficulty level and distribution.
 */
function getQuestions(questions, difficultyLevel, difficultyDistribution, totalMarks) {
    let requiredMarks = difficultyDistribution * totalMarks;

    let paper = [];
    // filters out questions on difficulty
    const filteredQuestions = questions.filter((q) => q.difficulty === difficultyLevel);

    // handles case where no questions are available for paritcular difficulty
    if (filteredQuestions.length === 0) {
        console.log(`No questions found for difficulty level: ${difficultyLevel}`);
        return [];
    }

    // shuffle array using Fisher-Yates shuffle algorithm 
    for (let i = filteredQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]];
    }

    let currentMarks = 0;
    for (const filteredQuestion of filteredQuestions) {
        if (currentMarks + filteredQuestion.marks <= requiredMarks) {
            paper.push(filteredQuestion);
            currentMarks += filteredQuestion.marks;
        }
        else {
            break;
        }
    }

    if (currentMarks < requiredMarks) {
        console.log(`Difficulty: ${difficultyLevel} Marks expected: ${requiredMarks} but Marks generated: ${currentMarks}`)
        return [];
    }

    return paper;
}


/**
 * Generates a question paper based on total marks and difficulty distribution.
 *
 * @param {number} totalMarks - The total marks for the question paper.
 * @param {Object} difficultyDistribution - The distribution of difficulty levels.
 * @returns {Array|null} An array of selected questions for the question paper or null if the distribution is invalid.
 */

function questionPaperGenerator(totalMarks, difficultyDistribution) {

    const questionsHandle = require('./questionStore');
    const questions = questionsHandle.getAllQuestions();

    // Handle edge case
    if (questions.length === 0 || questions === undefined) {
        console.log("No questions found or some errors occurred");
        return [];
    }

    /**
     * @type {Array}
     * 
     */
    let questionPaper = [...getQuestions(questions, 'Easy', difficultyDistribution.easy, totalMarks), ...getQuestions(questions, 'Medium', difficultyDistribution.medium, totalMarks), ...getQuestions(questions, 'Hard', difficultyDistribution.hard, totalMarks)];
    
    // cross checking 
    if (questionPaper.reduce((acc, q) => acc + q.marks, 0) < totalMarks) {
        console.log("Invalid distribution according to marks or Insufficient questions to meet the desired distribution.");
        return null;
    }
    return questionPaper;
}

module.exports = { questionPaperGenerator };