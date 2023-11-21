
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const generator = require('./questionPaperGenerator');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// const totalMarks = 100;
// const difficultyDistribution = {
//     easy: 0.2,
//     medium: 0.5,
//     hard: 0.3
// };

app.post('/generate', async (req, res) => {
    const { totalMarks, difficultyDistribution } = req.body;

    if (!totalMarks || !difficultyDistribution) {
        return res.status(400).json({ success: false, message: 'Please enter marks and distribution!' });
    }

    const questionPaper = await generator.questionPaperGenerator(totalMarks, difficultyDistribution);
    
    if (!questionPaper || questionPaper.length === 0) return res.status(400).json({ success: false, message: 'Error generating question paper!' });

    res.json({ success: true, questionPaper });

});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


