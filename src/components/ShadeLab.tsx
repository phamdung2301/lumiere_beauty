import { useState } from 'react';
import { ShadeBottle } from './Bottles';
import { SHADES, REGIMEN, fmt } from '../data';

export function ShadeLab() {
  const [idx, setIdx] = useState(1);
  const s = SHADES[idx];
  return (
    <section className="shade" id="shade">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Shade <em>lab.</em></h2>
          <p>Tinted mineral của LUMIÈRE có 6 tông da Việt. Chạm swatch để xem chất lỏng trong lọ đổi màu thật.</p>
        </div>
        <div className="shade-grid reveal">
          <ShadeBottle color={s.color} />
          <div>
            <div className="eyebrow">03 / Tinted mineral SPF 50+</div>
            <div className="shade-info">
              <h3>{s.name}</h3>
              <div className="duo">
                <span>Undertone <b>{s.tone}</b></span>
                <span>Giá <b>450.000đ</b></span>
              </div>
            </div>
            <div className="swatches">
              {SHADES.map((sh, i) => (
                <button
                  key={sh.name}
                  className={'swatch' + (i === idx ? ' active' : '')}
                  style={{ background: '#' + sh.color.toString(16).padStart(6, '0') }}
                  onClick={() => setIdx(i)}
                  aria-label={sh.name}
                />
              ))}
            </div>
            <div className={'stock ' + s.stock}>
              <span className="dot" /><span>{s.text}</span>
            </div>
            <p style={{ marginTop: 26, fontSize: 13.5, lineHeight: 1.85, color: 'var(--muted)', maxWidth: 420 }}>
              Khoáng zinc 21.2%, không vệt trắng, không đặc quánh dưới nắng Việt Nam. Shade-match tại nhà: lấy swatch gần nhất ra cổ tay, tông đúng là tông "biến mất" trên da sau 30 giây.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Regimen({ addMany, openCart }: { addMany: (ids: string[]) => void; openCart: () => void }) {
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setPicked(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const n = picked.size;
  const sum = picked.size ? [...picked].reduce((a, id) => a + (REGIMEN.find(r => r.id === id)?.price ?? 0), 0) : 0;
  const useCombo = n === 6;
  const total = useCombo ? 1690000 : sum;

  const copyRoutine = () => {
    if (!n) return;
    const lines = ['LUMIÈRE — routine của tôi'];
    (['am', 'pm'] as const).forEach(g => {
      const steps = REGIMEN.filter(r => r.group === g && picked.has(r.id));
      if (steps.length) lines.push('', g === 'am' ? '☀ SÁNG:' : '☾ TỐI:', ...steps.map(r => '  • ' + r.b + ' (' + fmt(r.price) + ')'));
    });
    if (useCombo) lines.push('', '→ Nên mua combo The Ritual: 1.690.000đ (tiết kiệm 410.000đ)');
    const text = lines.join('\n');
    const done = () => { /* toast handled by caller? simple alert-free */ };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, done);
  };

  const addRoutine = () => {
    if (!n) return;
    if (useCombo) { addMany(['combo']); openCart(); return; }
    addMany([...picked].map(id => id === 'toner2' ? 'toner' : id === 'ceramide' ? 'spf' : id));
    openCart();
  };

  const step = (r: (typeof REGIMEN)[number]) => (
    <div
      className={'reg-step' + (picked.has(r.id) ? ' on' : '')}
      key={r.id}
      role="checkbox"
      aria-checked={picked.has(r.id)}
      onClick={() => toggle(r.id)}
    >
      <span className="reg-check">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#26211b" strokeWidth="3.4"><path d="M20 6 9 17l-5-5" /></svg>
      </span>
      <div><b>{r.b}</b><br /><small>{r.small}</small></div>
      <span className="price">{fmt(r.price)}</span>
    </div>
  );
  return (
    <section className="regimen" id="regimen">
      <div className="wrap reveal">
        <div className="regimen-copy">
          <div className="eyebrow">04 / Build your ritual</div>
          <h2>Routine của<br /><em>riêng bạn.</em></h2>
          <p>Tick các bước bạn muốn có. Khi đủ 6 bước, LUMIÈRE tự gộp thành combo routine — rẻ hơn 410.000đ so với mua lẻ.</p>
          <div className="reg-progress">
            <div className="reg-bar"><span style={{ width: (n / 6) * 100 + '%' }} /></div>
            <div className="reg-meta">
              <span>{n}/6 bước{useCombo ? ' — combo ritual!' : ''}</span>
              <b>{n ? (useCombo ? fmt(total) + ' — tiết kiệm ' + fmt(sum - total) : fmt(total)) : '0đ'}</b>
            </div>
          </div>
          <div className="reg-actions">
            <button className="reg-btn" onClick={copyRoutine}>Copy routine
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 8 }}>
                <rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg></button>
            <button className="reg-btn" onClick={addRoutine}>Thêm routine vào giỏ</button>
          </div>
        </div>
        <div className="reg-groups">
          <div className="reg-group">
            <span>Morning<i>sáng · 3 bước</i></span>
            {REGIMEN.filter(r => r.group === 'am').map(step)}
          </div>
          <div className="reg-group">
            <span>Evening<i>tối · 3 bước</i></span>
            {REGIMEN.filter(r => r.group === 'pm').map(step)}
          </div>
        </div>
      </div>
    </section>
  );
}
