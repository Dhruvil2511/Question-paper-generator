function getQuestions(questions, difficultyLevel, difficultyDistribution,totalMarks) {
    let requiredMarks = difficultyDistribution * totalMarks;

    let paper = [];
    const filteredQuestions = questions.filter((q) => q.difficulty === difficultyLevel);

    if (filteredQuestions.length === 0) {
        console.log(`No questions found for difficulty level: ${difficultyLevel}`);
        return [];
    }

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

    return paper;
}
function questionPaperGenerator(totalMarks, difficultyDistribution) {

    const questionsHandle = require('./questionStore');
    const questions = questionsHandle.getAllQuestions();

    if (questions.length === 0 || questions === undefined) {
        console.log("No questions found or some errors occurred");
        return [];
    }
 
    let questionPaper = [...getQuestions(questions, 'Easy', difficultyDistribution.easy,totalMarks), ...getQuestions(questions, 'Medium', difficultyDistribution.medium,totalMarks), ...getQuestions(questions, 'Hard', difficultyDistribution.hard,totalMarks)];

    if (questionPaper.reduce((acc, q) => acc + q.marks, 0) < totalMarks) {
        console.log("Insufficient questions to meet the desired distribution.");
        return [];
    }
    return questionPaper;
}

module.exports = { questionPaperGenerator };