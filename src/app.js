
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const generator = require('./questionPaperGenerator');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// TEST CASE 1: Default distribution 
// Verify that the question paper generator produces a valid question paper with the default distribution.
// Input:
// {
//     "totalMarks": 100,
//     "difficultyDistribution": {
//         "easy": 0.2,
//         "medium": 0.5,
//         "hard": 0.3
//     }
// }

// TEST CASE 2: Changes in distribution
// Verify that the question paper generator produces a valid question paper with a modified distribution.
// Input:
// {
//     "totalMarks": 100,
//     "difficultyDistribution": {
//         "easy": 0.2,
//         "medium": 0.2,
//         "hard": 0.6
//     }
// }

// TEST CASE 3: Changes in total marks 
// Verify that the question paper generator handles changes in the total marks appropriately.
// Input:
// {
//     "totalMarks": 200,
//     "difficultyDistribution": {
//         "easy": 0.2,
//         "medium": 0.5,
//         "hard": 0.3
//     }
// }

// TEST CASE 4: Handling scenario where hard questions exceed maximum allowed marks
// Given a test configuration with a total of 100 marks,
// and a difficulty distribution specifying that 40% of the marks should be allocated to hard questions,
// ensure that the system handles the case where hard questions have 15 marks each, making it impossible to achieve 40 marks.
// Input:
// {
//     "totalMarks": 100,
//     "difficultyDistribution": {
//         "easy": 0.2,
//         "medium": 0.4,
//         "hard": 0.4
//     }
// }


app.post('/generate', async (req, res) => {
    const { totalMarks, difficultyDistribution } = req.body;

    if (!totalMarks || !difficultyDistribution) {
        return res.status(400).json({ success: false, message: 'Please enter marks and distribution!' });
    }
    if (difficultyDistribution.easy + difficultyDistribution.medium + difficultyDistribution.hard !== 1) {
        return res.status(400).json({ success: false, message: "Invalid difficulty distribution. The sum of percentages must be 1." });
    }

    const questionPaper = await generator.questionPaperGenerator(totalMarks, difficultyDistribution);

    if (questionPaper === null) return res.status(400).json({ success: false, message: 'Invalid distribution according to marks or Insufficient questions to meet the desired distribution.' });
    if (questionPaper.length === 0) return res.status(400).json({ success: false, message: 'No questions found or some errors occurred' });

   // console.log('Question paper: ');
   // console.log(questionPaper);
    res.json({ success: true, questionPaper });

});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


