//Set of questions and answers -DONE
//Give each answer an identifier -DONE
//Each identifier will increment through each question
//St the end the identifier with the highest number is the winner
//Display the answer and rest the quiz

//pass results frm previous question to the next page usig localcache

//Randomise the background of the quiz for each questiion

//Possible - Personality Traits
// 15 -21- You Need Help
// 10 - 15 - Good Soul
// 5- 10 - Meh
// 5 - Are You Even Real


let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    //Populate html elements
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }
    //Get value of selected radio
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    ////Add the answer score to the score array
    score.push(answerScore);

    selectedAnswersData.push()


    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    //Finally we incement the current question number ( to be used as the index for each array)
    currentQuestion++;

        //once finished clear checked
        selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //If the quiz is finished then we hide the questions container and show the results
    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
        result.innerHTML =
         `<h1 class="final-score">Your score: ${totalScore}</h1>
         <div class="summary">
            <h1>Summary</h1>
            <p>Possible - Personality Traits, see below for a summary based on your results:</p>
            <p>31-33:
            GUARDIANS:
            The Guardians,are compassionate and empathetic individuals who seek to understand human conditions. They are driven by a deep sense of idealism and a desire to make meaningful impact on lives of others.
            </p>
            <p>26-30:
            HEROES:
            The Heroes, are natural mentors and communicators who excel at bringing people together. They are attuned to the emotions of others and have a genuine desire to help them grow and reach their full potential.
            </p>
            <p>21-25:
            CHALLENGERS:
            The Challengers,are innovative thinkers who thrive on intellectual challenges and enjoy exploring new ideas. They are adept at spotting patters and generating possibilities,often pushing the boundaries of what is considered conventional
            </p>
            <p>11-20:
            MASTERMINDS:
            The Masterminds, are strategic thinkers with an unquenchable thirst for knowledge and a natural ability to find innovative solutions. They value intellect,competence, and independence,often pushing themselves and others to achieve ambitious goals.

             </p>
            <p>5-10:
            REBELS:
            The Rebels, are energetic and adaptable individuals who excel in high-stress situations and fast paced environments. They are skilled at thinking on their feet, quickly assessing problems, and taking decisive action.</p>
        </div>
        <button class="restart">Restart Quiz</button>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
    //Decrement quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);
