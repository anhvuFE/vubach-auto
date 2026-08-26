'use client';

import { useMemo, useState } from 'react';
import { Slider } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';
import type { Car } from '@/types/car';
import { formatPrice } from '@/utils/format';

/** Loan-term options in months, with a short Vietnamese label. */
const TERMS = [
  { months: 12, label: '1 năm' },
  { months: 24, label: '2 năm' },
  { months: 36, label: '3 năm' },
  { months: 48, label: '4 năm' },
  { months: 60, label: '5 năm' },
  { months: 72, label: '6 năm' },
  { months: 84, label: '7 năm' },
];

/**
 * Fixed-rate amortized monthly payment (dư nợ giảm dần theo công thức niên kim).
 * Returns the level monthly instalment covering principal + interest.
 */
function monthlyPayment(principal: number, annualRatePct: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

export default function LoanCalculator({ car }: { car: Car }) {
  // Vũ Bách Auto hỗ trợ trả góp tới 80% → khách trả trước tối thiểu 20%.
  const [downPct, setDownPct] = useState(30);
  const [ratePct, setRatePct] = useState(9);
  const [months, setMonths] = useState(60);

  const { downAmount, loanAmount, monthly, totalInterest } = useMemo(() => {
    const down = Math.round((car.price * downPct) / 100);
    const loan = car.price - down;
    const pay = monthlyPayment(loan, ratePct, months);
    return {
      downAmount: down,
      loanAmount: loan,
      monthly: Math.round(pay),
      totalInterest: Math.round(pay * months - loan),
    };
  }, [car.price, downPct, ratePct, months]);

  return (
    <section>
      <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-charcoal">
        <CalculatorOutlined className="text-brand" /> Tính trả góp
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Ước tính khoản trả hàng tháng theo dư nợ giảm dần. Con số chỉ mang tính tham khảo, lãi suất
        thực tế tuỳ ngân hàng và hồ sơ.
      </p>

      <div className="mt-4 grid gap-6 rounded-2xl border border-gray-100 bg-white p-5 sm:grid-cols-2 sm:p-6">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Trả trước</span>
              <span className="text-sm font-bold text-charcoal">{downPct}%</span>
            </div>
            <Slider
              min={20}
              max={90}
              step={5}
              value={downPct}
              onChange={setDownPct}
              tooltip={{ formatter: (v) => `${v}%` }}
            />
            <p className="text-xs text-gray-400">{formatPrice(downAmount)}</p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Lãi suất</span>
              <span className="text-sm font-bold text-charcoal">{ratePct}%/năm</span>
            </div>
            <Slider
              min={5}
              max={15}
              step={0.5}
              value={ratePct}
              onChange={setRatePct}
              tooltip={{ formatter: (v) => `${v}%/năm` }}
            />
          </div>

          <div>
            <span className="text-sm text-gray-500">Thời hạn vay</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {TERMS.map((t) => (
                <button
                  key={t.months}
                  type="button"
                  onClick={() => setMonths(t.months)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors ${
                    months === t.months
                      ? 'border-brand bg-brand text-white'
                      : 'border-gray-200 text-charcoal hover:border-brand hover:text-brand'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col justify-center rounded-xl bg-gray-50 p-5 text-center">
          <p className="text-sm text-gray-500">Trả hàng tháng (dự kiến)</p>
          <p className="mt-1 font-display text-3xl font-extrabold text-brand">
            {formatPrice(monthly)}
          </p>
          <p className="mt-0.5 text-xs text-gray-400">trong {months} tháng</p>

          <dl className="mt-5 space-y-2 text-left text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Số tiền vay</dt>
              <dd className="font-semibold text-charcoal">{formatPrice(loanAmount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Trả trước</dt>
              <dd className="font-semibold text-charcoal">{formatPrice(downAmount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Tổng lãi</dt>
              <dd className="font-semibold text-charcoal">{formatPrice(totalInterest)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
