// --- DOM Element References ---
// Screens
const mainMenuScreen = document.getElementById('main-menu-screen');
const quizScreen = document.getElementById('quiz-screen');
const unlockScreen = document.getElementById('unlock-screen');
const resultsScreen = document.getElementById('results-screen');
const lessonScreen = document.getElementById('lesson-screen'); // Added

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

// Lesson Screen Elements
const lessonTitle = document.getElementById('lesson-title');
const lessonContent = document.getElementById('lesson-content');
const startQuizButton = document.getElementById('start-quiz-button');
const lessonBackButton = document.getElementById('lesson-back-button');


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
                // Navigate to lesson first
                showLesson(module.id);
            } else {
                // Navigate to Unlock Screen directly
                showUnlockScreen();
            }
        });

        moduleListContainer.appendChild(moduleElement);
    });

    // Hide unlock button if already unlocked
    unlockButton.style.display = isUnlocked ? 'none' : 'block';
}

/** Displays the lesson for a given module ID */
function showLesson(moduleId) {
    const module = quizModules.find(m => m.id === moduleId);
    if (!module) {
        alert('Module not found!');
        goBackToMenu();
        return;
    }
    // Check if there's lesson text; if not, go straight to quiz.
    if (!module.lessonText) {
        console.warn("No lesson text found for module:", moduleId, ". Starting quiz directly.");
        startQuiz(moduleId); // Go to quiz if no lesson
        return;
    }

    currentModuleId = moduleId; // Store current module ID for the quiz button
    lessonTitle.textContent = module.title;

    // --- Improved Formatting ---
    let formattedLesson = module.lessonText.trim();

    // 1. Convert **Bold Text** to <strong>
    formattedLesson = formattedLesson.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 2. Convert lines starting with "**...**" followed by newline to <h3>
    formattedLesson = formattedLesson.replace(/^\*\*(.*?)\*\*\s*$/gm, '<h3>$1</h3>');

    // 3. Convert lines starting with "* " to <li>
    formattedLesson = formattedLesson.replace(/^\* (.*$)/gm, '<li>$1</li>');

    // 4. Wrap consecutive <li> items in <ul> tags
    formattedLesson = formattedLesson.replace(/(<li>(?:.|\n|\r)*?<\/li>)/g, (match) => {
        if (match.startsWith('<ul>')) return match; // Prevent double wrapping
        return `<ul>${match}</ul>`;
    });
    formattedLesson = formattedLesson.replace(/<\/ul>\s*<ul>/g, ''); // Merge adjacent <ul> tags

    // 5. Wrap remaining text blocks (paragraphs) in <p> tags
    formattedLesson = formattedLesson.split(/(<\/?(?:ul|li|h3)>)/g) // Split by tags, keeping delimiters
        .map(segment => {
            if (segment.match(/<\/?(?:ul|li|h3)>/) || segment.trim() === '') {
                return segment; // Keep tags and empty lines as is
            }
            // Wrap paragraphs, replace single newlines within paragraphs with <br>
            return segment.trim().split(/\n\n+/).map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`).join('');
        })
        .join('');

    formattedLesson = formattedLesson.replace(/<p>\s*<\/p>/g, ''); // Remove empty paragraphs
    formattedLesson = formattedLesson.replace(/<br>\s*<\/p>/g, '</p>'); // Clean up trailing breaks in paragraphs
    formattedLesson = formattedLesson.replace(/<p>\s*<br>/g, '<p>'); // Clean up leading breaks in paragraphs
    // --- End Improved Formatting ---

    lessonContent.innerHTML = formattedLesson; // Use innerHTML to render the tags
    lessonContent.scrollTop = 0; // Scroll lesson to top when displayed
    showScreen('lesson-screen');
}


/** Starts the quiz for a given module ID */
function startQuiz(moduleId) {
    const module = quizModules.find(m => m.id === moduleId);
    if (!module || (module.questions.length === 0 && !(module.isLocked && isUnlocked))) {
        if (module && module.questions.length === 0) {
             alert('Quiz questions for this module are coming soon!');
        } else {
             alert('Quiz not available.');
        }
        goBackToMenu();
        return;
    }

    currentModuleId = moduleId; // Ensure this is set correctly here too
    currentQuestions = module.questions;
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
        // Reset styles explicitly on display
        button.style.backgroundColor = '';
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
        button.style.border = '1px solid transparent'; // Reset border for feedback colors

        if (index === question.correctAnswerIndex) {
            button.style.backgroundColor = '#d1e7dd'; // Bootstrap light green
            button.style.color = '#0f5132';
            button.style.borderColor = '#badbcc';
        } else if (index === selectedIndex && !isCorrect) {
            button.style.backgroundColor = '#f8d7da'; // Bootstrap light red
            button.style.color = '#842029';
            button.style.borderColor = '#f5c2c7';
        } else {
            button.style.backgroundColor = '#f8f9fa'; // Lighter grey using variable from CSS eventually
            button.style.color = '#6c757d';
            button.style.borderColor = '#dee2e6';
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
    const moduleTitle = quizModules.find(m => m.id === currentModuleId)?.title || '';
    resultsTitle.textContent = `Quiz Complete: ${moduleTitle}`;
    resultsScore.textContent = `Your Score: ${score} / ${currentQuestions.length}`;

    let message = "Good effort!";
    const percentage = currentQuestions.length > 0 ? (score / currentQuestions.length) * 100 : 0;
    if (percentage >= 80) { message = "Excellent work! 🏆"; }
    else if (percentage >= 50) { message = "Well done, keep learning! 👍"; }
    else { message = "Keep practicing to improve! 💪"; }
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
    displayModules(); // Refresh module list
    showScreen('main-menu-screen');
}

/** Shows the unlock screen */
function showUnlockScreen() {
    getKeyLink.href = "https://ko-fi.com/s/9c92617f03"; // *** YOUR ACTUAL LINK ***
    unlockStatus.textContent = '';
    unlockKeyInput.value = '';
    showScreen('unlock-screen');
}

/** Verifies the unlock key */
function verifyUnlockKey() {
    const key = unlockKeyInput.value.trim().toUpperCase();
    const validKey = "AETHELUNLOCK2025"; // ** Your simple unlock key **

    if (key === validKey) {
        localStorage.setItem('aetheltechQuizUnlocked', 'true');
        isUnlocked = true;
        unlockStatus.textContent = "Success! All modules unlocked.";
        unlockStatus.style.color = 'green';
        setTimeout(goBackToMenu, 1500);
    } else {
         unlockStatus.textContent = "Invalid Key. Please check the key and try again.";
         unlockStatus.style.color = 'red';
         localStorage.setItem('aetheltechQuizUnlocked', 'false');
         isUnlocked = false;
    }
}

// --- Event Listeners ---
unlockButton.addEventListener('click', showUnlockScreen);
quizBackButton.addEventListener('click', goBackToMenu);
lessonBackButton.addEventListener('click', goBackToMenu);
unlockBackButton.addEventListener('click', goBackToMenu);
resultsBackButton.addEventListener('click', goBackToMenu);
nextQuestionButton.addEventListener('click', nextQuestion);
verifyKeyButton.addEventListener('click', verifyUnlockKey);
startQuizButton.addEventListener('click', () => {
    if (currentModuleId) {
        startQuiz(currentModuleId);
    } else {
        console.error("Cannot start quiz, currentModuleId is not set.");
        goBackToMenu();
    }
});

// --- Initial Setup ---
displayModules(); // Load modules based on initial unlock status
console.log("App Initialized. Unlocked status:", isUnlocked);

// --- Service Worker Registration ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const swPath = window.location.pathname.includes('/aetheltech_quiz_pwa/')
                       ? '/aetheltech_quiz_pwa/sw.js'
                       : '/sw.js'; // Adjust path for local vs deployed
        navigator.serviceWorker.register(swPath)
            .then(registration => {
                console.log('Service Worker registered successfully with scope: ', registration.scope);
            })
            .catch(err => {
                console.error('Service Worker registration failed: ', err);
            });
    });
} else {
    console.log('Service Worker is not supported by this browser.');
}