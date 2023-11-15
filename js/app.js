let users = [{
    username: 'titan955',
    score: []
}]

let questions = [
    {
        question: 'Who wrote the novel 1984?',
        options: ['George Orwell', 'Aldous Huxley', 'Ray Bradbury', 'J.K. Rowling'],
        answer: 0
    },
    {
        question: 'What is the capital of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
        answer: 2
    },
    {
        question: 'Who painted the Mona Lisa?',
        options: ['Vincent Van Gogh', 'Leonardo Da Vinci', 'Pablo Picasso', 'Claude Monet'],
        answer: 1
    },
    {
        question: 'What is the chemical symbol for Gold?',
        options: ['G', 'Au', 'Ag', 'Go'],
        answer: 1
    },
    {
        question: 'Who discovered penicillin?',
        options: ['Marie Curie', 'Alexander Fleming', 'Louis Pasteur', 'Albert Einstein'],
        answer: 1
    },
];



function startQuiz() {
    let user = users[0];
    let app = document.getElementById('app');
    let questionIndex = 0;

    // Retrieve the scores from local storage
    let scores = JSON.parse(localStorage.getItem('scores')) || [];

    function displayQuestion() {
        app.innerHTML = ''; // Clear the previous question and options

        let question = questions[questionIndex];
        let questionElement = document.createElement('p');
        questionElement.textContent = question.question;
        app.appendChild(questionElement);

        question.options.forEach((option, optionIndex) => {
            let optionElement = document.createElement('button');
            optionElement.textContent = option;
            optionElement.addEventListener('click', function() {
                if (optionIndex === question.answer) {
                    user.score.push(1);
                } else {
                    user.score.push(0);
                }
                questionIndex++;
                if (questionIndex < questions.length) {
                    displayQuestion(); // Display the next question
                } else {
                    let scoreSum = user.score.reduce((a, b) => a + b, 0);
                    let scorePercent = (scoreSum / questions.length) * 100;
                    scores.push({username: user.username, score: scorePercent}); // Add the score of the current quiz to the scores array
                    localStorage.setItem('scores', JSON.stringify(scores)); // Save the scores array to local storage

                    app.innerHTML = ''; // Clear the app element

                    // Display all scores
                    scores.forEach(score => {
                        let scoreElement = document.createElement('p');
                        scoreElement.textContent = score.username + ': ' + score.score + '%';
                        app.appendChild(scoreElement);
                    });

                    // Add a "Play Again" button
                    let playAgainButton = document.createElement('button');
                    playAgainButton.textContent = 'Play Again';
                    playAgainButton.addEventListener('click', function() {
                        user.score = []; // Reset the user's score
                        questionIndex = 0; // Reset the question index
                        displayQuestion(); // Start the quiz again
                    });
                    app.appendChild(playAgainButton);
                }
            });
            app.appendChild(optionElement);
        });
    }

    displayQuestion(); // Start the quiz by displaying the first question
}

startQuiz();
