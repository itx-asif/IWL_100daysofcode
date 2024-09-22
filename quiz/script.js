const quizzes = {
    react: [
        { question: "What is ReactJS?", options: ["A library for building user interfaces", "A database", "A server-side framework"], answer: 0 },
        { question: "Why is ReactJS used?", options: ["To manage application state", "To style web pages", "To build desktop applications"], answer: 0 },
        { question: "How does ReactJS work?", options: ["By manipulating the real DOM", "By using a virtual DOM", "By using CSS"], answer: 1 },
        { question: "What are the features of ReactJS?", options: ["Component-based architecture", "Direct DOM manipulation", "Server-side rendering"], answer: 0 },
        { question: "What is JSX?", options: ["JavaScript XML", "JavaScript Extension", "Java Syntax"], answer: 0 },
        { question: "How to create components in ReactJS?", options: ["Using classes or functions", "Using HTML only", "Using CSS"], answer: 0 },
        { question: "What are the advantages of ReactJS?", options: ["Reusability of components", "Slower performance", "Requires less JavaScript"], answer: 0 },
        { question: "Differentiate between real DOM and virtual DOM?", options: ["Real DOM is faster", "Virtual DOM is slower", "Virtual DOM minimizes re-rendering"], answer: 2 },
        { question: "What are forms in ReactJS?", options: ["Components for user input", "A way to structure data", "HTML elements only"], answer: 0 },
        { question: "How is React different from React Native?", options: ["React is for web apps, React Native is for mobile apps", "They are the same", "React Native is older"], answer: 0 },
    ],
    javascript: [
        { question: "What is JavaScript?", options: ["A scripting language", "A markup language", "A database"], answer: 0 },
        { question: "Which of the following is a JavaScript data type?", options: ["Number", "Float", "Integer"], answer: 0 },
        { question: "What is a closure in JavaScript?", options: ["A function with access to its own scope", "A method to close a window", "A type of object"], answer: 0 },
        { question: "What does 'this' refer to in JavaScript?", options: ["The global object", "The function context", "Both"], answer: 2 },
        { question: "How do you create a function in JavaScript?", options: ["function myFunction()", "myFunction: function()", "create myFunction()"], answer: 0 },
        { question: "What is event bubbling?", options: ["Events that occur after a delay", "Events that propagate from child to parent", "Events that only occur in the DOM"], answer: 1 },
        { question: "Which of the following is a JavaScript framework?", options: ["React", "HTML", "CSS"], answer: 0 },
        { question: "What is 'undefined' in JavaScript?", options: ["A data type", "A variable that has been declared but not assigned", "Both"], answer: 2 },
        { question: "What is the purpose of the 'let' keyword?", options: ["To declare a variable", "To create a constant", "To define a function"], answer: 0 },
        { question: "What is AJAX?", options: ["Asynchronous JavaScript and XML", "A type of database", "A JavaScript library"], answer: 0 },
    ],
    php: [
        { question: "What does PHP stand for?", options: ["Hypertext Preprocessor", "Personal Home Page", "Preprocessor Home Page"], answer: 0 },
        { question: "Is PHP a server-side language?", options: ["Yes", "No"], answer: 0 },
        { question: "What is a PHP array?", options: ["A variable that can hold multiple values", "A function", "A type of loop"], answer: 0 },
        { question: "Which symbol is used to denote a variable in PHP?", options: ["$", "#", "@"], answer: 0 },
        { question: "How do you include a file in PHP?", options: ["include('file.php');", "require('file.php');", "Both"], answer: 2 },
        { question: "What is the purpose of the 'echo' statement?", options: ["To output text", "To create a variable", "To define a function"], answer: 0 },
        { question: "What is a session in PHP?", options: ["A way to store user data across multiple pages", "A method to end a script", "A type of variable"], answer: 0 },
        { question: "Which function is used to connect to a MySQL database in PHP?", options: ["mysql_connect()", "db_connect()", "connect_db()"], answer: 0 },
        { question: "What is a cookie in PHP?", options: ["A small piece of data stored on the client side", "A server-side variable", "A function"], answer: 0 },
        { question: "How do you declare a constant in PHP?", options: ["define('CONSTANT', 'value');", "const CONSTANT = 'value';", "Both"], answer: 2 },
    ],
};

let currentQuiz = '';
let currentQuestionIndex = 0;
let score = 0;

// Initialize quiz selection buttons
document.querySelectorAll('.quiz-button').forEach(button => {
    button.addEventListener('click', () => {
        currentQuiz = button.id.split('-')[0]; // Extract quiz name
        if (quizzes[currentQuiz]) {
            startQuiz();
        } else {
            console.error(`Quiz ${currentQuiz} not found!`);
        }
    });
});

function startQuiz() {
    document.getElementById('selection-container').classList.add('hidden');
    document.getElementById('question-container').classList.remove('hidden');

    document.getElementById('quiz-title').innerText = `${currentQuiz.charAt(0).toUpperCase() + currentQuiz.slice(1)} Quiz`;
    document.getElementById('questions').classList.remove('hidden');

    score = 0;
    currentQuestionIndex = 0;

    // Update total questions count
    document.getElementById('total-question').innerText = quizzes[currentQuiz].length;

    showQuestion();
}

function showQuestion() {
    const questionData = quizzes[currentQuiz][currentQuestionIndex];
    if (!questionData) {
        console.error(`No questions found for ${currentQuiz} at index ${currentQuestionIndex}`);
        return;
    }

    // Update current question number
    document.getElementById('current-question').innerText = currentQuestionIndex + 1;

    // Update progress bar
    const totalQuestions = quizzes[currentQuiz].length;
    const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    document.getElementById('progress').style.width = progressPercentage + '%';

    // Set the question text
    document.getElementById('question').innerText = questionData.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = ''; // Clear previous options
    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        const span = document.createElement('div');
        span.classList.add('Option-name')
        const parag = document.createElement('p');
        parag.classList.add('option-text')
        
        // Convert index to corresponding letter (A, B, C, ...)
        span.innerText = String.fromCharCode(65 + index); // 65 is the ASCII code for 'A'
        button.appendChild(span);
        button.appendChild(parag)
        parag.innerHTML= option // Add a space before the option text
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });
}



function selectOption(index) {
    if (index === quizzes[currentQuiz][currentQuestionIndex].answer) {
        score++;
    }
    currentQuestionIndex++;

    if (currentQuestionIndex < quizzes[currentQuiz].length) {
        showQuestion(); // Directly show the next question
    } else {
        showResults(); // Show results if no more questions
    }
}

function showResults() {
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('results-container').classList.remove('hidden');
    document.getElementById('questions').classList.add('hidden');
    document.getElementById('score').innerText = score;
}

// Restart button event listener
document.getElementById('restart-button').addEventListener('click', () => {
    document.getElementById('results-container').classList.add('hidden');
    document.getElementById('quiz-title').innerText = "Interactive Quiz Application";
    document.getElementById('selection-container').classList.remove('hidden');
    currentQuiz = '';  // Reset the quiz
    currentQuestionIndex = 0;  // Reset question index
    score = 0;  // Reset score
});