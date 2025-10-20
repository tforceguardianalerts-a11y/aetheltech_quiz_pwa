// --- DOM Element References ---
// Screens
const mainMenuScreen = document.getElementById('main-menu-screen');
const quizScreen = document.getElementById('quiz-screen');
const unlockScreen = document.getElementById('unlock-screen');
const resultsScreen = document.getElementById('results-screen'); // Added

// Main Menu Elements
const moduleListContainer = document.getElementById('module-list');
const unlockButton = document.getElementById('unlock-button');

// Quiz Screen Elements
const quizTitle = document.getElementById('quiz-title');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackContainer = document.getElementById('feedback-container');
const explanationText = document.getElementById('explanation-text');
const nextQuestionButton = document.getElementById('next-question-button');
const quizBackButton = document.getElementById('quiz-back-button');

// Unlock Screen Elements
const unlockBackButton = document.getElementById('unlock-back-button');
const getKeyLink = document.getElementById('get-key-link');
const unlockKeyInput = document.getElementById('unlock-key-input');
const verifyKeyButton = document.getElementById('verify-key-button');
const unlockStatus = document.getElementById('unlock-status');

// Results Screen Elements
const resultsTitle = document.getElementById('results-title');
const resultsScore = document.getElementById('results-score');
const resultsMessage = document.getElementById('results-message');
const resultsBackButton = document.getElementById('results-back-button');


// --- State Variables ---
let currentModuleId = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let isUnlocked = localStorage.getItem('aetheltechQuizUnlocked') === 'true'; // Load unlock status

// --- Functions ---

/** Switches which screen is visible */
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const screenToShow = document.getElementById(screenId);
    if (screenToShow) {
        screenToShow.classList.add('active');
    } else {
        console.error("Screen not found:", screenId);
    }
}

/** Populates the module list on the main menu, considering unlock status */
function displayModules() {
    moduleListContainer.innerHTML = ''; // Clear previous content
    isUnlocked = localStorage.getItem('aetheltechQuizUnlocked') === 'true'; // Re-check unlock status

    quizModules.forEach(module => {
        const lockedStatus = module.isLocked && !isUnlocked; // Module is locked if originally locked AND app isn't unlocked

        const moduleElement = document.createElement('div');
        moduleElement.classList.add('module-item');
        // Basic inline styles (consider moving to CSS later)
        moduleElement.style.padding = '12px 15px';
        moduleElement.style.border = '1px solid #ddd';
        moduleElement.style.borderRadius = '5px';
        moduleElement.style.marginBottom = '10px';
        moduleElement.style.cursor = lockedStatus ? 'not-allowed' : 'pointer';
        moduleElement.style.display = 'flex';
        moduleElement.style.alignItems = 'center';
        moduleElement.style.justifyContent = 'space-between';
        moduleElement.style.backgroundColor = lockedStatus ? '#f8f8f8' : '#fff';
        moduleElement.style.color = lockedStatus ? '#aaa' : '#333';

        const icon = lockedStatus ? '🔒' : '🔓';
        moduleElement.innerHTML = `
            <span>${icon} ${module.title}</span>
            ${!lockedStatus ? '<span style="font-size: 1.2em; color: #1a73e8;">→</span>' : ''}
        `;

        moduleElement.addEventListener('click', () => {
            if (!lockedStatus) {
                startQuiz(module.id);
            } else {
                // Option 2: Navigate to Unlock Screen directly
                showUnlockScreen();
            }
        });

        moduleListContainer.appendChild(moduleElement);
    });

    // Hide unlock button if already unlocked
    unlockButton.style.display = isUnlocked ? 'none' : 'block';
}

/** Starts the quiz for a given module ID */
function startQuiz(moduleId) {
    const module = quizModules.find(m => m.id === moduleId);
    // Check if module exists AND if it has questions OR if app is unlocked (allowing access even if empty for now)
    if (!module || (module.questions.length === 0 && !(module.isLocked && isUnlocked))) {
        if (module && module.questions.length === 0) {
             alert('Quiz questions for this module are coming soon!');
        } else {
             alert('Quiz not available.');
        }
        return;
    }

    currentModuleId = moduleId;
    // Use Password Power questions as placeholder if the selected module has none yet
    currentQuestions = module.questions.length > 0 ? module.questions : quizModules[0].questions; // Use real questions or placeholder
    currentQuestionIndex = 0;
    score = 0;
    answered = false;

    quizTitle.textContent = module.title;
    displayQuestion();
    showScreen('quiz-screen');
}

