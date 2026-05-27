const ArrowUp = () => (
  <svg className="arrow-up" viewBox="0 0 12 12" fill="none">
    <path d="M6 10V2M2 6l4-4 4 4" stroke="#1c9d5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowDown = () => (
  <svg className="arrow-down" viewBox="0 0 12 12" fill="none">
    <path d="M6 2v8M2 6l4 4 4-4" stroke="#f5222d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function QuyBaoTriPage() {
  return (
    <div className="qbt-page">
      {/* ── Page Header ── */}
      <div className="page-hd">
        <div>
          <h1 className="page-title">Quỹ bảo trì</h1>
          <p className="page-sub">Thông tin quỹ bảo trì tòa nhà và kế hoạch sử dụng</p>
        </div>
        <div className="page-actions">
          <button className="btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Tháng 5/2024
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <button className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-icon-bg" style={{ background: "#efeeff" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#4137f9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              <line x1="12" y1="12" x2="12" y2="16" />
              <line x1="10" y1="14" x2="14" y2="14" />
            </svg>
          </div>
          <div>
            <div className="kpi-label">Số dư quỹ hiện tại</div>
            <div className="kpi-value">8.265.000.000 đ</div>
            <div className="kpi-trend">
              <ArrowUp />
              <span className="kpi-pct up">+3.2%</span>
              <span className="kpi-tlabel">so với tháng trước</span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-bg" style={{ background: "#e3fbed" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1c9d5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <div className="kpi-label">Tổng đã thu</div>
            <div className="kpi-value">12.450.000.000 đ</div>
            <div className="kpi-trend">
              <ArrowUp />
              <span className="kpi-pct up">+8.4%</span>
              <span className="kpi-tlabel">so với năm ngoái</span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-bg" style={{ background: "#ffeded" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#f5222d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M16 8l-8 8M8 8l8 8" />
            </svg>
          </div>
          <div>
            <div className="kpi-label">Tổng đã chi</div>
            <div className="kpi-value">4.185.000.000 đ</div>
            <div className="kpi-trend">
              <ArrowDown />
              <span className="kpi-pct down">+12.1%</span>
              <span className="kpi-tlabel">so với năm ngoái</span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-bg" style={{ background: "#e4f1ff" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1f6dd4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <div>
            <div className="kpi-label">Lãi tiền gửi 2024</div>
            <div className="kpi-value">538.225.000 đ</div>
            <div className="kpi-trend">
              <ArrowUp />
              <span className="kpi-pct up">+6.5%</span>
              <span className="kpi-tlabel">lãi suất / năm</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Chart Row ── */}
      <div className="chart-row">
        <div className="chart-card">
          <div className="chart-hd">
            <div className="chart-title">Biến động số dư quỹ</div>
            <div className="chart-period">
              2 năm gần nhất
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <div className="chart-svg-wrap" style={{ position: "relative", minHeight: "260px" }}>
            <span className="chart-y-lbl" style={{ top: "8px" }}>10B</span>
            <span className="chart-y-lbl" style={{ top: "68px" }}>8B</span>
            <span className="chart-y-lbl" style={{ top: "128px" }}>6B</span>
            <span className="chart-y-lbl" style={{ top: "188px" }}>4B</span>
            <span className="chart-y-lbl" style={{ top: "248px" }}>0</span>

            <svg
              viewBox="0 0 640 260"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: "absolute", left: "44px", right: 0, top: 0, bottom: 0, width: "calc(100% - 44px)", height: "260px" }}
            >
              <line x1="0" y1="8" x2="640" y2="8" stroke="#f0f0f5" strokeWidth="1" />
              <line x1="0" y1="68" x2="640" y2="68" stroke="#f0f0f5" strokeWidth="1" />
              <line x1="0" y1="128" x2="640" y2="128" stroke="#f0f0f5" strokeWidth="1" />
              <line x1="0" y1="188" x2="640" y2="188" stroke="#f0f0f5" strokeWidth="1" />
              <line x1="0" y1="248" x2="640" y2="248" stroke="#e8e8f0" strokeWidth="1" />

              <rect x="16" y="208" width="28" height="40" rx="3" fill="#ef6b7c" opacity="0.7" />
              <rect x="96" y="224" width="28" height="24" rx="3" fill="#ef6b7c" opacity="0.7" />
              <rect x="176" y="216" width="28" height="32" rx="3" fill="#ef6b7c" opacity="0.7" />
              <rect x="256" y="176" width="28" height="72" rx="3" fill="#ef6b7c" opacity="0.7" />
              <rect x="336" y="220" width="28" height="28" rx="3" fill="#ef6b7c" opacity="0.7" />
              <rect x="416" y="218" width="28" height="30" rx="3" fill="#ef6b7c" opacity="0.7" />
              <rect x="496" y="164" width="28" height="84" rx="3" fill="#ef6b7c" opacity="0.7" />
              <rect x="576" y="220" width="28" height="28" rx="3" fill="#ef6b7c" opacity="0.7" />

              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4137f9" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#4137f9" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path
                d="M 0,188 L 80,148 L 160,114 L 240,124 L 320,96 L 400,62 L 480,74 L 560,54 L 640,46 L 640,248 L 0,248 Z"
                fill="url(#areaGrad)"
              />
              <polyline
                points="0,188 80,148 160,114 240,124 320,96 400,62 480,74 560,54 640,46"
                fill="none"
                stroke="#4137f9"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="0" cy="188" r="4" fill="#4137f9" stroke="#fff" strokeWidth="2" />
              <circle cx="80" cy="148" r="4" fill="#4137f9" stroke="#fff" strokeWidth="2" />
              <circle cx="160" cy="114" r="4" fill="#4137f9" stroke="#fff" strokeWidth="2" />
              <circle cx="240" cy="124" r="4" fill="#4137f9" stroke="#fff" strokeWidth="2" />
              <circle cx="320" cy="96" r="4" fill="#4137f9" stroke="#fff" strokeWidth="2" />
              <circle cx="400" cy="62" r="4" fill="#4137f9" stroke="#fff" strokeWidth="2" />
              <circle cx="480" cy="74" r="4" fill="#4137f9" stroke="#fff" strokeWidth="2" />
              <circle cx="560" cy="54" r="4" fill="#4137f9" stroke="#fff" strokeWidth="2" />
              <circle cx="640" cy="46" r="6" fill="#4137f9" stroke="#fff" strokeWidth="2.5" />

              <text x="0" y="260" textAnchor="middle" fontSize="11.5" fill="#585c7b" fontFamily="Inter,sans-serif">Q3/22</text>
              <text x="80" y="260" textAnchor="middle" fontSize="11.5" fill="#585c7b" fontFamily="Inter,sans-serif">Q4/22</text>
              <text x="160" y="260" textAnchor="middle" fontSize="11.5" fill="#585c7b" fontFamily="Inter,sans-serif">Q1/23</text>
              <text x="240" y="260" textAnchor="middle" fontSize="11.5" fill="#585c7b" fontFamily="Inter,sans-serif">Q2/23</text>
              <text x="320" y="260" textAnchor="middle" fontSize="11.5" fill="#585c7b" fontFamily="Inter,sans-serif">Q3/23</text>
              <text x="400" y="260" textAnchor="middle" fontSize="11.5" fill="#585c7b" fontFamily="Inter,sans-serif">Q4/23</text>
              <text x="480" y="260" textAnchor="middle" fontSize="11.5" fill="#585c7b" fontFamily="Inter,sans-serif">Q1/24</text>
              <text x="560" y="260" textAnchor="middle" fontSize="11.5" fill="#585c7b" fontFamily="Inter,sans-serif">Q2/24</text>
              <text x="640" y="260" textAnchor="middle" fontSize="11.5" fill="#4137f9" fontWeight="600" fontFamily="Inter,sans-serif">T5/24</text>
            </svg>
          </div>

          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-line" style={{ background: "#4137f9" }}></div>
              <span className="legend-lbl">Số dư tích lũy</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ background: "#ef6b7c" }}></div>
              <span className="legend-lbl">Chi phí bảo trì</span>
            </div>
          </div>
        </div>

        {/* Fund info card */}
        <div className="fund-info-card">
          <div className="fund-info-title">Thông tin quỹ</div>

          <div className="fund-info-list">
            {[
              { k: "Ngân hàng", v: "Vietcombank" },
              { k: "Số tài khoản", v: "0700-***-4521" },
              { k: "Lãi suất tiền gửi", v: "6.5% / năm", cls: "green" },
              { k: "Mức đóng quỹ", v: "2% giá trị HĐ" },
              { k: "Cập nhật lần cuối", v: "25/05/2024" },
            ].map((r) => (
              <div className="fund-info-row" key={r.k}>
                <span className="fund-info-key">{r.k}</span>
                <span className={`fund-info-val ${r.cls ?? ""}`}>{r.v}</span>
              </div>
            ))}
          </div>

          <div className="collect-rate-wrap">
            <div className="collect-rate-hd">
              <span className="collect-rate-label">Tỉ lệ thu quỹ</span>
              <span className="collect-rate-val">98.6%</span>
            </div>
            <div className="collect-bar-track">
              <div className="collect-bar-fill" style={{ width: "98.6%" }}></div>
            </div>
            <span className="collect-sub">856 / 868 căn hộ đã đóng quỹ — còn 12 căn chưa đóng</span>
          </div>
        </div>
      </div>

      {/* ── Two tables ── */}
      <div className="two-table-row">
        <div className="table-card">
          <div className="table-hd">
            <div className="table-title">Chi phí bảo trì gần đây</div>
            <span className="table-link">Xem tất cả →</span>
          </div>
          <div className="exp-table">
            <div className="exp-hd">
              <span>Hạng mục</span>
              <span>Nhà thầu</span>
              <span>Số tiền</span>
              <span style={{ textAlign: "center" }}>Trạng thái</span>
            </div>
            {[
              { name: "Thay thiết bị PCCC", date: "20/05/2024", contractor: "PCCC Sài Gòn", amount: "385.002.000đ" },
              { name: "Sơn lại hành lang Block B", date: "12/05/2024", contractor: "XD Việt Nam", amount: "124.500.000đ" },
              { name: "Bảo dưỡng thang máy Otis", date: "05/05/2024", contractor: "OTIS Vietnam", amount: "86.800.000đ" },
              { name: "Thay bơm nước tầng hầm B1", date: "28/04/2024", contractor: "Cơ điện lạnh BK", amount: "215.000.000đ" },
              { name: "Sửa hệ thống điện tầng 1–5", date: "15/04/2024", contractor: "Điện lực Sunrise", amount: "54.300.000đ" },
            ].map((r) => (
              <div className="exp-row" key={r.name}>
                <div>
                  <div className="exp-name">{r.name}</div>
                  <div style={{ fontSize: "11px", color: "#585c7b" }}>{r.date}</div>
                </div>
                <div className="exp-contractor">{r.contractor}</div>
                <div className="exp-amount">{r.amount}</div>
                <div className="exp-status-wrap"><span className="badge badge-green">Hoàn thành</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="table-card">
          <div className="table-hd">
            <div className="table-title">Kế hoạch bảo trì sắp tới</div>
            <span className="table-link">Chi tiết →</span>
          </div>
          <div className="plan-list">
            {[
              { dot: "planned", name: "Bảo dưỡng điều hòa trung tâm", meta: "Công ty Lạnh Sunshine • Tháng 6/2024", amount: "320.000.000đ", badge: "blue", badgeText: "Đã lên KH" },
              { dot: "planned", name: "Kiểm tra PCCC định kỳ Q3", meta: "PCCC Sài Gòn • Tháng 7/2024", amount: "45.000.000đ", badge: "blue", badgeText: "Đã lên KH" },
              { dot: "planned", name: "Tổng vệ sinh bể ngầm", meta: "Công ty MT Xanh • Tháng 8/2024", amount: "28.500.000đ", badge: "blue", badgeText: "Đã lên KH" },
              { dot: "tentative", name: "Sơn lại mặt tiền tòa nhà", meta: "Đang chọn nhà thầu • Tháng 9/2024", amount: "486.000.000đ", badge: "gray", badgeText: "Dự kiến" },
              { dot: "tentative", name: "Nâng cấp hệ thống camera", meta: "Đang chọn nhà thầu • Q4/2024", amount: "210.000.000đ", badge: "gray", badgeText: "Dự kiến" },
            ].map((r) => (
              <div className="plan-row" key={r.name}>
                <div className="plan-dot-col"><div className={`plan-dot ${r.dot}`}></div></div>
                <div className="plan-body">
                  <div className="plan-name">{r.name}</div>
                  <div className="plan-meta">{r.meta}</div>
                </div>
                <div className="plan-right">
                  <div className="plan-amount">{r.amount}</div>
                  <div className="plan-period"><span className={`badge badge-${r.badge}`}>{r.badgeText}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tình hình thu quỹ theo Block ── */}
      <div className="block-card">
        <div className="block-card-hd">
          <div className="block-card-title">Tình hình thu quỹ theo Block</div>
          <span className="block-card-meta">Cập nhật: 25/05/2024 • Tổng 856 / 868 căn hộ</span>
        </div>
        <div className="block-grid">
          {[
            { name: "Block A", count: "236 / 240 căn hộ", width: "98.3%", pct: "98.3%", missing: "Còn 4 căn chưa đóng" },
            { name: "Block B", count: "218 / 220 căn hộ", width: "99.1%", pct: "99.1%", missing: "Còn 2 căn chưa đóng" },
            { name: "Block C", count: "402 / 408 căn hộ", width: "98.5%", pct: "98.5%", missing: "Còn 6 căn chưa đóng" },
          ].map((b) => (
            <div className="block-item" key={b.name}>
              <div className="block-item-hd">
                <span className="block-name">{b.name}</span>
                <span className="block-count">{b.count}</span>
              </div>
              <div className="block-track">
                <div className="block-fill" style={{ width: b.width, background: "linear-gradient(90deg,#22c08a,#1c9d5f)" }}></div>
              </div>
              <div className="block-foot">
                <span className="block-pct">{b.pct}</span>
                <span className="block-missing">{b.missing}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
