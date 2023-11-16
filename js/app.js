let users = []

let questions = [{
    question: 'Who wrote the novel 1984?',
    options: ['George Orwell', 'Aldous Huxley', 'Ray Bradbury', 'J.K. Rowling'],
    answer: 0
}, {
    question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], answer: 2
}, {
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent Van Gogh', 'Leonardo Da Vinci', 'Pablo Picasso', 'Claude Monet'],
    answer: 1
}, {
    question: 'What is the chemical symbol for Gold?', options: ['G', 'Au', 'Ag', 'Go'], answer: 1
}, {
    question: 'Who discovered penicillin?',
    options: ['Marie Curie', 'Alexander Fleming', 'Louis Pasteur', 'Albert Einstein'],
    answer: 1
},];

let startForm = document.getElementById('startForm');
let usernameInput = document.getElementById('usernameInput');

function startQuiz(username) {
    let user = {username: username, score: []};
    let app = document.getElementById('app');
    let questionIndex = 0;

    let scores = JSON.parse(localStorage.getItem('scores')) || [];

    function displayQuestion() {
        app.innerHTML = '';

        let question = questions[questionIndex];
        let questionElement = document.createElement('p');
        questionElement.className = 'text-center text-2xl font-bold p-4 bg-yellow-300 rounded-lg m-8 w-full py-12';
        questionElement.textContent = question.question;

        let questionDiv = document.createElement('div');
        questionDiv.className = 'flex flex-col justify-center items-center space-y-4';
        questionDiv.appendChild(questionElement);

        question.options.forEach((option, optionIndex) => {
            let footer = document.getElementById('footer')
            footer.innerHTML = ''
            let optionElement = document.createElement('button');
            optionElement.className = 'border border-gray-400 rounded-lg p-4 w-full bg-white text-gray-700 font-semibold hover:bg-gray-100';
            optionElement.textContent = option;
            optionElement.addEventListener('click', function () {
                if (optionIndex === question.answer) {
                    user.score.push(1);
                    optionElement.className = 'border-4 border-green-400 rounded-lg p-4 w-full bg-white text-gray-700 font-semibold hover:bg-gray-100';
                } else {
                    user.score.push(0);
                    optionElement.className = 'border-4 border-red-400 rounded-lg p-4 w-full bg-white text-gray-700 font-semibold hover:bg-gray-100';
                }

                questionIndex++;
                if (questionIndex < questions.length) {
                    setTimeout(displayQuestion, 1000)
                } else {
                    let scoreSum = user.score.reduce((a, b) => a + b, 0);
                    let scorePercent = (scoreSum / questions.length) * 100;
                    scores.push({username: user.username, score: scorePercent});
                    localStorage.setItem('scores', JSON.stringify(scores));

                    app.innerHTML = '';
                    scores.sort((a, b) => b.score - a.score);


                    let leaderboardTable = document.createElement('table');
                    leaderboardTable.className = 'leaderboard-table';

                    let tableHead = document.createElement('thead');
                    let headingRow = document.createElement('tr');
                    let usernameHeading = document.createElement('th');
                    usernameHeading.textContent = 'Username';
                    let scoreHeading = document.createElement('th');
                    scoreHeading.textContent = 'Score';
                    headingRow.appendChild(usernameHeading);
                    headingRow.appendChild(scoreHeading);
                    tableHead.appendChild(headingRow);
                    leaderboardTable.appendChild(tableHead);

                    let tableBody = document.createElement('tbody');

                    scores.forEach((score, index) => {
                        let scoreRow = document.createElement('tr');

                        let usernameCell = document.createElement('td');
                        usernameCell.textContent = score.username;
                        scoreRow.appendChild(usernameCell);

                        let scoreCell = document.createElement('td');
                        scoreCell.textContent = score.score + '%';
                        scoreRow.appendChild(scoreCell);

                        if (index === 0) {
                            scoreRow.style.fontWeight = 'bold';
                            scoreRow.style.color = 'green';
                        }

                        tableBody.appendChild(scoreRow);
                    });

                    leaderboardTable.appendChild(tableBody);

                    app.appendChild(leaderboardTable);

                    let playAgainButton = document.createElement('button');
                    playAgainButton.textContent = 'Play Again';
                    playAgainButton.className = 'centered-button';
                    playAgainButton.addEventListener('click', function () {
                        user.score = [];
                        questionIndex = 0;
                        displayQuestion();
                        startForm.style.display = 'block';
                        app.innerHTML = '';
                        usernameInput.value = '';
                    });
                    app.appendChild(playAgainButton);

                }
            });
            questionDiv.appendChild(optionElement);
            app.appendChild(questionDiv);
        });
    }

    displayQuestion();
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
