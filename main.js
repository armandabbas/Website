import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import Lenis from '@studio-freight/lenis'
import barba from '@barba/core'

gsap.registerPlugin(ScrollTrigger, Flip);

// --- CURSOR SWAP MECHANIC ---
class CursorManager {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.navIcon = document.querySelector('.pretzel-icon');
        this.isActive = false;

        // Path for the custom cursor (always a pretzel)
        this.pretzelPath = `M484.892,128.69c-9.559-17.154-21.476-32.687-35.418-46.159c-14.551-14.083-31.304-25.903-49.768-35.128   c-23.686-11.85-50.214-18.122-76.846-18.122c-17.014,0.008-34.019,2.507-50.549,7.439c-4.791,1.428-9.054,3.973-12.513,7.312   c-1.622-0.699-3.266-1.391-4.918-2.053c-21.09-8.414-43.207-12.691-65.851-12.699c-26.513,0-53.049,6.272-76.712,18.114   c-18.486,9.24-35.24,21.053-49.776,35.121c-20.792,20.086-36.779,44.27-47.521,71.877C5.059,179.998,0.008,207.5,0,236.119   c0.008,30.248,5.616,60.116,16.679,88.764c8.466,21.916,19.93,42.411,34.064,60.927c22.488,29.474,51.984,53.725,85.282,70.121   c36.012,17.772,76.325,26.788,119.829,26.788h0.246c38.713,0,75.061-7.179,108.024-21.328   c23.53-10.095,45.119-23.656,64.156-40.313c26.573-23.247,48.235-52.825,62.652-85.558c13.77-31.304,21.053-65.673,21.068-99.409   C511.993,197.673,502.627,160.537,484.892,128.69z M462.902,323.187c-12.229,27.778-30.538,53.644-54.782,74.838   c-16.142,14.134-34.926,26.156-56.062,35.224c-28.179,12.088-60.502,18.858-96.054,18.843c-40.008,0.023-75.91-8.562-106.432-23.62   c-30.538-15.034-55.564-36.437-74.488-61.231c-12.625-16.545-22.578-34.585-29.839-53.399   c-9.678-25.07-14.618-51.494-14.626-77.732c0.008-24.118,4.189-48.116,12.945-70.612c8.741-22.474,22.131-43.452,40.253-60.964   c12.066-11.672,26.209-21.767,42.188-29.749c20.584-10.303,42.322-14.9,63.128-14.886c19.194,0.008,37.636,3.824,54.396,10.519   c16.76,6.71,31.906,16.284,44.56,28.329c8.42,8.034,15.734,17.199,21.447,27.465c7.603,13.643,12.327,29.43,12.319,46.115   c0,0.923-0.015,1.838-0.045,2.76v0.015c-0.476,15.273-2.462,29.906-6.486,43.802c-0.179,0.61-0.379,1.212-0.565,1.823   c-1.302-0.514-2.656-0.938-4.062-1.191c-4.315-0.781-8.146-1.763-11.382-2.916c-4.367-1.547-7.834-3.355-10.579-5.512   c-1.688-1.339-3.08-2.768-4.322-4.449c-2.232-3.028-3.996-6.837-5.401-11.65c-0.692-2.381-1.31-5.252-1.831-8.562   c-1.599-9.992-23.12-27.957-25.04-31.007c-3.823-6.092-9.983-12.445-17.913-17.697c-5.282-3.511-11.293-6.539-17.75-8.808   c-8.6-3.043-17.936-4.738-27.347-4.731c-11.508,0.014-23.076,2.462-34.376,8.094c-10.206,5.11-18.858,11.33-26.246,18.478   c-7.394,7.142-13.524,15.221-18.486,24.118c-9.917,17.772-15.109,38.966-15.102,61.217c-0.015,20.39,4.374,41.548,13.018,61.157   c8.652,19.624,21.485,37.672,38.268,52.364c11.211,9.782,24.177,18.129,39.078,24.52c19.87,8.511,43.229,13.628,70.716,13.644   c30.917-0.022,56.612-6.487,77.999-17.006c21.373-10.541,38.557-25.256,51.806-42.574c8.815-11.546,15.838-24.252,20.964-37.538   c6.852-17.713,10.311-36.437,10.303-54.566c0-16.672-2.909-32.8-8.556-47.276c-5.653-14.506-13.956-27.354-25.025-38.059   c-7.395-7.148-16.047-13.368-26.253-18.478c-8.815-4.397-17.788-6.829-26.773-7.708c-0.134-3.377-1.057-6.725-2.783-9.752   c-6.516-11.479-14.864-22.11-24.817-31.61c-6.658-6.338-13.993-12.029-21.804-17.17c13.242-3.95,27.302-6.152,41.801-6.16   c20.808-0.014,42.552,4.583,63.128,14.886c15.98,7.982,30.121,18.077,42.188,29.749c12.081,11.665,22.072,24.892,29.965,39.056   c15.793,28.38,23.225,60.376,23.232,92.521C481.366,265.623,475.14,295.387,462.902,323.187z M352.237,164.725   c3.586,2.403,6.888,5.074,9.968,8.049c7.662,7.418,13.643,16.56,17.786,27.168c4.233,10.869,6.472,23.374,6.465,36.177   c0,4.21-0.268,8.466-0.736,12.721c-7.313-15.846-21.016-28.187-37.91-33.58c2.649-12.245,4.166-25.174,4.612-39.19   c0-0.089,0-0.178,0.008-0.268c0.03-1.153,0.044-2.313,0.044-3.467C352.475,169.799,352.393,167.262,352.237,164.725z    M360.896,275.903c-0.498,17.75-15.287,31.736-33.037,31.252c-17.698-0.499-33.997-2.753-49.002-7.09   c-14.99-4.337-28.716-10.832-40.581-19.625c-7.893-5.847-14.923-12.691-20.882-20.294c-7.968-10.132-14.001-21.544-18.264-33.611   c-5.698-16.113-8.369-33.342-8.942-51.434v0.008c-0.037-0.93-0.044-1.86-0.044-2.783c0-9.373,1.48-18.501,4.144-27.085   c0.022-0.075,0.052-0.134,0.074-0.209c1.569,0.692,3.228,1.198,4.947,1.495c3.422,0.588,6.792,1.473,10.05,2.626   c4.612,1.622,9.105,3.846,13.034,6.45c4.954,3.288,9.173,7.372,11.612,11.256c0.751,1.205,1.324,2.381,1.704,3.496   c2.864,8.496,21.358,25.933,22.726,30.634c2.224,7.641,5.17,13.562,8.726,18.39c2.388,3.228,5.066,6.004,8.303,8.555   c4.307,3.385,9.633,6.383,16.664,8.883c9.343,3.318,21.744,5.624,37.516,6.055C347.394,243.365,361.38,258.153,360.896,275.903z    M159.585,176.1c0,0.037,0,0.089,0,0.133c0.454,13.934,1.971,26.834,4.605,38.982c-10.013,3.176-19.126,8.823-26.542,16.656   c-4.784,5.066-8.57,10.794-11.397,16.932c-0.469-4.24-0.714-8.48-0.707-12.698c-0.008-17.118,3.876-33.126,11.225-46.294   c3.556-6.39,7.938-12.112,13.011-17.021c3.088-2.983,6.428-5.616,9.998-8.026c-0.156,2.521-0.253,5.036-0.253,7.565   C159.525,173.578,159.54,174.828,159.585,176.1z M182.356,242.874c0.498-0.015,0.966-0.037,1.458-0.059   c0.253,2.544,0.952,5.044,2.12,7.394c4.166,8.354,9.083,16.15,14.588,23.166c7.172,9.135,15.585,17.318,24.995,24.289   c1.48,1.093,3.005,2.164,4.56,3.221c-14.149,3.787-29.436,5.802-45.936,6.272c-17.75,0.491-32.539-13.502-33.03-31.252   C150.613,258.153,164.606,243.365,182.356,242.874z M183.227,337.783c0.588,0,1.175-0.008,1.77-0.03   c19.342-0.536,36.682-2.924,53.004-7.298c5.163-1.376,9.708-4.098,13.39-7.684c6.078,2.551,12.393,4.805,18.963,6.702   c17.251,4.992,35.782,7.7,56.664,8.28c0.58,0.022,1.168,0.03,1.748,0.03c0.595,0,1.176-0.067,1.77-0.09   c-3.236,2.016-6.569,3.913-10.035,5.624c-18.68,9.18-40.387,13.844-64.483,13.852c-21.648,0-41.392-3.764-58.658-11.159   c-5.557-2.387-10.876-5.177-15.927-8.317C182.036,337.708,182.624,337.783,183.227,337.783z`;

