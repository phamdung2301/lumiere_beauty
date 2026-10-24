export type Sku = {
  id: string; no: string; name: string; tag: string; price: number;
  img: string; desc: string;
};

export const SKUS: Sku[] = [
  { id: 'vitc', no: 'SKU.01', name: 'Serum Vitamin C 15%', tag: 'THD · sáng da', price: 590000, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85', desc: 'THD Ascorbate dầu tan, dịu gấp 3 lần, đều màu da sau 4 tuần. 30ml.' },
  { id: 'spf', no: 'SKU.02', name: 'Tinted Mineral SPF 50+', tag: 'Zinc 21.2% · 6 tông', price: 450000, img: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=85', desc: 'Khoáng thuần, không vệt trắng, không đặc quánh. Có shade lab riêng phía dưới.' },
  { id: 'toner', no: 'SKU.03', name: 'PHA Toner 3%', tag: 'Gluconolactone · dịu nhất', price: 380000, img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=85', desc: 'Tẩy tế bào chết hóa học dịu, da nhạy cảm dùng được hằng ngày. 150ml.' },
  { id: 'retinol', no: 'SKU.04', name: 'Retinol 0.3% Encapsulated', tag: 'Vi nang · giảm kích ứng 80%', price: 690000, img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=85', desc: 'Giải phóng chậm 8 giờ, mờ lỗ chân lông và nếp nhăn nền. 30ml.' },
  { id: 'combo', no: 'SKU.05', name: 'Combo The Ritual', tag: 'Trọn 6 bước · tiết kiệm 410k', price: 1690000, img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=85', desc: 'Full routine sáng+tối 8 tuần: serum C, toner PHA, SPF, retinol và quà kèm.' },
];

export type Shade = { name: string; tone: string; color: number; stock: 'in' | 'low' | 'out'; text: string };

export const SHADES: Shade[] = [
  { name: 'Porcelain 10', tone: 'Cool pink', color: 0xe8c0b4, stock: 'low', text: 'Sắp hết — 8 lọ' },
  { name: 'Ivory 20', tone: 'Neutral', color: 0xddb49e, stock: 'in', text: 'Còn hàng' },
  { name: 'Sand 30', tone: 'Warm', color: 0xd1a184, stock: 'in', text: 'Còn hàng' },
  { name: 'Honey 40', tone: 'Warm golden', color: 0xc58f6d, stock: 'in', text: 'Còn hàng' },
  { name: 'Amber 50', tone: 'Neutral warm', color: 0xb07a58, stock: 'low', text: 'Sắp hết — 5 lọ' },
  { name: 'Chestnut 60', tone: 'Cool deep', color: 0x8d5a41, stock: 'out', text: 'Hết hàng — về tuần sau' },
];

export type RegStep = { id: string; group: 'am' | 'pm'; b: string; small: string; price: number };

export const REGIMEN: RegStep[] = [
  { id: 'toner', group: 'am', b: 'Toner PHA 3%', small: 'làm sạch nhẹ · cân bằng PH', price: 380000 },
  { id: 'vitc', group: 'am', b: 'Serum Vitamin C 15%', small: 'sáng da · đều màu', price: 590000 },
  { id: 'spf', group: 'am', b: 'Tinted Mineral SPF', small: 'chống nắng · tông da', price: 450000 },
  { id: 'toner2', group: 'pm', b: 'Toner PHA 3%', small: 'lau sạch lớp bụi mịn', price: 380000 },
  { id: 'retinol', group: 'pm', b: 'Retinol 0.3%', small: '2–4 buổi/tuần khi mới bắt đầu', price: 690000 },
  { id: 'ceramide', group: 'pm', b: 'Ceramide Barrier Gel', small: 'khóa ẩm · phục hồi ban đêm', price: 450000 },
];

export const fmt = (n: number) => n.toLocaleString('vi-VN') + 'đ';
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
