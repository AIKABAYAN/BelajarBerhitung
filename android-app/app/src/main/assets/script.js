// Game state
let currentTable = 1; // Default to multiplication table 1
let currentAnswer = '';
let currentQuestion = { multiplier: 0, correctAnswer: 0 };

// Audio elements
let correctSound = null;
let wrongSound = null;
let boomSound = null; // New sound for question timer

// Timer variables
let questionTimer = null;
let questionTimeout = 10000; // 10 seconds timeout

// Pattern system for generating questions
let currentPatternIndex = 0;
let currentQuestionInPattern = 0;
const questionPatterns = [];

// Create audio elements
function initAudio() {
    try {
        // Create correct sound (yey.mp3)
        correctSound = new Audio();
        correctSound.src = "yey.mp3";
        
        // Create wrong sound (wrong.mp3)
        wrongSound = new Audio();
        wrongSound.src = "wrong.mp3";
        
        // Create boom sound (boom.mp3)
        boomSound = new Audio();
        boomSound.src = "boom.mp3";
        
        // Preload sounds
        correctSound.preload = "auto";
        wrongSound.preload = "auto";
        boomSound.preload = "auto";
    } catch (e) {
        console.log("Audio not supported in this environment");
    }
}

// Play sound effect
function playSound(isCorrect) {
    try {
        if (isCorrect && correctSound) {
            correctSound.currentTime = 0;
            correctSound.play().catch(e => console.log("Sound play failed:", e));
        } else if (!isCorrect && wrongSound) {
            wrongSound.currentTime = 0;
            wrongSound.play().catch(e => console.log("Sound play failed:", e));
        }
    } catch (e) {
        console.log("Sound play error:", e);
    }
}

