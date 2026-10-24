import * as THREE from 'three';

/* Procedural equirect environment — gradient sky + sun blob, no HDR asset. */
export function makeEnvTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const x = c.getContext('2d')!;
  const g = x.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#ffffff'); g.addColorStop(.45, '#f3e6dc'); g.addColorStop(1, '#c9b8a8');
  x.fillStyle = g; x.fillRect(0, 0, 512, 256);
  const s = x.createRadialGradient(150, 60, 0, 150, 60, 90);
  s.addColorStop(0, 'rgba(255,250,240,1)'); s.addColorStop(1, 'rgba(255,250,240,0)');
  x.fillStyle = s; x.fillRect(0, 0, 512, 256);
  const t = new THREE.CanvasTexture(c);
  t.mapping = THREE.EquirectangularReflectionMapping;
  return t;
}

/* The LUMIÈRE bottle: glass cylinder + blush liquid + metal cap + gold ring. */
export function buildBottle(liquidColor: number) {
  const g = new THREE.Group();
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xfdfaf4, metalness: 0, roughness: .06, transparent: true, opacity: .24, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false });
  const liqMat = new THREE.MeshPhysicalMaterial({ color: liquidColor, metalness: .05, roughness: .15, transparent: true, opacity: .92, clearcoat: 1 });
  const capMat = new THREE.MeshStandardMaterial({ color: 0xb9b2a6, metalness: .85, roughness: .3 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xc9a15f, metalness: .9, roughness: .25 });

  const glass = new THREE.Mesh(new THREE.CylinderGeometry(.62, .62, 2.3, 40, 1, true), glassMat);
  const bottom = new THREE.Mesh(new THREE.CylinderGeometry(.62, .6, .1, 40), glassMat); bottom.position.y = -1.15;
  const shoulder = new THREE.Mesh(new THREE.SphereGeometry(.62, 40, 16, 0, Math.PI * 2, 0, Math.PI / 2), glassMat); shoulder.rotation.x = Math.PI / 2; shoulder.position.y = 1.15;
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(.3, .42, .28, 32), glassMat); neck.position.y = 1.36;
  const liquid = new THREE.Mesh(new THREE.CylinderGeometry(.55, .55, 2.05, 36), liqMat); liquid.position.y = -.06;
  const liqTop = new THREE.Mesh(new THREE.SphereGeometry(.55, 36, 12, 0, Math.PI * 2, 0, Math.PI / 2), liqMat); liqTop.position.y = .965;
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(.33, .33, .52, 32), capMat); cap.position.y = 1.72;
  const capTop = new THREE.Mesh(new THREE.SphereGeometry(.33, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2), capMat); capTop.position.y = 1.98;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.632, .012, 8, 60), goldMat); ring.rotation.x = Math.PI / 2; ring.position.y = .95;

  [glass, bottom, shoulder, neck, liquid, liqTop, cap, capTop, ring].forEach(m => g.add(m));
  return { group: g, liquid, liqMat, mats: [glassMat, liqMat, capMat, goldMat] };
}

export type BottleScene = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  bottle: ReturnType<typeof buildBottle>;
  env: THREE.CanvasTexture;
  isVisible: () => boolean;
  resize: () => void;
  dispose: () => void;
};

export function initBottleScene(
  canvas: HTMLCanvasElement,
  opts: { camZ: number; blushPower: number; liquid: number; scale?: number },
): BottleScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: window.devicePixelRatio < 2, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const env = makeEnvTexture();
  scene.environment = env;

  const camera = new THREE.PerspectiveCamera(34, 1, .1, 50);
  camera.position.set(0, .4, opts.camZ);
  camera.lookAt(0, .25, 0);

  scene.add(new THREE.HemisphereLight(0xfff6ea, 0xd8c6b4, 1.6));
  const key = new THREE.DirectionalLight(0xfff2df, 2.2); key.position.set(4, 6, 5); scene.add(key);
  const blushL = new THREE.PointLight(0xc47a6b, opts.blushPower, 12); blushL.position.set(-3, -1, 3); scene.add(blushL);
  const back = new THREE.PointLight(0xffffff, 8, 14); back.position.set(0, 3, -4); scene.add(back);

  const bottle = buildBottle(opts.liquid);
  bottle.group.scale.setScalar(opts.scale ?? 1);
  scene.add(bottle.group);

  let visible = true;
  const io = new IntersectionObserver(en => { visible = en[0].isIntersecting; });
  io.observe(canvas);

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  return {
    renderer, scene, camera, bottle, env, isVisible: () => visible, resize,
    dispose() {
      io.disconnect(); ro.disconnect();
      bottle.group.traverse(o => { if (o instanceof THREE.Mesh) o.geometry.dispose(); });
      bottle.mats.forEach(m => m.dispose());
      env.dispose();
      renderer.dispose();
    },
  };
}
