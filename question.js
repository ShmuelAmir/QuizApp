const MAX_QUESTION = 10;
const CORRECT_SCORE = 10;

let curerntQuestion;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

$(document).ready(() => {
    fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
    .then(res => { 
        return res.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };
    
            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );
    
            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });
    
            return formattedQuestion;
        });
    
        $('.load').hide();
        $('.que-main').show();
        startGame();
    })
    .catch(err => {
        console.error(err);
    });
    
    $('.ans .txt').click((e) => {
        const selectedAnswer = $(e.target);
        const selectedNumber = selectedAnswer.siblings('.num').text();
        
        if (selectedNumber == curerntQuestion['answer']) {
            $(e.target).addClass('correct');
            score += CORRECT_SCORE;
            $('#progress-score').text(score);
        } else {
            $(e.target).addClass('incorrect');
        }
        const classToAdd = (selectedNumber == curerntQuestion['answer']) ? 'correct' : 'incorrect';

        $(e.target).addClass(classToAdd);

        setTimeout(() => {
            $(e.target).removeClass(classToAdd);
            getQuestion();
        }, 1000);
    });
});

function startGame() {
    score = 0;
    questionCounter = 0;
    availableQuestions = [...questions];
    getQuestion();
}

function getQuestion() {
    if (questionCounter >= MAX_QUESTION || availableQuestions.length == 0){
        localStorage.setItem('currentScore', score);
        return window.location.assign('/end.html');
    }

    questionCounter ++;
    $('#progress-question').text(`${questionCounter}/${MAX_QUESTION}`);
    $('.inner-bar').css('width', `${questionCounter/MAX_QUESTION*100}%`);

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    curerntQuestion = availableQuestions[questionIndex];

    $('.que').text(curerntQuestion['question']);
    $('.ans .txt').each((index, value) => {
        $(value).text(curerntQuestion['choice' + (++index)]);
    });

    availableQuestions.splice(questionIndex, 1);
}
