import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import Lenis from '@studio-freight/lenis'
import barba from '@barba/core'

gsap.registerPlugin(ScrollTrigger, Flip);

// --- GLOBAL STATE ---
let flipState = null;
let lastClickedImg = null;

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

function updateClock() {
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
}
setInterval(updateClock, 1000);
updateClock();

const saveScroll = () => sessionStorage.setItem('homeScrollPos', lenis.scroll);
const restoreScroll = () => {
    const savedScroll = sessionStorage.getItem('homeScrollPos');
    if (savedScroll) {
        lenis.scrollTo(parseInt(savedScroll), { immediate: true });
    }
};

// --- ANIMATION WRAPPERS ---

function resetNav() {
    gsap.killTweensOf('.nav');
    gsap.set('.nav', { opacity: 1, y: 0, visibility: 'visible', pointerEvents: 'all' });
}

function initHomePageAnimations(container = document) {
    if (document.querySelector('#app')) gsap.set('#app', { opacity: 1 });

    const tl = gsap.timeline();
    const progressLabel = document.querySelector('.loader-text');
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (hasVisited) {
        gsap.set('.loader', { yPercent: -100 });
        initScroll(container);
        return;
    }

    if (progressLabel) {
        let progress = { value: 0 };
        tl.to(progress, {
            value: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => { progressLabel.textContent = Math.round(progress.value); }
        })
            .to('.loader', {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut",
                onComplete: () => { sessionStorage.setItem('hasVisited', 'true'); }
            }, "+=0.2")
            .from(container.querySelector('.hero-name'), { y: 100, opacity: 0, duration: 1.5, ease: "power3.out" }, "-=0.5")
            .from(container.querySelector('.nav-bio'), { y: 20, opacity: 0, duration: 1, ease: "power2.out" }, "-=1")
            .from('.nav', {
                y: -20, opacity: 0, duration: 1, ease: "power2.out",
                onComplete: () => initScroll(container)
            }, "-=0.8");
    } else {
        initScroll(container);
    }
}

function initScroll(container = document) {
    ScrollTrigger.getAll().forEach(t => t.kill());
    resetNav();

    const hero = container.querySelector('.hero');
    const heroName = container.querySelector('.hero-name');
    const footer = container.querySelector('.footer');
    const footerHeroName = container.querySelector('.footer-name .hero-name');

    if (hero && heroName) {
        const nameTl = gsap.timeline({
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                pin: heroName,
                pinSpacing: false,
                invalidateOnRefresh: true
            }
        });

        nameTl.to(heroName, { y: '45vh', duration: 0.7, ease: 'power1.in' })
            .to(heroName, { opacity: 0, duration: 0.35, ease: 'none' }, "<");

        if (document.querySelector('.nav')) {
            gsap.to('.nav', {
                opacity: 0, y: -100, ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    invalidateOnRefresh: true
                }
            });
        }
    }

    if (footer) {
        const footerTrigger = { trigger: footer, start: 'top 40%', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true };
        gsap.fromTo('.nav', { opacity: 0, y: -100 }, { opacity: 1, y: 0, ease: 'none', scrollTrigger: footerTrigger });
        if (footerHeroName) {
            gsap.fromTo(footerHeroName, { opacity: 0, y: '45vh' }, { opacity: 1, y: 0, ease: 'none', scrollTrigger: footerTrigger });
        }
    }

    ScrollTrigger.refresh();
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 200);
    initProjectHovers();
}

function initProjectHovers() {
    // Zoom removed per request, purely JS hooks if needed later
}

// --- BARBA JS ---

barba.init({
    transitions: [{
        name: 'fade-transition',
        async leave(data) {
            if (data.next.namespace === 'project' || data.current.namespace === 'project') {
                const trigger = data.trigger;
                // If the trigger is within a .projects-grid (like in our new "More Projects" section)
                const clickedImage = trigger instanceof Element ? trigger.querySelector('.project-image') : null;
                if (clickedImage) {
                    flipState = Flip.getState(clickedImage);
                    lastClickedImg = clickedImage;
                }
            }
            if (data.current.namespace === 'home') saveScroll();

            return gsap.to(data.current.container, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
        },
        async enter(data) {
            window.scrollTo(0, 0);
            if (lenis) lenis.scrollTo(0, { immediate: true });
            ScrollTrigger.refresh();

            if (data.next.namespace === 'project') {
                const heroImage = data.next.container.querySelector('.project-detail-hero img');
                gsap.set(data.next.container, { opacity: 1 }); // Ensure visibility for Flip

                if (heroImage && flipState) {
                    Flip.from(flipState, {
                        targets: heroImage,
                        duration: 1.2,
                        ease: "power4.inOut",
                        scale: true,
                        absolute: true
                    });
                    flipState = null;
                }

                gsap.from('.project-detail-metadata > *', {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.05,
                    ease: "power3.out",
                    delay: 0.2
                });
            }

            if (data.next.namespace === 'home') {
                if (flipState) {
                    const targetImg = Array.from(document.querySelectorAll('.project-image')).find(img => {
                        return img.getAttribute('src') === lastClickedImg?.getAttribute('src');
                    });

                    if (targetImg) {
                        Flip.from(flipState, {
                            targets: targetImg,
                            duration: 1.2,
                            ease: "power4.inOut",
                            scale: true,
                            absolute: true
                        });
                    }
                    flipState = null;
                }
            }

            return gsap.from(data.next.container, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut"
            });
        }
    }],
    views: [{
        namespace: 'home',
        beforeEnter(data) {
            // STRATEGY B: Clean Reset
            // Force reset to top and kill all scroll triggers to prevent ghost states
            window.scrollTo(0, 0);
            if (lenis) lenis.scrollTo(0, { immediate: true });
            ScrollTrigger.getAll().forEach(t => t.kill());

            initHomePageAnimations(data.next.container);
        }
    }, {
        namespace: 'project',
        beforeEnter(data) {
            gsap.set('.nav', { opacity: 0, visibility: 'hidden', pointerEvents: 'none' });
            gsap.set(data.next.container, { opacity: 1 });
            gsap.set('.loader', { yPercent: -100 });

            // Ensure project pages also start at top
            window.scrollTo(0, 0);
            if (lenis) lenis.scrollTo(0, { immediate: true });
        }
    }]
});
