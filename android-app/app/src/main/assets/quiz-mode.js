// Quiz Mode JavaScript
class QuizMode {
    constructor() {
        this.score = 0;
        this.health = 100;
        this.level = 1;
        this.currentAnswer = '';
        this.currentQuestion = null;
        this.monsters = [];
        this.gameInterval = null;
        this.monsterInterval = null;
        this.isGameRunning = false;
        this.monsterSpeed = 10000; // milliseconds for monster to reach castle
    }

    init() {
        console.log("Initializing Quiz Mode...");
        this.setupEventListeners();
        this.generateNewQuestion();
    }

    setupEventListeners() {
        // Numpad buttons
        document.querySelectorAll('.numpad-btn[data-value]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const value = e.target.getAttribute('data-value');
                this.addToAnswer(value);
            });
        });

        // Control buttons
        const clearBtn = document.getElementById('clear-btn');
        const enterBtn = document.getElementById('enter-btn');
        const backToMenuQuiz = document.getElementById('back-to-menu-quiz');

        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAnswer());
        }

        if (enterBtn) {
            enterBtn.addEventListener('click', () => this.checkAnswer());
        }

        if (backToMenuQuiz) {
            backToMenuQuiz.addEventListener('click', () => {
                this.stopGame();
                // We'll need to implement showScreen function
                // For now, we'll just hide the quiz screen
                document.getElementById('quiz-screen').classList.add('hidden');
                document.getElementById('main-menu').classList.remove('hidden');
            });
        }

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                this.addToAnswer(e.key);
            } else if (e.key === 'Enter') {
                this.checkAnswer();
            } else if (e.key === 'Backspace') {
                this.clearAnswer();
            }
        });
    }

    startGame() {
        console.log("Starting Quiz Game...");
        this.isGameRunning = true;
        this.score = 0;
        this.health = 100;
        this.level = 1;
        this.updateUI();
        
        // Start generating monsters
        this.startMonsterSpawning();
        
        // Start game loop
        this.gameInterval = setInterval(() => {
            this.updateMonsters();
        }, 100);
    }

    stopGame() {
        console.log("Stopping Quiz Game...");
        this.isGameRunning = false;
        
        // Clear intervals
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
        
        if (this.monsterInterval) {
            clearInterval(this.monsterInterval);
            this.monsterInterval = null;
        }
        
        // Clear monsters
        this.monsters = [];
        const monsterContainer = document.getElementById('monster-container');
        if (monsterContainer) {
            monsterContainer.innerHTML = '';
        }
    }

    startMonsterSpawning() {
        // Generate a new monster every few seconds
        this.monsterInterval = setInterval(() => {
            if (this.isGameRunning) {
                this.generateMonster();
            }
        }, 4000); // Generate a monster every 4 seconds
        
        // Generate first monster immediately
        setTimeout(() => {
            if (this.isGameRunning) {
                this.generateMonster();
            }
        }, 1000);
    }

    generateMonster() {
        const monsterContainer = document.getElementById('monster-container');
        if (!monsterContainer) return;
        
        // Create monster element
        const monster = document.createElement('div');
        monster.className = 'monster';
        
        // Random monster emoji
        const monsters = ['👹', '👺', '👻', '👽', '🧟', '🦂', '🐍', '🕷', '🦠', '👾'];
        const monsterEmoji = monsters[Math.floor(Math.random() * monsters.length)];
        
        // Generate a question for this monster
        const question = this.generateMonsterQuestion();
        
        monster.innerHTML = `${monsterEmoji}<div class="monster-question">${question.question}</div>`;
        
        // Random horizontal position
        const leftPos = Math.random() * 80 + 10; // Between 10% and 90%
        monster.style.left = `${leftPos}%`;
        
        // Add to container
        monsterContainer.appendChild(monster);
        
        // Store monster data
        const monsterData = {
            element: monster,
            top: -100,
            speed: 0.5 + (this.level * 0.1), // Speed increases with level
            question: question
        };
        
        this.monsters.push(monsterData);
        
        console.log(`Monster generated: ${question.question}`);
    }

    generateMonsterQuestion() {
        // Generate random multiplication question based on level
        let multiplicand, multiplier;
        
        if (this.level <= 5) {
            // Easy level: 1-5
            multiplicand = Math.floor(Math.random() * 5) + 1;
            multiplier = Math.floor(Math.random() * 5) + 1;
        } else if (this.level <= 10) {
            // Medium level: 1-10
            multiplicand = Math.floor(Math.random() * 10) + 1;
            multiplier = Math.floor(Math.random() * 10) + 1;
        } else {
            // Hard level: up to 12
            multiplicand = Math.floor(Math.random() * 12) + 1;
            multiplier = Math.floor(Math.random() * 12) + 1;
        }
        
        const correctAnswer = multiplicand * multiplier;
        
        return {
            question: `${multiplicand} × ${multiplier}`,
            multiplicand: multiplicand,
            multiplier: multiplier,
            correctAnswer: correctAnswer
        };
    }

    updateMonsters() {
        // Update monster positions
        for (let i = this.monsters.length - 1; i >= 0; i--) {
            const monster = this.monsters[i];
            
            // Move monster down
            monster.top += monster.speed;
            monster.element.style.top = `${monster.top}px`;
            
            // Check if monster reached the castle
            if (monster.top > 200) { // Castle is at bottom
                this.monsterReachedCastle(monster);
                // Remove monster
                monster.element.remove();
                this.monsters.splice(i, 1);
            }
        }
    }

    monsterReachedCastle(monster) {
        console.log("Monster reached castle!");
        this.decreaseHealth(10);
        
        // Create explosion effect
        this.createExplosion(monster.element.offsetLeft, monster.element.offsetTop);
        
        // Play wrong sound
        // We'll implement this later
    }

    generateNewQuestion() {
        // Generate random multiplication question
        const multiplicand = Math.floor(Math.random() * 10) + 1;
        const multiplier = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = multiplicand * multiplier;
        
        this.currentQuestion = {
            question: `${multiplicand} × ${multiplier}`,
            multiplicand: multiplicand,
            multiplier: multiplier,
            correctAnswer: correctAnswer
        };
        
        // Update question display
        const questionElement = document.getElementById('question');
        if (questionElement) {
            questionElement.textContent = this.currentQuestion.question;
        }
        
        console.log(`New question generated: ${this.currentQuestion.question} = ?`);
    }

    addToAnswer(digit) {
        // Limit to 3 digits
        if (this.currentAnswer.length < 3) {
            this.currentAnswer += digit;
            this.updateAnswerDisplay();
        }
    }

    clearAnswer() {
        if (this.currentAnswer.length > 0) {
            this.currentAnswer = this.currentAnswer.slice(0, -1);
            this.updateAnswerDisplay();
        }
    }

    updateAnswerDisplay() {
        const answerValue = document.getElementById('answer-value');
        if (answerValue) {
            answerValue.textContent = this.currentAnswer;
        }
    }

    checkAnswer() {
        const userAnswer = parseInt(this.currentAnswer);
        
        if (isNaN(userAnswer)) {
            console.log("Please enter a number");
            return;
        }
        
        if (userAnswer === this.currentQuestion.correctAnswer) {
            console.log("Correct answer!");
            this.handleCorrectAnswer();
        } else {
            console.log("Wrong answer!");
            this.handleWrongAnswer();
        }
        
        // Clear answer and generate new question
        this.currentAnswer = '';
        this.updateAnswerDisplay();
        this.generateNewQuestion();
    }

    handleCorrectAnswer() {
        // Increase score
        this.score += 10 * this.level;
        
        // Play correct sound and show laser effect
        this.showLaserEffect();
        
        // Remove one monster (the closest to castle)
        if (this.monsters.length > 0) {
            const monsterToRemove = this.monsters.shift();
            this.destroyMonster(monsterToRemove);
        }
        
        // Update UI
        this.updateUI();
    }

    handleWrongAnswer() {
        // Decrease health
        this.decreaseHealth(5);
        
        // Play wrong sound
        // We'll implement this later
    }

    showLaserEffect() {
        const laser = document.getElementById('laser');
        if (laser) {
            laser.classList.add('laser-shoot');
            
            // Remove class after animation
            setTimeout(() => {
                laser.classList.remove('laser-shoot');
            }, 300);
        }
    }

    destroyMonster(monster) {
        if (!monster || !monster.element) return;
        
        // Create explosion effect
        this.createExplosion(
            monster.element.offsetLeft + monster.element.offsetWidth/2,
            monster.element.offsetTop + monster.element.offsetHeight/2
        );
        
        // Remove monster element
        monster.element.remove();
        
        // Find and remove monster from array
        const index = this.monsters.indexOf(monster);
        if (index > -1) {
            this.monsters.splice(index, 1);
        }
    }

    createExplosion(x, y) {
        const monsterContainer = document.getElementById('monster-container');
        if (!monsterContainer) return;
        
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        explosion.textContent = '💥';
        explosion.style.left = `${x}px`;
        explosion.style.top = `${y}px`;
        
        monsterContainer.appendChild(explosion);
        
        // Remove explosion after animation
        setTimeout(() => {
            if (explosion.parentNode) {
                explosion.parentNode.removeChild(explosion);
            }
        }, 500);
    }

    decreaseHealth(amount) {
        this.health -= amount;
        if (this.health < 0) this.health = 0;
        
        this.updateUI();
        
        // Check if game over
        if (this.health <= 0) {
            this.gameOver();
        }
    }

    updateUI() {
        // Update score
        const scoreValue = document.getElementById('score-value');
        if (scoreValue) {
            scoreValue.textContent = this.score;
        }
        
        // Update health
        const healthValue = document.getElementById('health-value');
        if (healthValue) {
            healthValue.textContent = this.health;
        }
        
        // Update level
        const levelValue = document.getElementById('level-value');
        if (levelValue) {
            levelValue.textContent = this.level;
        }
    }

    gameOver() {
        console.log("Game Over!");
        this.stopGame();
        
        // Show game over message
        alert(`Game Over! Skor akhir Anda: ${this.score}`);
        
        // Reset game
        this.score = 0;
        this.health = 100;
        this.level = 1;
        this.updateUI();
    }
}

// Initialize quiz mode when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const quizMode = new QuizMode();
    
    // Expose quizMode globally so we can access it from other scripts
    window.quizMode = quizMode;
    
    // Setup quiz button event listener
    const quizBtn = document.getElementById('quiz-btn');
    if (quizBtn) {
        quizBtn.addEventListener('click', () => {
            // Hide main menu and show quiz screen
            document.getElementById('main-menu').classList.add('hidden');
            document.getElementById('quiz-screen').classList.remove('hidden');
            
            // Initialize and start the quiz
            quizMode.init();
            quizMode.startGame();
        });
    }
});