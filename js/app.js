let users = []

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

let startForm = document.getElementById('startForm');
let usernameInput = document.getElementById('usernameInput');

function startQuiz(username) {
    let user = {username: username, score: []}; // Create a user object to store the user's score
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
            optionElement.addEventListener('click', function () {
                if (optionIndex === question.answer) {
                    user.score.push(1);
                    optionElement.className = 'border-green-400';
                } else {
                    user.score.push(0);
                    optionElement.className = 'border-green-400';
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
                    // Sort the scores array in descending order based on the score
                    scores.sort((a, b) => b.score - a.score);


                    // ... existing code ...

// Create a heading for the leaderboard
                    let leaderboardHeading = document.createElement('h2');
                    leaderboardHeading.textContent = 'Leaderboard';
                    app.appendChild(leaderboardHeading);

// Create an ordered list for the leaderboard
                    let leaderboardList = document.createElement('ol');

// Add each score as a list item in the list
                    scores.forEach((score, index) => {
                        let scoreItem = document.createElement('li');

                        // Create the score text
                        let scoreText = document.createTextNode(score.username + ': ' + score.score + '%');
                        scoreItem.appendChild(scoreText);

                        // Highlight the top scorer
                        if (index === 0) {
                            scoreItem.style.fontWeight = 'bold';
                            scoreItem.style.color = 'green';
                        }

                        // Add the score item to the list
                        leaderboardList.appendChild(scoreItem);
                    });

// Add the leaderboard list to the app element
                    app.appendChild(leaderboardList);
                    // Add a "Play Again" button
                    let playAgainButton = document.createElement('button');
                    playAgainButton.textContent = 'Play Again';
                    playAgainButton.addEventListener('click', function () {
                        user.score = []; // Reset the user's score
                        questionIndex = 0; // Reset the question index
                        displayQuestion(); // Start the quiz again
                        startForm.style.display = 'block'; // Display the start form
                        usernameInput.value = ''; // Clear the username input field
                    });
                    app.appendChild(playAgainButton);
                }
            });
            app.appendChild(optionElement);
        });
    }

    displayQuestion(); // Start the quiz by displaying the first question
}

function startApp() {


    startForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let username = usernameInput.value;
        startQuiz(username);
        startForm.style.display = 'none';
    });
}

startApp()