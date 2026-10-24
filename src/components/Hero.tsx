import { HeroBottle } from './Bottles';

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-mark">LUMIÈRE</div>
      <div className="hero-glow" />
      <div className="hero-copy">
        <div className="eyebrow">01 / Clinical luxury ritual</div>
        <h1 aria-label="Da đẹp không phải may mắn. Đó là một routine nghiêm túc.">
          <span className="ln"><span>Da đẹp không</span></span>
          <span className="ln"><span>phải <em>may mắn.</em></span></span>
          <span className="ln"><span>Đó là routine.</span></span>
        </h1>
        <p className="hero-sub">Khoa học da liễu, chưng cất trong từng giọt serum.</p>
        <p className="hero-lead">LUMIÈRE đem công thức chuẩn phòng thí nghiệm Hàn Quốc về toilet bàn của chị: nồng độ hoạt chất công bố minh bạch, không hương liệu, không màu tổng hợp — chỉ có da được đối xử nghiêm túc mỗi sáng và mỗi tối.</p>
        <div className="hero-actions">
          <a className="btn primary" href="#ritual">Khám phá ritual
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M8 7h9v9" /></svg></a>
          <a className="btn ghost" href="#shade">Thử shade lab</a>
        </div>
        <div className="hero-stats">
          <div><b>4.9/5</b><span>2.847 reviews</span></div>
          <div><b>97%</b><span>repurchase</span></div>
          <div><b>0%</b><span>fragrance & dye</span></div>
        </div>
      </div>
      <HeroBottle />
    </section>
  );
}

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>DERMATOLOGIST TESTED <i>✳</i> CLEAN FORMULA <i>✳</i> MADE IN KOREA <i>✳</i> FRAGRANCE FREE <i>✳</i> CRUELTY FREE <i>✳</i></span>
        <span>DERMATOLOGIST TESTED <i>✳</i> CLEAN FORMULA <i>✳</i> MADE IN KOREA <i>✳</i> FRAGRANCE FREE <i>✳</i> CRUELTY FREE <i>✳</i></span>
      </div>
    </div>
  );
}
