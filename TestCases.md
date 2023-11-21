# Test Cases

## TEST CASE 1: Default Distribution 
Verify that the question paper generator produces a valid question paper with the default distribution.

### Input:
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
## TEST CASE 2: Changes in distribution
Verify that the question paper generator produces a valid question paper with a modified distribution.

### Input:
```json
{
    "totalMarks": 100,
    "difficultyDistribution": {
        "easy": 0.2,
        "medium": 0.2,
        "hard": 0.6
    }
}
```

## TEST CASE 3  : Changes in total marks 
Verify that the question paper generator handles changes in the total marks appropriately.

### Input:
```json
{
    "totalMarks": 200,
    "difficultyDistribution": {
        "easy": 0.2,
        "medium": 0.5,
        "hard": 0.3
    }
}
```
## TEST CASE 4  : Handling scenario where hard questions exceed maximum allowed marks
Given a test configuration with a total of 100 marks,and a difficulty distribution specifying that 40% of the marks should be allocated to hard questions,
ensure that the system handles the case where hard questions have 15 marks each, making it impossible to achieve 40 marks.
### Input:
```json
{
    "totalMarks": 100,
    "difficultyDistribution": {
        "easy": 0.2,
        "medium": 0.4,
        "hard": 0.4
    }
}
```
