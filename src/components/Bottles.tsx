import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import { initBottleScene, type BottleScene } from '../three';
import { reducedMotion } from '../data';

/* Hero bottle: glass + blush liquid that lags behind the cursor. */
export function HeroBottle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    let scene: BottleScene | null = null;
    try {
      scene = initBottleScene(canvas, { camZ: 6, blushPower: 10, liquid: 0xc47a6b, scale: 1 });
    } catch {
      canvas.style.display = 'none';
      if (fallbackRef.current) fallbackRef.current.style.display = 'flex';
      return;
    }
    let mx = 0, my = 0;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - .5;
      my = e.clientY / window.innerHeight - .5;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    let raf = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!scene!.isVisible() || document.hidden) return;
      const b = scene!.bottle;
      if (!reducedMotion()) {
        b.group.rotation.y += (mx * .55 - b.group.rotation.y) * .045;
        b.group.rotation.x += (my * .16 - b.group.rotation.x) * .045;
        b.liquid.rotation.z += (mx * -.14 - b.liquid.rotation.z) * .03;
        b.liquid.position.x += (mx * .09 - b.liquid.position.x) * .03;
        b.group.position.y = Math.sin(t * .0007) * .06;
      }
      scene!.renderer.render(scene!.scene, scene!.camera);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      scene?.dispose();
    };
  }, []);

  return (
    <div className="hero-stage" aria-label="Lọ serum LUMIÈRE tương tác với con trỏ">
      <canvas id="heroCanvas" ref={canvasRef} />
      <div className="css-bottle" ref={fallbackRef}>
        <div className="cap" /><div className="neck" /><div className="body"><div className="liq" /></div>
        <div className="tag">SERUM NO.01 — VITAMIN C 15%</div>
      </div>
      <span className="stage-note">Vitamin C 15% · PH 3.8 · 30ml</span>
    </div>
  );
}

/* Shade-lab bottle: liquid color tweens whenever the `color` prop changes. */
export function ShadeBottle({ color }: { color: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<BottleScene | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let scene: BottleScene | null = null;
    try {
      scene = initBottleScene(canvas, { camZ: 5.4, blushPower: 14, liquid: color, scale: .92 });
    } catch { return; }
    sceneRef.current = scene;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!scene!.isVisible() || document.hidden) return;
      if (!reducedMotion()) scene!.bottle.group.rotation.y += .004;
      scene!.renderer.render(scene!.scene, scene!.camera);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); scene?.dispose(); sceneRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const c = new THREE.Color(color);
    const mat = scene.bottle.liqMat;
    if (!reducedMotion()) {
      gsap.to(mat.color, { r: c.r, g: c.g, b: c.b, duration: .55, ease: 'power3.out' });
      const s = .92;
      gsap.fromTo(scene.bottle.group.scale, { x: .88 * s, y: s * .92, z: .88 * s }, { x: s, y: s, z: s, duration: .6, ease: 'elastic.out(1,.4)' });
    } else mat.color.copy(c);
  }, [color]);

  return (
    <div className="shade-stage">
      <canvas id="shadeCanvas" ref={canvasRef} />
      <span className="shade-tag">Live tint / mineral SPF 50</span>
    </div>
  );
}
