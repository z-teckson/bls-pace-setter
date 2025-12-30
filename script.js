// BLS Pace Setter - Core functionality
console.log('BLS Pace Setter loaded');

// DOM elements
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const movingDot = document.getElementById('movingDot');
const stimulatorArea = document.querySelector('.stimulator-area');

// State variables
let animationInterval = null;
let isAnimating = false;
let direction = 1; // 1 for moving right, -1 for moving left
let currentSpeed = 5; // default speed
let dotPosition = 0; // position in pixels from left edge
let maxPosition = 0; // will be set after DOM loads

// Calculate maximum horizontal movement
function calculateMaxPosition() {
    const containerWidth = stimulatorArea.clientWidth;
    const dotWidth = movingDot.clientWidth;
    maxPosition = containerWidth - dotWidth;
    // Initialize dot at center
    dotPosition = maxPosition / 2;
    updateDotPosition();
}

// Update dot position visually
function updateDotPosition() {
    movingDot.style.left = `${dotPosition}px`;
}

// Move dot one step based on direction and speed
function moveDot() {
    // Speed factor: higher slider value = faster movement
    const speedFactor = currentSpeed / 5; // normalize
    const step = 5 * speedFactor; // base step size
    
    dotPosition += direction * step;
    
    // Boundary check: reverse direction if hitting edges
    if (dotPosition <= 0) {
        dotPosition = 0;
        direction = 1;
    } else if (dotPosition >= maxPosition) {
        dotPosition = maxPosition;
        direction = -1;
    }
    
    updateDotPosition();
}

// Start the animation
function startAnimation() {
    if (isAnimating) return;
    console.log('Starting BLS animation');
    isAnimating = true;
    startStopBtn.innerHTML = '<i class="fas fa-pause"></i> Stop';
    startStopBtn.classList.remove('btn-primary');
    startStopBtn.classList.add('btn-secondary');
    
    // Use requestAnimationFrame for smooth animation
    function animate() {
        if (!isAnimating) return;
        moveDot();
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

// Stop the animation
function stopAnimation() {
    console.log('Stopping BLS animation');
    isAnimating = false;
    startStopBtn.innerHTML = '<i class="fas fa-play"></i> Start';
    startStopBtn.classList.remove('btn-secondary');
    startStopBtn.classList.add('btn-primary');
}

// Toggle animation
function toggleAnimation() {
    if (isAnimating) {
        stopAnimation();
    } else {
        startAnimation();
    }
}

// Reset dot to center and stop animation
function resetDot() {
    stopAnimation();
    dotPosition = maxPosition / 2;
    direction = 1;
    updateDotPosition();
}

// Update speed value display and variable
function updateSpeed() {
    currentSpeed = parseInt(speedSlider.value);
    speedValue.textContent = currentSpeed;
}

// Initialize on load
window.addEventListener('load', () => {
    calculateMaxPosition();
    updateSpeed();
    
    // Event listeners
    startStopBtn.addEventListener('click', toggleAnimation);
    resetBtn.addEventListener('click', resetDot);
    speedSlider.addEventListener('input', updateSpeed);
    
    // Adjust max position on window resize
    window.addEventListener('resize', calculateMaxPosition);
});

console.log('BLS Pace Setter initialized');