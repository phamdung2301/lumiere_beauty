import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useStore } from '../store';
import { reducedMotion } from '../data';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        const next = Math.min(100, p + Math.ceil(Math.random() * 14));
        if (next >= 100) clearInterval(timer);
        return next;
      });
    }, 60);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 100 || !rootRef.current) return;
    const el = rootRef.current;
    const t = setTimeout(() => {
      const finish = () => {
        document.body.classList.remove('is-loading');
        setGone(true);
      };
      if (!reducedMotion()) gsap.to(el, { yPercent: -100, duration: .85, ease: 'power4.inOut', onComplete: finish });
      else finish();
    }, 200);
    return () => clearTimeout(t);
  }, [progress]);

  if (gone) return null;
  return (
    <div className="loader" ref={rootRef} aria-hidden="true">
      <div className="loader-inner">
        <div className="loader-word">Lumi<i>è</i>re</div>
        <div className="loader-bar"><span style={{ width: progress + '%' }} /></div>
        <div className="loader-row"><span>Formulating ritual</span><span>{String(progress).padStart(3, '0')}%</span></div>
      </div>
    </div>
  );
}

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reducedMotion() || !matchMedia('(pointer:fine)').matches) return;
    const onMove = (e: PointerEvent) => gsap.to(ref.current, { x: e.clientX, y: e.clientY, duration: .2, ease: 'power3.out' });
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return <div className="cursor" ref={ref} aria-hidden="true" />;
}

export function Toast() {
  const { toastMsg } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (toastMsg) gsap.to(ref.current, { xPercent: -50, y: 0, opacity: 1, duration: .4, ease: 'power3.out', overwrite: true });
    else gsap.to(ref.current, { xPercent: -50, y: 80, opacity: 0, duration: .4, ease: 'power3.in', overwrite: true });
  }, [toastMsg]);
  return <div className="toast" ref={ref} aria-live="polite">{toastMsg}</div>;
}
