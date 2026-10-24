import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../store';
import { SKUS, fmt } from '../data';

const HeartSvg = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);
const BagSvg = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export function Reel() {
  const { wish, add, toggleWish } = useStore();
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof gsap === 'undefined') return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current!, pin = pinRef.current!;
      const dist = () => -(track.scrollWidth - window.innerWidth + 56);
      gsap.to(track, {
        x: dist, ease: 'none',
        scrollTrigger: {
          trigger: pin, start: 'top top', end: () => '+=' + Math.abs(dist()),
          pin: true, scrub: 1, invalidateOnRefresh: true,
        },
      });
      gsap.from('.sku', {
        y: 70, opacity: 0, rotate: 2, duration: .9, stagger: .1, ease: 'power3.out',
        scrollTrigger: { trigger: pin, start: 'top 70%' },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="reel" id="shop">
      <div className="reel-pin" ref={pinRef}>
        <div className="reel-head">
          <h2>The ritual <em>collection.</em></h2>
          <span>Kéo xuống để xem ngang 5 sản phẩm — mỗi SKU là một bước trong routine</span>
        </div>
        <div className="reel-track" ref={trackRef}>
          {SKUS.map(s => (
            <article className="sku" key={s.id}>
              <div className="sku-img">
                <img src={s.img} alt={s.name} loading="lazy" />
                <span className="sku-no">{s.no}</span>
                <button
                  className={'sku-heart' + (wish.includes(s.id) ? ' on' : '')}
                  onClick={() => toggleWish(s.id)}
                  aria-label="Yêu thích"
                ><HeartSvg /></button>
              </div>
              <div className="sku-body">
                <small>{s.tag}</small>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
                <div className="sku-foot">
                  <b>{fmt(s.price)}</b>
                  <button className="sku-add" onClick={() => add(s.id)}><BagSvg /> Thêm</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