// Create visual effects
function createFireworks() {
    const container = document.querySelector('.practice-question-area') || document.body;
    
    // Create multiple fireworks
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.innerHTML = '✨🌟🎉🎊';
            firework.style.position = 'absolute';
            firework.style.fontSize = '2rem';
            firework.style.zIndex = '1000';
            firework.style.pointerEvents = 'none';
            firework.style.left = Math.random() * 80 + 10 + '%';
            firework.style.top = Math.random() * 80 + 10 + '%';
            firework.style.animation = 'firework-animation 1s forwards';
            
            // Add CSS for animation if not exists
            if (!document.getElementById('firework-style')) {
                const style = document.createElement('style');
                style.id = 'firework-style';
                style.innerHTML = `
                    @keyframes firework-animation {
                        0% { transform: scale(0); opacity: 1; }
                        50% { transform: scale(1.5); opacity: 0.8; }
                        100% { transform: scale(2); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            container.appendChild(firework);
            
            // Remove element after animation
            setTimeout(() => {
                if (firework.parentNode) {
                    firework.parentNode.removeChild(firework);
                }
            }, 1000);
        }, i * 100);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("Game initializing...");
    
    // Initialize audio
    initAudio();
    
    // Get all screen elements
    const mainMenu = document.getElementById('main-menu');
    const learnScreen = document.getElementById('learn-screen');
    const quizScreen = document.getElementById('quiz-screen');
    
    // Get learning mode elements
    const multiplicationTable = document.getElementById('multiplication-table');
    const learnContent = document.getElementById('learn-content');
    const backToMenuLearn = document.getElementById('back-to-menu-learn');
    const learnTabs = document.getElementById('learn-tabs');
    
    // Get learning tabs
    const tabConcept = document.getElementById('tab-concept');
    const tabVisual = document.getElementById('tab-visual');
    const tabPractice = document.getElementById('tab-practice');
    
    // Get quiz mode elements
    const quizBtn = document.getElementById('quiz-btn');
    const backToMenuQuiz = document.getElementById('back-to-menu-quiz');
    
    // Check if elements exist
    if (!mainMenu || !learnScreen || !quizScreen) {
        console.error("Missing screen elements");
        return;
    }
    
    console.log("All screen elements found");
    
    // Function to show a specific screen
    function showScreen(screenToShow) {
        // Stop any active timer
        if (questionTimer) {
            clearTimeout(questionTimer);
            questionTimer = null;
        }
        
        // Stop any playing boom sound
        try {
            if (boomSound) {
                boomSound.pause();
                boomSound.currentTime = 0;
            }
        } catch (e) {
            console.log("Error stopping boom sound:", e);
        }
        
        // Hide all screens
        mainMenu.classList.add('hidden');
        learnScreen.classList.add('hidden');
        quizScreen.classList.add('hidden');
        
        // Show the requested screen
        screenToShow.classList.remove('hidden');
    }
    
    // Tab navigation functions
    function setActiveTab(activeTab) {
        // Stop any active timer
        if (questionTimer) {
            clearTimeout(questionTimer);
            questionTimer = null;
        }
        
        // Stop any playing boom sound
        try {
            if (boomSound) {
                boomSound.pause();
                boomSound.currentTime = 0;
            }
        } catch (e) {
            console.log("Error stopping boom sound:", e);
        }
        
        // Remove active class from all tabs
        const tabs = [tabConcept, tabVisual, tabPractice];
        tabs.forEach(tab => {
            if (tab) tab.classList.remove('active');
        });
        
        // Add active class to clicked tab
        if (activeTab) activeTab.classList.add('active');
    }
    
    // Learning mode functions
    function startLearning() {
        if (!multiplicationTable || !learnContent || !learnTabs) {
            console.error("Missing learning elements");
            return;
        }
        
        // Stop any active timer
        if (questionTimer) {
            clearTimeout(questionTimer);
            questionTimer = null;
        }
        
        // Stop any playing boom sound
        try {
            if (boomSound) {
                boomSound.pause();
                boomSound.currentTime = 0;
            }
        } catch (e) {
            console.log("Error stopping boom sound:", e);
        }
        
        // Show the tabs
        learnTabs.classList.remove('hidden');
        
        currentTable = parseInt(multiplicationTable.value);
        
        // Reset pattern indices for new table
        currentPatternIndex = 0;
        currentQuestionInPattern = 0;
        
        showConceptTab(currentTable);
        setActiveTab(tabConcept);
    }
    
    function showConceptTab(table) {
        if (!learnContent) return;
        
        // Stop any active timer
        if (questionTimer) {
            clearTimeout(questionTimer);
            questionTimer = null;
        }
        
        // Stop any playing boom sound
        try {
            if (boomSound) {
                boomSound.pause();
                boomSound.currentTime = 0;
            }
        } catch (e) {
            console.log("Error stopping boom sound:", e);
        }
        
        let content = `<div class="concept-explanation">`;
        content += `<h3>Apa Itu Perkalian ${table}?</h3>`;
        content += `<p>Perkalian itu seperti penjumlahan berulang!</p>`;
        content += `<p>${table} × n artinya menambahkan angka ${table} sebanyak n kali.</p>`;
        content += `<p>Contoh mudah:</p>`;
        content += `<p>${table} × 1 = ${table} (cuma satu angka ${table})</p>`;
        content += `<p>${table} × 2 = ${table} + ${table} = ${table * 2}</p>`;
        content += `<p>${table} × 3 = ${table} + ${table} + ${table} = ${table * 3}</p>`;
        content += `<p>Jadi perkalian itu lebih cepat daripada menjumlahkan satu per satu!</p>`;
        content += `</div>`;
        
        learnContent.innerHTML = content;
    }
    
    function showVisualTab(table) {
        if (!learnContent) return;
        
        // Stop any active timer
        if (questionTimer) {
            clearTimeout(questionTimer);
            questionTimer = null;
        }
        
        // Stop any playing boom sound
        try {
            if (boomSound) {
                boomSound.pause();
                boomSound.currentTime = 0;
            }
        } catch (e) {
            console.log("Error stopping boom sound:", e);
        }
        
        let content = `<div class="equation-display">${table} × ? = ??</div>`;
        
        // Create grid visualization with fun emojis
        content += `<div class="grid-visualization" style="grid-template-columns: repeat(${table}, 1fr);">`;
        
        const emojis = ["🍎", "🍕", "⚽", "🐱", "🐶", "🦊", "🐼", "🦁", "🐯", "🐮"];
        const emoji = emojis[table % emojis.length] || "🍎";
        
        for (let i = 1; i <= 5; i++) {
            for (let j = 0; j < table; j++) {
                content += `<div class="grid-cell">${emoji}</div>`;
            }
            if (i < 5) content += `<div style="grid-column: 1 / -1; height: 8px;"></div>`;
        }
        
        content += `</div>`;
        content += `<p>Klik "Coba Sendiri" untuk menguji kemampuanmu!</p>`;
        
        learnContent.innerHTML = content;
    }
    
    
    
    // Pattern system for generating questions
    let currentPatternIndex = 0;
    let currentQuestionInPattern = 0;
    const questionPatterns = [];
    
    // Initialize patterns for generating questions
    function initializeQuestionPatterns() {
        // Clear existing patterns
        questionPatterns.length = 0;
        
        // For each table (1-10)
        for (let table = 1; table <= 10; table++) {
            const tablePatterns = [];
            
            // Create patterns for this table
            // Pattern 1: table x 1,2,3 (10 questions)
            tablePatterns.push({ multipliers: [1, 2, 3], count: 10 });
            
            // Pattern 2: table x 2,3,4 (10 questions)
            tablePatterns.push({ multipliers: [2, 3, 4], count: 10 });
            
            // Pattern 3: table x 3,4,5 (10 questions)
            tablePatterns.push({ multipliers: [3, 4, 5], count: 10 });
            
            // Pattern 4: table x 4,5,6 (10 questions)
            tablePatterns.push({ multipliers: [4, 5, 6], count: 10 });
            
            // Pattern 5: table x 5,6,7 (10 questions)
            tablePatterns.push({ multipliers: [5, 6, 7], count: 10 });
            
            // Pattern 6: table x 6,7,8 (10 questions)
            tablePatterns.push({ multipliers: [6, 7, 8], count: 10 });
            
            // Pattern 7: table x 7,8,9 (10 questions)
            tablePatterns.push({ multipliers: [7, 8, 9], count: 10 });
            
            // Pattern 8: table x 8,9,10 (10 questions)
            tablePatterns.push({ multipliers: [8, 9, 10], count: 10 });
            
            // Pattern 9: table x 9,10,1 (10 questions) - wrapping pattern
            tablePatterns.push({ multipliers: [9, 10, 1], count: 10 });
            
            // Pattern 10: table x 10,1,2 (10 questions) - wrapping pattern
            tablePatterns.push({ multipliers: [10, 1, 2], count: 10 });
            
            questionPatterns[table] = tablePatterns;
        }
    }
    
    // Get next question based on pattern
    function getNextQuestionFromPattern(table) {
        // Initialize patterns if not already done
        if (!questionPatterns[table] || questionPatterns[table].length === 0) {
            initializeQuestionPatterns();
        }
        
        // Get current table patterns
        const tablePatterns = questionPatterns[table];
        if (!tablePatterns || tablePatterns.length === 0) {
            // Fallback to random if patterns not defined
            return Math.floor(Math.random() * 10) + 1;
        }
        
        // Get current pattern
        const pattern = tablePatterns[currentPatternIndex];
        
        // Select multiplier from current pattern in sequence
        const patternPosition = currentQuestionInPattern % pattern.multipliers.length;
        const multiplier = pattern.multipliers[patternPosition];
        
        // Move to next question in pattern
        currentQuestionInPattern++;
        
        // If we've completed all questions in this pattern, move to next pattern
        if (currentQuestionInPattern >= pattern.count) {
            currentQuestionInPattern = 0;
            currentPatternIndex = (currentPatternIndex + 1) % tablePatterns.length;
        }
        
        return multiplier;
    }
    
    function generateNewQuestion() {
        // Clear any existing timer
        if (questionTimer) {
            clearTimeout(questionTimer);
            questionTimer = null;
        }
        
        // Stop any playing boom sound before playing new one
        try {
            if (boomSound) {
                boomSound.pause();
                boomSound.currentTime = 0;
            }
        } catch (e) {
            console.log("Error stopping boom sound:", e);
        }
        
        // Initialize patterns if not already done
        if (questionPatterns.length === 0) {
            initializeQuestionPatterns();
        }
        
        // Get next multiplier based on pattern
        const newMultiplier = getNextQuestionFromPattern(currentTable);
        
        currentQuestion.multiplier = newMultiplier;
        currentQuestion.correctAnswer = currentTable * currentQuestion.multiplier;
        currentAnswer = '';
        
        // Update display
        const questionElement = document.getElementById('practice-question');
        const answerInput = document.getElementById('answer-display');
        
        if (questionElement) {
            questionElement.innerHTML = `🎮 Ayo Berhitung! 🎮<br>${currentTable} × ${currentQuestion.multiplier} = <input type="text" id="answer-display" maxlength="3" style="width: 100px; font-size: 1.8rem; color: #FF4500; font-weight: bold; border: 2px solid #9370DB; border-radius: 10px; padding: 5px; text-align: center;" readonly>`;
        }
        
        // Hide feedback
        const feedbackDisplay = document.getElementById('feedback-display');
        if (feedbackDisplay) {
            feedbackDisplay.classList.add('hidden');
        }
        
        // Play boom sound
        let soundPlayed = false;
        try {
            if (boomSound) {
                boomSound.currentTime = 0;
                const playPromise = boomSound.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        soundPlayed = true;
                        // Sound played successfully
                    }).catch(e => {
                        console.log("Boom sound play failed:", e);
                    });
                }
            }
        } catch (e) {
            console.log("Boom sound play error:", e);
        }
        
        // Set timer - if sound plays, wait slightly longer to account for it
        // Otherwise use standard 10 second timeout
        const timeoutDuration = soundPlayed ? 10500 : 10000;
        questionTimer = setTimeout(() => {
            handleTimedOutAnswer();
        }, timeoutDuration);
        
        // Update the visual grid
        const visualGrid = document.getElementById('multiplication-visual');
        if (visualGrid) {
            // Clear existing grid
            visualGrid.innerHTML = '';
            
            // Set grid template columns based on the multiplicand (currentTable)
            visualGrid.style.gridTemplateColumns = `repeat(${currentTable}, 1fr)`;
            
            // Get emoji for this table
            const emojis = ["🍎", "🍕", "⚽", "🐱", "🐶", "🦊", "🐼", "🦁", "🐯", "🐮"];
            const emoji = emojis[currentTable % emojis.length] || "🍎";
            
            // Create grid based on current question
            // Rows = multiplier (currentQuestion.multiplier)
            // Columns = multiplicand (currentTable)
            for (let row = 0; row < currentQuestion.multiplier; row++) {
                for (let col = 0; col < currentTable; col++) {
                    const cell = document.createElement('div');
                    cell.className = 'grid-cell';
                    cell.textContent = emoji;
                    cell.style.fontSize = '1rem';
                    cell.style.textAlign = 'center';
                    visualGrid.appendChild(cell);
                }
                // Add spacing between rows
                if (row < currentQuestion.multiplier - 1) {
                    const spacer = document.createElement('div');
                    spacer.style.gridColumn = '1 / -1';
                    spacer.style.height = '5px';
                    visualGrid.appendChild(spacer);
                }
            }
        }
    }
    
    function showPracticeTab(table) {
        if (!learnContent) return;
        
        currentTable = table;
        
        // Reset pattern indices for new table
        currentPatternIndex = 0;
        currentQuestionInPattern = 0;
        
        // Stop any active timer
        if (questionTimer) {
            clearTimeout(questionTimer);
            questionTimer = null;
        }
        
        // Stop any playing boom sound
        try {
            if (boomSound) {
                boomSound.pause();
                boomSound.currentTime = 0;
            }
        } catch (e) {
            console.log("Error stopping boom sound:", e);
        }
        
        let content = `
        <div class="practice-container" style="display: flex; gap: 20px;">
            <div class="practice-question-area" style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;">
                <div id="practice-question" class="practice-question">🎮 Ayo Berhitung! 🎮<br>${currentTable} × ${currentQuestion.multiplier} = <input type="text" id="answer-display" maxlength="3" style="width: 100px; font-size: 1.8rem; color: #FF4500; font-weight: bold; border: 2px solid #9370DB; border-radius: 10px; padding: 5px; text-align: center;" readonly></div>
                
                <div style="display: flex; gap: 20px; align-items: flex-start;">
                    <div class="practice-numpad-area">
                        <div class="numpad-container">
                            <div class="numpad-row">
                                <button class="numpad-btn" data-value="7">7</button>
                                <button class="numpad-btn" data-value="8">8</button>
                                <button class="numpad-btn" data-value="9">9</button>
                            </div>
                            <div class="numpad-row">
                                <button class="numpad-btn" data-value="4">4</button>
                                <button class="numpad-btn" data-value="5">5</button>
                                <button class="numpad-btn" data-value="6">6</button>
                            </div>
                            <div class="numpad-row">
                                <button class="numpad-btn" data-value="1">1</button>
                                <button class="numpad-btn" data-value="2">2</button>
                                <button class="numpad-btn" data-value="3">3</button>
                            </div>
                            <div class="numpad-row">
                                <button class="numpad-btn" data-value="0">0</button>
                                <button class="numpad-btn clear-btn" data-action="clear">⌫</button>
                                <button class="numpad-btn enter-btn" data-action="enter">⏎</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="practice-emoji-area">
                        <div id="multiplication-visual" class="multiplication-visual"></div>
                    </div>
                </div>
                
                <div id="feedback-display" class="feedback-display hidden"></div>
            </div>
        </div>
        `;
        
        learnContent.innerHTML = content;
        
        // Initialize question patterns and generate first question
        initializeQuestionPatterns();
        generateNewQuestion();
        
        // Add event listeners to numpad buttons
        const numpadButtons = document.querySelectorAll('.numpad-btn');
        numpadButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                const action = this.getAttribute('data-action');
                
                if (action === 'clear') {
                    clearAnswer();
                } else if (action === 'enter') {
                    checkAnswer();
                } else if (value) {
                    addToAnswer(value);
                }
            });
        });
        
        // Add keyboard event listener
        document.addEventListener('keydown', function(event) {
            if (event.key >= '0' && event.key <= '9') {
                addToAnswer(event.key);
            } else if (event.key === 'Enter') {
                checkAnswer();
            } else if (event.key === 'Backspace') {
                clearAnswer();
            }
        });
    }
    
    function addToAnswer(digit) {
        // Get the answer input field
        const answerInput = document.getElementById('answer-display');
        if (!answerInput) return;
        
        // Limit to 3 digits
        if (answerInput.value.length < 3) {
            answerInput.value += digit;
            currentAnswer = answerInput.value;
        }
    }
    
    function clearAnswer() {
        // Get the answer input field
        const answerInput = document.getElementById('answer-display');
        if (!answerInput || answerInput.value.length === 0) return;
        
        // Remove the last character
        answerInput.value = answerInput.value.slice(0, -1);
        currentAnswer = answerInput.value;
    }
    
    // Handle timed out answer
    function handleTimedOutAnswer() {
        // Clear the timer
        if (questionTimer) {
            clearTimeout(questionTimer);
            questionTimer = null;
        }
        
        // Stop any playing boom sound
        try {
            if (boomSound) {
                boomSound.pause();
                boomSound.currentTime = 0;
            }
        } catch (e) {
            console.log("Error stopping boom sound:", e);
        }
        
        // Play wrong sound
        playSound(false);
        
        // Show timeout feedback
        const feedbackDisplay = document.getElementById('feedback-display');
        if (feedbackDisplay) {
            feedbackDisplay.textContent = "Waktu habis! Jawab lebih cepat ya! ⏰";
            feedbackDisplay.className = "feedback-display incorrect";
            feedbackDisplay.classList.remove("hidden");
            
            // Add animation
            feedbackDisplay.style.position = "fixed";
            feedbackDisplay.style.top = "-100px";
            feedbackDisplay.style.left = "50%";
            feedbackDisplay.style.transform = "translateX(-50%)";
            feedbackDisplay.style.transition = "top 0.5s ease-out";
            
            // Animate down
            setTimeout(() => {
                feedbackDisplay.style.top = "20px";
            }, 10);
            
            // Generate new question and hide feedback after 3 seconds
            setTimeout(() => {
                feedbackDisplay.style.top = "-100px";
                setTimeout(() => {
                    feedbackDisplay.classList.add('hidden');
                    // Clear answer input
                    const answerInput = document.getElementById('answer-display');
                    if (answerInput) {
                        answerInput.value = '';
                        currentAnswer = '';
                    }
                    generateNewQuestion();
                }, 500);
            }, 3000);
        }
    }
    
    function checkAnswer() {
        // Clear any existing timer
        if (questionTimer) {
            clearTimeout(questionTimer);
            questionTimer = null;
        }
        
        // Stop any playing boom sound
        try {
            if (boomSound) {
                boomSound.pause();
                boomSound.currentTime = 0;
            }
        } catch (e) {
            console.log("Error stopping boom sound:", e);
        }
        
        // Get the answer from the input field
        const answerInput = document.getElementById('answer-display');
        if (!answerInput) return;
        
        const userAnswer = parseInt(answerInput.value);
        const feedbackDisplay = document.getElementById('feedback-display');
        
        if (isNaN(userAnswer)) {
            if (feedbackDisplay) {
                feedbackDisplay.textContent = "Ups! Masukkan angka dulu ya! 🤭";
                feedbackDisplay.className = "feedback-display incorrect";
                feedbackDisplay.classList.remove("hidden");
                
                // Add animation
                feedbackDisplay.style.position = "fixed";
                feedbackDisplay.style.top = "-100px";
                feedbackDisplay.style.left = "50%";
                feedbackDisplay.style.transform = "translateX(-50%)";
                feedbackDisplay.style.transition = "top 0.5s ease-out";
                
                // Animate down
                setTimeout(() => {
                    feedbackDisplay.style.top = "20px";
                }, 10);
                
                // Hide after 5 seconds and generate new question
                setTimeout(() => {
                    feedbackDisplay.style.top = "-100px";
                    setTimeout(() => {
                        feedbackDisplay.classList.add('hidden');
                        generateNewQuestion();
                    }, 500);
                }, 5000);
            }
            return;
        }
        
        if (userAnswer === currentQuestion.correctAnswer) {
            // Play correct sound and show fireworks
            playSound(true);
            createFireworks();
            
            if (feedbackDisplay) {
                feedbackDisplay.textContent = "Keren! Jawabanmu benar! 😊";
                feedbackDisplay.className = "feedback-display correct";
                feedbackDisplay.classList.remove("hidden");
                
                // Add animation
                feedbackDisplay.style.position = "fixed";
                feedbackDisplay.style.top = "-100px";
                feedbackDisplay.style.left = "50%";
                feedbackDisplay.style.transform = "translateX(-50%)";
                feedbackDisplay.style.transition = "top 0.5s ease-out";
                
                // Animate down
                setTimeout(() => {
                    feedbackDisplay.style.top = "20px";
                }, 10);
                
                // Generate new question and hide feedback after 5 seconds
                setTimeout(() => {
                    feedbackDisplay.style.top = "-100px";
                    setTimeout(() => {
                        feedbackDisplay.classList.add('hidden');
                        generateNewQuestion();
                    }, 500);
                }, 5000);
            }
        } else {
            // Play wrong sound (car horn)
            playSound(false);
            
            if (feedbackDisplay) {
                // Create addition representation
                let addition = "";
                for (let i = 0; i < currentQuestion.multiplier; i++) {
                    addition += currentTable;
                    if (i < currentQuestion.multiplier - 1) {
                        addition += " + ";
                    }
                }
                
                feedbackDisplay.innerHTML = `Ayo belajar lagi! ${currentTable} × ${currentQuestion.multiplier} = ${currentQuestion.correctAnswer} 📚<br>
                ${currentTable} nya ada ${currentQuestion.multiplier} = ${addition}`;
                feedbackDisplay.className = "feedback-display incorrect";
                feedbackDisplay.classList.remove("hidden");
                
                // Add animation
                feedbackDisplay.style.position = "fixed";
                feedbackDisplay.style.top = "-100px";
                feedbackDisplay.style.left = "50%";
                feedbackDisplay.style.transform = "translateX(-50%)";
                feedbackDisplay.style.transition = "top 0.5s ease-out";
                
                // Animate down
                setTimeout(() => {
                    feedbackDisplay.style.top = "20px";
                }, 10);
                
                // Generate new question and hide feedback after 5 seconds
                setTimeout(() => {
                    feedbackDisplay.style.top = "-100px";
                    setTimeout(() => {
                        feedbackDisplay.classList.add('hidden');
                        // Clear answer and generate new question
                        answerInput.value = '';
                        currentAnswer = '';
                        generateNewQuestion();
                    }, 500);
                }, 5000);
            }
        }
    }
    
    // Add event listeners
    const learnBtn = document.getElementById('learn-btn');
    if (learnBtn) {
        learnBtn.addEventListener('click', function() {
            showScreen(learnScreen);
            // Hide tabs by default when entering learn screen
            if (learnTabs) {
                learnTabs.classList.add('hidden');
            }
            // Set default table to 1
            if (multiplicationTable) {
                multiplicationTable.value = "1";
                // Start learning immediately with default table
                startLearning();
            }
        });
    }
    
    if (quizBtn) {
        quizBtn.addEventListener('click', function() {
            showScreen(quizScreen);
            // Initialize quiz mode if it exists
            if (window.quizMode) {
                window.quizMode.init();
                window.quizMode.startGame();
            }
        });
    }
    
    // Add event listener to the multiplication table
    if (multiplicationTable) {
        multiplicationTable.addEventListener('change', function() {
            // Stop any active timer
            if (questionTimer) {
                clearTimeout(questionTimer);
                questionTimer = null;
            }
            
            // Stop any playing boom sound
            try {
                if (boomSound) {
                    boomSound.pause();
                    boomSound.currentTime = 0;
                }
            } catch (e) {
                console.log("Error stopping boom sound:", e);
            }
            
            currentTable = parseInt(this.value);
            
            // Reset pattern indices for new table
            currentPatternIndex = 0;
            currentQuestionInPattern = 0;
            
            showConceptTab(currentTable);
            setActiveTab(tabConcept);
        });
    }
    
    // Tab event listeners
    if (tabConcept) {
        tabConcept.addEventListener('click', function() {
            setActiveTab(tabConcept);
            showConceptTab(currentTable);
        });
    }
    
    if (tabVisual) {
        tabVisual.addEventListener('click', function() {
            setActiveTab(tabVisual);
            showVisualTab(currentTable);
        });
    }
    
    
    
    if (tabPractice) {
        tabPractice.addEventListener('click', function() {
            setActiveTab(tabPractice);
            showPracticeTab(currentTable);
        });
    }
    
    if (backToMenuLearn) {
        backToMenuLearn.addEventListener('click', function() {
            // Stop any active timer
            if (questionTimer) {
                clearTimeout(questionTimer);
                questionTimer = null;
            }
            
            // Stop any playing boom sound
            try {
                if (boomSound) {
                    boomSound.pause();
                    boomSound.currentTime = 0;
                }
            } catch (e) {
                console.log("Error stopping boom sound:", e);
            }
            
            showScreen(mainMenu);
            // Hide tabs when going back to main menu
            if (learnTabs) {
                learnTabs.classList.add('hidden');
            }
        });
    }
    
    if (backToMenuQuiz) {
        backToMenuQuiz.addEventListener('click', function() {
            // Stop quiz mode if it exists
            if (window.quizMode) {
                window.quizMode.stopGame();
            }
            showScreen(mainMenu);
        });
    }
    
    // Initialize with hidden tabs
    if (learnTabs) {
        learnTabs.classList.add('hidden');
    }
    
    console.log("Mode Belajar siap digunakan anak-anak! 🎓");
});