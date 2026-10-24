# LUMIÈRE SERUM — Clinical Luxury Skincare (Concept)

Landing page mỹ phẩm cao cấp, skin sáng dịu "glass skin" (porcelain + blush + Playfair Display).
Lọ serum 3D tương tác (three.js), shade lab đổi màu chất lỏng, regimen builder, giỏ hàng localStorage.

## Stack

- Vite 6 + React 19 + TypeScript
- three.js (lọ thủy tinh + liquid tilt, env procedural)
- GSAP + ScrollTrigger (entrance, reveals, pinned horizontal reel)
- Lenis smooth scroll
- Không backend — dữ liệu tĩnh trong `src/data.ts`, giỏ/wishlist/đơn lưu `localStorage`

## Chạy local

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build production

```bash
npm run build      # xuất ra dist/
npm run preview    # xem thử bản build tại http://localhost:4173
```

## Deploy lên Vercel

Cách 1 — qua GitHub (khuyên dùng):
1. `git init && git add . && git commit -m "LUMIÈRE landing"` (đã có `.gitignore`)
2. Push lên repo GitHub mới.
3. Vercel → **Add New Project** → chọn repo → Vercel tự nhận **Vite preset**
   (Build Command `npm run build`, Output Directory `dist`) → Deploy.

Cách 2 — CLI:
```bash
npm i -g vercel
vercel          # lần đầu: confirm hết, defaults đúng cho Vite
vercel --prod
```

Không cần biến môi trường, không cần database.

## Cấu trúc

```
src/
  main.tsx            # entry
  App.tsx             # layout + motion orchestration (Lenis, entrance, reveals)
  index.css           # toàn bộ design tokens + CSS (không Tailwind)
  data.ts             # SKUS / SHADES / REGIMEN — sửa nội dung ở đây
  store.tsx           # giỏ + wishlist + đơn (localStorage) + toast, Context
  three.ts            # buildBottle + initBottleScene (env procedural, dispose)
  components/
    Chrome.tsx        # Preloader / Cursor / Toast
    Header.tsx        # brand + badge giỏ/yêu thích
    Hero.tsx          # hero + marquee
    Bottles.tsx       # HeroBottle (liquid tilt) + ShadeBottle (setColor)
    Ingredients.tsx   # orbit phân tử
    Reel.tsx          # pinned horizontal 5 SKU
    ShadeLab.tsx      # swatch lab + regimen builder
    Sections.tsx      # proof / compare / FAQ / sample / footer
    CartDrawer.tsx    # drawer 2 tab Giỏ · Yêu thích
```

Bản single-file (không build, mở trực tiếp bằng double-click) nằm tại
`../lumiere-standalone.html` để đối chiếu/gửi nhanh cho khách.

## Ghi chú tối ưu (khi cần)

- Bundle JS ~860KB (gzip 251KB) — three.js chiếm phần lớn. Nếu muốn nhẹ hơn:
  dynamic `import()` cho `three.ts` hoặc `manualChunks` tách vendor trong `vite.config.ts`.
- Ảnh đang hotlink Unsplash (concept). Khi thương mại: bỏ vào `public/images/`.
