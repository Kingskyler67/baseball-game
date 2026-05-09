// Game Constants
const TOTAL_INNINGS = 9;
const STRIKES_FOR_OUT = 3;
const BALLS_FOR_WALK = 4;
const OUTS_PER_INNING = 3;

// Game State
let gameState = {
    homeScore: 0,
    awayScore: 0,
    currentInning: 1,
    isHomeBatting: true,
    balls: 0,
    strikes: 0,
    outs: 0,
    runners: [false, false, false], // [first, second, third]
    gameOver: false,
    isPitching: false,
    pitchThrown: false
};

// DOM Elements
const pitchBtn = document.getElementById('pitchBtn');
const swingBtn = document.getElementById('swingBtn');
const newGameBtn = document.getElementById('newGameBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const gameOverModal = document.getElementById('gameOverModal');
const gameLog = document.getElementById('gameLog');
const pitchTarget = document.getElementById('pitchTarget');

// Event Listeners
pitchBtn.addEventListener('click', handlePitch);
swingBtn.addEventListener('click', handleSwing);
newGameBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', resetGame);

// Keyboard Controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (!gameState.isPitching && !gameState.gameOver) {
            if (!gameState.pitchThrown) {
                handlePitch();
            } else if (swingBtn.disabled === false) {
                handleSwing();
            }
        }
    }
});

// Pitch Ball
function handlePitch() {
    if (gameState.isPitching || gameState.gameOver) return;

    gameState.isPitching = true;
    gameState.pitchThrown = true;
    pitchBtn.disabled = true;
    swingBtn.disabled = false;

    // Create pitch animation
    const zone = document.querySelector('.pitch-zone');
    const isStrike = Math.random() > 0.4;

    pitchTarget.style.display = 'block';
    pitchTarget.style.left = isStrike
        ? `${20 + Math.random() * 60}%`
        : (Math.random() > 0.5 ? '-30px' : 'calc(100% + 10px)');
    pitchTarget.style.bottom = isStrike
        ? `${15 + Math.random() * 70}%`
        : (Math.random() > 0.5 ? '100%' : '-30px');

    // Store if strike zone
    gameState.lastPitchWasStrike = isStrike;

    // Add log
    addLog(`⚾ Pitch thrown ${isStrike ? '(Strike zone)' : '(Ball zone)'}`);

    setTimeout(() => {
        pitchTarget.style.display = 'none';
    }, 2000);
}

// Swing
function handleSwing() {
    if (!gameState.pitchThrown || gameState.gameOver) return;

    swingBtn.disabled = true;
    pitchBtn.disabled = false;
    gameState.pitchThrown = false;
    gameState.isPitching = false;

    const isStrike = gameState.lastPitchWasStrike;

    if (!isStrike) {
        // Swing at ball
        gameState.balls++;
        addLog('⚾ Ball! (Swung at bad pitch)', 'ball');
    } else {
        // Swing at strike
        const hitChance = Math.random();

        if (hitChance > 0.5) {
            // Miss
            gameState.strikes++;
            addLog('❌ Strike! (Missed)', 'out');
        } else {
            // Hit!
            handlePerfectHit();
            updateUI();
            return;
        }
    }

    // Check for walk (4 balls)
    if (gameState.balls >= BALLS_FOR_WALK) {
        addLog('🚶 Walk! Runner on first', 'hit');
        gameState.balls = 0;
        gameState.strikes = 0;
        gameState.runners[0] = true;
        updateUI();
        return;
    }

    // Check for out (3 strikes)
    if (gameState.strikes >= STRIKES_FOR_OUT) {
        addLog('🔴 STRIKE OUT! Out!', 'out');
        gameState.outs++;
        gameState.balls = 0;
        gameState.strikes = 0;
        gameState.runners = [false, false, false];

        if (gameState.outs >= OUTS_PER_INNING) {
            advanceInning();
        }
    }

    updateUI();
}

