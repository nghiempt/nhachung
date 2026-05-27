"use client";
/* eslint-disable @next/next/no-img-element */
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";

const fmtVNDfullTC = (n?: number) => (n != null ? `${Math.round(n).toLocaleString("vi-VN")}đ` : "—");
const fmtVNDfullTCSpace = (n?: number) => (n != null ? `${Math.round(n).toLocaleString("vi-VN")} đ` : "—");
const fmtVNDshortTC = (n?: number) => {
  if (n == null) return "—";
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2).replace(".", ",")}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".", ",")}M`;
  return `${n.toLocaleString("vi-VN")}đ`;
};
const fmtMonthLabelTC = (key: string) => {
  const [y, m] = key.split("-");
  return `T${Number(m)}/${y.slice(2)}`;
};

export default function ThuChiPage() {
  const { data } = useApi(() => api.incomeExpense(6), []);
  const kpis = data?.kpis ?? { totalIncome: 2_845_600_000, totalExpense: 2_138_900_000, surplus: 706_700_000, collectionRate: 98.6 };
  const monthly: any[] = data?.monthly ?? [];
  const aiSummary = data?.aiSummary;
  const lastMonth = monthly[monthly.length - 1];
  const incomeMonth = lastMonth?.income ?? kpis.totalIncome;
  const expenseMonth = lastMonth?.expense ?? kpis.totalExpense;
  const surplusMonth = lastMonth?.surplus ?? kpis.surplus;
  const ratio = incomeMonth ? ((expenseMonth / incomeMonth) * 100).toFixed(1) : "75.2";
  const periodTitleTC = lastMonth ? `Tháng ${lastMonth.month.split("-")[1]}/${lastMonth.month.split("-")[0]}` : "Tháng 5/2024";
  const expenseBreakdown: any[] = data?.expenseBreakdown ?? [];
  const totalExpense = kpis.totalExpense || 1;
  const recentTx: any[] = data?.recentTransactions ?? [];

  return (
    <div className="tc-page">
      {/* ── Page Header ── */}
      <div className="tc-page-hd">
        <div>
          <h1 className="tc-title">Báo cáo thu chi</h1>
          <p className="tc-sub">Chi tiết các khoản thu, chi và biến động dòng tiền của tòa nhà</p>
        </div>
        <div className="tc-actions">
          <button className="tc-btn">
            <img src="https://www.figma.com/api/mcp/asset/bb824f87-1b0e-4c71-ba99-09a0e1da7f1e" alt="" width="16" height="16" />
            {periodTitleTC}
            <img src="https://www.figma.com/api/mcp/asset/f68a73a3-66a4-4714-b40e-bd14e282faef" alt="" width="14" height="14" />
          </button>
          <button className="tc-btn">
            <img src="https://www.figma.com/api/mcp/asset/690e85bc-cb14-4eb3-931b-790db95c8d26" alt="" width="16" height="16" />
            Bộ lọc
          </button>
          <button className="tc-btn-primary">
            <img src="https://www.figma.com/api/mcp/asset/690e85bc-cb14-4eb3-931b-790db95c8d26" alt="" width="16" height="16" style={{ filter: "brightness(0) invert(1)" }} />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-icon-bg" style={{ background: "#e3fbed" }}>
            <img src="https://www.figma.com/api/mcp/asset/044401e8-31a2-4319-baba-dea119cc37a0" alt="" width="22" height="22" />
          </div>
          <div className="kpi-body">
            <div className="kpi-label">Tổng thu trong tháng</div>
            <div className="kpi-value">{fmtVNDfullTCSpace(incomeMonth)}</div>
            <div className="kpi-trend">
              <img src="https://www.figma.com/api/mcp/asset/533d51cd-ada2-4e1e-9195-c963cd036668" alt="" width="11" height="11" />
              <span className="kpi-pct up">+12.4%</span>
              <span className="kpi-tlabel">so với tháng 4/2024</span>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon-bg" style={{ background: "#ffeded" }}>
            <img src="https://www.figma.com/api/mcp/asset/426729a8-7cb5-4d21-88af-4a84e9722dd9" alt="" width="22" height="22" />
          </div>
          <div className="kpi-body">
            <div className="kpi-label">Tổng chi trong tháng</div>
            <div className="kpi-value">{fmtVNDfullTCSpace(expenseMonth)}</div>
            <div className="kpi-trend">
              <img src="https://www.figma.com/api/mcp/asset/7e266243-494f-485c-afcc-77d8e7a3f69a" alt="" width="11" height="11" />
              <span className="kpi-pct down">+8.7%</span>
              <span className="kpi-tlabel">so với tháng 4/2024</span>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon-bg" style={{ background: "#efeeff" }}>
            <img src="https://www.figma.com/api/mcp/asset/74172d89-4a1b-4dbd-b7c1-6c2ea57ab41c" alt="" width="22" height="22" />
          </div>
          <div className="kpi-body">
            <div className="kpi-label">Thặng dư / thâm hụt</div>
            <div className="kpi-value">{fmtVNDfullTCSpace(surplusMonth)}</div>
            <div className="kpi-trend">
              <img src="https://www.figma.com/api/mcp/asset/533d51cd-ada2-4e1e-9195-c963cd036668" alt="" width="11" height="11" />
              <span className="kpi-pct up">+28.6%</span>
              <span className="kpi-tlabel">so với tháng 4/2024</span>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon-bg" style={{ background: "#e4f1ff" }}>
            <img src="https://www.figma.com/api/mcp/asset/06413164-378f-45dc-a373-944256292fb7" alt="" width="22" height="22" />
          </div>
          <div className="kpi-body">
            <div className="kpi-label">Tỉ lệ chi / thu</div>
            <div className="kpi-value">{ratio}%</div>
            <div className="kpi-trend">
              <img src="https://www.figma.com/api/mcp/asset/7e266243-494f-485c-afcc-77d8e7a3f69a" alt="" width="11" height="11" />
              <span className="kpi-pct down">+3.1%</span>
              <span className="kpi-tlabel">so với tháng 4/2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Summary Banner ── */}
      <div className="ai-sum-banner">
        <div className="ai-sum-icon-wrap">
          <img src="https://www.figma.com/api/mcp/asset/25958985-3347-42bb-be2a-fd5ff8597dd2" alt="" width="24" height="24" />
        </div>
        <div className="ai-sum-body">
          <div className="ai-sum-label">AI Phân tích nhanh</div>
          <div className="ai-sum-text">
            {aiSummary?.headline ? (
              <>
                {aiSummary.headline}{" "}
                {aiSummary.highlights?.map((h: any, i: number) => (
                  <span key={i} className={h.tone === "positive" ? "hl-green" : "hl-red"} style={{ marginRight: 6 }}>{h.text}</span>
                ))}
              </>
            ) : (
              <>{periodTitleTC}, tòa nhà ghi nhận thặng dư <span className="hl-green">dương {fmtVNDshortTC(surplusMonth)}</span>, cải thiện <span className="hl-green">28.6%</span> so với tháng trước. Tỉ lệ thu phí quản lý đạt <span className="hl-green">{kpis.collectionRate ?? 98.6}%</span>, rất tốt. Khoản chi tăng chủ yếu từ <span className="hl-red">Bảo trì & sửa chữa</span> (+14.2%) do thay thế thiết bị PCCC định kỳ.</>
            )}
          </div>
        </div>
        <button className="ai-sum-btn">
          Xem chi tiết
          <img src="https://www.figma.com/api/mcp/asset/1fe2686f-14e9-4794-99b2-6091479ae9d6" alt="" width="14" height="14" />
        </button>
      </div>

      {/* ── Chart Row ── */}
      <div className="chart-row">
        <div className="chart-card">
          <div className="chart-hd">
            <div className="chart-title">
              Biến động thu chi
              <span className="chart-info">i</span>
            </div>
            <div className="chart-period">
              6 tháng gần nhất
              <img src="https://www.figma.com/api/mcp/asset/f68a73a3-66a4-4714-b40e-bd14e282faef" alt="" width="13" height="13" />
            </div>
          </div>

          <div className="chart-svg-area" style={{ height: "300px", position: "relative" }}>
            <span className="chart-y-lbl" style={{ top: "8px" }}>3.2B</span>
            <span className="chart-y-lbl" style={{ top: "72px" }}>2.4B</span>
            <span className="chart-y-lbl" style={{ top: "136px" }}>1.6B</span>
            <span className="chart-y-lbl" style={{ top: "200px" }}>800M</span>
            <span className="chart-y-lbl" style={{ top: "264px" }}>0</span>

            <svg
              viewBox="0 0 640 280"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: "absolute", left: "44px", right: 0, top: 0, bottom: "20px", width: "calc(100% - 44px)", height: "280px" }}
            >
              <line x1="0" y1="8" x2="640" y2="8" stroke="#f0f0f5" strokeWidth="1" />
              <line x1="0" y1="72" x2="640" y2="72" stroke="#f0f0f5" strokeWidth="1" />
              <line x1="0" y1="136" x2="640" y2="136" stroke="#f0f0f5" strokeWidth="1" />
              <line x1="0" y1="200" x2="640" y2="200" stroke="#f0f0f5" strokeWidth="1" />
              <line x1="0" y1="264" x2="640" y2="264" stroke="#e8e8f0" strokeWidth="1" />

              <rect x="20" y="72" width="38" height="192" rx="5" fill="#8b80f9" opacity="0.85" />
              <rect x="62" y="122" width="38" height="142" rx="5" fill="#ef6b7c" opacity="0.85" />

              <rect x="120" y="88" width="38" height="176" rx="5" fill="#8b80f9" opacity="0.85" />
              <rect x="162" y="116" width="38" height="148" rx="5" fill="#ef6b7c" opacity="0.85" />

              <rect x="220" y="64" width="38" height="200" rx="5" fill="#8b80f9" opacity="0.85" />
              <rect x="262" y="108" width="38" height="156" rx="5" fill="#ef6b7c" opacity="0.85" />

              <rect x="320" y="44" width="38" height="220" rx="5" fill="#8b80f9" opacity="0.85" />
              <rect x="362" y="96" width="38" height="168" rx="5" fill="#ef6b7c" opacity="0.85" />

              <rect x="420" y="64" width="38" height="200" rx="5" fill="#8b80f9" opacity="0.85" />
              <rect x="462" y="106" width="38" height="158" rx="5" fill="#ef6b7c" opacity="0.85" />

              <rect x="520" y="18" width="38" height="246" rx="5" fill="#8b80f9" />
              <rect x="562" y="88" width="38" height="176" rx="5" fill="#ef6b7c" />

              <polyline
                points="39,150 139,172 239,132 339,124 439,132 539,100"
                fill="none"
                stroke="#22c08a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="39" cy="150" r="4" fill="#22c08a" stroke="#fff" strokeWidth="2" />
              <circle cx="139" cy="172" r="4" fill="#22c08a" stroke="#fff" strokeWidth="2" />
              <circle cx="239" cy="132" r="4" fill="#22c08a" stroke="#fff" strokeWidth="2" />
              <circle cx="339" cy="124" r="4" fill="#22c08a" stroke="#fff" strokeWidth="2" />
              <circle cx="439" cy="132" r="4" fill="#22c08a" stroke="#fff" strokeWidth="2" />
              <circle cx="539" cy="100" r="6" fill="#22c08a" stroke="#fff" strokeWidth="2.5" />

              {(monthly.length >= 6 ? monthly.slice(-6) : [{month:"2023-12"},{month:"2024-01"},{month:"2024-02"},{month:"2024-03"},{month:"2024-04"},{month:"2024-05"}]).map((m: any, i: number) => {
                const xs = [39, 139, 239, 339, 439, 539];
                const isLast = i === 5;
                return (
                  <text key={m.month ?? i} x={xs[i]} y="278" textAnchor="middle" fontSize="12" fill={isLast ? "#4137f9" : "#585c7b"} fontWeight={isLast ? "600" : "400"} fontFamily="Inter,sans-serif">{fmtMonthLabelTC(m.month)}</text>
                );
              })}
            </svg>

            <div className="chart-tooltip" style={{ top: "30px", left: "60%" }}>
              <div className="tt-title">{periodTitleTC}</div>
              <div className="tt-row">
                <div className="tt-dot" style={{ background: "#8b80f9" }}></div>
                <span className="tt-name">Tổng thu</span>
                <span className="tt-val">{fmtVNDfullTC(incomeMonth)}</span>
              </div>
              <div className="tt-row">
                <div className="tt-dot" style={{ background: "#ef6b7c" }}></div>
                <span className="tt-name">Tổng chi</span>
                <span className="tt-val">{fmtVNDfullTC(expenseMonth)}</span>
              </div>
              <div className="tt-row">
                <div className="tt-dot" style={{ background: "#22c08a" }}></div>
                <span className="tt-name">Thặng dư</span>
                <span className="tt-val">{fmtVNDfullTC(surplusMonth)}</span>
              </div>
            </div>
          </div>

          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-dot" style={{ background: "#8b80f9" }}></div>
              <span className="legend-lbl">Tổng thu</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ background: "#ef6b7c" }}></div>
              <span className="legend-lbl">Tổng chi</span>
            </div>
            <div className="legend-item">
              <div className="legend-line" style={{ background: "#22c08a" }}></div>
              <span className="legend-lbl">Thặng dư</span>
            </div>
          </div>
        </div>

        {/* Donut */}
        <div className="donut-card">
          <div className="donut-title">Cơ cấu chi phí</div>
          <div className="donut-wrap">
            <img src="https://www.figma.com/api/mcp/asset/b5288dca-c5ba-442d-9c20-ddaf75ae7faf" alt="Cơ cấu chi phí" />
            <div className="donut-center">
              <div className="donut-cval">{fmtVNDshortTC(kpis.totalExpense)}</div>
              <div className="donut-clbl">Tổng chi</div>
            </div>
          </div>
          <div className="donut-legend">
            {(expenseBreakdown.length ? expenseBreakdown.slice(0, 6).map((c: any, i: number) => ({
              color: ["#7a6dff","#ff9d6a","#3ddcb6","#a99cff","#c7d3ff","#f5b5d4"][i % 6],
              name: c.name,
              pct: `${Math.round((c.amount / totalExpense) * 100)}%`,
              amt: fmtVNDshortTC(c.amount),
            })) : [
              { color: "#7a6dff", name: "Vận hành", pct: "35%", amt: "748,6M" },
              { color: "#ff9d6a", name: "Điện nước", pct: "22%", amt: "470,8M" },
              { color: "#3ddcb6", name: "Bảo trì", pct: "18%", amt: "385,2M" },
              { color: "#a99cff", name: "Dịch vụ", pct: "12%", amt: "256,6M" },
              { color: "#c7d3ff", name: "Nhân sự", pct: "8%", amt: "171,1M" },
              { color: "#f5b5d4", name: "Khác", pct: "5%", amt: "106,6M" },
            ]).map((r: any) => (
              <div className="donut-row" key={r.name}>
                <div className="donut-left">
                  <div className="donut-dot" style={{ background: r.color }}></div>
                  <span className="donut-name">{r.name}</span>
                </div>
                <span className="donut-pct">{r.pct}</span>
                <span className="donut-amt">{r.amt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Breakdown Tables ── */}
      <div className="breakdown-row">
        <div className="breakdown-card">
          <div className="breakdown-hd">
            <div className="breakdown-title">Chi tiết khoản thu</div>
            <div className="breakdown-total"><span>Tổng:</span>{fmtVNDfullTC(kpis.totalIncome)}</div>
          </div>
          <div className="bd-table">
            {[
              { name: "Phí quản lý chung cư", sub: "Đạt 98.6% kế hoạch • 856/868 căn hộ", width: "62%", color: "#8b80f9", amount: "1.764.272.000đ", cmp: "+8.2%", cmpClass: "up" },
              { name: "Phí gửi xe", sub: "512 ô tô • 1.246 xe máy", width: "18%", color: "#8b80f9", amount: "512.208.000đ", cmp: "+15.3%", cmpClass: "up" },
              { name: "Cho thuê mặt bằng", sub: "12 đơn vị thuê", width: "12%", color: "#8b80f9", amount: "341.472.000đ", cmp: "+22.4%", cmpClass: "up" },
              { name: "Lãi tiền gửi quỹ", sub: "Quỹ bảo trì 6.5%/năm", width: "6%", color: "#8b80f9", amount: "170.736.000đ", cmp: "+3.1%", cmpClass: "up" },
              { name: "Phí dịch vụ tiện ích", sub: "Hồ bơi • Phòng gym • BBQ", width: "2%", color: "#8b80f9", amount: "56.912.000đ", cmp: "-4.8%", cmpClass: "down" },
            ].map((r) => (
              <div className="bd-row" key={r.name}>
                <div className="bd-name-col">
                  <div className="bd-name">{r.name}</div>
                  <div className="bd-sub">{r.sub}</div>
                </div>
                <div className="bd-bar-col">
                  <div className="bd-bar-track">
                    <div className="bd-bar-fill" style={{ width: r.width, background: r.color }}></div>
                  </div>
                </div>
                <div className="bd-amount-col">
                  <div className="bd-amount">{r.amount}</div>
                  <div className={`bd-cmp ${r.cmpClass}`}>{r.cmp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="breakdown-card">
          <div className="breakdown-hd">
            <div className="breakdown-title">Chi tiết khoản chi</div>
            <div className="breakdown-total"><span>Tổng:</span>{fmtVNDfullTC(kpis.totalExpense)}</div>
          </div>
          <div className="bd-table">
            {[
              { name: "Vận hành & quản lý", sub: "35% tổng chi", width: "100%", color: "#7a6dff", amount: "748.615.000đ", cmp: "+0.4%", cmpClass: "neu" },
              { name: "Điện nước chung", sub: "22% tổng chi • Tăng do mùa nóng", width: "63%", color: "#ff9d6a", amount: "470.558.000đ", cmp: "+11.7%", cmpClass: "down" },
              { name: "Bảo trì & sửa chữa", sub: "18% • Thay thế thiết bị PCCC", width: "51%", color: "#3ddcb6", amount: "385.002.000đ", cmp: "+14.2%", cmpClass: "down" },
              { name: "Dịch vụ tiện ích", sub: "12% • Hồ bơi, gym, BBQ", width: "34%", color: "#a99cff", amount: "256.668.000đ", cmp: "-2.1%", cmpClass: "up" },
              { name: "Nhân sự & lương", sub: "8% • 24 nhân viên", width: "23%", color: "#c7d3ff", amount: "171.112.000đ", cmp: "±0%", cmpClass: "neu" },
            ].map((r) => (
              <div className="bd-row" key={r.name}>
                <div className="bd-name-col">
                  <div className="bd-name">{r.name}</div>
                  <div className="bd-sub">{r.sub}</div>
                </div>
                <div className="bd-bar-col">
                  <div className="bd-bar-track">
                    <div className="bd-bar-fill" style={{ width: r.width, background: r.color }}></div>
                  </div>
                </div>
                <div className="bd-amount-col">
                  <div className="bd-amount">{r.amount}</div>
                  <div className={`bd-cmp ${r.cmpClass}`}>{r.cmp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Giao dịch gần đây ── */}
      <div className="txn-card">
        <div className="txn-hd">
          <div className="txn-title">Giao dịch gần đây</div>
          <span className="txn-link">
            Xem tất cả
            <img src="https://www.figma.com/api/mcp/asset/1fe2686f-14e9-4794-99b2-6091479ae9d6" alt="" width="13" height="13" />
          </span>
        </div>

        <div className="txn-table-hd">
          <span>MÃ GIAO DỊCH</span>
          <span>MÔ TẢ</span>
          <span style={{ textAlign: "center" }}>DANH MỤC</span>
          <span style={{ textAlign: "center" }}>NGÀY</span>
          <span style={{ textAlign: "center" }}>HÌNH THỨC</span>
          <span style={{ textAlign: "right" }}>SỐ TIỀN</span>
        </div>

        {(recentTx.length ? recentTx.slice(0, 8).map((t: any, i: number) => {
          const isIncome = t.type === "INCOME";
          return {
            id: `#GD-${new Date(t.transactionDate).toISOString().slice(2, 10).replace(/-/g, "")}-${String(i + 30).padStart(3, "0")}`,
            iconBg: isIncome ? "#e3fbed" : "#ffeded",
            icon: isIncome ? "https://www.figma.com/api/mcp/asset/47f9e73d-0043-419f-8ee5-ba6a7ecba22e" : "https://www.figma.com/api/mcp/asset/608266b7-1e25-4466-a5f3-68a8ebf94ae6",
            main: t.description,
            sub: t.category?.name ?? (isIncome ? "Khoản thu" : "Khoản chi"),
            catBg: isIncome ? "#e3fbed" : "#fff1de",
            catColor: isIncome ? "#1c9d5f" : "#c8761b",
            cat: t.category?.name ?? (isIncome ? "Thu" : "Chi"),
            date: new Date(t.transactionDate).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }),
            method: t.paymentMethod ?? "Chuyển khoản",
            amount: `${isIncome ? "+" : "-"} ${Number(t.amount).toLocaleString("vi-VN")}đ`,
            type: isIncome ? "income" : "expense",
          };
        }) : [
          {
            id: "#GD-240525-038", iconBg: "#e3fbed", icon: "https://www.figma.com/api/mcp/asset/47f9e73d-0043-419f-8ee5-ba6a7ecba22e",
            main: "Thu phí quản lý kỳ T5/2024 — A-12.05", sub: "76 căn hộ Block A",
            catBg: "#efeaff", catColor: "#5a3ad9", cat: "Phí quản lý",
            date: "25/05", method: "Chuyển khoản", amount: "+ 168.080.000đ", type: "income",
          },
          {
            id: "#GD-240524-037", iconBg: "#ffeded", icon: "https://www.figma.com/api/mcp/asset/608266b7-1e25-4466-a5f3-68a8ebf94ae6",
            main: "Thay thế bình chữa cháy CO₂ định kỳ", sub: "Công ty PCCC Sài Gòn • Hợp đồng 2024-PC-08",
            catBg: "#fff1de", catColor: "#c8761b", cat: "Bảo trì",
            date: "24/05", method: "Chuyển khoản", amount: "- 84.500.000đ", type: "expense",
          },
          {
            id: "#GD-240523-036", iconBg: "#e3fbed", icon: "https://www.figma.com/api/mcp/asset/47f9e73d-0043-419f-8ee5-ba6a7ecba22e",
            main: "Phí gửi xe ô tô tháng 5/2024 — Block B", sub: "142 chỗ đỗ xe • 1.500.000đ/chỗ",
            catBg: "#e3fbed", catColor: "#1c9d5f", cat: "Phí gửi xe",
            date: "23/05", method: "Chuyển khoản", amount: "+ 213.000.000đ", type: "income",
          },
          {
            id: "#GD-240522-035", iconBg: "#ffeded", icon: "https://www.figma.com/api/mcp/asset/608266b7-1e25-4466-a5f3-68a8ebf94ae6",
            main: "Hóa đơn tiền điện khu vực chung T4/2024", sub: "EVN HCM • Hợp đồng PD15-22",
            catBg: "#e4f1ff", catColor: "#1f6dd4", cat: "Điện nước",
            date: "22/05", method: "Chuyển khoản", amount: "- 312.680.000đ", type: "expense",
          },
          {
            id: "#GD-240521-034", iconBg: "#e3fbed", icon: "https://www.figma.com/api/mcp/asset/47f9e73d-0043-419f-8ee5-ba6a7ecba22e",
            main: "Cho thuê mặt bằng cửa hàng tầng 1 — Tháng 5", sub: "Highland Coffee • Hợp đồng MB-04",
            catBg: "#fff1de", catColor: "#c8761b", cat: "Cho thuê",
            date: "21/05", method: "Chuyển khoản", amount: "+ 78.000.000đ", type: "income",
          },
          {
            id: "#GD-240520-033", iconBg: "#ffeded", icon: "https://www.figma.com/api/mcp/asset/608266b7-1e25-4466-a5f3-68a8ebf94ae6",
            main: "Lương nhân viên vận hành tháng 5/2024", sub: "24 nhân viên • Bao gồm BHXH",
            catBg: "#eef0f7", catColor: "#3e4265", cat: "Nhân sự",
            date: "20/05", method: "Chuyển khoản", amount: "- 171.112.000đ", type: "expense",
          },
          {
            id: "#GD-240518-032", iconBg: "#ffeded", icon: "https://www.figma.com/api/mcp/asset/608266b7-1e25-4466-a5f3-68a8ebf94ae6",
            main: "Vệ sinh và bảo dưỡng hồ bơi tầng thượng", sub: "PoolCare Service • HĐ DV-2024-12",
            catBg: "#efeaff", catColor: "#5a3ad9", cat: "Dịch vụ tiện ích",
            date: "18/05", method: "Tiền mặt", amount: "- 24.500.000đ", type: "expense",
          },
          {
            id: "#GD-240515-031", iconBg: "#e3fbed", icon: "https://www.figma.com/api/mcp/asset/47f9e73d-0043-419f-8ee5-ba6a7ecba22e",
            main: "Lãi tiền gửi quỹ bảo trì Q2/2024", sub: "Vietcombank • Số tài khoản 0700-***-4521",
            catBg: "#e3fbed", catColor: "#1c9d5f", cat: "Lãi tiền gửi",
            date: "15/05", method: "Chuyển khoản", amount: "+ 56.912.000đ", type: "income",
          },
        ]).map((t: any) => (
          <div className="txn-row" key={t.id}>
            <div className="txn-id-col">
              <span className="txn-id">{t.id}</span>
            </div>
            <div className="txn-desc-col">
              <div className="txn-type-icon" style={{ background: t.iconBg }}>
                <img src={t.icon} alt="" width="18" height="18" />
              </div>
              <div className="txn-desc-body">
                <div className="txn-desc-main">{t.main}</div>
                <div className="txn-desc-sub">{t.sub}</div>
              </div>
            </div>
            <div className="txn-cat-col">
              <span className="txn-cat-badge" style={{ background: t.catBg, color: t.catColor }}>{t.cat}</span>
            </div>
            <div className="txn-date-col">{t.date}</div>
            <div className="txn-method-col">{t.method}</div>
            <div className="txn-amt-col"><span className={`txn-amount ${t.type}`}>{t.amount}</span></div>
          </div>
        ))}

        <div className="txn-pagination">
          <span className="txn-pag-label">Hiển thị 1 - {Math.min(8, recentTx.length || 8)} của {recentTx.length || 64} giao dịch trong {periodTitleTC.toLowerCase()}</span>
          <div className="txn-pag-btns">
            <button className="pag-btn">‹</button>
            <button className="pag-btn active">1</button>
            <button className="pag-btn">2</button>
            <button className="pag-btn">3</button>
            <button className="pag-btn">4</button>
            <span className="pag-sep">…</span>
            <button className="pag-btn">8</button>
            <button className="pag-btn">›</button>
          </div>
        </div>
      </div>

      {/* ── Bottom AI Banner ── */}
      <div className="ai-bot-banner">
        <img className="ai-bot-bg" src="https://www.figma.com/api/mcp/asset/e1803480-f04b-45ee-b55c-9cd83b6024a7" alt="" />
        <div className="ai-bot-content">
          <div className="ai-bot-tag">AI Assistant</div>
          <div className="ai-bot-title">Trợ lý AI tài chính<br />thông minh</div>
          <button className="ai-bot-cta">
            Hỏi ngay
            <img src="https://www.figma.com/api/mcp/asset/2d5f6eb3-da7c-4c55-b3e3-3e94dcef4928" alt="" width="16" height="16" />
          </button>
        </div>
      </div>
    </div>
  );
}
