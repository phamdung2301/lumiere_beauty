import { useStore } from '../store';
import { SKUS, fmt } from '../data';

export function CartDrawer() {
  const {
    cart, wish, cartTotal, drawerOpen, drawerTab,
    setDrawerTab, closeDrawer, inc, dec, remove, toggleWish, add, checkout, orderNote,
  } = useStore();

  const lines = (list: string[], kind: 'cart' | 'wish') =>
    list.map(id => {
      const s = SKUS.find(x => x.id === id);
      if (!s) return null;
      const line = cart.find(c => c.id === id);
      return (
        <div className="cart-item" key={kind + id}>
          <div className="im"><img src={s.img} alt="" /></div>
          <div>
            <b>{s.name}</b>
            {kind === 'wish'
              ? <small>{s.tag}</small>
              : <small>{fmt(s.price)}</small>}
            {kind === 'cart' && line && (
              <div className="qty">
                <button onClick={() => dec(id)}>−</button><span>{line.qty}</span><button onClick={() => inc(id)}>+</button>
              </div>
            )}
            {kind === 'wish' && (
              <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
                <button className="rm" onClick={() => toggleWish(id)}>Bỏ yêu thích</button>
                <button className="rm" onClick={() => add(id)}>Thêm vào giỏ</button>
              </div>
            )}
          </div>
          <div className="col">
            <b style={{ font: '600 13px var(--mono)' }}>{kind === 'cart' && line ? fmt(s.price * line.qty) : fmt(s.price)}</b>
            <button className="rm" onClick={() => (kind === 'cart' ? remove(id) : toggleWish(id))}>
              {kind === 'cart' ? 'Xóa' : 'Bỏ'}
            </button>
          </div>
        </div>
      );
    });

  return (
    <div className={'drawer' + (drawerOpen ? ' open' : '')} aria-hidden={!drawerOpen}>
      <div className="drawer-bg" onClick={closeDrawer} />
      <aside className="drawer-panel" role="dialog" aria-label="Giỏ hàng">
        <div className="drawer-head">
          <div className="drawer-tabs">
            <button className={drawerTab === 'cart' ? 'active' : ''} onClick={() => setDrawerTab('cart')}>
              Giỏ{cart.length ? ' (' + cart.reduce((a, c) => a + c.qty, 0) + ')' : ''}
            </button>
            <button className={drawerTab === 'wish' ? 'active' : ''} onClick={() => setDrawerTab('wish')}>
              Yêu thích{wish.length ? ' (' + wish.length + ')' : ''}
            </button>
          </div>
          <button className="icon-btn" onClick={closeDrawer} aria-label="Đóng">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="drawer-body">
          {drawerTab === 'wish'
            ? (wish.length ? lines(wish, 'wish') : <div className="drawer-empty">Chưa có sản phẩm yêu thích — chạm trái tim trên sản phẩm nhé.</div>)
            : (cart.length ? lines(cart.map(c => c.id), 'cart') : <div className="drawer-empty">Giỏ đang trống.<br />Ritual đẹp bắt đầu từ một giọt serum.</div>)}
        </div>
        {drawerTab === 'cart' && (
          <div className="drawer-foot">
            <div className="drawer-total"><span>Tạm tính</span><b>{fmt(cartTotal)}</b></div>
            <button className="checkout" onClick={checkout} disabled={!cart.length}>Đặt hàng — COD toàn quốc</button>
            <div className="order-note">{orderNote}</div>
          </div>
        )}
      </aside>
    </div>
  );
}