// Handle Perfect Hit
function handlePerfectHit() {
    const hitType = Math.random();
    const baseHitChance = Math.random() > 0.3;

    let runScored = 0;

    if (hitType > 0.7) {
        // Home Run!
        addLog('🏠 HOME RUN! Score!', 'hit');
        // Score all runners
        runScored = 1 + gameState.runners.filter(r => r).length;
        gameState.runners = [false, false, false];
    } else if (hitType > 0.5) {
        // Triple
        addLog('3️⃣ TRIPLE! Base Hit!', 'hit');
        runScored = advanceRunners(2);
        gameState.runners = [false, false, true];
    } else if (hitType > 0.3) {
        // Double
        addLog('2️⃣ DOUBLE! Base Hit!', 'hit');
        runScored = advanceRunners(1);
        gameState.runners = [false, true, false];
    } else {
        // Single
        addLog('1️⃣ SINGLE! Base Hit!', 'hit');
        runScored = advanceRunners(0);
        gameState.runners = [true, false, false];
    }

    // Award runs
    if (gameState.isHomeBatting) {
        gameState.homeScore += runScored;
    } else {
        gameState.awayScore += runScored;
    }

    if (runScored > 0) {
        addLog(`${runScored} run${runScored > 1 ? 's' : ''} scored!`, 'hit');
    }

    // Reset count
    gameState.balls = 0;
    gameState.strikes = 0;
}

// Advance Runners
function advanceRunners(bases) {
    let runsScored = 0;

    // Third base to home
    if (gameState.runners[2]) {
        runsScored++;
    }

    // Advance runners
    if (bases === 2) {
        gameState.runners[2] = gameState.runners[1];
        gameState.runners[1] = gameState.runners[0];
    } else if (bases === 1) {
        gameState.runners[2] = gameState.runners[1];
        gameState.runners[1] = gameState.runners[0];
    }

    return runsScored;
}

// Advance to Next Inning
function advanceInning() {
    if (gameState.isHomeBatting) {
        // Away team now bats
        gameState.isHomeBatting = false;
        addLog('📍 Away team batting');
    } else {
        // Next inning
        if (gameState.currentInning >= TOTAL_INNINGS) {
            endGame();
        } else {
            gameState.currentInning++;
            gameState.isHomeBatting = true;
            addLog(`📍 Inning ${gameState.currentInning} - Home team batting`);
        }
    }

    // Reset counters
    gameState.balls = 0;
    gameState.strikes = 0;
    gameState.outs = 0;
    gameState.runners = [false, false, false];
}

// End Game
function endGame() {
    gameState.gameOver = true;
    const homeWins = gameState.homeScore > gameState.awayScore;
    const title = homeWins ? '🎉 HOME WINS! 🎉' : '🎉 AWAY WINS! 🎉';
    const message = `Home: ${gameState.homeScore} | Away: ${gameState.awayScore}`;

    document.getElementById('gameOverTitle').textContent = title;
    document.getElementById('gameOverMessage').textContent = message;
    document.getElementById('finalHomeScore').textContent = gameState.homeScore;
    document.getElementById('finalAwayScore').textContent = gameState.awayScore;

    gameOverModal.classList.add('show');
    addLog('🏁 GAME OVER!');
}

// Update UI
function updateUI() {
    // Scores
    document.getElementById('homeScore').textContent = gameState.homeScore;
    document.getElementById('awayScore').textContent = gameState.awayScore;
    document.getElementById('inningNumber').textContent = gameState.currentInning;
    document.getElementById('inningStatus').textContent = gameState.isHomeBatting ? 'Home Batting' : 'Away Batting';

    // Stats
    document.getElementById('balls').textContent = gameState.balls;
    document.getElementById('strikes').textContent = gameState.strikes;
    document.getElementById('outs').textContent = gameState.outs;
    document.getElementById('runners').textContent = gameState.runners.filter(r => r).length;

    // Runners
    document.getElementById('firstBase').classList.toggle('active', gameState.runners[0]);
    document.getElementById('secondBase').classList.toggle('active', gameState.runners[1]);
    document.getElementById('thirdBase').classList.toggle('active', gameState.runners[2]);

    // Button states
    if (!gameState.gameOver) {
        pitchBtn.disabled = gameState.isPitching || gameState.pitchThrown;
        swingBtn.disabled = !gameState.pitchThrown;
    }
}

// Add Log Entry
function addLog(message, type = '') {
    const entry = document.createElement('p');
    entry.className = `log-entry ${type}`;
    entry.textContent = message;
    gameLog.insertBefore(entry, gameLog.firstChild);

    // Keep only last 10 entries
    while (gameLog.children.length > 10) {
        gameLog.removeChild(gameLog.lastChild);
    }
}

// Reset Game
function resetGame() {
    gameState = {
        homeScore: 0,
        awayScore: 0,
        currentInning: 1,
        isHomeBatting: true,
        balls: 0,
        strikes: 0,
        outs: 0,
        runners: [false, false, false],
        gameOver: false,
        isPitching: false,
        pitchThrown: false
    };

    gameOverModal.classList.remove('show');
    gameLog.innerHTML = '<p class="log-entry">⚾ Welcome to Baseball 9! Let\'s play ball!</p>';
    updateUI();
}

// Initialize
updateUI();
