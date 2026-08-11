import { ImageResponse } from 'next/og';
import { SITE } from '@/constants/site';

export const alt = `${SITE.name} – Mua bán ô tô đã qua sử dụng`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const highlights = ['Xe kiểm định 100%', 'Trả góp 80%', 'Sang tên nhanh'];

/** Dynamically generated Open Graph image for social sharing. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0b0d10 0%, #1c2127 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              width: 64,
              height: 64,
              borderRadius: 16,
              background: '#2563eb',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            VB
          </div>
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4, color: 'rgba(255,255,255,0.7)' }}>
            PREMIUM USED CARS
          </div>
        </div>

        <div style={{ display: 'flex', marginTop: 40, fontSize: 84, fontWeight: 800 }}>
          <span>VŨ BÁCH&nbsp;</span>
          <span style={{ color: '#2563eb' }}>AUTO</span>
        </div>
        <div style={{ display: 'flex', marginTop: 24, fontSize: 36, color: 'rgba(255,255,255,0.8)' }}>
          {SITE.tagline}
        </div>

        <div style={{ display: 'flex', marginTop: 48, gap: 32, fontSize: 26 }}>
          {highlights.map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', width: 14, height: 14, borderRadius: 999, background: '#2563eb' }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
