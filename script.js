// === INTERAKTIF CANVAS DRAWING ===
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas-art');
    const ctx = canvas.getContext('2d');
    const clearBtn = document.getElementById('clear-btn');
    const randomBtn = document.getElementById('random-btn');
    const colorPicker = document.getElementById('color-picker');
    
    let isDrawing = false;
    let currentColor = colorPicker.value;
    const lineWidth = 5;
    
    // Update warna saat dipilih dari color picker
    colorPicker.addEventListener('input', function() {
        currentColor = this.value;
    });
    
    // Fungsi menggambar
    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }
    
    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;
        
        // Dapatkan posisi mouse/touch
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    
    // Event Listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Tombol Clear
    clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    
    // Tombol Warna Acak
    randomBtn.addEventListener('click', () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        currentColor = `rgb(${r}, ${g}, ${b})`;
        colorPicker.value = rgbToHex(r, g, b);
    });
    
    // Fungsi konversi RGB ke HEX
    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    
    // Animasi teks header
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.3}s`;
    });

    // Handle touch events for mobile devices
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', stopDrawing);

    function handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }

    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }
});