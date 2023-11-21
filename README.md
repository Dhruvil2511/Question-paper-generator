# Question Paper Generator

## Assignment Brief

Design and implement a Question Paper Generator application that stores and generates question papers based on specified criteria.

### Question Attributes

A question in the application has the following attributes:

- Question
- Subject
- Topic
- Difficulty
- Marks

Example:
```json
{ "question": "What is the speed of light", "subject": "Physics", "topic": "Waves", "difficulty": "Easy", "marks": 5 }
```

Assume the below requirement for a question paper:

> (100 marks, Difficulty, {20% Easy, 50% Medium, 30% Hard })
> 

The problem statement here is that you need to generate a question paper of 100 marks total of which 20% (ie, 20 marks) worth of questions should have the *Difficulty*=Easy, 50% having *Difficulty*=Medium and 30% having *Difficulty*=Hard


## Getting Started with Solution
Questions are stored inside data directory in .json format
Marks according to difficulty
- Easy : 5 marks
- Medium : 10 marks
- Hard : 15 marks
### Inside src
Three files inside src
- app.js -> mainpoint of app
- questionStore.js module -> Retrieves and parses questions from a data file.
- questionPaperGenerator.js module -> Generates a random set of questions based on difficulty level and distribution.

### Prerequisites

- Node.js installed
- NPM (Node Package Manager) installed

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/question-paper-generator.git
2. Install dependencies:

   ```bash
   npm i

3. Run the server:

   ```bash
   npm app.js

### PORT : 3000

# Testing on POSTMAN
### Install Postman

- Open Postman and create Workspace.
- Create a new POST request and just paste ```http://localhost:3000/generate.``` "
- Inside "Body" tab, select "raw," and choose the "JSON (application/json)" option.

- Body should have following json format:
```json
{
    "totalMarks": 100,
    "difficultyDistribution": {
        "easy": 0.2,
        "medium": 0.5,
        "hard": 0.3
    }
}
```
