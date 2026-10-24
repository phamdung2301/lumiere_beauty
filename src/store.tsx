import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { SKUS } from './data';

export type CartLine = { id: string; qty: number };
export type Order = { items: number; total: number; at: string; code: string };
type DrawerTab = 'cart' | 'wish';

type Store = {
  cart: CartLine[];
  wish: string[];
  orders: Order[];
  cartCount: number;
  cartTotal: number;
  drawerOpen: boolean;
  drawerTab: DrawerTab;
  toastMsg: string | null;
  add: (id: string, silent?: boolean) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  toggleWish: (id: string) => void;
  openDrawer: (tab: DrawerTab) => void;
  closeDrawer: () => void;
  setDrawerTab: (tab: DrawerTab) => void;
  checkout: () => void;
  orderNote: string;
  toast: (msg: string) => void;
};

const Ctx = createContext<Store | null>(null);

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem('lumiere_' + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function persist(key: string, value: unknown) {
  try { localStorage.setItem('lumiere_' + key, JSON.stringify(value)); } catch { /* storage blocked */ }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => read('cart', [] as CartLine[]));
  const [wish, setWish] = useState<string[]>(() => read('wishlist', [] as string[]));
  const [orders, setOrders] = useState<Order[]>(() => read('orders', [] as Order[]));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<DrawerTab>('cart');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [orderNote, setOrderNote] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => persist('cart', cart), [cart]);
  useEffect(() => persist('wishlist', wish), [wish]);
  useEffect(() => persist('orders', orders), [orders]);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2400);
  }, []);

  const add = useCallback((id: string, silent = false) => {
    setCart(prev => {
      const found = prev.find(c => c.id === id);
      return found ? prev.map(c => c.id === id ? { ...c, qty: c.qty + 1 } : c) : [...prev, { id, qty: 1 }];
    });
    if (!silent) toast('Đã thêm vào giỏ ✳ ' + (SKUS.find(s => s.id === id)?.name ?? ''));
  }, [toast]);

  const inc = useCallback((id: string) => setCart(p => p.map(c => c.id === id ? { ...c, qty: c.qty + 1 } : c)), []);
  const dec = useCallback((id: string) => setCart(p => p.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty - 1) } : c)), []);
  const remove = useCallback((id: string) => setCart(p => p.filter(c => c.id !== id)), []);

  const toggleWish = useCallback((id: string) => {
    setWish(prev => {
      const has = prev.includes(id);
      toast(has ? 'Đã bỏ khỏi yêu thích' : 'Đã thêm vào yêu thích ♥');
      return has ? prev.filter(x => x !== id) : [...prev, id];
    });
  }, [toast]);

  const openDrawer = useCallback((tab: DrawerTab) => { setDrawerTab(tab); setDrawerOpen(true); }, []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const checkout = useCallback(() => {
    setCart(prev => {
      if (!prev.length) return prev;
      const items = prev.reduce((a, c) => a + c.qty, 0);
      const total = prev.reduce((a, c) => a + c.qty * (SKUS.find(s => s.id === c.id)?.price ?? 0), 0);
      setOrders(o => [{ items, total, at: new Date().toISOString(), code: 'LUMI10' }, ...o]);
      setOrderNote('Đơn #' + Date.now().toString().slice(-6) + ' đã ghi — mã LUMI10 sẽ được áp dụng khi CSKH xác nhận.');
      toast('Đặt hàng thành công ✓ CSKH sẽ gọi xác nhận trong 15 phút');
      setTimeout(() => setOrderNote(''), 8000);
      return [];
    });
  }, [toast]);

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const cartTotal = cart.reduce((a, c) => a + c.qty * (SKUS.find(s => s.id === c.id)?.price ?? 0), 0);

  const value: Store = {
    cart, wish, orders, cartCount, cartTotal,
    drawerOpen, drawerTab, toastMsg, orderNote,
    add, inc, dec, remove, toggleWish, openDrawer, closeDrawer, setDrawerTab, checkout, toast,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
