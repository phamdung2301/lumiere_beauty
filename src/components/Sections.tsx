import { useState } from 'react';

const REVIEWS = [
  {
    text: '"Đeo kính lâu năm để quầng thâm, serum C 15% dùng hết một lọ là quầng rõ dần hẳn. Điểm cộng là không hề căng rát như mấy em C nước cũ."',
    who: 'Minh Anh, 29', meta: 'Da hỗn hợp · TP.HCM',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
  },
  {
    text: '"Retinol 0.3% bao nang đúng như quảng cáo: mình da nhạy cảm nhất nhóm bạn mà không bong tróc. Giờ lỗ chân lông nhỏ hơn thấy rõ sau gương."',
    who: 'Thu Hà, 32', meta: 'Da nhạy cảm · Hà Nội',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80',
  },
  {
    text: '"Combo routine tính ra rẻ hơn mua lẻ mà da đều như được đi spa. Đơn thứ 3 rồi, mã LUMI10 lại được tặng sample retinol nữa."',
    who: 'Khánh Vy, 27', meta: 'Da dầu · Đà Nẵng',
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80',
  },
];

const CMP = [
  { label: 'Công bố nồng độ hoạt chất trên nhãn', lum: '✓ 100%', other: '— hiếm' },
  { label: 'Không hương liệu, không màu tổng hợp', lum: '✓', other: '—' },
  { label: 'Tested trên da nhạy cảm (patch 48h)', lum: '✓', other: '—' },
  { label: 'Chống nắng mineral, không vệt trắng', lum: '✓ 6 tông', other: '— hóa học' },
  { label: 'Hoàn tiền 30 ngày nếu da không hợp', lum: '✓', other: '—' },
];

const FAQS = [
  { q: 'Da nhạy cảm có dùng được retinol 0.3% không?', a: 'Có. Retinol trong LUMIÈRE được bọc vi nang (encapsulated) giải phóng chậm suốt 8 giờ, giảm tới 80% kích ứng so với retinol thông thường. Tuần 1–2 chỉ dùng 2 buổi/tuần, thoa sau toner ẩm; sau đó tăng dần thành tối cách ngày.' },
  { q: 'Sử dụng Vitamin C và Retinol cùng một routine được không?', a: 'Được — nhưng khác buổi. Vitamin C 15% (THD) thuộc nhóm dầu tan, dịu nhẹ, dùng buổi sáng cùng kem chống nắng. Retinol 0.3% dành cho buổi tối. Đây chính là logic của Regimen Builder phía trên.' },
  { q: 'Bao lâu thì thấy kết quả?', a: 'Da sáng đều màu: 92% khách hàng thấy rõ sau 4 tuần dùng serum C. Quầng thâm và kết cấu lỗ chân lông: 6–8 tuần. Da là cơ quan chuyển đổi chậm — cam kết gì sớm hơn đều là nói dối.' },
  { q: 'Chính sách đổi trả thế nào?', a: 'Hoàn tiền 100% trong 30 ngày kể cả khi lọ đã mở, nếu da bạn không hợp — vì không ai phải trả tiền cho thứ khiến da mình tệ hơn. Inbox kèm SĐT đơn hàng, xử lý trong 24h.' },
];

