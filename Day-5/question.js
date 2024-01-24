let questions;

function fetchData() {
  fetch('https://opentdb.com/api.php?amount=10&difficulty=easy')
    .then((response) => response.json())
    .then((data) => {
      questions = data.results.map((question) => {
        const formattedQuestion = {
          question: question.question,
          answers: [...question.incorrect_answers, question.correct_answer],
          correctIndex: question.incorrect_answers.length,
        };
        return formattedQuestion;
      });
      startQuiz();
    })
    .catch((error) => console.log('Error fetching data', error));
}

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-button');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '.' + currentQuestion.question;

  answerButton.innerHTML = '';

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.innerHTML = answer;
    button.addEventListener('click', () => checkAnswer(index));
    answerButton.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedIndex === currentQuestion.correctIndex) {
    score++;
    alert('Correct!');
    moveToNextQuestion();
  } else {
    alert(
      'Incorrect! The correct answer is: ' +
        currentQuestion.answers[currentQuestion.correctIndex]
    );
  }
}

function moveToNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    alert('Quiz completed. Your score: ' + score);
    if (confirm('Do you want to restart the quiz?')) {
      startQuiz();
    }
  }
}

fetchData();