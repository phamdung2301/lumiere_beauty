const MOLS = [
  { a: 0, r: 240, b: 'Vitamin C', s: '15% THD', dur: 44, rev: false },
  { a: 60, r: 240, b: 'PHA', s: '3%', dur: 44, rev: false },
  { a: 120, r: 240, b: 'Retinol', s: '0.3%', dur: 44, rev: false },
  { a: 180, r: 240, b: 'Niacinamide', s: '5%', dur: 44, rev: false },
  { a: 240, r: 240, b: 'Ceramide', s: 'NP 2%', dur: 44, rev: false },
  { a: 300, r: 240, b: 'Panthenol', s: 'B5 3%', dur: 44, rev: false },
  { a: 30, r: 180, b: 'PH 5.5', s: 'balanced', dur: 30, rev: true },
  { a: 150, r: 180, b: 'Hypoallergenic', s: 'tested', dur: 30, rev: true },
  { a: 270, r: 180, b: 'EWG Green', s: 'verified', dur: 30, rev: true },
];

const ACTS = [
  { no: 'ACT.01', b: 'Vitamin C THD', p: 'Dẫn xuất dầu tan, dịu hơn L-AA 3 lần, sáng da đều màu sau 4 tuần.', i: '15%' },
  { no: 'ACT.02', b: 'Gluconolactone', p: 'PHA tẩy da chết hóa học dịu nhất, dùng được cả khi da nhạy cảm.', i: '3%' },
  { no: 'ACT.03', b: 'Retinol encapsulated', p: 'Bọc vi nang giải phóng chậm — giảm 80% kích ứng so với retinol thường.', i: '0.3%' },
  { no: 'ACT.04', b: 'Ceramide NP', p: 'Phục hồi hàng rào bảo vệ da, giữ ẩm suốt 72 giờ đo bằng corneometer.', i: '2%' },
];

export function Ingredients() {
  return (
    <section className="ingredients" id="ritual">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Từng phân tử<br />đều <em>có tên.</em></h2>
          <p>Không "chiết xuất thiên nhiên bí ẩn". Mọi hoạt chất trong LUMIÈRE đều được công bố nồng độ chính xác trên nhãn — vì làn da của bạn cần sự thật, không cần câu chuyện.</p>
        </div>
        <div className="ing-grid">
          <div className="orbit-stage" aria-hidden="true">
            <div className="orbit-ring" />
            <div className="orbit-ring r2" />
            <div className="orbit-core">
              <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=640&q=85" alt="Serum LUMIÈRE" />
            </div>
            {MOLS.map(m => (
              <div className="mol" key={m.b} style={{ ['--a' as string]: m.a + 'deg', ['--r' as string]: m.r + 'px' }}>
                <div className="mol-chip" style={{ animationDuration: m.dur + 's', animationDirection: m.rev ? 'reverse' : 'normal' }}>
                  <b>{m.b}</b><span>{m.s}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="ing-list">
            {ACTS.map(a => (
              <div className="ing-row reveal" key={a.no}>
                <small>{a.no}</small><b>{a.b}</b><p>{a.p}</p><i>{a.i}</i>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
