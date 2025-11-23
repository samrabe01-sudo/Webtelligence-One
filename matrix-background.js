// Matrix Code Rain Background for Avatar
// Siyah arka plan üstünde yeşil kod karakterleri yağmur gibi akacak

class MatrixRainBackground {
    constructor(containerId) {
        this.container = document.querySelector(containerId);
        if (!this.container) {
            console.error('Matrix container not found:', containerId);
            return;
        }
        
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'matrixCanvas';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.borderRadius = '50%';
        this.canvas.style.zIndex = '1';
        this.canvas.style.pointerEvents = 'none';
        
        this.ctx = this.canvas.getContext('2d');
        
        // Insert canvas as first child (behind avatar)
        this.container.insertBefore(this.canvas, this.container.firstChild);
        
        // Matrix characters
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/|~`';
        this.characters += 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        
        // Initialize drops
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100; // Start above canvas
        }
    }
    
    draw() {
        // Semi-transparent black background for trail effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Matrix green text
        this.ctx.fillStyle = '#0F0'; // Bright green
        this.ctx.font = this.fontSize + 'px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            // Random character
            const char = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            
            // Draw character
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillText(char, x, y);
            
            // Random reset
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            // Move drop down
            this.drops[i]++;
        }
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize Matrix background when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for the avatar to be fully loaded
    setTimeout(() => {
        const matrixBg = new MatrixRainBackground('.avatar-container');
        console.log('🎬 Matrix Rain Background Initialized!');
    }, 500);
});
