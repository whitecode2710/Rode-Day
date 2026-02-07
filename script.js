let noCount = 0;
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const mainCard = document.getElementById('main-card');
const successMessage = document.getElementById('success-message');
const music = document.getElementById('bgMusic');
const heartbreakOverlay = document.getElementById('heartbreak-overlay');

// Ensure the No button is visible and interactive at the start
noBtn.style.position = 'relative';

function moveButton() {
    if (noCount < 3) {
        // Calculate safe boundaries
        const padding = 50;
        const maxX = window.innerWidth - noBtn.offsetWidth - padding;
        const maxY = window.innerHeight - noBtn.offsetHeight - padding;

        // Generate random coordinates within boundaries
        const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
        const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.zIndex = "999";
        
        noCount++;

        if (noCount === 3) {
            showPopup("I Dare You Click No, Again", 3000);
            // After the "dare", make it stay still so she can actually click it
            setTimeout(() => {
                noBtn.style.position = 'static';
                document.querySelector('.btn-group').appendChild(noBtn);
            }, 3000);
        }
    }
}

// Attach event listeners for both Mouse and Touch
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveButton();
});

// Logic for when she finally clicks "No" after 3 jumps
noBtn.addEventListener('click', () => {
    if (noCount >= 3) {
        heartbreakOverlay.classList.remove('hidden');
        document.getElementById('heartbreak-text').innerText = "Mera to Dil todd Ditta...";
        
        // Start the broken heart shower
        const heartInterval = setInterval(() => spawnElement("💔"), 100);

        setTimeout(() => {
            heartbreakOverlay.classList.add('hidden');
            noBtn.style.display = 'none'; // Hide No button permanently
            clearInterval(heartInterval);
            showPopup("Now click Yes 😒", 4000);
            yesBtn.style.transform = "scale(1.6)";
            yesBtn.style.boxShadow = "0 0 20px #ff4d6d";
        }, 3000);
    }
});

// Yes Button Celebration
yesBtn.addEventListener('click', () => {
    mainCard.classList.add('hidden');
    successMessage.classList.remove('hidden');
    
    // Play music (Handles browser blocks)
    music.play().catch(() => console.log("Music play blocked until user interaction"));
    
    // Start Rose shower
    setInterval(() => spawnElement("🌹"), 150);
});

// Universal spawner for Falling Hearts and Roses
function spawnElement(symbol) {
    const el = document.createElement('div');
    el.innerHTML = symbol;
    el.style.position = 'fixed';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '-50px';
    el.style.fontSize = Math.random() * 20 + 20 + 'px';
    el.style.zIndex = '1000';
    el.style.pointerEvents = 'none';
    el.style.transition = 'transform 4s linear, opacity 4s';
    
    document.body.appendChild(el);

    // Animate falling
    setTimeout(() => {
        el.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
        el.style.opacity = '0';
    }, 100);

    // Clean up
    setTimeout(() => el.remove(), 4000);
}

function showPopup(text, duration) {
    const p = document.getElementById('popup-msg');
    p.innerText = text;
    p.classList.remove('hidden');
    setTimeout(() => p.classList.add('hidden'), duration);
}
