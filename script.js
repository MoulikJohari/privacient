// --- 1. Typewriter Effect ---
const words = ["Your Culture", "You!", "Your Business", "Your Team"];
let wordIndex = 0;
let isDeleting = false;
let text = '';
const typeSpeed = 100;
const deleteSpeed = 50;
const pauseTime = 2000; // How long to wait before deleting

function typeWriter() {
    const currentWord = words[wordIndex % words.length];
    
    if (isDeleting) {
        text = currentWord.substring(0, text.length - 1);
    } else {
        text = currentWord.substring(0, text.length + 1);
    }

    document.querySelector('.changing-text').innerHTML = text;

    let timer = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && text === currentWord) {
        timer = pauseTime;
        isDeleting = true;
    } else if (isDeleting && text === '') {
        isDeleting = false;
        wordIndex++;
        timer = 500; // Slight pause before typing next word
    }

    setTimeout(typeWriter, timer);
}

// Start the typewriter loop
typeWriter();


// --- 2. Canvas Background Waves ---
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let time = 0;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function animateWaves() {
    ctx.clearRect(0, 0, width, height);
    
    // Config for the waves
    const waves = [
        { amplitude: 40, frequency: 0.002, speed: 0.01, color: 'rgba(92, 184, 255, 0.15)', offset: 0 },
        { amplitude: 60, frequency: 0.0015, speed: 0.015, color: 'rgba(92, 184, 255, 0.1)', offset: Math.PI / 2 },
        { amplitude: 30, frequency: 0.003, speed: 0.008, color: 'rgba(255, 255, 255, 0.05)', offset: Math.PI }
    ];

    waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, height / 2);

        for (let x = 0; x < width; x++) {
            // Calculate sine wave math
            const y = height / 2 + Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude;
            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    });

    time += 1;
    requestAnimationFrame(animateWaves);
}

// Start wave animation
animateWaves();