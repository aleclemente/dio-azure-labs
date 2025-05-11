class Roulette {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error('Canvas element not found:', canvasId);
            return;
        }
        this.context = this.canvas.getContext('2d');
        this.numbers = Array.from({ length: 37 }, (_, i) => i); // 0-36
        this.angle = 0;
        this.spinSpeed = 0;
        this.isSpinning = false;
        this.winningNumber = null;
        
        // Load spinning sound
        this.spinSound = new Audio('assets/sounds/spin.mp3');
        this.ballRollingSound = new Audio('assets/sounds/ball-rolling.mp3');
        this.winSound = new Audio('assets/sounds/win.mp3');
    }

    drawWheel() {
        const radius = this.canvas.width / 2;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.save();
        this.context.translate(radius, radius);
        this.context.rotate(this.angle);

        for (let i = 0; i < this.numbers.length; i++) {
            this.context.beginPath();
            this.context.moveTo(0, 0);
            this.context.arc(0, 0, radius, (i * Math.PI) / 18, ((i + 1) * Math.PI) / 18);
            this.context.fillStyle = i % 2 === 0 ? '#ff0000' : '#000000';
            this.context.fill();
            this.context.stroke();
            this.context.fillStyle = '#ffffff';
            this.context.fillText(this.numbers[i], radius / 2 * Math.cos((i + 0.5) * Math.PI / 18), radius / 2 * Math.sin((i + 0.5) * Math.PI / 18));
        }

        this.context.restore();
    }

    startSpin() {
        this.isSpinning = true;
        this.winningNumber = null;
        this.spinSpeed = Math.random() * 10 + 10; // Random speed
        
        try {
            this.spinSound.currentTime = 0;
            this.spinSound.play();
            
            setTimeout(() => {
                this.ballRollingSound.currentTime = 0;
                this.ballRollingSound.play();
            }, 1000);
        } catch (e) {
            console.log("Audio couldn't be played:", e);
        }
        
        this.animate();
    }

    animate() {
        if (this.isSpinning) {
            this.angle += this.spinSpeed * (Math.PI / 180);
            this.spinSpeed *= 0.99; // Simulate friction
            this.drawWheel();

            if (this.spinSpeed < 0.1) {
                this.isSpinning = false;
                this.determineWinningNumber();
            } else {
                requestAnimationFrame(this.animate.bind(this));
            }
        }
    }

    determineWinningNumber() {
        const finalAngle = this.angle % (2 * Math.PI);
        const index = Math.floor((finalAngle / (2 * Math.PI)) * this.numbers.length);
        this.winningNumber = this.numbers[(this.numbers.length - index) % this.numbers.length];
        console.log(`Winning Number: ${this.winningNumber}`);
        
        try {
            // Stop rolling sound
            this.ballRollingSound.pause();
            this.ballRollingSound.currentTime = 0;
            
            // Play win sound
            this.winSound.currentTime = 0;
            this.winSound.play();
        } catch (e) {
            console.log("Audio couldn't be played:", e);
        }
    }
}

// No need for export, class will be globally available