/** Displays the current question and options */
function displayQuestion() {
    answered = false;
    feedbackContainer.style.display = 'none';
    optionsContainer.innerHTML = '';

    if (currentQuestionIndex >= currentQuestions.length) {
        showResults();
        return;
    }

    const question = currentQuestions[currentQuestionIndex];
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    questionText.textContent = question.questionText;

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        // Reset styles explicitly
        button.style.backgroundColor = ''; // Let CSS handle default
        button.style.color = '';
        button.style.borderColor = '';
        button.disabled = false;
        button.style.cursor = 'pointer';

        button.addEventListener('click', () => handleAnswer(index));
        optionsContainer.appendChild(button);
    });
}

/** Handles the user selecting an answer */
function handleAnswer(selectedIndex) {
    if (answered) return;

    answered = true;
    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correctAnswerIndex;

    if (isCorrect) {
        score++;
    }

    const optionButtons = optionsContainer.querySelectorAll('.option-button');
    optionButtons.forEach((button, index) => {
        button.disabled = true; // Disable all buttons
        button.style.cursor = 'default';
        button.style.border = '1px solid transparent'; // Reset border

        if (index === question.correctAnswerIndex) {
            // Correct answer button
            button.style.backgroundColor = '#d4edda'; // Light green
            button.style.color = '#155724'; // Dark green text
            button.style.borderColor = '#c3e6cb';
        } else if (index === selectedIndex && !isCorrect) {
            // Incorrectly selected button
            button.style.backgroundColor = '#f8d7da'; // Light red
            button.style.color = '#721c24'; // Dark red text
            button.style.borderColor = '#f5c6cb';
        } else {
            // Other incorrect buttons
            button.style.backgroundColor = '#e2e3e5'; // Light grey
            button.style.color = '#6c757d'; // Grey text
            button.style.borderColor = '#d6d8db';
        }
    });

    explanationText.textContent = question.explanation;
    feedbackContainer.style.display = 'flex';

    if (currentQuestionIndex >= currentQuestions.length - 1) {
        nextQuestionButton.textContent = 'Finish Quiz';
    } else {
        nextQuestionButton.textContent = 'Next Question';
    }
}

/** Moves to the next question or shows the results */
function nextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showResults();
    }
}

/** Shows the final quiz results screen */
function showResults() {
    resultsTitle.textContent = `Quiz Complete: ${quizModules.find(m => m.id === currentModuleId)?.title || ''}`; // Add module title
    resultsScore.textContent = `Your Score: ${score} / ${currentQuestions.length}`;

    // Add a simple encouraging message based on score
    let message = "Good effort!";
    const percentage = (score / currentQuestions.length) * 100;
    if (percentage >= 80) {
        message = "Excellent work! 🏆";
    } else if (percentage >= 50) {
        message = "Well done, keep learning! 👍";
    } else {
         message = "Keep practicing to improve! 💪";
    }
    resultsMessage.textContent = message;

    showScreen('results-screen');
}


/** Navigates back to the main menu */
function goBackToMenu() {
    currentModuleId = null;
    currentQuestions = [];
    currentQuestionIndex = 0;
    score = 0;
    answered = false;
    displayModules(); // Refresh module list in case unlock status changed
    showScreen('main-menu-screen');
}

/** Shows the unlock screen */
function showUnlockScreen() {
     // !! IMPORTANT: Replace this placeholder link with your REAL Ko-fi product link !!
    getKeyLink.href = "https://ko-fi.com/s/84416addde";
    unlockStatus.textContent = '';
    unlockKeyInput.value = '';
    showScreen('unlock-screen');
}

/** Verifies the unlock key */
function verifyUnlockKey() {
    const key = unlockKeyInput.value.trim().toUpperCase(); // Convert to uppercase
    const validKey = "AETHELUNLOCK2025"; // ** Your simple unlock key **

    if (key === validKey) {
        localStorage.setItem('aetheltechQuizUnlocked', 'true'); // Save unlock status
        isUnlocked = true;
        unlockStatus.textContent = "Success! All modules unlocked.";
        unlockStatus.style.color = 'green';
        setTimeout(goBackToMenu, 1500); // Go back after 1.5 seconds
    } else {
         unlockStatus.textContent = "Invalid Key. Please check the key and try again.";
         unlockStatus.style.color = 'red';
         localStorage.setItem('aetheltechQuizUnlocked', 'false'); // Ensure it's set to false
         isUnlocked = false;
    }
}


// --- Event Listeners ---
unlockButton.addEventListener('click', showUnlockScreen);
quizBackButton.addEventListener('click', goBackToMenu);
unlockBackButton.addEventListener('click', goBackToMenu);
resultsBackButton.addEventListener('click', goBackToMenu); // Added listener for results back button
nextQuestionButton.addEventListener('click', nextQuestion);
verifyKeyButton.addEventListener('click', verifyUnlockKey);


// --- Initial Setup ---
displayModules(); // Load modules based on initial unlock status
console.log("App Initialized. Unlocked status:", isUnlocked);