export function Proof() {
  return (
    <section className="proof">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Được da <em>xác nhận.</em></h2>
          <p>Kết quả từ khảo sát 2.847 khách hàng dùng đủ 8 tuần, số liệu độc lập bởi Q&M Testing Vietnam.</p>
        </div>
        <div className="proof-stats reveal">
          <div><b>4.9/5</b><span>average rating</span></div>
          <div><b>97%</b><span>repurchase after 8 weeks</span></div>
          <div><b>92%</b><span>saw brighter skin in 4 weeks</span></div>
        </div>
        <div className="reviews">
          {REVIEWS.map(r => (
            <div className="review reveal" key={r.who}>
              <div className="stars" aria-label="5 sao">★★★★★</div>
              <p>{r.text}</p>
              <div className="review-who">
                <div><img src={r.img} alt={r.who} loading="lazy" /></div>
                <div><b>{r.who}</b><span>{r.meta}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Compare() {
  return (
    <section className="compare">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Đọc bảng,<br />đừng đọc <em>lời hứa.</em></h2>
          <p>So sánh thẳng với mỹ phẩm đại trà cùng phân khúc giá.</p>
        </div>
        <div className="cmp reveal">
          <div className="cmp-row head"><div>.</div><div className="lum">LUMIÈRE</div><div>Mỹ phẩm thường</div></div>
          {CMP.map(r => (
            <div className="cmp-row" key={r.label}>
              <div>{r.label}</div>
              <div className="yes">{r.lum}</div>
              <div className="no">{r.other}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="faq">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Hỏi thật,<br />đáp <em>thật.</em></h2>
        </div>
        <div className="faq-list reveal">
          {FAQS.map(f => (
            <details className="faq-item" key={f.q}>
              <summary>{f.q}<span className="pm">+</span></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Sample() {
  return (
    <section className="sample" id="sample">
      <div className="wrap">
        <div>
          <div className="eyebrow">05 / Try before full size</div>
          <h2>Sample miễn phí,<br /><em>giao tận nhà.</em></h2>
          <p>Bộ 3 mini (serum C · toner PHA · SPF) 5ml — đủ cho 7 ngày routine thật. Miễn phí hoàn toàn, bạn chỉ cần để lại tên, SĐT và loại da. Đội dược sĩ da liễu sẽ gọi xác nhận trước khi giao.</p>
        </div>
        <SampleForm />
      </div>
    </section>
  );
}

function SampleForm() {
  const [btnText, setBtnText] = useState('Nhận sample miễn phí');
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnText('Đã nhận yêu cầu ✓ — dược sĩ sẽ gọi trong 24h');
    setTimeout(() => { setBtnText('Nhận sample miễn phí'); (e.target as HTMLFormElement).reset(); }, 6000);
  };
  return (
    <form className="sample-form reveal" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="sName">Họ và tên *</label>
        <input id="sName" required placeholder="Nguyễn Thị A" />
      </div>
      <div className="field">
        <label htmlFor="sPhone">Số điện thoại *</label>
        <input id="sPhone" type="tel" required placeholder="09xx xxx xxx" />
      </div>
      <div className="field">
        <label htmlFor="sSkin">Loại da</label>
        <select id="sSkin">
          <option>Da dầu</option><option>Da khô</option><option>Da hỗn hợp</option>
          <option>Da nhạy cảm</option><option>Chưa biết — nhờ tư vấn</option>
        </select>
      </div>
      <button className="sample-submit" type="submit">{btnText}</button>
      <div className="sample-note">Freephone 1800.6859 · hello@lumiere.vn · Giao toàn quốc</div>
    </form>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="foot-top">
        <div>
          <div className="foot-brand">LUMI<i>È</i>RE</div>
          <p>Mỹ phẩm clinical luxury bởi đội ngũ dược sĩ da liễu Việt Nam, sản xuất tại nhà máy CGMP Hàn Quốc. Mọi nồng độ hoạt chất đều được công bố.</p>
        </div>
        <div className="foot-col">
          <span>Mua sắm</span>
          <a href="#shop">Serum Vitamin C 15%</a>
          <a href="#shop">Retinol 0.3% Encapsulated</a>
          <a href="#shop">PHA Toner 3%</a>
          <a href="#shop">Tinted Mineral SPF 50+</a>
          <a href="#shop">Combo The Ritual — 1.690.000đ</a>
        </div>
        <div className="foot-col">
          <span>Ưu đãi thành viên mới</span>
          <div>Dùng mã tại giỏ hàng:</div>
          <div className="promo"><i>LUMI10</i> −10% đơn đầu tiên</div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 LUMIÈRE SERUM VIETNAM</span>
        <span>Concept website · Made with clinical love ✳ HCMC</span>
      </div>
    </footer>
  );
}
