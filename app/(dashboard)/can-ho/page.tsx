/* eslint-disable @next/next/no-img-element */

export default function CanHoPage() {
  return (
    <div className="canho-page">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div>
          <div className="page-title">Căn hộ của tôi</div>
          <div className="page-subtitle">Thông tin chi tiết căn hộ A-12.05 · Tháp A · Tầng 12 · Landmark 1</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-outline">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Tải hồ sơ căn hộ
          </button>
          <button className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
            Cập nhật thông tin
          </button>
        </div>
      </div>

      {/* ── Apartment Hero Banner ── */}
      <div className="apt-hero">
        <div className="apt-hero-left">
          <div className="apt-code">Landmark 1 · Block A · Floor 12</div>
          <div className="apt-name">A-12.05</div>
          <div className="apt-building">Vinhomes Central Park — TP. Hồ Chí Minh</div>
          <div className="apt-tags">
            <div className="apt-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
              95 m²
            </div>
            <div className="apt-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22v-7l9-5 9 5v7" /><path d="M3 11V5l9-3 9 3v6" /></svg>
              3 Phòng ngủ · 2 WC
            </div>
            <div className="apt-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 1 0 20" /><path d="M2 12h20" /></svg>
              Hướng Đông Nam
            </div>
            <div className="apt-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
              Sở hữu vĩnh viễn
            </div>
          </div>
        </div>
        <div className="apt-hero-right">
          <div className="apt-status-chip"><span className="apt-status-dot" /> Đang hoạt động</div>
          <div className="apt-hero-actions" style={{ marginTop: "auto" }}>
            <button className="btn-hero-outline">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
              Sơ đồ mặt bằng
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: "#efeeff" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#4137f9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
          </div>
          <div>
            <div className="stat-lbl">Diện tích thông thủy</div>
            <div className="stat-val">95 m²</div>
            <div className="stat-sub">Tim tường 102 m²</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: "#e4f1ff" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1870c4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22v-7l9-5 9 5v7" /><path d="M3 11V5l9-3 9 3v6" /></svg>
          </div>
          <div>
            <div className="stat-lbl">Vị trí</div>
            <div className="stat-val">Tầng 12</div>
            <div className="stat-sub">Tháp A · Căn số 05</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: "#e3fbed" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1c9d5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          </div>
          <div>
            <div className="stat-lbl">Loại căn hộ</div>
            <div className="stat-val">3 PN</div>
            <div className="stat-sub">2 WC · 2 ban công</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: "#fff8ec" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#c8761b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
          </div>
          <div>
            <div className="stat-lbl">Thời gian cư trú</div>
            <div className="stat-val">3 năm</div>
            <div className="stat-sub">Từ tháng 01/2022</div>
          </div>
        </div>
      </div>

      {/* ── Body layout ── */}
      <div className="body-layout">
        {/* Left: main info */}
        <div className="body-main">
          {/* Chi tiết căn hộ */}
          <div className="section-card">
            <div className="section-hd">
              <div className="section-title">
                <div className="section-title-icon" style={{ background: "#efeeff" }}><svg viewBox="0 0 24 24" fill="none" stroke="#4137f9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg></div>
                Chi tiết căn hộ
              </div>
              <button className="section-edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>Cập nhật</button>
            </div>
            <div className="section-body">
              <div className="info-grid">
                <div className="info-item"><div className="info-label">Mã căn hộ</div><div className="info-value">A-12.05</div></div>
                <div className="info-item"><div className="info-label">Tháp / Block</div><div className="info-value">Tháp A (Landmark 1)</div></div>
                <div className="info-item"><div className="info-label">Tầng</div><div className="info-value">12 / 47 tầng</div></div>
                <div className="info-item"><div className="info-label">Hướng căn hộ</div><div className="info-value">Đông Nam · View sông</div></div>
                <div className="info-item"><div className="info-label">Nội thất</div><div className="info-value">Đầy đủ nội thất cao cấp</div></div>
                <div className="info-item"><div className="info-label">Tình trạng</div><div className="info-value" style={{ color: "#1c9d5f", fontWeight: 600 }}>Đang sử dụng</div></div>
                <div className="info-item"><div className="info-label">Ban công</div><div className="info-value">2 ban công (12 m² + 8 m²)</div></div>
                <div className="info-item"><div className="info-label">Chỗ đậu xe</div><div className="info-value">B1-A21 (ô tô) · B2-M14 (xe máy)</div></div>
              </div>
            </div>
          </div>

          {/* Hợp đồng */}
          <div className="section-card">
            <div className="section-hd">
              <div className="section-title">
                <div className="section-title-icon" style={{ background: "#e4f1ff" }}><svg viewBox="0 0 24 24" fill="none" stroke="#1870c4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg></div>
                Hợp đồng &amp; Sở hữu
              </div>
              <button className="section-edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>Tải HĐ</button>
            </div>
            <div className="section-body">
              <div className="info-grid">
                <div className="info-item"><div className="info-label">Số hợp đồng</div><div className="info-value">LM1-2022-A1205-01</div></div>
                <div className="info-item"><div className="info-label">Loại hình sở hữu</div><div className="info-value">Mua — Sở hữu vĩnh viễn</div></div>
                <div className="info-item"><div className="info-label">Ngày ký hợp đồng</div><div className="info-value">10/01/2022</div></div>
                <div className="info-item"><div className="info-label">Ngày bàn giao</div><div className="info-value">15/01/2022</div></div>
                <div className="info-item"><div className="info-label">Chủ sở hữu</div><div className="info-value">Trần Hoàng Chris</div></div>
                <div className="info-item"><div className="info-label">Giấy chứng nhận</div><div className="info-value" style={{ color: "#1c9d5f", fontWeight: 600 }}>Đã cấp sổ hồng</div></div>
              </div>
            </div>
          </div>

          {/* Phí hàng tháng */}
          <div className="section-card">
            <div className="section-hd">
              <div className="section-title">
                <div className="section-title-icon" style={{ background: "#fff8ec" }}><svg viewBox="0 0 24 24" fill="none" stroke="#c8761b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg></div>
                Phí dịch vụ tháng 5/2024
              </div>
              <button className="section-edit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                Lịch sử thanh toán
              </button>
            </div>
            <div className="section-body" style={{ paddingTop: 0, paddingBottom: 0 }}>
              <div className="fee-table">
                <div className="fee-row fee-hd">
                  <span className="fee-cell">Khoản phí</span>
                  <span className="fee-cell" style={{ textAlign: "right" }}>Số tiền</span>
                  <span className="fee-cell" style={{ textAlign: "right" }}>Trạng thái</span>
                </div>
                <div className="fee-row">
                  <span className="fee-cell name">Phí quản lý</span>
                  <span className="fee-cell amount">3.800.000 đ</span>
                  <span className="fee-cell status"><span className="fee-status fee-paid">Đã thanh toán</span></span>
                </div>
                <div className="fee-row">
                  <span className="fee-cell name">Phí giữ xe ô tô (B1-A21)</span>
                  <span className="fee-cell amount">1.200.000 đ</span>
                  <span className="fee-cell status"><span className="fee-status fee-paid">Đã thanh toán</span></span>
                </div>
                <div className="fee-row">
                  <span className="fee-cell name">Phí giữ xe máy (B2-M14)</span>
                  <span className="fee-cell amount">200.000 đ</span>
                  <span className="fee-cell status"><span className="fee-status fee-paid">Đã thanh toán</span></span>
                </div>
                <div className="fee-row">
                  <span className="fee-cell name">Tiền điện</span>
                  <span className="fee-cell amount">1.560.000 đ</span>
                  <span className="fee-cell status"><span className="fee-status fee-paid">Đã thanh toán</span></span>
                </div>
                <div className="fee-row">
                  <span className="fee-cell name">Tiền nước</span>
                  <span className="fee-cell amount">320.000 đ</span>
                  <span className="fee-cell status"><span className="fee-status fee-due">Chưa thanh toán</span></span>
                </div>
                <div className="fee-row" style={{ background: "#f7f7f7" }}>
                  <span className="fee-cell" style={{ fontWeight: 700 }}>Tổng cộng</span>
                  <span className="fee-cell amount" style={{ color: "#4137f9" }}>7.080.000 đ</span>
                  <span className="fee-cell status" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="body-sidebar">
          {/* Resident card */}
          <div className="resident-card">
            <div className="rc-top">
              <img className="rc-avatar" src="https://www.figma.com/api/mcp/asset/ee21e768-a070-4e15-ad43-73a28943d4ee" alt="Chris Tran" width={44} height={44} />
              <div>
                <div className="rc-name">Chris Tran</div>
                <div className="rc-meta">Căn hộ A-12.05 · Landmark 1</div>
              </div>
              <div className="rc-apt-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
              </div>
            </div>
            <div className="rc-code-label">Mã căn hộ</div>
            <div className="rc-code">LM1 – A12.05</div>
            <div className="rc-building-label">Toà nhà</div>
            <div className="rc-building">Vinhomes Central Park</div>
            <div className="rc-bottom">
              <div className="rc-active"><span className="rc-active-dot" />Đang hoạt động</div>
              <div className="rc-since">Từ 01/2022</div>
            </div>
          </div>

          {/* Quick links */}
          <div className="quick-links">
            <div className="ql-hd">Thao tác nhanh</div>
            <div className="ql-item">
              <div className="ql-icon" style={{ background: "#efeeff" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#4137f9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              </div>
              <div className="ql-text">
                <div className="ql-name">Thanh toán phí</div>
                <div className="ql-sub">Còn 1 khoản chưa TT</div>
              </div>
              <div className="ql-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg></div>
            </div>
            <div className="ql-item">
              <div className="ql-icon" style={{ background: "#fff8ec" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#c8761b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
              </div>
              <div className="ql-text">
                <div className="ql-name">Yêu cầu bảo trì</div>
                <div className="ql-sub">Gửi yêu cầu sửa chữa</div>
              </div>
              <div className="ql-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg></div>
            </div>
            <div className="ql-item">
              <div className="ql-icon" style={{ background: "#e3fbed" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#1c9d5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              </div>
              <div className="ql-text">
                <div className="ql-name">Tải hồ sơ căn hộ</div>
                <div className="ql-sub">PDF · Cập nhật 05/2024</div>
              </div>
              <div className="ql-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg></div>
            </div>
            <div className="ql-item">
              <div className="ql-icon" style={{ background: "#f7f5ff" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#5a3ad9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div className="ql-text">
                <div className="ql-name">Vị trí &amp; Sơ đồ</div>
                <div className="ql-sub">Tháp A · Tầng 12 · Căn 05</div>
              </div>
              <div className="ql-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
