import { useStore } from '../store';

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);
const BagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export function Header() {
  const { cartCount, wish, openDrawer } = useStore();
  return (
    <header>
      <a className="brand" href="#top">LUMI<i>È</i>RE</a>
      <div className="header-index">Clinical luxury skincare / Vietnam</div>
      <div className="header-actions">
        <button className="icon-btn" onClick={() => openDrawer('wish')} aria-label="Yêu thích">
          <HeartIcon />
          {wish.length > 0 && <span className="badge">{wish.length}</span>}
        </button>
        <button className="icon-btn" onClick={() => openDrawer('cart')} aria-label="Giỏ hàng">
          <BagIcon />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
        <a className="h-cta" href="#sample">Nhận sample</a>
      </div>
    </header>
  );
}
