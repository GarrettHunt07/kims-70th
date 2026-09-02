document.addEventListener('DOMContentLoaded', () => {
    const screen0 = document.getElementById('screen-0');
    const screen1 = document.getElementById('screen-1');
    const screen2 = document.getElementById('screen-2');
    const screen3 = document.getElementById('screen-3');
    
    // Screen 3: Show Daughter Message
    const btn3 = document.getElementById('btn-3');
    const toastContent = document.getElementById('toast-content');
    const daughterMessage = document.getElementById('daughter-message');

    let btn3ClickedTime = 0;
    let freeBirdStarted = false;
    const DAUGHTER_FULL_REVEAL_MS = 15500; // All lines finish blooming in at ~15.5s
    const EXTRA_WAIT_MS = 5000;            // Wait 5 seconds after completely visible
    const TOTAL_MIN_DISPLAY_MS = DAUGHTER_FULL_REVEAL_MS + EXTRA_WAIT_MS; // 20.5s total

    btn3.addEventListener('click', () => {
        btn3ClickedTime = Date.now();
        toastContent.style.display = 'none';
        daughterMessage.classList.remove('hidden');
        daughterMessage.classList.add('active');
        
        // If Free Bird has ALREADY started playing when he clicks the button:
        // Wait until the message is completely visible, then fade out after 5 seconds!
        if (freeBirdStarted) {
            setTimeout(() => {
                daughterMessage.classList.add('fade-out');
            }, TOTAL_MIN_DISPLAY_MS);
        }
    });

    // Tap/click screen 3 to bring the message back or hide it again
    screen3.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') return;
        if (daughterMessage.classList.contains('active')) {
            daughterMessage.classList.toggle('fade-out');
        }
    });

    const btn0 = document.getElementById('btn-0');
    const btn1 = document.getElementById('btn-1');
    const btn2 = document.getElementById('btn-2');

    const audio1 = document.getElementById('bg-audio-1');
    const audio2 = document.getElementById('bg-audio-2');
    const audio3 = document.getElementById('bg-audio-3');
    const audio4 = document.getElementById('bg-audio-4');

    // Set volumes
    audio1.volume = 0.6;
    audio2.volume = 0.6;
    audio3.volume = 0.8;

    // Utility to switch screens with a fade effect
    function switchScreen(hideScreen, showScreen) {
        hideScreen.classList.remove('active');
        setTimeout(() => {
            hideScreen.style.display = 'none';
            showScreen.classList.remove('hidden');
            showScreen.style.display = 'flex';
            setTimeout(() => {
                showScreen.classList.add('active');
            }, 50);
        }, 500);
    }

    // Screen 0 -> Screen 1 (Bypass Autoplay & Start Eerie Music)
    btn0.addEventListener('click', () => {
        requestWakeLock();
        preloadFamilyPictures();
        audio1.play().catch(e => console.log("Audio 1 missing or blocked:", e));
        switchScreen(screen0, screen1);
        
        // Trigger Upside Down vibe
        document.body.classList.add('upside-down');
        startUpsideDownAsh();
    });

    const audioPowerup = document.getElementById('bg-audio-powerup');
    audioPowerup.volume = 0.9;

    // Screen 1 -> Screen 2 (Standard Explosion + Transition Music)
    btn1.addEventListener('click', () => {
        // Stop Upside Down vibe & Eerie music instantly
        document.body.classList.remove('upside-down');
        stopUpsideDownAsh();
        audio1.pause();
        audio1.currentTime = 0;
        
        // Play Mario Power Up Sound
        audioPowerup.play().catch(e => console.log("Powerup missing:", e));

        // Wait ~2 seconds (1s for Mario sound + 1s gap) then drop Stayin' Alive
        setTimeout(() => {
            audio2.currentTime = 82.5;
            audio2.play().catch(e => console.log("Audio 2 missing:", e));
        }, 2000);

        // Fire explosion confetti and start background fireworks
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#e94560', '#ffffff', '#ffd700']
        });
        startFireworks();
        
        // Move to next screen
        switchScreen(screen1, screen2);
    });

    // Screen 2 -> Screen 3 (Screen shake + massive explosion + Wave on Wave)
    btn2.addEventListener('click', () => {
        // Stop the fireworks from Screen 2
        stopFireworks();
        
        // Stop funny track
        audio2.pause();
        audio2.currentTime = 0;
        
        // Start "Wave on Wave" 3 seconds further forward right before the last big chorus (around 3:03 / 183s)
        audio3.currentTime = 183;
        audio3.volume = 0.8;
        audio3.play().catch(e => console.log("Audio 3 missing or blocked:", e));
        setupFreeBirdBlend();

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
        
        // Start the scrolling film reel
        startFilmReel();
    });

    // --- FILM REEL LOGIC ---
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
    
    function startFilmReel() {
        const track = document.getElementById('film-reel-track');
        if (!track || familyPictures.length === 0) return;
        
        // Duplicate array so it scrolls seamlessly in a loop
        const loopPics = [...familyPictures, ...familyPictures];
        
        loopPics.forEach(pic => {
            const img = document.createElement('img');
            img.src = pic;
            img.className = 'film-frame';
            img.loading = 'eager'; // Eager loading prevents blackout when scrolling horizontally
            img.decoding = 'async'; // Smooth background decoding
            track.appendChild(img);
        });
        
        // Let's give each image about 6 seconds of screen time as it scrolls by
        const duration = familyPictures.length * 6; 
        track.style.animation = `scrollReel ${duration}s linear infinite`;
    }

    // Preload pictures in background from start so they are already cached
    function preloadFamilyPictures() {
        familyPictures.forEach(pic => {
            const img = new Image();
            img.src = pic;
        });
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

    // --- SONG BLENDING: WAVE ON WAVE -> FREE BIRD (LYNYRD SKYNYRD) ---
    let isBlendingToFreeBird = false;

    function setupFreeBirdBlend() {
        if (!audio3 || !audio4) return;
        audio4.load(); // Preload Free Bird in background
        audio4.volume = 0;

        audio3.addEventListener('timeupdate', () => {
            if (audio3.duration && !isBlendingToFreeBird) {
                // When 7 seconds remain in Wave on Wave, start crossfading into Free Bird
                const timeLeft = audio3.duration - audio3.currentTime;
                if (timeLeft <= 7 && timeLeft > 0) {
                    isBlendingToFreeBird = true;
                    blendToFreeBird();
                }
            }
        });

        // Backup in case timeupdate misses the window or track ends
        audio3.addEventListener('ended', () => {
            if (!isBlendingToFreeBird) {
                isBlendingToFreeBird = true;
                audio4.volume = 0.8;
                audio4.play().catch(e => console.log("Free Bird play error:", e));
            }
        });
    }

    function blendToFreeBird() {
        console.log("Blending Wave on Wave into Free Bird by Lynyrd Skynyrd...");
        freeBirdStarted = true;
        
        // Keep the first half of the message (toastContent) visible indefinitely until the button is pressed!

        // If Kim clicked the daughter button:
        if (btn3ClickedTime && daughterMessage) {
            const elapsed = Date.now() - btn3ClickedTime;
            if (elapsed >= TOTAL_MIN_DISPLAY_MS) {
                // The message has already been completely visible for at least 5 seconds:
                // Fade out right on cue with the start of Free Bird!
                daughterMessage.classList.add('fade-out');
            } else {
                // Free Bird started before the message finished or before 5 seconds passed:
                // Wait until it is completely visible, then fade out after 5 seconds!
                const remainingWait = TOTAL_MIN_DISPLAY_MS - elapsed;
                setTimeout(() => {
                    daughterMessage.classList.add('fade-out');
                }, remainingWait);
            }
        }

        audio4.currentTime = 0;
        audio4.volume = 0;
        audio4.play().catch(e => console.log("Free Bird play error:", e));

        const fadeSteps = 35;
        const stepInterval = 170; // ~6 seconds total crossfade
        const startVolume3 = audio3.volume || 0.8;
        const targetVolume4 = 0.8;
        let currentStep = 0;

        const crossfadeTimer = setInterval(() => {
            currentStep++;
            const progress = currentStep / fadeSteps;

            audio3.volume = Math.max(0, startVolume3 * (1 - progress));
            audio4.volume = Math.min(targetVolume4, targetVolume4 * progress);

            if (currentStep >= fadeSteps) {
                clearInterval(crossfadeTimer);
                audio3.pause();
                audio3.volume = 0;
                audio4.volume = targetVolume4;
            }
        }, stepInterval);
    }
});




    // --- UPSIDE DOWN ASH LOGIC ---
    let ashInterval;
    function startUpsideDownAsh() {
        ashInterval = setInterval(() => {
            confetti({
                particleCount: 2,
                startVelocity: 0,
                ticks: 400,
                gravity: -0.05,
                origin: {
                    x: Math.random(),
                    y: Math.random() * 0.5 + 0.5
                },
                colors: ['#ffffff', '#cccccc', '#888888'],
                shapes: ['circle', 'square'],
                scalar: Math.random() * 0.4 + 0.1,
                disableForReducedMotion: true
            });
        }, 300);
    }
    
    function stopUpsideDownAsh() {
        clearInterval(ashInterval);
    }



    // --- FIREWORKS LOGIC ---
    let fireworksInterval;
    function startFireworks() {
        const randomInRange = (min, max) => Math.random() * (max - min) + min;
        fireworksInterval = setInterval(function() {
            // Realistic fireworks: small circles, decaying velocity
            confetti({
                startVelocity: 35,
                spread: 360,
                ticks: 60,
                zIndex: 0,
                particleCount: 80,
                shapes: ['circle'],
                colors: ['#ff0000', '#ffd700', '#ff00ff', '#00ffff', '#00ff00'],
                scalar: 0.6,
                decay: 0.92,
                gravity: 0.7,
                origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
            });
        }, 800); // 800ms between bursts
    }
    
    function stopFireworks() {
        clearInterval(fireworksInterval);
    }

    // --- SCREEN WAKE LOCK (PREVENTS SCREEN TIMEOUT ON MOBILE/DESKTOP) ---
    let wakeLock = null;

    async function requestWakeLock() {
        try {
            if ('wakeLock' in navigator) {
                wakeLock = await navigator.wakeLock.request('screen');
                console.log('Screen Wake Lock active: display will not timeout.');
                wakeLock.addEventListener('release', () => {
                    console.log('Screen Wake Lock released.');
                    wakeLock = null;
                });
            } else {
                activateIOSWakeLockFallback();
            }
        } catch (err) {
            console.log('Wake Lock note:', err);
            activateIOSWakeLockFallback();
        }
    }

    // Fallback for older iOS Safari: silent 1x1 inline video loop
    function activateIOSWakeLockFallback() {
        try {
            if (document.getElementById('ios-wake-video')) return;
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, 1, 1);
            if (canvas.captureStream) {
                const stream = canvas.captureStream(1);
                const video = document.createElement('video');
                video.id = 'ios-wake-video';
                video.muted = true;
                video.playsInline = true;
                video.setAttribute('playsinline', '');
                video.srcObject = stream;
                video.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0.01;pointer-events:none;z-index:-1;';
                document.body.appendChild(video);
                video.play().catch(() => {});
            }
        } catch (e) {}
    }

    // Re-acquire lock if user switches away from tab/app and comes back
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            requestWakeLock();
        }
    });

    // Acquire on user interactions
    ['click', 'touchstart', 'pointerdown'].forEach(evt => {
        document.addEventListener(evt, () => {
            if (!wakeLock) {
                requestWakeLock();
            }
        }, { passive: true });
    });