        this.init();
    }

    init() {
        if (!this.cursor) return;
        // Don't initialize on mobile
        if (window.innerWidth <= 768) return;

        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        if (this.navIcon) {
            this.navIcon.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle();
            });
        }
    }

    handleMouseMove(e) {
        // Immediate position for interaction accuracy
        this.cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    }

    toggle() {
        this.isActive = !this.isActive;
        const body = document.body;

        if (this.isActive) {
            // Pretzel Mode
            body.classList.add('pretzel-cursor-active');
        } else {
            // Normal Mode
            body.classList.remove('pretzel-cursor-active');
        }
    }
}

// --- GLOBAL STATE ---
let flipState = null;
let lastClickedImg = null;
new CursorManager();

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
})

// SYNC ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// function raf(time) {
//     lenis.raf(time)
//     requestAnimationFrame(raf)
// }
// requestAnimationFrame(raf)

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

    // Initial hidden state for entrance - only opacity, no movement
    gsap.set(container.querySelector('.hero-name'), { opacity: 0 });
    gsap.set(container.querySelector('.nav-bio'), { opacity: 0 });
    gsap.set('.nav', { opacity: 0, y: 0, visibility: 'visible', pointerEvents: 'all' });

    if (hasVisited) {
        // Skip counter and HIDE it completely if already visited
        if (progressLabel) gsap.set(progressLabel, { opacity: 0, visibility: 'hidden' });

        tl.to('.loader', {
            yPercent: -100,
            duration: 0.6,
            ease: "power4.inOut",
            onComplete: () => {
                const loader = document.querySelector('.loader');
                if (loader) loader.style.display = 'none';
            }
        })
            .to(container.querySelector('.hero-name'), { opacity: 1, duration: 1.2, ease: "power2.out" }, "-=0.2")
            .to(container.querySelector('.nav-bio'), { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=1")
            .to('.nav', {
                opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
                onComplete: () => {
                    initScroll(container);
                }
            }, "-=0.8");
        return;
    }

    if (progressLabel) {
        // Fresh visit: Ensure label is visible and start at 0
        gsap.set(progressLabel, { opacity: 1, visibility: 'visible' });
        progressLabel.textContent = "0";

        const progressBar = document.querySelector('.loader-progress-bar');

        let progress = { value: 0 };
        tl.to(progress, {
            value: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
                const val = Math.round(progress.value);
                progressLabel.textContent = val;
                if (progressBar) progressBar.style.width = val + '%';
            }
        })
            .to('.loader', {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut",
                onComplete: () => {
                    sessionStorage.setItem('hasVisited', 'true');
                    const loader = document.querySelector('.loader');
                    if (loader) loader.style.display = 'none';
                }
            }, "-=0.2")
            .to(container.querySelector('.hero-name'), { opacity: 1, duration: 1.5, ease: "power2.out" }, "-=0.5")
            .to(container.querySelector('.nav-bio'), { opacity: 1, duration: 1, ease: "power2.out" }, "-=1")
            .to('.nav', {
                opacity: 1, y: 0, duration: 1, ease: "power2.out",
                onComplete: () => initScroll(container)
            }, "-=1");
    } else {
        // Fallback for missing elements
        if (document.querySelector('#app')) gsap.set('#app', { opacity: 1 });
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
                end: 'bottom top-=80%',
                scrub: true,
                pin: heroName,
                pinSpacing: false,
                invalidateOnRefresh: true
            }
        });

        nameTl.to(heroName, { y: '30vh', opacity: 0, duration: 1, ease: 'none' });

        // HIDE NAV ON SCROLL (Only if we are NOT at top)
        if (document.querySelector('.nav')) {
            gsap.to('.nav', {
                opacity: 0,
                y: -100,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top+=100 top', // Trigger only after 100px scroll
                    end: 'bottom top',
                    scrub: true,
                    invalidateOnRefresh: true
                }
            });
        }
    }

    const projectsSection = container.querySelector('.projects-section');
    if (projectsSection) {
        // Use fromTo with immediateRender: false to get a clean slide from -100px
        // without overriding the header visibility at the very top of the page.
        gsap.fromTo('.nav',
            { y: -100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: projectsSection,
                    start: 'bottom 50%', // Starts a bit earlier for smoother feel
                    end: 'bottom 10%',   // Fully in
                    scrub: 1.5,          // Slower, smoother sliding
                    invalidateOnRefresh: true,
                    immediateRender: false
                }
            }
        );
    }

    if (footer && footerHeroName) {
        const footerTrigger = {
            trigger: footer,
            start: 'top 75%',
            end: 'top 50%',
            scrub: 1,
            invalidateOnRefresh: true
        };
        gsap.fromTo(footerHeroName, { opacity: 0, y: '45vh' }, { opacity: 1, y: 0, ease: 'none', scrollTrigger: footerTrigger });
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
            // Reset loader position for the 100% animation
            gsap.set('.loader', { yPercent: 0 });

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
