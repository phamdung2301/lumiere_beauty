import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { StoreProvider, useStore } from './store';
import { reducedMotion } from './data';
import { Preloader, Cursor, Toast } from './components/Chrome';
import { Header } from './components/Header';
import { Hero, Marquee } from './components/Hero';
import { Ingredients } from './components/Ingredients';
import { Reel } from './components/Reel';
import { ShadeLab, Regimen } from './components/ShadeLab';
import { Proof, Compare, Faq, Sample, Footer } from './components/Sections';
import { CartDrawer } from './components/CartDrawer';

function Site() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { add, openDrawer } = useStore();
  const [heroDone, setHeroDone] = useState(false);

  /* Lenis + entrance + reveals — run once, revert-safe */
  useEffect(() => {
    const reduced = reducedMotion();
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (reduced) { setHeroDone(true); return; }
      document.documentElement.classList.add('anim');

      if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: .9 });
        lenis.on('scroll', ScrollTrigger.update);
        const raf = (t: number) => lenis.raf(t * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
        return () => { lenis.destroy(); gsap.ticker.remove(raf); };
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  /* hero entrance fires once the preloader lifts (delay matched to loader) */
  useEffect(() => {
    const reduced = reducedMotion();
    if (reduced || typeof gsap === 'undefined') { setHeroDone(true); return; }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: .55, onComplete: () => setHeroDone(true) });
      tl.to('.hero h1 .ln span', { y: 0, duration: 1.1, stagger: .12, ease: 'power4.out' }, .1)
        .from('.eyebrow, .hero-sub, .hero-lead, .hero-actions, .hero-stats', { y: 26, opacity: 0, duration: .9, stagger: .09, ease: 'power3.out' }, .55)
        .from('.hero-stage', { opacity: 0, scale: .94, duration: 1.4, ease: 'power3.out' }, .4)
        .from('header', { y: -30, opacity: 0, duration: .8 }, .8);
      gsap.to('.hero-mark', {
        xPercent: -6, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  /* scroll reveals (elements already mounted) */
  useEffect(() => {
    if (reducedMotion() || typeof gsap === 'undefined') return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el =>
        gsap.to(el, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%' },
        }));
    }, rootRef);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => { ctx.revert(); window.removeEventListener('load', onLoad); };
  }, [heroDone]);

  return (
    <div ref={rootRef}>
      <Preloader />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Ingredients />
        <Reel />
        <ShadeLab />
        <Regimen
          addMany={ids => ids.forEach(id => add(id, true))}
          openCart={() => openDrawer('cart')}
        />
        <Proof />
        <Compare />
        <Faq />
        <Sample />
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Site />
    </StoreProvider>
  );
}
