document.addEventListener('DOMContentLoaded', () => {
    const screen0 = document.getElementById('screen-0');
    const screen1 = document.getElementById('screen-1');
    const screen2 = document.getElementById('screen-2');
    const screen3 = document.getElementById('screen-3');
    
    const btn0 = document.getElementById('btn-0');
    const btn1 = document.getElementById('btn-1');
    const btn2 = document.getElementById('btn-2');

    const audio1 = document.getElementById('bg-audio-1');
    const audio2 = document.getElementById('bg-audio-2');
    const audio3 = document.getElementById('bg-audio-3');

    // Set volumes
    audio1.volume = 0.6;
    audio2.volume = 0.6;
    audio3.volume = 0.8;

    // Utility to switch screens with a fade effect
    function switchScreen(hideScreen, showScreen) {
        hideScreen.classList.remove('active');
        setTimeout(() => {
            hideScreen.style.display = 'none';
            showScreen.style.display = 'block';
            setTimeout(() => {
                showScreen.classList.add('active');
            }, 50);
        }, 500);
    }

    // Screen 0 -> Screen 1 (Bypass Autoplay & Start Eerie Music)
    btn0.addEventListener('click', () => {
        audio1.play().catch(e => console.log("Audio 1 missing or blocked:", e));
        switchScreen(screen0, screen1);
    });

    // Screen 1 -> Screen 2 (Standard Explosion + Transition Music)
    btn1.addEventListener('click', () => {
        // Switch Audio
        audio1.pause();
        audio1.currentTime = 0;
        
        // Start funny track at 48 seconds
        audio2.currentTime = 48;
        audio2.play().catch(e => console.log("Audio 2 missing or blocked:", e));

        // Fire explosion confetti
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#e94560', '#ffffff', '#ffd700']
        });

        switchScreen(screen1, screen2);
    });

    // Screen 2 -> Screen 3 (Screen shake + massive explosion + Wave on Wave)
    btn2.addEventListener('click', () => {
        // Switch Audio
        audio2.pause();
        audio2.currentTime = 0;
        
        // Start "Wave on Wave" right after the lyric (around 0:53)
        audio3.currentTime = 53;
        audio3.play().catch(e => console.log("Audio 3 missing or blocked:", e));

        // Shake the entire page
        document.body.classList.add('shake');
        setTimeout(() => {
            document.body.classList.remove('shake');
        }, 500);

        // Massive continuous burst for a few seconds
        const duration = 2500;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#e94560', '#ffb8b8', '#ffffff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#e94560', '#ffb8b8', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        switchScreen(screen2, screen3);
        
        // Start continuous gentle confetti for the heartfelt message
        setTimeout(() => {
            startGentleConfetti();
        }, 3000);
        
        // Start the picture carousel
        startCarousel();
    });

    // --- CAROUSEL LOGIC ---
    // Put your picture filenames here!
    const familyPictures = [
        'pic100.jpg',
        'pic101.jpg',
        'pic102.jpg',
        'pic103.jpg',
        'pic104.jpg',
        'pic105.jpg',
        'pic106.jpg',
        'pic107.jpg',
        'pic108.jpg',
        'pic109.jpg',
        'pic110.jpg',
        'pic111.jpg',
        'pic112.jpg',
        'pic113.jpg',
        'pic114.jpg',
        'pic115.jpg',
        'pic116.jpg',
        'pic117.jpg',
        'pic118.jpg',
        'pic119.jpg',
        'pic120.jpg',
        'pic121.jpg',
        'pic122.jpg',
        'pic123.jpg',
        'pic124.jpg',
        'pic125.jpg',
        'pic126.jpg',
        'pic127.jpg',
        'pic128.jpg',
        'pic129.jpg',
        'pic130.jpg',
        'pic131.jpg',
        'pic132.jpg',
        'pic133.jpg',
        'pic134.jpg',
        'pic135.jpg',
        'pic136.jpg',
        'pic137.jpg',
        'pic138.jpg',
        'pic139.jpg',
        'pic140.jpg',
        'pic141.jpg',
        'pic142.jpg',
        'pic143.jpg',
        'pic144.jpg',
        'pic145.jpg',
        'pic146.jpg',
        'pic147.jpg',
        'pic148.jpg',
        'pic149.jpg',
        'pic150.jpg',
        'pic151.jpg',
        'pic152.jpg',
        'pic153.jpg',
        'pic154.jpg',
        'pic155.jpg',
        'pic156.jpg',
        'pic157.jpg',
        'pic158.jpg',
        'pic159.jpg',
        'pic160.jpg',
        'pic161.jpg',
        'pic162.jpg',
        'pic163.jpg',
        'pic164.jpg'
    ];
    
    let currentImageIndex = 0;
    const carouselBg = document.getElementById('carousel-bg');
    
    function startCarousel() {
        if (familyPictures.length === 0) return;
        
        // Set the very first image immediately
        carouselBg.style.backgroundImage = `url('${familyPictures[0]}')`;
        
        // Fade to the next image every 5 seconds
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % familyPictures.length;
            carouselBg.style.backgroundImage = `url('${familyPictures[currentImageIndex]}')`;
        }, 5000);
    }

    // --- CONFETTI LOGIC ---
    function startGentleConfetti() {
        setInterval(() => {
            confetti({
                particleCount: 1,
                startVelocity: 0,
                ticks: 300,
                gravity: 0.3,
                origin: {
                    x: Math.random(),
                    y: Math.random() * 0.2 - 0.1
                },
                colors: ['#ffffff', '#ffb8b8', '#e94560'],
                scalar: Math.random() * 0.8 + 0.4
            });
        }, 200);
    }
});


